import Vue from 'vue'
import Vuex from 'vuex'
import {
	getUserInfo
} from "@/http/api/user"; // 请求用户信息
Vue.use(Vuex);


export default new Vuex.Store({
	state: {
		userInfo: "", //用户信息
		token: uni.getStorageSync("token") ?
			uni.getStorageSync("token") : false, // token
	},
	mutations: {
		// 修改token，并将token存入本地
		setAuthorization(state, token) {
			state.token = token;
			uni.setStorageSync("token", token);
		},
		// 获取用户信息后存储下来
		setUserInfo(state, userInfo) {
			state.userInfo = userInfo;
		},
	},
	actions: {
		// 查询用户信息
		async getUserInfo(context) {
			if (uni.getStorageSync("token")) {
				let userInfo = [];
				const data = await getUserInfo();
				if (data.code === "00000") {
					userInfo = data.data;
					uni.setStorageSync("userInfo", JSON.stringify(userInfo));
					context.commit("setUserInfo", userInfo);
				} else {
					uni.$u.toast(data.message);
				}
			} else {
				uni.setStorageSync("userInfo", "");
				context.commit("setUserInfo", "");
			}
		},
	},
	getters: {}
})
