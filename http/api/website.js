import request from '../index.js'
// 点击菜单查询网站
export const queryMenuWebsite = (params) => {
	return request({
		url: "/api/website/queryMenuWebsite",
		method: "get",
		data: params
	});
};
// 查询网站信息
export const queryWebsite = (params) => {
	return request({
		url: "/api/website/queryWebsite",
		method: "get",
		data: params
	});
}
