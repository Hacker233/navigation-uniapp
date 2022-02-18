<template>
	<view class="signature-box">
		<view class="input-box">
			<u--input v-model="signature" maxlength="30" placeholder="有个性就有签名" border="bottom" clearable
				:showWordLimit="true"></u--input>
		</view>
		<view class="save-box">
			<view class="btn">
				<u-button text="保存" size="mini" color="linear-gradient(to right, rgb(170, 170, 127), rgb(213, 51, 186))"
					@click="saveSignature"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		updateSignature
	} from "@/http/api/user.js";
	export default {
		data() {
			return {
				signature: ''
			}
		},
		onLoad(option) {
			this.signature = option.oldSignature
			console.log(option)
		},
		methods: {
			// 保存签名
			saveSignature() {
				if (!this.signature) {
					uni.showToast({
						icon: "error",
						title: "签名不能为空"
					})
				} else {
					this.updateSignatureAsync();
				}
			},
			async updateSignatureAsync() {
				let params = {
					signature: this.signature,
				}
				const data = await updateSignature(params);
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

<style lang="scss">
	.signature-box {
		.input-box {
			margin-bottom: 30rpx;
		}

		.save-box {
			width: 100%;
			display: flex;
			justify-content: flex-end;

			.btn {
				width: 100rpx;
			}
		}
	}
</style>
