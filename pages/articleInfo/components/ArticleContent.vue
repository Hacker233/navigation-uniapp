<template>
	<view class="article-content-box">
		<!-- 文章内容盒子 -->
		<view class="content-wraper">
			<!-- 头部区域 -->
			<view class="auther-title">
				<view class="letf-title">
					<u-avatar :src="autherInfo.auther_avatar"></u-avatar>
					<view class="userInfo">
						<view class="userInfo-title">
							<text class="username">{{ articleInfo.article_auther }}
							</text>
							<u-tag size="mini" :hit="false" type="success" :text="articleInfo.article_category">
							</u-tag>
						</view>
						<view class="create-date">
							{{ articleInfo.article_date }}
							<text>阅读&nbsp;{{ articleInfo.article_views }}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 内容区域 -->
			<view class="wang-editor-content">
				<!-- 封面图 -->
				<view class="cover">
					<img :src="articleInfo.article_cover" />
				</view>
				<!-- 标题 -->
				<view class="title">
					<h1>{{ articleInfo.article_title }}</h1>
				</view>
				<view class="wang-content">
					<u-parse :content="articleInfo.article_html_content"></u-parse>
				</view>
			</view>
			<!-- 文章标签 -->
			<view class="article-tags-box">
				<text class="tag-group__title">文章标签:</text>
				<u-tag v-for="(item, index) in articleInfo.article_tags" :key="index" type="success" :text="item"
					size="mini">
				</u-tag>
			</view>
			<!-- 点赞区域 -->
			<view class="likes-box">
				<view class="likes">
					<i class="iconfont pig-changyong_dianzan" :class="[{ isLike: isLike }]" @click="likeArticle"></i>
					<text>{{ articleLikes }}</text>
				</view>
			</view>
		</view>
		<!-- 评论组件 -->
		<view class="comment-box-wrapper">
			<hb-comment ref="hbComment" @add="add" @del="del" @like="like" @focusOn="focusOn" :deleteTip="'确认删除？'"
				:cmData="commentData" v-if="commentData"></hb-comment>
		</view>
	</view>
</template>
<script>
	import {
		getArticle,
		likeArticle,
		cancelLikeArticle
	} from "@/http/api/article";
	import {
		getCommentList,
		addComment,
		likeComment,
		deleteComment
	} from "@/http/api/comment.js";
	import Prism from "prismjs";
	import "prismjs/themes/prism-coy.css";
	export default {
		// 样式穿透
		options: {
			styleIsolation: 'shared'
		},
		// 样式穿透
		options: {
			styleIsolation: 'shared'
		},
		props: {
			articleId: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				articleInfo: "", // 文章信息
				autherInfo: "", // 作者信息
				isLike: false, // 是否点赞
				articleLikes: 0, // 点赞数
				commentData: null, // 评论列表
				commentList: []
			};
		},

		mounted() {
			this.init(); // 获取文章基本信息
			this.$nextTick(() => {
				Prism.highlightAll();
			});
		},
		methods: {
			// 初始化
			async init() {
				let params = {
					articleId: this.articleId,
				};
				const data = await getArticle(params);
				if (data.code === "00000") {
					this.articleInfo = data.data; // 文章信息
					this.autherInfo = data.data.auther; // 文章作者
					this.articleLikes = data.data.article_likes; // 点赞量
					this.isLike = data.data.isLike; // 是否点赞了该文章
					this.getCommentListAsync(); // 获取文章评论列表
				} else {
					uni.showToast({
						icon: "error",
						title: data.message
					})
				}
			},
			// 获取所有评论列表
			async getCommentListAsync() {
				let params = {
					article_id: this.articleId,
				};
				const data = await getCommentList(params);
				if (data.code === "00000") {
					this.commentList = data.data.commentList;
					this.commentData = {
						"readNumer": this.articleInfo.article_views,
						"commentSize": data.data.commentList.length,
						"comment": this.getTree(data.data.commentList)
					}
				} else {
					uni.showToast({
						icon: "error",
						title: data.message
					})
				}
			},
			// 格式化评论列表
			getTree(data) {
				let result = [];
				let map = {};
				data.forEach(item => {
					map[item.id] = item;
				});
				data.forEach(item => {
					let parent = map[item.parentId];
					if (parent) {
						(parent.children || (parent.children = [])).push(item);
					} else {
						result.push(item);
					}
				});
				console.log("格式化之后", result)
				return result;
			},
			// 添加评论
			async add(item) {
				let params = {
					articleId: this.articleId,
					pId: item.pId,
					content: item.content
				}
				const data = await addComment(params);
				if (data.code === "00000") {
					console.log("评论成功", data.data);
					this.getCommentListAsync();
					this.$refs.hbComment.closeInput();
				} else {
					uni.showToast({
						icon: "error",
						title: data.message
					})
				}
			},
			// 删除评论
			async del(item) {
				console.log("删除评论", item);
				let params = {
					id: item
				}
				const data = await deleteComment(params);
				if (data.code === "00000") {
					uni.showToast({
						icon: "success",
						title: "删除成功"
					})
					this.getCommentListAsync(); // 点赞成功刷新评论
				} else {
					uni.showToast({
						icon: "error",
						title: data.message
					})
				}
			},
			// 点赞评论
			async like(item) {
				let params = {
					id: item
				}
				const data = await likeComment(params);
				if (data.code === "00000") {
					this.getCommentListAsync(); // 点赞成功刷新评论
				} else {
					uni.showToast({
						icon: "error",
						title: data.message
					})
				}
			},
			// 聚焦回复
			focusOn() {
				// 未登录
				if(!this.$store.state.token) {
					uni.navigateTo({
						url: "/pages/login/login"
					})
				}
			},
			// 点赞或者取消文章
			likeArticle() {
				// 未登录
				if(!this.$store.state.token) {
					uni.navigateTo({
						url: "/pages/login/login"
					})
				}
				if (this.isLike) {
					this.cancelLikeArticleAsync();
				} else {
					this.likeArticleAsync();
				}
			},
			// 点赞请求
			async likeArticleAsync() {
				let params = {
					articleId: this.articleId,
				};
				const data = await likeArticle(params);
				if (data.code === "00000") {
					this.isLike = true;
					this.articleLikes += 1;
					this.init();
				} else {
					uni.$u.toast(data.message);
				}
			},
			// 取消点赞 
			async cancelLikeArticleAsync() {
				let params = {
					articleId: this.$route.query.articleId,
				};
				const data = await cancelLikeArticle(params);
				if (data.code === "00000") {
					this.isLike = false;
					this.articleLikes -= 1;
					this.init();
				} else {
					uni.$u.toast(data.message);
				}
			},
		},
	};
