<template>
	<view class="all-rating-box">
		<!-- 筛选栏 -->
		<view class="rating-sort">
			<dropdown-screen :listArr="listArr" :itemArr="itemArr" @finish="finish"></dropdown-screen>
		</view>
		<!-- 评价卡片 -->
		<view class="rating-card">
			<template v-for="(item,index) in ratingList">
				<rating-card :ratingInfo="item" :key="index"></rating-card>
			</template>
		</view>
		
		<!-- 是否已经到底部了 -->
		<u-divider v-if="isEnd && !isShowNoData && !isloading" text="到底啦~~~"></u-divider>
		
		<!-- 没有数据 -->
		<no-data v-if="isShowNoData"></no-data>
		
		<our-loading v-if="isloading" active></our-loading>
	</view>
</template>

<script>
	import RatingCard from "./components/RatingCard.vue"
	import {
		getAllRating
	} from '@/http/api/rating'
	export default {
		data() {
			return {
				ratingList: [], // 所有评价列表
				listArr: ['时间排序', '星级排序'],
				itemArr: [
					[{
						text: '最新日期',
						value: "desc"
					}, {
						text: '日期倒序',
						value: "asc"
					}, {
						text: '默认',
						value: ''
					}],
					[{
						text: '高到低',
						value: "high"
					}, {
						text: '低到高',
						value: "low"
					}, {
						text: '默认',
						value: ''
					}],
				],
				isEnd: false, // 是否到底部了
				currentPage: 1, // 当前页
				pageParams: {
					page: 1,
					pageSize: 10,
				},
				isloading: true,
				isShowNoData: false,
				sort: '', // 星级排序
				date: '', // 时间排序
			}
		},
		components: {
			RatingCard
		},
		//监听下拉刷新
		onPullDownRefresh() {
			this.ratingList = [];
			this.pageParams = {
				page: 1,
				pageSize: 10,
			};
			this.sort = ''; // 星级排序
			this.date = ''; // 时间排序
			this.init();
		},
		// 监听上拉加载更多
		onReachBottom() {
			if (this.isEnd) {
				return;
			}
			this.currentPage += 1;
			this.pageParams.page = this.currentPage
			this.init();
		},
		mounted() {
			this.init();
		},
		methods: {
			// 初始化所有评价列表
			async init() {
				this.isShowNoData = false;
				this.isloading = true;
				let params = {
					page: this.pageParams.page,
					pageSize: this.pageParams.pageSize,
					sort: this.sort,
					date: this.date,
				}
				const data = await getAllRating(params);
				if (data.code === "00000") {
					this.ratingList = this.ratingList.concat(data.data.data);
					this.currentPage = data.data.page.currentPage; // 当前页
					this.isEnd = data.data.page.isEnd;
					// 无数据
					if (!this.ratingList.length) {
						this.isShowNoData = true;
					}
					this.isloading = false;
					uni.stopPullDownRefresh();
				} else {
					uni.$u.toast(data.message);
					this.isloading = false;
					uni.stopPullDownRefresh();
				}
			},
			// 点击筛选
			finish(item) {
				if (item.$index === 0) {
					this.date = item.value;
				} else {
					this.sort = item.value;
				}
				this.ratingList = [];
				this.pageParams = {
					page: 1,
					pageSize: 10,
				};
				this.init();
			}
		}
	}
</script>

<style lang="scss">
	.all-rating-box {
		display: flex;
		flex-direction: column;
		justify-content: center;

		.rating-sort {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.rating-card {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
	}
</style>
