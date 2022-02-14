<template>
	<u-transition :show="true" mode="fade-up" :duration="duration">
		<view class="like-card-box" @click="toDetail">
			<template v-if="tabValue === '网站'">
				<view class="like-left">
					<!-- 标题 -->
					<view class="title">
						{{likeInfo.website_title}}
					</view>
					<!-- 简介 -->
					<view class="abstaract">
						{{likeInfo.website_abstract}}
					</view>
					<!-- 浏览量等信息 -->
					<view class="bottom">
						<!-- 浏览量 -->
						<view class="view-num">
							<i class="iconfont pig-liulan"></i>
							<text class="text">{{likeInfo.website_views || 0}}</text>
						</view>
						<!-- 点赞量 -->
						<view class="view-num">
							<i class="iconfont pig-changyong_dianzan"></i>
							<text class="text"
								v-if="likeInfo.website_like_users">{{likeInfo.website_like_users.length || 0}}</text>
						</view>
					</view>
				</view>
				<view class="like-right">
					<img class="like-img" :src="likeInfo.website_favicon" />
				</view>
			</template>
			<template v-else>
				<view class="like-left">
					<!-- 标题 -->
					<view class="title">
						{{likeInfo.source_title}}
					</view>
					<!-- 简介 -->
					<view class="abstaract">
						{{likeInfo.source_abstract}}
					</view>
					<!-- 浏览量等信息 -->
					<view class="bottom">
						<!-- 浏览量 -->
						<view class="view-num">
							<i class="iconfont pig-liulan"></i>
							<text class="text">{{likeInfo.source_views || 0}}</text>
						</view>
						<!-- 点赞量 -->
						<view class="view-num">
							<i class="iconfont pig-changyong_dianzan"></i>
							<text class="text"
								v-if="likeInfo.source_likes_users">{{likeInfo.source_likes_users.length || 0}}</text>
						</view>
						<!-- 评论量 -->
						<view class="view-num">
							<i class="iconfont pig-changyong_xiaoxi"></i>
							<text class="text">{{likeInfo.source_comment_num || 0}}</text>
						</view>
					</view>
				</view>
				<view class="like-right">
					<img class="like-img" :src="likeInfo.source_cover" />
				</view>
			</template>
		</view>
	</u-transition>
</template>

<script>
	export default {
		props: {
			// 选中的tab
			tabValue: {
				type: String,
				default: ""
			},
			// 点赞信息
			likeInfo: {
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
				duration: 300
			}
		},
		mounted(){
			this.duration = 300 + (this.index * 100);
		},
		methods: {
			// 跳转至详情页
			toDetail() {
				if (this.tabValue === '网站') {
					uni.navigateTo({
						url: `../../pages/website/index?websiteId=${this.likeInfo.website_id}`
					})
				} else {
					uni.navigateTo({
						url: `/pages/sourceInfo/index?sourceId=${this.likeInfo.source_id}`
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

		.like-left {
			flex: 1;
			display: flex;
			flex-direction: column;

			.title {
				width: 100%;
				display: flex;
				align-items: flex-start;
				box-sizing: border-box;
				font-size: $uni-font-size-lg;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				line-clamp: 1;
				-webkit-box-orient: vertical;
				word-wrap: break-word;
				white-space: normal;
				word-break: break-all;
				height: 46rpx;
			}

			.abstaract {
				flex: 1;
				line-height: 1.5;
				font-size: $uni-font-size-sm;
				color: $uni-text-color-grey;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
				word-wrap: break-word;
				white-space: normal;
				word-break: break-all;
			}

			.bottom {
				display: flex;
				height: 40rpx;
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

		.like-right {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			width: 140rpx;
			border-radius: 50%;

			.like-img {
				width: 128rpx;
				height: 128rpx;
				border-radius: 50%;
			}
		}
	}
</style>
