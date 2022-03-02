import request from '../index.js'
// 添加评价
export const addRating = (params) => {
	return request({
		url: "/api/rating/addRating",
		method: "post",
		data: params
	});
};

// 查询所有评论
export const getAllRating = (params) => {
	return request({
		url: "/api/rating/getAllRating",
		method: "get",
		data: params
	});
}