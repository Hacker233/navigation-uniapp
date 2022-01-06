import request from '../index.js'
// 首页菜单
export const getMenu = (params) => {
	return request({
		url: "/api/menu/getMenu",
		method: "get",
		data: params,
	});
};
