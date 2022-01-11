<template>
	<view class="create-box">
		<!-- 轮播图 -->
		<view class="u-demo-block">
			<u-swiper :list="list3" previousMargin="30" nextMargin="30" circular :autoplay="false" radius="5"
				bgColor="#ffffff"></u-swiper>
		</view>
		<!-- 分类筛选栏 -->
		<u-sticky>
			<view class="category">
				<category-list :categoryList="categoryList" @chooseCategory="chooseCategory"></category-list>
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
				list3: [
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
				],
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
			}
		},
		//监听下拉刷新
		onPullDownRefresh() {
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
			this.getSocategoryAll()
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
			background-color: #eee;
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
