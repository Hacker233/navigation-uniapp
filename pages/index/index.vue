<template>
	<view class="content">
		<u-toast ref="uToast"></u-toast>
		<!-- 轮播图 -->
		<u-swiper :list="fileterCarouselList" indicator indicatorMode="line" circular imgMode="scaleToFill"
			:height="150" @click="clickSwiper"></u-swiper>
		<!-- 菜单tab -->
		<u-sticky>
			<u-tabs :list="menuList" keyName="menu_name" sticky :currentMenu="currentMenu" @click="clickTab"
				@change="changeTab"></u-tabs>
		</u-sticky>
		<!-- 内容区域 -->
		<view class="website-card-box">
			<website-card :websiteList="websiteList" :menuIcon="menuIcon" v-if="!showLoading"></website-card>
			<u-loading-icon color="red" :show="showLoading"></u-loading-icon>
		</view>
		<!-- 滚动到顶部 -->
		<u-back-top :scroll-top="scrollTop"></u-back-top>
	</view>
</template>

<script>
	import {
		getMenu
	} from "@/http/api/menu"; // 请求菜单接口
	import {
		queryMenuWebsite
	} from "@/http/api/website";
	import {
		getCarsouelByPage
	} from "@/http/api/carsouel.js";
	export default {
		data() {
			return {
				menuList: [], // tab菜单
				websiteList: [],
				currentMenu: 0,
				menuIcon: '',
				menuId: '', // tab菜单ID
				showLoading: true, // 加载动画
				scrollTop: 0,
				carsouelList: [],
				fileterCarouselList: []
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onLoad() {
			this.init();
		},
		//监听下拉刷新
		onPullDownRefresh() {
			this.init();
			this.queryMenuWebsiteAsync();
		},
		mounted() {
			this.getCarsouelByPageAsync();
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
					this.fileterCarouselList = data.data.map(item => item.carsouel_url)
				} else {
					uni.$u.toast(data.message)
				}
			},
			// 查询左侧菜单
			async getMenu(context) {
				this.showLoading = true;
				const data = await getMenu();
				if (data.code === "00000") {
					this.menuList = data.data.splice(1, data.data.length);
					// 默认选中第一个
					this.menuId = this.menuList[this.currentMenu].menu_id;
					this.queryMenuWebsiteAsync();
				} else {
					uni.$u.toast(data.message)
					this.showLoading = false;
				}
			},
			// 点击tab
			clickTab(item) {
				this.websiteList = [];
				this.menuId = item.menu_id;
				this.menuIcon = item.menu_icon;
				this.queryMenuWebsiteAsync();
				console.log("this.currentMenu", this.currentMenu);
			},
			// tab变化
			changeTab(item) {
				this.currentMenu = item.index;
			},
			// 获取所有站点
			async queryMenuWebsiteAsync() {
				this.showLoading = true;
				let params = {
					menuId: this.menuId,
				};
				const data = await queryMenuWebsite(params);
				if (data.code === "00000") {
					this.websiteList = data.data;
					this.showLoading = false;
					uni.stopPullDownRefresh();
				} else {
					uni.$u.toast(data.message);
					this.showLoading = false;
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
			}
		}
	}
</script>
<style lang="scss">
	.content {
		.website-card-box {
			.u-loading-icon {
				height: 400rpx;
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
