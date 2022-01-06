<template>
	<view class="article-list">
		<!-- 文章分类栏 -->
		<u-sticky>
			<view class="article-category">
				<u-tabs :list="categoryList" keyName="category_name" @click="clickTab">
				</u-tabs>
			</view>
		</u-sticky>
		<!-- 文章列表 -->
		<view class="article-list">
			<!-- 文章筛选栏 -->
			<view class="screen-box">
				<ul>
					<li v-for="(item, index) in sortList" :key="index" @click="selectSort(item.sort)"
						:class="[{ active: sort === item.sort }]">
						<i :class="['iconfont', item.iconfontClass]"></i>
						<span>{{ item.label }}</span>
					</li>
				</ul>
			</view>
			<!-- 文章列表 -->
			<view class="list">
				<u-transition :show="true" mode="slide-up">
					<list-card v-for="(item, index) in articleList" :key="index" :articleInfo="item"></list-card>
				</u-transition>
			</view>
		</view>
		<!-- 是否已经到底部了 -->
		<u-divider v-if="isEnd" text="到底啦~~~"></u-divider>

		<!-- 滚动到顶部 -->
		<u-back-top :scroll-top="scrollTop"></u-back-top>
	</view>
</template>

<script>
	import {
		getCategory,
		getArticleList
	} from "../../http/api/article.js"
	export default {
		data() {
			return {
				categoryList: [], // 文章分类
				articleList: [], // 文章列表
				sort: "new", // 排序规则：最新-hot、热门-hot、点赞最多-like
				scrollTop: 0,
				category: "", // 选择的分类
				total: 0, // 总条数
				pageCount: 0, // 总页数
				currentPage: 1, // 当前页
				isEnd: false, // 是否到底部了
				pageParams: {
					page: 1,
					pageSize: 10,
				},
				// 文章筛选
				sortList: [{
						sort: "new",
						label: "最新",
						iconfontClass: "pig-zuixingengxin",
					},
					{
						sort: "hot",
						label: "热门",
						iconfontClass: "pig-ico_zonghexinxi_xuanzhong",
					},
					{
						sort: "like",
						label: "最多点赞",
						iconfontClass: "pig-changyong_dianzan",
					},
				],
			}
		},
		//监听下拉刷新
		onPullDownRefresh() {
			this.init();
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
			this.getArticleListAsync();
		},
		mounted() {
			this.init();
		},
		methods: {
			async init() {
				const data = await getCategory();
				if (data.code === "00000") {
					this.categoryList = data.data.data;
					this.categoryMenuId = 1;
					this.categoryList.unshift({
						category_id: 1,
						category_menu_id: 1,
						category_menu_name: "",
						category_menu_parent_id: 0,
						category_name: "全部"
					})
					this.getArticleListAsync() // 查询文章列表
				} else {
					uni.$u.toast(data.message)
				}
			},
			// 点击分类tab
			clickTab(item) {
				console.log("点击文章分类", item)
				this.isEnd = false;
				this.articleList = [];
				this.pageParams = {
					page: 1,
					pageSize: 10,
				};
				if (item.category_name === '全部') {
					this.category = "";
					this.sort = "new";
					this.getArticleListAsync(); // 更新文章列表
				} else {
					this.category = item.category_name;
					this.categoryMenuId = item.category_menu_id;
					this.getArticleListAsync(); // 更新文章列表
				}

			},
			// 获取文章列表
			async getArticleListAsync() {
				let params = {
					menuId: this.categoryMenuId,
					sort: this.sort,
					category: this.category,
					page: this.pageParams.page,
					pageSize: this.pageParams.pageSize,
				};
				const data = await getArticleList(params);
				if (data.code === "00000") {
					this.articleList = [...this.articleList, ...data.data.data];
					this.total = data.data.page.count; // 总条数
					this.pageCount = data.data.page.pageCount; // 总页数
					this.currentPage = data.data.page.currentPage; // 当前页
					this.isEnd = data.data.page.isEnd;
					uni.stopPullDownRefresh();
				} else {
					uni.$u.toast(data.message)
					uni.stopPullDownRefresh();
				}
			},
			// 筛选
			selectSort(value) {
				this.sort = value;
				this.articleList = [];
				this.pageParams = {
					page: 1,
					pageSize: 10,
				};
				this.getArticleListAsync();
			},
		}
	}
</script>

<style lang="scss">
	.article-list {
		.article-category {
			background-color: $uni-bg-color;
			border-radius: $uni-border-radius-base;
			padding: 10rpx;
			box-sizing: border-box;
		}

		.article-list {
			width: 100%;
			background-color: $uni-bg-color;
			margin-top: 20rpx;
			border-radius: $uni-border-radius-base;
			padding: 0 20rpx;
			box-sizing: border-box;

			.screen-box {
				width: 100%;
				height: 40px;
				margin-bottom: 10px;
				background: $uni-bg-color;

				ul {
					display: flex;
					align-items: center;
					list-style: none;
					padding: 0;
					margin: 0;
					height: 100%;

					.active {
						color: $uni-color-primary;
					}

					li {
						cursor: pointer;
						font-size: 14px;
						display: flex;
						align-items: center;

						&:nth-child(2) {
							margin: 0 20px;
						}

						.iconfont {
							font-size: 12px;
							margin-right: 5px;
						}
					}
				}
			}
		}
	}
</style>
