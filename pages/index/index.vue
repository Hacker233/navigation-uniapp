<template>
	<view class="content">
		<u-toast ref="uToast"></u-toast>
		<!-- 轮播图 -->
		<u-swiper :list="fileterCarouselList" indicator indicatorMode="line" circular imgMode="scaleToFill"
			:height="150" @click="clickSwiper"></u-swiper>
		<!-- 菜单tab -->
		<u-sticky>
			<u-tabs :list="menuList" keyName="menu_name" sticky :current="currentMenu" @click="clickTab"
				@change="changeTab"></u-tabs>
		</u-sticky>
		<!-- 内容区域 -->
		<view class="website-card-box" @touchstart="start" @touchend="end">
			<template v-if="!isShowNoData">
				<website-card :websiteList="websiteList" :menuIcon="menuIcon" v-if="!showLoading"></website-card>
				<u-loading-icon color="red" :show="showLoading"></u-loading-icon>
			</template>
			<template v-else>
				<no-data></no-data>
			</template>
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
				fileterCarouselList: [],
				isShowNoData: false, // 是否展示无数据页面
				startData: {
					clientX: '',
					clientY: ''
				}
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
				this.isShowNoData = false;
				let params = {
					menuId: this.menuId,
				};
				const data = await queryMenuWebsite(params);
				if (data.code === "00000") {
					this.websiteList = data.data;
					this.showLoading = false;
					// 没有数据
					if (!this.websiteList.length) {
						this.isShowNoData = true;
					}
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
			},
			start(e) {
				this.startData.clientX = e.changedTouches[0].clientX;
				this.startData.clientY = e.changedTouches[0].clientY;
			},
			end(e) {
				// console.log(e)
				const subX = e.changedTouches[0].clientX - this.startData.clientX;
				const subY = e.changedTouches[0].clientY - this.startData.clientY;
				if (subY > 50 || subY < -50) {
					return;
				} else {
					if (subX > 100) {
						if (this.currentMenu === 0) {
							return;
						}
						this.currentMenu -= 1; // 选中的tab+1
						this.clickTab(this.menuList[this.currentMenu])
					} else if (subX < -100) {
						if (this.currentMenu === (this.menuList.length - 1)) {
							this.currentMenu = 0
						} else {
							this.currentMenu += 1; // 选中的tab+1
						}
						this.clickTab(this.menuList[this.currentMenu])
					} else {
						return
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
