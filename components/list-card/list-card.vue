<template>
	<view class="article-list-card">
		<!-- 用户区域 -->
		<view class="top-auther">
			<view class="left">
				<u-avatar :src="articleInfo.article_auther_avatar"></u-avatar>
				<view class="userInfo">
					<span class="username">{{ articleInfo.article_auther }}</span>
					<span class="create-date">{{ articleInfo.article_date }}</span>
				</view>
			</view>
			<!-- 文章标签 -->
			<view class="article-tags">
				<u-tag type="success" v-for="(item, index) in articleInfo.article_tags" :key="index" size="mini"
					:text="item">
				</u-tag>
			</view>
		</view>
		<!-- 内容区域 -->
		<view class="bottom-content" @click="toArticleDetail">
			<!-- 摘要区域 -->
			<view class="left">
				<h1>{{ articleInfo.article_title }}</h1>
				<view class="abstract">
					<p>{{ articleInfo.article_abstract }}</p>
				</view>
				<view class="like-views-collection">
					<!-- 浏览量 -->
					<view class="views">
						<i class="iconfont pig-liulan"></i>
						<span>{{ articleInfo.article_views }}</span>
					</view>
					<!-- 点赞量 -->
					<view class="likes">
						<i class="iconfont pig-changyong_dianzan"></i>
						<span>{{ articleInfo.article_likes }}</span>
					</view>
					<!-- 评论量 -->
					<view class="comments">
						<i class="iconfont pig-changyong_xiaoxi"></i>
						<span>{{ articleInfo.article_comment_num }}</span>
					</view>
				</view>
			</view>
			<!-- 文章封面 -->
			<view class="right">
				<u--image :src="articleInfo.article_cover" width="260rpx" height="140rpx" :radius="6"></u--image>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		// 样式穿透
		options: {
			styleIsolation: 'shared'
		},
		props: {
			articleInfo: {
				type: Object,
				default: () => {
					return {};
				},
			},
		},
		methods: {
			// 跳转至文章详情
			toArticleDetail() {
				uni.navigateTo({
					url: `/pages/articleInfo/index?articleId=${this.articleInfo.article_id}`
				})
			},
		},
	};
</script>
<style lang="scss">
	.article-list-card {
		width: 100%;
		height: 280rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
		background-color: $uni-bg-color;
		margin-bottom: 20rpx;
		display: flex;
		flex-direction: column;
		border-radius: $uni-border-radius-base;
		box-shadow: 0 13px 15px rgba(31, 45, 61, 0.15);

		.top-auther {
			height: 45px;
			display: flex;
			align-items: center;
			margin-right: 10px;

			.left {
				height: 100%;
				display: flex;
				align-items: center;

				.userInfo {
					height: 100%;
					margin-left: 10rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;

					.username {
						font-size: $uni-font-size-sm;
						font-weight: 700;
						color: $uni-text-color;
						margin-bottom: 2px;
					}

					.create-date {
						font-size: 12px;
						color: #909090;
					}
				}
			}

			.article-tags {
				margin-left: 20px;
				display: flex;
				align-items: flex-start;
				height: 100%;
				padding-top: 10px;

				/deep/ .u-tag-wrapper {
					margin-right: 10rpx;
				}
			}
		}

		.bottom-content {
			display: flex;
			width: 100%;
			justify-content: space-between;
			overflow: hidden;
			box-sizing: border-box;
			cursor: pointer;
			flex: 1;

			.left {
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 15rpx 0 0;

				h1 {
					font-weight: 700;
					font-size: $uni-font-size-base;
					line-height: 24px;
					color: $uni-color-title;
					margin-bottom: 8px;
					width: 100%;
					display: -webkit-box;
					overflow: hidden;
					text-overflow: ellipsis;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
				}

				.abstract {
					flex: 1;

					p {
						font-weight: 400;
						font-size: 13px;
						line-height: 22px;
						color: #86909c;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}
				}

				// 文章点赞量区域
				.like-views-collection {
					height: 30px;
					width: 100%;
					display: flex;
					align-items: center;

					.views {
						margin-right: 20px;
						display: flex;
						align-items: center;
					}

					.likes {
						margin-right: 20px;
						display: flex;
						align-items: center;
					}

					.comments {
						display: flex;
						align-items: center;
					}

					.iconfont {
						color: #4e5969;
						margin-right: 3px;
					}

					span {
						font-size: 12px;
						color: #4e5969;
					}
				}
			}

			.right {
				height: 100%;
				overflow: hidden;

				.uni-image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
