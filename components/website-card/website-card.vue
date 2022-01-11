<template>
	<u-transition :show="true" mode="slide-up">
		<view class="website-card transition">
			<view class="website" v-for="(item, index) in websiteList" :key="index">
				<!-- 分类标题 -->
				<view class="title">
					<i :class="['iconfont', menuIcon]"></i>
					<text class="text-title">{{item.website_category}}</text>
				</view>
				<!-- 分类网站列表 -->
				<view class="list-box">
					<view class="card" v-for="(webItem, webIndex) in item.list" :key="webIndex"
						@click="toWebsiteDetail(webItem)">
						<!-- 热门标签 -->
						<i class="iconfont pig-remen" v-if="webIndex <= 2"></i>
						<view class="top">
							<u-avatar :src="webItem.website_favicon"></u-avatar>
							<view class="top-right">
								<text class="title">{{webItem.website_title}}</text>
							</view>
						</view>
						<view class="center">
							<text class="abstarct">{{webItem.website_abstract}}</text>
						</view>
						<view class="bottom">
							<view class="view-num">
								<i class="iconfont pig-liulan"></i>
								<text>{{webItem.website_views}}</text>
							</view>
							<view class="web-tags">
								<text>{{webItem.website_tags}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</u-transition>
</template>

<script>
	export default {
		props: {
			websiteList: {
				type: Array,
				default: () => {
					return []
				}
			},
			menuIcon: {
				type: String,
				default: ""
			}
		},
		methods: {
			toWebsiteDetail(webItem) {
				uni.navigateTo({
					url: `../../pages/website/index?websiteId=${webItem.website_id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.website-card {
		.website {
			width: 100%;
			min-height: 100rpx;
			margin: 20rpx 0;
			border-radius: $uni-border-radius-lg;
			box-sizing: border-box;
			border: none;
			background: $uni-bg-color;
			padding: 0 18rpx;

			.title {
				width: 100%;
				height: 80rpx;
				display: flex;
				margin-bottom: 20rpx;
				align-items: center;
				justify-content: flex-start;
				box-sizing: border-box;
				border-bottom: 2rpx solid rgba(0, 0, 0, 0.1);
				word-break: break-word;
				overflow: hidden;

				.text-title {
					color: $uni-color-title;
					letter-spacing: 4rpx;
					font-size: $uni-font-size-lg;
				}

				.iconfont {
					margin-right: 10rpx;
				}
			}

			.list-box {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;

				.card {
					width: 48.6%;
					margin: 0 0 40rpx 0;
					border-radius: $uni-border-radius-base;
					padding: 10rpx 10rpx;
					box-sizing: border-box;
					position: relative;
					box-shadow: 0 13px 15px rgba(31, 45, 61, 0.15);
					border-radius: 13px;
					transition: -webkit-transform .25s, -webkit-box-shadow .25s;
					transition: transform .25s, box-shadow .25s;
					transition: transform .25s, box-shadow .25s, -webkit-transform .25s, -webkit-box-shadow .25s;

					// 热门标签
					.pig-remen {
						position: absolute;
						right: -16rpx;
						top: -10rpx;
						color: red;
					}

					.top {
						display: flex;
						align-items: center;
						justify-content: flex-start;
						height: 100rpx;

						.top-right {
							margin: 0 0 0 16rpx;
							height: 100%;
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							align-items: flex-start;
							font-size: $uni-font-size-base;
						}
					}

					.center {
						overflow: hidden;
						min-height: 60rpx;

						text {
							font-size: $uni-font-size-sm;
							color: $uni-text-color-grey;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
							text-align: justify;
						}
					}

					.bottom {
						display: flex;
						justify-content: space-between;
						align-items: center;
						height: 60rpx;
						border-top: 1px solid #eee;
						margin-top: 10rpx;

						.view-num {
							display: flex;
							align-items: center;
							font-size: $uni-font-size-sm;
							color: $uni-text-color-grey;

							text {
								margin-left: 6rpx;
							}
						}

						.web-tags {
							text {
								font-size: $uni-font-size-sm;
								display: flex;
								align-items: center;
								padding: 4rpx 8rpx;
								background-color: $uni-color-primary;
								border-radius: $uni-border-radius-sm;
								color: $uni-text-color-inverse;
							}
						}
					}
				}
			}
		}
	}
</style>
