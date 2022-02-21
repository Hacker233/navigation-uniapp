import request from '../index.js'
// 查询用户信息
export const getUserlevelInfo = () => {
	return request({
		url: "/api/userlevel/getUserlevelInfo",
		method: "get"
	})
};