<template>
	<view class="rating-card-box">
		<!-- 头像区域 -->
		<view class="rating-avatar">
			<u-avatar :src="ratingInfo.avatarUrl"></u-avatar>
		</view>

		<!-- 右侧区域 -->
		<view class="rating-right">
			<!-- 用户昵称 -->
			<view class="username">
				<view class="username-left">
					<text>{{ratingInfo.nickName}}</text>
					<text class="date">{{ratingInfo.rating_date}}</text>
				</view>
				<text class="keyword">{{ratingInfo.rating_keyword}}</text>
			</view>
			<!-- 意见反馈 -->
			<view class="rating-views" v-if="ratingInfo.rating_views">
				<text>{{ratingInfo.rating_views}}</text>
			</view>
			<!-- 星星等级 -->
			<view class="star-grade">
				<i :class="['iconfont','pig--wujiaoxing']" v-for="(item,index) in ratingInfo.rating_grade"></i>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			ratingInfo: {
				type: Object,
				default: () => {}
			}
		}
	}
</script>

<style lang="scss">
	.rating-card-box {
		width: 80vw;
		padding: 20rpx 20rpx;
		background: #fff;
		border-radius: 10rpx;
		box-shadow: 0 10px 10px rgba(31, 45, 61, 0.1);
		display: flex;
		margin-bottom: 20rpx;

		.rating-right {
			padding: 0 20rpx;
			flex: 1;

			.username {
				font-size: 28rpx;
				color: #333;
				margin-bottom: 10rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.username-left {
					.date {
						color: #ccc7b0;
						font-size: 20rpx;
						margin-left: 10rpx;
					}
				}
				.keyword {
					font-size: 20rpx;
					border: 2rpx solid #ccc;
					border-radius: 6rpx;
					padding: 2rpx 4rpx;
				}
			}

			.rating-views {
				font-size: 26rpx;
				margin-bottom: 10rpx;
				color: #333;
			}

			.star-grade {
				display: flex;
				.iconfont {
					font-size: 36rpx;
					color: yellow;
				}
			}
		}
	}
</style>
