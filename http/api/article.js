import request from '../index.js'
// 获取所有文章分类
export const getCategory = (params) => {
	return request({
		url: "/api/category/getCategory",
		method: "get",
		data: params,
	});
};
// 根据所属菜单id获取文章列表
export const getArticleList = (params) => {
	return request({
		url: "/api/article/getArticleList",
		method: "get",
		data: params,
	});
};

// 根据id获取文章内容
export const getArticle = (params) => {
	return request({
		url: "/api/article/getArticle",
		method: "get",
		data: params,
	});
};

// 点赞文章
export const likeArticle = (params) => {
	return request({
		url: "/api/article/likeArticle",
		method: "post",
		data: params,
	});
};

// 取消点赞文章
export const cancelLikeArticle = (data) => {
	return request({
		url: "/api/article/cancelLikeArticle",
		method: "put",
		data: params,
	});
};
