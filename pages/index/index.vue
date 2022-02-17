<template>
	<view class="content">
		<u-toast ref="uToast"></u-toast>
		<!-- 轮播图 -->
		<u-swiper :list="fileterCarouselList" indicator indicatorMode="line" circular imgMode="scaleToFill"
			:height="150" @click="clickSwiper"></u-swiper>

		<!-- 网站推荐卡片 -->
		<template v-if="menuList.length">
			<view class="website-list-wraper">
				<view class="list-item-box" v-for="(item,index) in menuList" :key="index">
					<!-- <website-list :menuInfo="item" :index="index"></website-list> -->
					<website-design :menuInfo="item" :index="index+1"></website-design>
				</view>
			</view>
		</template>
		<our-loading v-else active></our-loading>
	</view>
</template>

<script>
	import {
		getMenu
	} from "@/http/api/menu"; // 请求菜单接口
	import {
		getCarsouelByPage
	} from "@/http/api/carsouel.js";
	export default {
		data() {
			return {
				menuList: [], // tab菜单
				carsouelList: [],
				fileterCarouselList: [],
			}
		},
		onLoad() {
			this.init();
		},
		//监听下拉刷新
		onPullDownRefresh() {
			this.menuList = [];
			this.init();
		},
		mounted() {
			this.init(); // 获取网站导航
			this.getCarsouelByPageAsync(); // 获取轮播图
		},
		methods: {
			// 初始化菜单
			init() {
				this.getMenu();
			},
			// 初始化首页轮播图
			async getCarsouelByPageAsync() {
				let params = {
					carsouelPage: 'index',
				}
				const data = await getCarsouelByPage(params);
				if (data.code === "00000") {
					this.carsouelList = data.data;
					this.fileterCarouselList = data.data.map(item => item.carsouel_url);
				} else {
					uni.$u.toast(data.message)
				}
			},
			// 查询左侧菜单
			async getMenu(context) {
				const data = await getMenu();
				if (data.code === "00000") {
					this.menuList = data.data.splice(1, data.data.length);
					uni.stopPullDownRefresh();
				} else {
					uni.$u.toast(data.message)
					uni.stopPullDownRefresh();
				}
			},
			// 点击轮播图切换
			clickSwiper(index) {
				let item = this.carsouelList[0];
				if (!item.carsouel_path) {
					return
				} else {
					let path = item.carsouel_path;
					if (item.carsouel_params) {
						let params = JSON.parse(item.carsouel_params);
						let paramsArr = []
						Object.keys(params).forEach(key => {
							paramsArr.push(key + "=" + params[key]);
						})
						let paramsStr = paramsArr.join('&');
						uni.navigateTo({
							url: `${path}?${paramsStr}`
						})
					} else {
						uni.navigateTo({
							url: `${path}`
						})
					}
				}
			},
		}
	}
</script>
<style lang="scss">
	page {
		background: linear-gradient(to right, rgba(170, 170, 127, 0.1), rgba(213, 51, 186, 0.1));
	}

	.content {
		.website-list-wraper {
			width: 100%;
			padding: 50rpx 0 0 0;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: center;

			.list-item-box {
				margin-bottom: 40rpx;
			}
		}

		.website-card-box {
			.u-loading-icon {
				height: 400rpx;
			}

			/deep/ .u-empty {
				margin-top: 50rpx;
			}
		}

		.u-tabs {
			background-color: $uni-text-color-inverse;
			margin-top: 20rpx;
			border-radius: $uni-border-radius-lg;
			overflow: hidden;
			padding: 0 10rpx;
		}
	}
</style>
