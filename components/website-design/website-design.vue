<template>
	<u-transition :show="true" mode="fade-up" :duration="duration">
		<view class="website-design-box">
			<view class="custom-btn btn-11" :class="classObj" @click="toMenuWebsite">
				<i :class="['iconfont',menuInfo.menu_icon]"></i>
				<text class="menu-name-text">{{menuInfo.menu_name.slice(0,-2) + '大杂烩'}}</text>
			</view>
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
				duration: 300
			}
		},
		computed: {
			classObj() {
				return `bgc-${this.index}`
			}
		},
		mounted() {
			this.duration = 300 + (this.index * 300);
			let randNum = this.getRandomInt(1, 8);
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

<style lang="scss" scoped>
	.website-design-box {
		width: 43vw;
		height: 200rpx;
		display: flex;
	}

	.custom-btn {
		flex: 1;
		color: #fff;
		border-radius: 5px;
		font-family: 'Lato', sans-serif;
		font-weight: 500;
		background: transparent;
		cursor: pointer;
		transition: all 0.3s ease;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, .5),
			7px 7px 20px 0px rgba(0, 0, 0, .1),
			4px 4px 5px 0px rgba(0, 0, 0, .1);
		outline: none;

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
			font-weight: 600;
			letter-spacing: 10rpx;
		}
	}

	.btn-11 {
		border: none;
		background: rgb(251, 33, 117);
		background: linear-gradient(0deg, rgba(251, 33, 117, 1) 0%, rgba(234, 76, 137, 1) 100%);
		color: #fff;
		overflow: hidden;
	}

	.btn-11:hover {
		text-decoration: none;
		color: #fff;
	}

	.btn-11:before {
		position: absolute;
		content: '';
		display: inline-block;
		top: -180px;
		left: 0;
		width: 30px;
		height: 100%;
		background-color: #fff;
		animation: shiny-btn1 3s ease-in-out infinite;
	}

	.btn-11:hover {
		opacity: .7;
	}

	.btn-11:active {
		box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, .3),
			-4px -4px 6px 0 rgba(116, 125, 136, .2),
			inset -4px -4px 6px 0 rgba(255, 255, 255, .2),
			inset 4px 4px 6px 0 rgba(0, 0, 0, .2);
	}


	@-webkit-keyframes shiny-btn1 {
		0% {
			-webkit-transform: scale(0) rotate(45deg);
			opacity: 0;
		}

		80% {
			-webkit-transform: scale(0) rotate(45deg);
			opacity: 0.5;
		}

		81% {
			-webkit-transform: scale(4) rotate(45deg);
			opacity: 1;
		}

		100% {
			-webkit-transform: scale(50) rotate(45deg);
			opacity: 0;
		}
	}

	.bgc-1 {
		background: rgb(6, 14, 131);
		background: linear-gradient(0deg, rgba(6, 14, 131, 1) 0%, rgba(12, 25, 180, 1) 100%);
	}

	.bgc-2 {
		background: rgb(96, 9, 240);
		background: linear-gradient(0deg, rgba(96, 9, 240, 1) 0%, rgba(129, 5, 240, 1) 100%);
	}

	.bgc-3 {
		background: rgb(0, 172, 238);
		background: linear-gradient(0deg, rgba(0, 172, 238, 1) 0%, rgba(2, 126, 251, 1) 100%);
	}

	.bgc-4 {
		background-color: #4dccc6;
		background-image: linear-gradient(315deg, #4dccc6 0%, #96e4df 74%);
	}

	.bgc-5 {
		background: rgb(255, 27, 0);
		background: linear-gradient(0deg, rgba(255, 27, 0, 1) 0%, rgba(251, 75, 2, 1) 100%);
	}

	.bgc-6 {
		background: rgb(247, 150, 192);
		background: radial-gradient(circle, rgba(247, 150, 192, 1) 0%, rgba(118, 174, 241, 1) 100%);
	}

	.bgc-7 {
		background: linear-gradient(0deg, rgba(255, 151, 0, 1) 0%, rgba(251, 75, 2, 1) 100%);
	}

	.bgc-8 {
		background-color: #f0ecfc;
		background-image: linear-gradient(315deg, #f0ecfc 0%, #c797eb 74%);
	}

	.bgc-9 {
		background-color: #1fd1f9;
		background-image: linear-gradient(315deg, #1fd1f9 0%, #b621fe 74%);
	}
</style>
