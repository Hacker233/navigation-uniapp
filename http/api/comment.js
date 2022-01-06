import request from '../index.js'
// 获取评论列表
export const getCommentList = (params) => {
	return request({
		method: 'get',
		url: '/api/mobcomment/mobcommentList',
		data: params

	})
};
// 发表评论
export const addComment = (params) => {
	return request({
		method: 'post',
		url: '/api/mobcomment/mobaddComment',
		data: params
	})
};
// 点赞评论
export const likeComment = (params) => {
	return request({
		method: 'put',
		url: '/api/mobcommet/moblikeComment',
		data: params
	})
}
// 删除评论
export const deleteComment = (params) => {
	return request({
		method: 'delete',
		url: '/api/mobcommet/mobdeleteComment',
		data: params
	})
}