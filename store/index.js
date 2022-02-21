import Vue from 'vue'
import Vuex from 'vuex'
import {
	getUserInfo
} from "@/http/api/user"; // 请求用户信息
import {
	getUserlevelInfo
} from "@/http/api/userlevel"
import {
	getTabbar
} from "@/http/api/tabbar"
Vue.use(Vuex);


export default new Vuex.Store({
	state: {
		userInfo: "", //用户信息
		userlevelInfo: '', // 用户积分信息
		tabbar: [], // 底部导航栏
		tabIndex: 0, // 选中第几个菜单
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
		// 获取用户积分信息后存储下来
		setUserlevelInfo(state, userlevelInfo) {
			state.userlevelInfo = userlevelInfo;
		},
		// 修改选中tabbar
		setTabbarindex(state, index) {
			state.tabIndex = index;
		},
		// 保存tabbar
		setTabbarList(state, tabbar) {
			state.tabbar = tabbar;
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
		// 获取用户积分信息
		async getUserlevelInfo(context) {
			if (uni.getStorageSync("token")) {
				let userlevelInfo = null;
				const data = await getUserlevelInfo();
				if (data.code === "00000") {
					userlevelInfo = data.data;
					uni.setStorageSync("userlevelInfo", JSON.stringify(userlevelInfo));
					context.commit("setUserlevelInfo", userlevelInfo);
				} else {
					uni.$u.toast(data.message);
				}
			} else {
				uni.setStorageSync("userlevelInfo", "");
				context.commit("setUserlevelInfo", "");
			}
		},
		// 获取tabbar
		async getTabbarList(context) {
			const data = await getTabbar();
			if (data.code === "00000") {
				uni.setStorageSync("setTabbarList", JSON.stringify(data.data));
				context.commit("setTabbarList", data.data);
			} else {
				uni.$u.toast(data.message);
			}
		}
	},
	getters: {}
})
