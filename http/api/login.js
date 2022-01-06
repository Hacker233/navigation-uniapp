import request from '../index.js'
export const login = (params) => {
	return request({
		method: 'get',
		url: '/api/login',
		data: params
	})
}
