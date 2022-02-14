<template>
	<view class="my-comment-box">
		<view class="comment-list">
			<comment-card v-for="(item, index) in commentList" :key="index" :commentInfo="item" :index="index"
				@deleteCommentAsync="deleteCommentAsync">
			</comment-card>
		</view>
		<!-- 没有数据 -->
		<no-data v-if="!commentList.length"></no-data>
		<!-- 到底了 -->
		<u-divider v-if="commentIsEnd && commentList.length" text="到底啦~~~"></u-divider>
	</view>
</template>

<script>
	import {
		getUserCommentAsync
	} from "@/http/api/person.js";
	import {
		deleteComment
	} from "@/http/api/comment.js";
	import CommentCard from "./components/CommentCard.vue";
	export default {
		data() {
			return {
				commentList: [],
				pageParams: {
					page: 1,
					pageSize: 10,
				},
				commentIsEnd: false,
			}
		},
		components: {
			CommentCard
		},
		//监听下拉刷新
		onPullDownRefresh() {
			this.commentList = [];
			this.pageParams = {
				page: 1,
				pageSize: 10,
			};
			this.init();
		},
		// 监听上拉加载更多
		onReachBottom() {
			if (this.commentIsEnd) {
				return;
			}
			this.pageParams.page += 1;
			this.init();
		},
		mounted() {
			this.init();
		},
		methods: {
			async init() {
				uni.showLoading({
					title: '加载中'
				});
				let params = {
					page: this.pageParams.page,
					pageSize: this.pageParams.pageSize
				}
				const data = await getUserCommentAsync(params);
				if (data.code === "00000") {
					this.commentList = [...this.commentList, ...data.data.data];
					this.commentIsEnd = data.data.page.isEnd;
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
			// 删除评论
			async deleteCommentAsync(params) {
				const data = await deleteComment(params);
				if (data.code === "00000") {
					uni.showToast({
						icon: "success",
						title: "删除成功"
					})
					this.commentList = [];
					this.pageParams = {
						page: 1,
						pageSize: 10,
					};
					this.init();
				} else {
					uni.showToast({
						icon: "error",
						title: data.message
					})
				}
			},
		},
	}
</script>

<style>
</style>
