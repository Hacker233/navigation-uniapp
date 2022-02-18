<template>
	<view class="">
		<okingtz-cropper @uploadSuccess="uploadSuccess" saveButtonText="确认修改"></okingtz-cropper>
	</view>
</template>

<script>
	import {
		updateAvatarAsync
	} from "@/http/api/user.js"
	import CONFIG from "@/config/index.js"
	export default {
		// 样式穿透
		options: {
			styleIsolation: 'shared'
		},
		data() {
			return {
				avatar: ''
			}
		},
		methods: {
			// 上传头像
			async uploadSuccess(item) {
				console.log("up",CONFIG,updateAvatarAsync)
				uni.showLoading({
					title: '修改中'
				});
				// 上传文件
				uni.uploadFile({
					url: CONFIG.serverAddress + '/api/upload', // api地址
					filePath: item, // 本地上传完成后的路径
					name: 'file', // 默认
					header: {
						"Authorization": this.$store.state.token // token验证
					},
					formData: { // 其他的formdata参数
					},
					success: (res) => {
						this.avatar = JSON.parse(res.data).data.fileUrl;
						this.update();
					},
					fail: (res) => {
						uni.showToast({
							icon: "error",
							title: "上传失败"
						})
					}
				});
			},
			// 更新用户头像
			async update() {
				let params = {
					avatar: this.avatar
				}
				console.log(this.avatar)
				const data = await updateAvatarAsync(params);
				if (data.code === "00000") {
					uni.showToast({
						icon: "success",
						title: "修改成功"
					})
					uni.navigateBack({});
					this.$store.dispatch("getUserInfo"); // 获取用户信息
					this.$store.dispatch("getUserlevelInfo"); // 获取用户积分信息
				} else {
					uni.showToast({
						icon: "error",
						title: data.message
					})
				}
			}
		}
	}
</script>

<style>
</style>
