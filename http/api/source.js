import request from '../index.js'
// 获取所有资源分类
export const querySocategoryAll = (params) => {
	return request({
		url: "/api/source/querySocategoryAll",
		method: "get",
		data: params,
	});
};
// 根据资源分类查询数据
export const querySourceByCategory = (params) => {
	return request({
		url: "/api/source/querySourceByCategory",
		method: "get",
		data: params,
	});
}
// 根据资源id获取资源详细信息
export const querySourceById = (params) => {
	return request({
		url: "/api/source/querySourceById",
		method: "get",
		data: params,
	});
}

// 点赞资源
export const likeSourceById = (params) => {
	return request({
		url: "/api/source/likeSource",
		method: "post",
		data: params,
	});
}

// 取消点赞资源
export const cancleLikeSourceById = (params) => {
	return request({
		url: "/api/source/cancleLikeSource",
		method: "put",
		data: params,
	});
}