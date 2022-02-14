import request from '../index.js'
// 获取今日推荐
export const getRecommendToday = (params) => {
	return request({
		url: "/api/recommend/getRecommendToday",
		method: "get",
		data: params
	});
};

// 获取热门网站
export const getHotWebsite = (params) => {
	return request({
		url: "/api/recommend/getHotWebsite",
		method: "get",
		data: params
	});
};

// 获取精选资源
export const getHotSource = (params) => {
	return request({
		url: "/api/recommend/getHotSource",
		method: "get",
		data: params
	});
};