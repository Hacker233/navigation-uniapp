<template>
	<view class="card-box" @click="toSourceDetail">
		<!-- 封面图 -->
		<view class="cover-box">
			<u--image :showLoading="true" :src="sourceInfo.source_cover" width="180px" height="170px"
				mode="scaleToFill"></u--image>
		</view>
		<!-- 资源题目 -->
		<view class="source-title">
			<text>{{sourceInfo.source_title}}</text>
		</view>
		<!-- 资源标签 -->
		<view class="source-tags">
			<text v-for="(item,index) in sourceInfo.source_tags" :key="index">{{item}}</text>
		</view>
		<!-- 浏览量和日期 -->
		<view class="source-bottom">
			<!-- 浏览量 -->
			<view class="views">
				<i class="iconfont pig-liulan"></i>
				<span>{{sourceInfo.source_views}}</span>
			</view>
			<!-- 评论量 -->
			<view class="comments">
				<i class="iconfont pig-changyong_xiaoxi"></i>
				<span>{{sourceInfo.source_comment_num || 0}}</span>
			</view>
			<!-- 点赞量 -->
			<view class="likes">
				<i class="iconfont pig-changyong_dianzan"></i>
				<span>{{sourceInfo.source_likes_users.length || 0}}</span>
			</view>
			<!-- 时间 -->
			<view class="date">
				<text>{{formatTime(sourceInfo.source_create_date)}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		showtime
	} from "@/utils/index.js"
	export default {
		// 样式穿透
		options: {
			styleIsolation: 'shared'
		},
		props: {
			sourceInfo: {
				type: Object,
				default: () => {}
			},
		},
		data() {
			return {}
		},
		methods: {
			// 格式化时间
			formatTime(time) {
				return showtime(time)
			},
			// 跳转到资源详情
			toSourceDetail() {
				uni.navigateTo({
					url: `/pages/sourceInfo/index?sourceId=${this.sourceInfo.source_id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.card-box {
		width: 44vw;
		height: 500rpx;
		box-shadow: 0 13px 15px rgba(31, 45, 61, 0.1);
		border-radius: 26rpx;
		overflow: hidden;
		margin: 20rpx 0;
		display: flex;
		flex-direction: column;

		.cover-box {
			width: 100%;
			height: 300rpx;
			overflow: hidden;
			/deep/ .u-image__image {
				width: 100% !important;
			}
		}

		.source-title {
			padding: 10rpx;
			min-height: 60rpx;

			text {
				font-size: $uni-font-size-lg;
				color: $uni-color-title;
				text-align: justify;
				display: flex;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
			}
		}

		.source-tags {
			width: 100%;
			max-height: 54rpx;
			display: flex;
			padding: 6rpx 10rpx;
			box-sizing: border-box;

			text {
				margin-right: 12rpx;
				background-color: $uni-color-primary;
				padding: 6rpx 12rpx;
				color: $uni-bg-color;
				font-size: $uni-font-size-sm;
				border-radius: 10rpx;
			}
		}

		.source-bottom {
			width: 100%;
			padding: 10rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 44rpx;
			box-sizing: border-box;
			flex: 1;

			.views {
				font-size: 12px;
				color: #4e5969;
				display: flex;
				align-items: center;

				.iconfont {
					color: #4e5969;
					margin-right: 3px;
				}
			}
			.comments {
				font-size: 12px;
				color: #4e5969;
				display: flex;
				align-items: center;
				margin-left: 14rpx;
				
				.iconfont {
					color: #4e5969;
					margin-right: 3px;
				}
			}
			.likes {
				font-size: 12px;
				color: #4e5969;
				display: flex;
				align-items: center;
				margin-left: 14rpx;
				
				.iconfont {
					color: #4e5969;
					margin-right: 3px;
				}
			}

			.date {
				font-size: 12px;
				color: #4e5969;
				display: flex;
				align-items: center;
				flex: 1;
				justify-content: flex-end;
			}
		}
	}
</style>
