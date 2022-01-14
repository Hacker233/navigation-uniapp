import request from '../index.js'
// 登录
export const userLogin = (data) => {
	return request({
		url: "/api/user/login",
		method: "post",
		data: data,
	})
};

// 注册用户
export const userRegister = (data) => {
	return request({
		url: "/api/user/register",
		method: "post",
		data: data,
	})
};
// 查询用户信息
export const getUserInfo = () => {
	return request({
		url: "/api/user/userInfo",
		method: "get"
	})
};
// 获取邮箱验证码
export const emailCode = (data) => {
	return request({
		url: "/api/user/emailCode",
		method: "post",
		data: data
	})
};

// 修改用户头像
export const updateAvatarAsync = (data) => {
	return request({
		url: "/api/person/updateAvatar",
		method: "put",
		data: data
	})
}

// 修改个性签名
export const updateSignature = (data) => {
	return request({
		url: "/api/person/updateSignature",
		method: "put",
		data: data
	})
}
