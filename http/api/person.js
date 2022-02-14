import request from '../index.js'
// 查询我点赞的网站
export const getLikeWebsiteAsync = (params) => {
	return request({
		url: "/api/person/getLikeWebsite",
		method: "get",
		data: params
	});
};

// 获取用户点赞的资源
export const getLikeSourceAsync = (params) => {
	return request({
		url: "/api/person/getLikeSource",
		method: "get",
		data: params
	});
};

// 获取用户的评论
export const getUserCommentAsync = (params) => {
	return request({
		url: "/api/person/getUserComment",
		method: "get",
		data: params
	});
};