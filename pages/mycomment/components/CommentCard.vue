<template>
	<u-transition :show="true" mode="fade-up" :duration="duration">
		<view class="like-card-box" @click="toDetail">
			<view class="left">
				<!-- 评论内容 -->
				<view class="title">
					<text class="title-label">评论：</text>{{commentInfo.content}}
				</view>
				<!-- 原文 -->
				<view class="origin-title" v-if="commentInfo.comment_type === 'source'">
					<text class="origin-label">原文：</text>{{originInfo.source_title}}
				</view>

				<!-- 资源的浏览量等信息 -->
				<template v-if="commentInfo.comment_type === 'source'">
					<view class="bottom">
						<!-- 浏览量 -->
						<view class="view-num">
							<i class="iconfont pig-liulan"></i>
							<text class="text">{{originInfo.source_views || 0}}</text>
						</view>
						<!-- 点赞量 -->
						<view class="view-num">
							<i class="iconfont pig-changyong_dianzan"></i>
							<text class="text"
								v-if="originInfo.source_likes_users">{{originInfo.source_likes_users.length || 0}}</text>
						</view>
						<!-- 评论量 -->
						<view class="view-num">
							<i class="iconfont pig-changyong_xiaoxi"></i>
							<text class="text">{{originInfo.source_comment_num || 0}}</text>
						</view>
					</view>
				</template>
			</view>
			<view class="right">
				<!-- 删除评论 -->
				<i class="iconfont pig-changyong_lajitong" @click.stop="deleteComment"></i>
			</view>
		</view>
		<!-- 删除弹窗 -->
		<u-modal content="确认删除该条评论？" showCancelButton :show="show" @confirm="confirm" @cancel="cancel" ref="uModal"></u-modal>
	</u-transition>
</template>

<script>
	import {
		querySourceById
	} from "@/http/api/source.js";
	export default {
		props: {
			// 评论信息
			commentInfo: {
				type: Object,
				default: () => {}
			},
			index: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				duration: 300,
				originInfo: null,
				show: false,
			}
		},
		mounted() {
			this.duration = 300 + (this.index * 100);
			this.init();
		},
		methods: {
			// 初始化评论的信息
			async init() {
				if (this.commentInfo.comment_type === 'source') {
					let params = {
						sourceId: this.commentInfo.article_id,
						isAddViews: true, // 是否需要增加浏览量
					}
					const data = await querySourceById(params);
					if (data.code === "00000") {
						this.originInfo = data.data; // 资源信息
					} else {
						uni.showToast({
							icon: "error",
							title: data.message
						})
					}
				}
			},
			// 删除评论
			deleteComment() {
				this.show = true;
			},
			cancel(){
				this.show = false;
			},
			confirm() {
				let params = {
					id: this.commentInfo.id,
					articleId: this.commentInfo.article_id,
					commentType: this.commentInfo.comment_type
				}
				this.$emit("deleteCommentAsync", params);
				this.show = false;
			},
			// 跳转至详情页
			toDetail() {
				if (this.commentInfo.comment_type === 'source') {
					uni.navigateTo({
						url: `/pages/sourceInfo/index?sourceId=${this.commentInfo.article_id}`
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.like-card-box {
		width: 90%;
		height: 200rpx;
		background-color: $uni-bg-color;
		margin: 0 auto;
		border-radius: $uni-border-radius-base;
		box-shadow: 0 13px 15px rgba(31, 45, 61, 0.15);
		box-sizing: border-box;
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
		margin-bottom: 40rpx;

		.left {
			flex: 1;
			display: flex;
			flex-direction: column;
			overflow: hidden;

			.title {
				box-sizing: border-box;
				font-size: $uni-font-size-lg;
				height: 50rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.origin-title {
				flex: 1;
				border: 1rpx solid #E1E1E1;
				border-radius: $uni-border-radius-lg;
				padding-left: 10rpx;
				box-shadow: 0 6px 6px rgba(31, 45, 61, 0.15);
				line-height: 2.5;
				font-size: $uni-font-size-sm;
				color: $uni-text-color-grey;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.bottom {
				display: flex;
				height: 50rpx;
				align-items: flex-end;

				.view-num {
					display: flex;
					align-items: center;
					font-size: $uni-font-size-sm;
					color: $uni-text-color-grey;

					.iconfont {
						color: #4e5969;
						margin-right: 4rpx;
						font-size: 24rpx;
					}

					.text {
						margin-right: 10rpx;
					}
				}
			}
		}

		.right {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			width: 100rpx;
			border-radius: 50%;

			.iconfont {
				font-size: 40rpx;
				color: #333333;
				width: 70rpx;
				height: 70rpx;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #fff;
				background: linear-gradient(to right, rgb(170, 170, 127), rgb(213, 51, 186));
			}
		}
	}
</style>
