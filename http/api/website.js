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
		url: "/api/website/queryWebsiteById",
		method: "get",
		data: params
	});
}

// 点赞网站
export const likeWebsiteById = (params) => {
	return request({
		url: "/api/website/likeWebsite",
		method: "post",
		data: params
	});
}

// 取消点赞网站
export const cancleLikeWebsiteById = (params) => {
	return request({
		url: "/api/website/cancleLikeWebsite",
		method: "put",
		data: params
	});
}

