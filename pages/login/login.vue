<template>
	<view class="login">
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image src="../../static/logo.png"></image>
			</view>
			<!-- 主体表单 -->
			<view class="main">
				<wInput v-model="phoneData" type="text" maxlength="20" placeholder="邮箱" :focus="isFocus"></wInput>
				<wInput v-model="passData" type="password" maxlength="20" placeholder="密码"></wInput>
			</view>
			<wButton class="wbutton" text="登 录" :rotate="isRotate" @click="startLogin"></wButton>

			<!-- 其他登录 -->
			<!-- <view class="other_login cuIcon">
				<view class="login_icon">
					<view class="cuIcon-weixin" @tap="login_weixin"></view>
				</view>
				<view class="login_icon">
					<view class="cuIcon-weibo" @tap="login_weibo"></view>
				</view>
				<view class="login_icon">
					<view class="cuIcon-github" @tap="login_github"></view>
				</view>
			</view> -->

			<!-- 底部信息 -->
			<view class="footer">
				<navigator url="/pages/login/forget" open-type="navigate">找回密码</navigator>
				<text>|</text>
				<navigator url="/pages/login/register" open-type="navigate">注册账号</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	let _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	import {
		userLogin
	} from "@/http/api/user.js"
	export default {
		data() {
			return {
				phoneData: '', //用户/电话
				passData: '', //密码
				isRotate: false, //是否加载旋转
				isFocus: true // 是否聚焦
			};
		},
		components: {
			wInput,
			wButton,
		},
		mounted() {
			_this = this;
			//this.isLogin();
		},
		methods: {
			isLogin() {
				//判断缓存中是否登录过，直接登录
				// try {
				// 	const value = uni.getStorageSync('setUserData');
				// 	if (value) {
				// 		//有登录信息
				// 		console.log("已登录用户：",value);
				// 		_this.$store.dispatch("setUserData",value); //存入状态
				// 		uni.reLaunch({
				// 			url: '../../../pages/index',
				// 		});
				// 	}
				// } catch (e) {
				// 	// error
				// }
			},
			async startLogin(e) {
				console.log(e)
				//登录
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (!this.phoneData) {
					uni.showToast({
						icon: 'error',
						title: '用户名不能为空'
					});
					return;
				}
				if (this.passData.length < 5) {
					uni.showToast({
						icon: 'error',
						title: '密码不正确'
					});
					return;
				}

				_this.isRotate = true
				setTimeout(function() {
					_this.isRotate = false
				}, 3000)
				uni.showLoading({
					title: '登录中'
				});
				let params = {
					email: this.phoneData,
					password: this.passData,
				};
				const data = await userLogin(params);
				if (data.code === "00000") {
					// 登录成功保存token
					const token = data.data.token;
					if (token) {
						this.$store.commit("setAuthorization", token);
					}
					uni.showToast({
						icon: 'success',
						position: 'bottom',
						title: '登录成功'
					});
					this.$store.dispatch("getUserInfo"); // 获取用户信息
					this.$store.dispatch("getUserlevelInfo"); // 获取用户积分信息
					if (uni.getStorageSync('redirectURL')) {
						uni.navigateBack();
					} else {
						uni.switchTab({
							url: "/pages/index/index"
						})
					}
				} else {
					uni.showToast({
						icon: 'error',
						title: data.message
					})
				}
			},
			login_weixin() {
				//微信登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
			login_weibo() {
				//微博登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
			login_github() {
				//github登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			}
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");
</style>
