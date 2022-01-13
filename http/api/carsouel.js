import request from '../index.js'
// 点击菜单查询网站
export const getCarsouelByPage = (params) => {
	return request({
		url: "/api/carsouel/getCarsouelByPage",
		method: "get",
		data: params
	});
};