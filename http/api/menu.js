import request from '../index.js'
// ้ฆ้กต่ๅ
export const getMenu = (params) => {
	return request({
		url: "/api/menu/getMenu",
		method: "get",
		data: params,
	});
};
