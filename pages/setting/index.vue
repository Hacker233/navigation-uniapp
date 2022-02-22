<template>
	<view class="setting-box">
		<!-- 退出登录 -->
		<view class="login-out">
			<u-button text="退出登录" color="linear-gradient(to right, rgb(170, 170, 127), rgb(213, 51, 186))"
				@click="loginOut"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			// 退出登录
			loginOut() {
				this.$store.commit("setUserInfo", ''); // 清除用户信息
				this.$store.commit("setAuthorization", ''); // 清楚token
				this.$store.dispatch("getUserlevelInfo"); // 获取用户积分信息
				uni.clearStorage();
				uni.navigateBack({});
			},
		},
	}
</script>

<style lang="scss">
	.setting-box {
		.login-out {
			padding: 20rpx 20rpx;
		}
	}
</style>
