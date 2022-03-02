import request from '../index.js'
// 获取用户签到信息
export const getUserSignList = (params) => {
	return request({
		url: "/api/sign/getUserSignList",
		method: "get",
		data: params
	});
};

// 签到
export const userSign = (params) => {
	return request({
		url: "/api/sign/userSign",
		method: "post",
		data: params
	});
};