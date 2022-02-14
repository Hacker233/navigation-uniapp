<template>
	<view class="my-like-box">
		<!-- tab切换栏 -->
		<u-sticky>
			<view class="tab-box">
				<like-tab :list="list1" :current="current" @chooseTab="clickTab"></like-tab>
			</view>
		</u-sticky>

		<!-- 我点赞的网站列表 -->
		<view class="like-card" v-show="tabValue === '网站'">
			<like-card v-for="(item, index) in likeWebsiteList" :key="index" :likeInfo="item" :tabValue="tabValue"
				:index="index">
			</like-card>
			<!-- 我点赞的网站无数据时 -->
			<no-data v-if="!likeWebsiteList.length && (tabValue === '网站')"></no-data>
			<!-- 我点赞的网站到底了 -->
			<u-divider v-if="websiteIsEnd && likeWebsiteList.length" text="到底啦~~~"></u-divider>
		</view>

		<!-- 我点赞的资源列表 -->
		<view class="like-card" v-show="tabValue === '资源'">
			<like-card v-for="(item, index) in likeSourceList" :key="index" :likeInfo="item" :tabValue="tabValue"
				:index="index">
			</like-card>
			<!-- 我点赞的资源无数据时 -->
			<no-data v-if="!likeSourceList.length && (tabValue === '资源')"></no-data>
			<!-- 我点赞的资源到底了 -->
			<u-divider v-if="sourceIsEnd && likeSourceList.length" text="到底啦~~~"></u-divider>
		</view>

	</view>
</template>

<script>
	import {
		getLikeWebsiteAsync,
		getLikeSourceAsync
	} from "@/http/api/person.js"
	import LikeCard from "./components/LikeCard.vue";
	import LikeTab from "./components/LikeTab.vue"
	export default {
		// 样式穿透
		options: {
			styleIsolation: 'shared'
		},
		components: {
			LikeCard,
			LikeTab
		},
		data() {
			return {
				list1: [{
					name: '网站',
					iconfont: 'pig-ico_zonghexinxi_xuanzhong',
				}, {
					name: '资源',
					iconfont: 'pig-ruanjianxiazai2',
				}],
				tabValue: '网站',
				current: 0,

				likeWebsiteList: [], // 我点赞的网站
				// 我点赞的网站分页
				websitePageparams: {
					page: 1,
					pageSize: 10,
				},
				websiteIsEnd: false,

				likeSourceList: [], // 我点赞的资源
				// 我点赞的资源分页
				sourcePageparams: {
					page: 1,
					pageSize: 10,
				},
				sourceIsEnd: false
			}
		},
		//监听下拉刷新
		onPullDownRefresh() {
			this.likeWebsiteList = [];
			this.likeSourceList = [];
			this.sourcePageparams = {
				page: 1,
				pageSize: 10,
			};
			this.websitePageparams = {
				page: 1,
				pageSize: 10,
			};
			this.init();
		},
		// 监听上拉加载更多
		onReachBottom() {
			// 网站tab上拉加载
			if (this.tabValue === '网站') {
				if (this.websiteIsEnd) {
					return;
				}
				this.websitePageparams.page += 1;
				this.getLikeWebsite();
			} else {
				if (this.sourceIsEnd) {
					return;
				}
				this.sourcePageparams.page += 1;
				this.getLikeSource();
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				this.getLikeWebsite(); // 获取用户点赞的网站
				this.getLikeSource(); // 获取用户点赞的资源
			},
			// 获取用户点赞的网站
			async getLikeWebsite() {
				uni.showLoading({
					title: '加载中'
				});
				let params = {
					page: this.websitePageparams.page,
					pageSize: this.websitePageparams.pageSize
				}
				const data = await getLikeWebsiteAsync(params);
				if (data.code === "00000") {
					this.likeWebsiteList = [...this.likeWebsiteList, ...data.data.data];
					this.websiteIsEnd = data.data.page.isEnd;
					uni.stopPullDownRefresh();
					uni.hideLoading();
				} else {
					uni.showToast({
						icon: "error",
						title: data.message
					})
					uni.stopPullDownRefresh();
					uni.hideLoading();
				}
			},
			// 获取用户点赞的资源
			async getLikeSource() {
				let params = {
					page: this.sourcePageparams.page,
					pageSize: this.sourcePageparams.pageSize
				}
				const data = await getLikeSourceAsync(params);
				if (data.code === "00000") {
					this.likeSourceList = [...this.likeSourceList, ...data.data.data];
					this.sourceIsEnd = data.data.page.isEnd;
					uni.stopPullDownRefresh();
				} else {
					uni.showToast({
						icon: "error",
						title: data.message
					})
					uni.stopPullDownRefresh();
				}
			},
			// 点击tab
			clickTab(item) {
				this.current = item.index;
				this.tabValue = item.name;
			},
		}
	}
</script>

<style lang="scss">
	.my-like-box {
		/deep/ .u-sticky__content {
			// background-color: #FFFFFF;
		}

		.tab-box {
			display: flex;
			justify-content: center;

			/deep/ .u-tabs__wrapper__nav__line {
				display: none;
			}

			/deep/ .u-tabs {
				width: 80%;

				.u-tabs__wrapper__nav__item {
					height: 70rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					border: 1px solid #ccc;
					flex-shrink: 0;
					margin-right: 16rpx;
					padding: 0 16rpx;
					border-radius: 20px;
					font-size: $uni-font-size-base;
					letter-spacing: 3rpx;
					transition: all 0.3s;
					margin: 20rpx 18rpx 20rpx 0;
				}
			}
		}

		.like-card {
			margin-top: 30rpx;
		}
	}
</style>
