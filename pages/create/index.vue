<template>
	<view class="create-box">
		<!-- 轮播图 -->
		<view class="u-demo-block">
			<u-swiper :list="fileterCarouselList" previousMargin="30" nextMargin="30" circular radius="5"
				imgMode="scaleToFill" :height="150" bgColor="#ffffff" @click="clickSwiper"></u-swiper>
		</view>
		<!-- 分类筛选栏 -->
		<u-sticky>
			<view class="category">
				<category-list ref="category" :categoryList="categoryList" @chooseCategory="chooseCategory">
				</category-list>
			</view>
		</u-sticky>

		<!-- 资源列表栏 -->
		<u-transition :show="true" mode="slide-up">
			<view class="source-card-box" v-if="sourceList.length">
				<source-card v-for="(item,index) in sourceList" :key="index" :sourceInfo="item"></source-card>
			</view>
		</u-transition>

		<!-- 上拉加載动画 -->
		<view class="loading-box" v-if="isloading">
			<u-loading-icon></u-loading-icon>
		</view>
		<!-- 是否已经到底部了 -->
		<u-divider v-if="isEnd" text="到底啦~~~"></u-divider>

		<!-- 滚动到顶部 -->
		<u-back-top :scroll-top="scrollTop"></u-back-top>
	</view>
</template>

<script>
	import {
		querySocategoryAll,
		querySourceByCategory
	} from '@/http/api/source';
	import {
		getCarsouelByPage
	} from "@/http/api/carsouel.js";
	export default {
		// 样式穿透
		options: {
			styleIsolation: 'shared'
		},
		data() {
			return {
				categoryList: [], // 分类列表
				sourceCategory: '', // 选择的分类
				sourceList: [], // 资源列表
				scrollTop: 0,
				total: 0, // 总条数
				pageCount: 0, // 总页数
				currentPage: 1, // 当前页
				isEnd: false, // 是否到底部了
				isloading: false, // 是否在加载中
				pageParams: {
					page: 1,
					pageSize: 10,
				},
				carsouelList: [],
				fileterCarouselList: []
			}
		},
		//监听下拉刷新
		onPullDownRefresh() {
			// console.log("category",this.$refs.category.current)
			this.$refs.category.current = 0;
			this.getSocategoryAll();
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		// 监听上拉加载更多
		onReachBottom() {
			if (this.isEnd) {
				return;
			}
			this.currentPage += 1;
			this.pageParams.page = this.currentPage
			this.querySourceByCategoryAsync();
		},
		mounted() {
			this.getSocategoryAll();
			this.getCarsouelByPageAsync()
		},
		methods: {
			// 初始化分类列表
			async getSocategoryAll() {
				const data = await querySocategoryAll();
				if (data.code === "00000") {
					this.categoryList = data.data;
					this.sourceCategory = this.categoryList[0].socategory_name; // 默认查询第一项
					this.querySourceByCategoryAsync();
				} else {
					uni.$u.toast(data.message)
				}
			},
			// 初始化资源页面轮播图
			async getCarsouelByPageAsync() {
				let params = {
					carsouelPage: 'source',
				}
				const data = await getCarsouelByPage(params);
				if (data.code === "00000") {
					this.carsouelList = data.data;
					this.fileterCarouselList = data.data.map(item => item.carsouel_url)
				} else {
					uni.$u.toast(data.message)
				}
			},
			// 查询该分类下的资源
			async querySourceByCategoryAsync() {
				let params = {
					page: this.pageParams.page,
					pageSize: this.pageParams.pageSize,
					sourceCategory: this.sourceCategory
				}
				const data = await querySourceByCategory(params);
				if (data.code === "00000") {
					this.sourceList = data.data.data;
					this.total = data.data.page.count; // 总条数
					this.pageCount = data.data.page.pageCount; // 总页数
					this.currentPage = data.data.page.currentPage; // 当前页
					this.isEnd = data.data.page.isEnd;
					this.isloading = false;
					uni.stopPullDownRefresh();
				} else {
					uni.$u.toast(data.message)
				}
			},
			// 选择分类
			chooseCategory(item) {
				this.isEnd = false;
				this.sourceList = [];
				this.pageParams = {
					page: 1,
					pageSize: 10,
				};
				this.sourceCategory = item.socategory_name;
				this.querySourceByCategoryAsync();
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
	page {
		padding: 0;
	}

	.create-box {
		width: 100%;

		.category {
			background-color: #fff;
		}

		.source-card-box {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			padding: 0 32rpx;
			box-sizing: border-box;
		}

	}
</style>
