import store from "../store/index.js";
import ENV from '../config/index.js';
// 接口共用地址
const BASE_URL = ENV.serverAddress;
export const request = (options) => {
	let header = {};
	// 设置请求类型
	if (options.header) {
		if (options.header["Content-Type"]) {
			header.ContentType = options.header["Content-Type"]
		} else {
			header.ContentType = "application/json"
		}
	}
	// 携带token
	const authorization = store.state.token;
	if (authorization) {
		header.authorization = authorization
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			//默认参数
			data: options.data || {},
			// 配置请求头参数-例如token
			header: header,
			method: options.method || 'GET',

			// 接口请求成功
			success: (res) => {
				// token失效或者过期
				if (res.data.code === "T0001") {
					uni.removeStorageSync('token'); // 移除token
					uni.navigateTo({
						url: "/pages/login/login"
					})
					// resolve(res.data);
				} else {
					// 存储token到本地
					console.log(res)
					resolve(res.data);
				}
			},
			// 接口接口失败
			fail: (error) => {
				uni.showToast({
					title: '网络异常',
					icon: "none",
					mask: true,
				})
				// 失败数据
				reject(error)
			}
		})
	})
}

export default request;
