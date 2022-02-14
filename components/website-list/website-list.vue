<template>
	<u-transition :show="true" mode="fade-up" :duration="duration">
		<view class="website-list-box" @click="toMenuWebsite">
			<view class="bgc-img">
				<!-- <u--image :showLoading="true" :src="backgroundImage" width="100%" height="200rpx">
				</u--image> -->
			</view>
			<i :class="['iconfont',menuInfo.menu_icon]"></i>
			<text class="menu-name-text">{{menuInfo.menu_name.slice(0,-2) + '大杂烩'}}</text>
		</view>
	</u-transition>

</template>

<script>
	export default {
		props: {
			menuInfo: {
				type: Object,
				default: () => {}
			},
			index: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				backgroundImage: 'https://smallpig.site:9000/navigation/bg/bg-1.jpg',
				duration: 300
			}
		},
		mounted() {
			this.duration = 300 + (this.index * 300);
			let randNum = this.getRandomInt(1, 8);
			this.backgroundImage = `https://smallpig.site:9000/navigation/bg/bg-${randNum}.jpg`
		},
		methods: {
			// 获取随机数
			getRandomInt(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},
			// 点击跳转至网站列表页面
			toMenuWebsite() {
				uni.navigateTo({
					url: `/pages/websiteList/index?menuId=${this.menuInfo.menu_id}&menuIcon=${this.menuInfo.menu_icon}&title=${this.menuInfo.menu_name.slice(0,-2)}大杂烩`
				})
			}
		}
	}
</script>

<style lang="scss">
	.website-list-box {
		width: 43vw;
		height: 200rpx;
		background-color: rgba(0, 0, 0, 0.5);
		border-radius: 20rpx;
		overflow: hidden;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-shadow: 0 13px 15px rgba(31, 45, 61, 0.2);

		.bgc-img {
			position: absolute;
			// filter: blur(1px);
			width: 100%;
			height: 200rpx;
			background: #0f0c29;  /* fallback for old browsers */
			background: -webkit-linear-gradient(to right, #24243e, #302b63, #0f0c29);  /* Chrome 10-25, Safari 5.1-6 */
			background: linear-gradient(to right, #24243e, #302b63, #0f0c29); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
		}

		.iconfont {
			z-index: 2;
			color: #FFFFFF;
			font-size: 40rpx;
			margin-bottom: 20rpx;
		}

		.menu-name-text {
			color: #FFFFFF;
			z-index: 2;
			font-size: 30rpx;
			font-weight: 800;
			letter-spacing: 10rpx;
		}
	}
</style>