</script>
<style lang="scss">
	.article-content-box {

		// 文章内容区域
		.content-wraper {
			background-color: $uni-bg-color;
			padding: 0 20rpx;

			.auther-title {
				height: 120rpx;
				width: 100%;
				border-bottom: 1px solid #ccc;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 20rpx;

				.letf-title {
					height: 100%;
					display: flex;
					align-items: center;
					width: 100%;

					.userInfo {
						height: 100%;
						margin-left: 10px;
						display: flex;
						flex-direction: column;
						justify-content: center;
						flex: 1;

						.userInfo-title {
							display: flex;
							align-items: center;
							justify-content: space-between;

							.username {
								font-size: $uni-font-size-base;
								font-weight: 700;
								color: $uni-text-color;
								margin-right: 10rpx;
							}
						}

						.create-date {
							font-size: 13px;
							color: #909090;
							display: flex;
							align-items: center;

							text {
								display: flex;
								align-items: center;
								margin-left: 20px;
							}
						}
					}
				}
			}

			.wang-editor-content {
				.title {
					min-height: 100rpx;
					display: flex;
					align-items: center;
					border-bottom: 1px solid #ccc;
					margin-bottom: 30rpx;

					h1 {
						font-size: $uni-font-size-title;
						color: $uni-color-title;
						margin: 10rpx 0;
					}
				}

				.cover {
					display: flex;
					justify-content: center;

					img {
						max-width: 100%;
						min-width: 100%;
						cursor: pointer;
					}
				}


			}

			// 标签
			.article-tags-box {
				width: 100%;
				height: 70px;
				border-top: 1px solid #ccc;
				display: flex;
				align-items: center;

				.tag-group__title {
					margin-right: 20rpx;
				}

				/deep/ .u-tag-wrapper {
					margin-right: 20rpx;
				}
			}

			.likes-box {
				height: 100px;
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;

				.likes {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					.iconfont {
						font-size: 30px;
						color: #a5a5a5;
						cursor: pointer;
						padding: 12px;
						border: 1px solid #eee;
						border-radius: 50%;
						transition: all 0.3s;
					}

					.isLike {
						background-color: #67696b;
						color: #fff;
					}

					text {
						color: #a5a5a5;
						font-size: 16px;
						margin-top: 10px;
					}
				}
			}
		}

		// 评论区域
		.comment-box-wrapper {
			width: 100%;
			background-color: $uni-bg-color;
			margin: 20rpx 0;
			box-sizing: border-box;
			overflow: hidden;
			border-radius: $uni-border-radius-base;

			/deep/ .hb-comment {
				padding: 20rpx;
			}

			/deep/ .comment-main {
				flex: 1;

				.sub-comment-main-top {
					width: 100%;
				}

				.comment-main-top {
					width: 100%;
				}
			}

			/deep/ .comment-add {
				border: none;

				.comment-submit {
					padding: 0;
				}
			}
		}
	}
</style>
