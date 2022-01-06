<template>
	<view class="person-box">
		<!-- 用户信息区域 -->
		<view class="userInfo-box">
			<view class="left">
				<u-avatar :src="userInfo.avatar" v-if="userInfo" size="80"></u-avatar>
				<u-avatar text="猪" v-else size="80"></u-avatar>
			</view>
			<view class="right">
				<template v-if="userInfo">
					<view class="username">
						{{userInfo.username}}
					</view>
					<view class="signature">
						{{userInfo.signature}}
					</view>
				</template>
				<template v-else>
					<view class="toLogin" @click="toLogin">去登录</view>
				</template>
			</view>
		</view>
		<!-- 退出登录 -->
		<view class="login-out">
			<u-button text="退出登录" color="linear-gradient(to right, rgb(170, 170, 127), rgb(213, 51, 186))"
				@click="loginOut"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		computed: {
			userInfo() {
				return this.$store.state.userInfo
			}
		},
		methods: {
			// 跳转到登录页面
			toLogin() {
				uni.navigateTo({
					url: "/pages/login/login"
				})
			},
			// 退出登录
			loginOut() {
				this.$store.commit("setUserInfo", ''); // 清除用户信息
				this.$store.commit("setAuthorization", ''); // 清楚token
				uni.clearStorage();
			}
		},
	}
</script>

<style lang="scss">
	page {
		padding: 0;
	}

	.person-box {
		.userInfo-box {
			width: 100%;
			height: 300rpx;
			background-color: $uni-bg-color;
			border-bottom-left-radius: 60rpx;
			border-bottom-right-radius: 60rpx;
			display: flex;

			.left {
				height: 100%;
				display: flex;
				align-items: center;
				padding-left: 40rpx;
			}

			.right {
				height: 100%;
				padding-left: 40rpx;
				display: flex;
				align-items: flex-start;
				flex-direction: column;
				justify-content: center;

				.username {
					font-size: $uni-font-size-title;
					margin-bottom: 10rpx;
					font-weight: 800;
				}

				.signature {
					font-size: $uni-font-size-base;
					color: $uni-color-subtitle;
					margin-top: 10rpx;
				}

				.toLogin {
					font-size: $uni-font-size-title;
					font-weight: 800;
					color: $uni-color-primary;
					letter-spacing: 4rpx;
				}
			}
		}

		.login-out {
			padding: 20rpx 20rpx;
		}
	}
</style>
