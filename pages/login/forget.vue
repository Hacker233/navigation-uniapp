<template>
	<view class="forget">

		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image src="../../static/logo.png"></image>
			</view>
			<!-- 主体 -->
			<view class="main">
				<view class="tips">若你忘记了密码，可在此重置新密码。</view>
				<wInput v-model="phoneData" type="text" maxlength="20" placeholder="请输入电子邮箱"></wInput>
				<wInput v-model="passData" type="password" maxlength="20" placeholder="请输入新密码" isShowPass></wInput>

				<wInput v-model="verCode" type="number" maxlength="6" placeholder="验证码" isShowCode codeText="获取重置码"
					setTime="30" ref="runCode" @setCode="getVerCode()"></wInput>
			</view>

			<wButton class="wbutton" text="重置密码" :rotate="isRotate" @click.native="startRePass()"></wButton>

		</view>
	</view>
</template>

<script>
	let _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	import {
		emailCode,
		forgetPass
	} from "@/http/api/user.js"
	export default {
		data() {
			return {
				phoneData: "", //邮箱
				passData: "", //密码
				verCode: "", //验证码
				isRotate: false, //是否加载旋转
			}
		},
		components: {
			wInput,
			wButton
		},
		mounted() {
			_this = this;
		},
		methods: {
			// 发送验证码
			async getVerCode() {
				// 判断邮箱格式
				if (!this.phoneData) {
					uni.showToast({
						icon: 'error',
						title: "邮箱不能为空",
					});
				} else if (this.phoneData.match(/^\w+@\w+\.\w+$/i)) {
					this.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
					let params = {
						email: this.phoneData,
						isForget: true
					};
					const data = await emailCode(params);
					if (data.code === "00000") {
						uni.showToast({
							icon: 'success',
							title: '验证码发送成功',
						});
					} else {
						uni.showToast({
							icon: 'error',
							title: data.message,
						});
					}
				} else {
					uni.showToast({
						icon: 'error',
						title: "邮箱格式错误",
					});
				}
			},
			// 重置密码
			async startRePass() {
				//重置密码
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (!this.phoneData) {
					uni.showToast({
						icon: 'error',
						title: '邮箱不能为空'
					});
					return false;
				}
				if (this.passData.length < 6) {
					uni.showToast({
						icon: 'error',
						title: '密码不低于6位字符'
					});
					return false;
				}
				if (!this.passData) {
					uni.showToast({
						icon: 'error',
						title: '密码不能为空'
					});
					return false;
				}
				if (this.verCode.length != 6) {
					uni.showToast({
						icon: 'error',
						title: '验证码格式错误'
					});
					return false;
				}

				let params = {
					password: this.passData,
					email: this.phoneData,
					code: this.verCode,
				};
				const data = await forgetPass(params);
				if (data.code === "00000") {
					_this.isRotate = false;
					uni.showToast({
						icon: 'success',
						title: '重置成功',
					});
					uni.removeStorageSync('redirectURL');
					setTimeout(() => {
						uni.redirectTo({
							url: "/pages/login/login"
						}, 2000)
					})
				} else {
					_this.isRotate = false;
					uni.showToast({
						icon: 'error',
						title: data.message,
					});
				}


			}
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");
</style>
