<template>
	<u-transition :show="true" mode="slide-up">
		<view class="website-detail transition">
			<view class="detail-box">
				<!-- 网站logo -->
				<view class="website-logo">
					<u--image src="https://cdn.uviewui.com/uview/album/1.jpg" shape="circle" width="100px"
						height="100px">
					</u--image>
				</view>
				<!-- 标题 -->
				<view class="website-title">
					<text>{{websiteInfo.website_title}}</text>
				</view>
				<!-- 标签 -->
				<view class="website-tags">
					<u-tag :text="websiteInfo.website_tags" type="warning" icon="tags-fill"></u-tag>
				</view>
				<!-- 链接 -->
				<view class="website-link">
					<text class="link-label">链接：</text>
					<view class="link">
						<u-link :href="websiteInfo.website_link" :text="websiteInfo.website_link">
						</u-link>
						<i v-if="!isCopy" class="iconfont pig-fuzhi" @click="copyLink"></i>
						<i v-else class="iconfont pig-chenggong" @click="copyLink"></i>
					</view>
				</view>
				<!-- 简介 -->
				<view class="website_abstract">
					<text class="abstract-label">简介：</text>
					<u--text :text="websiteInfo.website_abstract"></u--text>
				</view>
				<!-- 浏览量等等 -->
				<view class="website-views">
					<view class="views">
						<i class="iconfont pig-liulan"></i>
						<u--text type="info" :text="websiteInfo.website_views"></u--text>
					</view>
				</view>
			</view>
		</view>
	</u-transition>
</template>

<script>
	import {
		queryWebsite
	} from "../../http/api/website.js";
	export default {
		data() {
			return {
				websiteId: '',
				websiteInfo: '',
				isCopy: false,
			}
		},
		onLoad(option) {
			this.websiteId = option.websiteId;
		},
		mounted() {
			this.init();
		},
		methods: {
			// 初始化网站信息
			async init() {
				let params = {
					websiteId: this.websiteId
				}
				const data = await queryWebsite(params);
				if (data.code === "00000") {
					this.websiteInfo = data.data;
				} else {
					uni.$u.toast(data.message)
				}
			},
			// 点击复制
			copyLink() {
				uni.setClipboardData({
					data: this.websiteInfo.website_link, //要被复制的内容
					success: () => { //复制成功的回调函数
						uni.showToast({ //提示
							title: '复制成功'
						})
						this.isCopy = true;
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.website-detail {
		.detail-box {
			width: 100%;
			min-height: 200rpx;
			background-color: $uni-bg-color;
			border-radius: $uni-border-radius-lg;
			padding: 40rpx 0 0 0;

			.website-logo {
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.website-title {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 120rpx;

				text {
					font-size: 36rpx;
					font-weight: 800;
				}
			}

			.website-tags {
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.website-link {
				width: 100%;
				padding: 40rpx 80rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;

				.link {
					flex: 1;
					display: flex;
					flex-wrap: wrap;
					overflow: hidden;

					.u-link {
						word-break: break-all;
					}
				}
			}

			.website_abstract {
				width: 100%;
				padding: 20rpx 80rpx;
				box-sizing: border-box;
				display: flex;
				align-items: flex-start;
			}

			.website-views {
				height: 100rpx;
				margin-top: 20rpx;
				border-top: 1px solid #E1E1E1;
				display: flex;
				align-items: center;
				justify-content: center;

				.views {
					height: 100%;
					display: flex;
					justify-content: center;
					align-items: center;

					.iconfont {
						margin-right: 10rpx;
						font-size: $uni-font-size-lg;
					}
				}
			}
		}
	}
</style>
