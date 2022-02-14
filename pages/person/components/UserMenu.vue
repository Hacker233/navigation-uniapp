<template>
	<view class="user-menu-box">
		<view v-for="(item, index) in menuList" :key="index">
			<view class="list-content" @click="toDetail(item)">
				<view class="list-left">
					<i :class="['iconfont',item.iconfont]"></i>
					<text class="list-title">{{item.name}}</text>
				</view>
				<view class="list-right">
					<i class="iconfont pig-changyong_gengduo"></i>
				</view>
			</view>
			<u-line color="#c8c7cc"></u-line>
		</view>
	</view>
</template>

<script>
	export default {
		// 样式穿透
		options: {
			styleIsolation: 'shared'
		},
		data() {
			return {
				menuList: [{
					name: '我的点赞',
					iconfont: 'pig-changyong_dianzan',
					page: '/pages/mylike/index',
					isAuth: true,
				}, {
					name: '我的评论',
					iconfont: 'pig-changyong_xiaoxi',
					page: '/pages/mycomment/index',
					isAuth: true,
				}, {
					name: '联系我们',
					iconfont: 'pig-fankuijianyi',
					page: '/pages/feedback/index',
					isAuth: false,
				}]
			}
		},
		computed: {
			userInfo() {
				return this.$store.state.userInfo
			}
		},
		methods: {
			// 跳转至详情页面
			toDetail(item) {
				console.log(item)
				// 判断是否需要权限
				if (item.isAuth) {
					if (this.userInfo) {
						uni.navigateTo({
							url: `${item.page}`
						})
					} else {
						// 未登录跳转到登录页面
						uni.navigateTo({
							url: `/pages/login/login`
						})
					}
				} else {
					uni.navigateTo({
						url: `${item.page}`
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.user-menu-box {
		/deep/ .u-line {
			margin-bottom: 10rpx !important;
		}

		.list-content {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 100rpx;

			.list-left {
				display: flex;
				align-items: center;

				.iconfont {
					margin: 0 30rpx 0 0;
					font-size: 40rpx;
					color: #333333;
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #fff;
					background: linear-gradient(to right, rgb(170, 170, 127), rgb(213, 51, 186));
				}

				.list-title {
					font-size: $uni-font-size-base;
					letter-spacing: 4rpx;
				}
			}

			.list-right {
				display: flex;
				align-items: center;

				.pig-changyong_gengduo {
					font-size: $uni-font-size-base;
					color: $uni-text-color-grey;
				}
			}
		}
	}
</style>
