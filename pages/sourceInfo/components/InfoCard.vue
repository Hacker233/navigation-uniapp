<template>
	<view class="card-info-box">
		<view class="card-top">
			<!-- 资源封面图 -->
			<view class="cover-box">
				<u--image :showLoading="true" :src="sourceInfo.source_cover" width="120px" height="120px" shape="circle"
					mode="scaleToFill"></u--image>
			</view>
			<!-- 资源标签 -->
			<view class="source-tags">
				<u-tag :text="item" type="warning" icon="tags-fill" v-for="(item,index) in sourceInfo.source_tags"
					:key="index"></u-tag>
			</view>
			<!-- 资料标题 -->
			<view class="source-title">
				<text>{{sourceInfo.source_title}}</text>
			</view>
			<!-- 简介 -->
			<view class="source_abstract">
				<u--text type="info" :text="'简介：' + sourceInfo.source_abstract"></u--text>
			</view>
			<!-- 资源截图 -->
			<view class="source-screen">
				<text class="title">
					截图
				</text>
				<img :src="item.response.data.fileUrl" v-for="(item,index) in sourceInfo.source_screen"
					:key="indx"></img>
			</view>
			<!-- 资源发布时间 -->
			<view class="source-tiem">
				<u--text :text="`发布于${formatTime(sourceInfo.source_create_date)}`" type="info"></u--text>
			</view>
			<!-- 点赞等信息 -->
			<view class="source-views">
				<view class="views">
					<i class="iconfont pig-liulan"></i>
					<u--text type="info" :text="sourceInfo.source_views"></u--text>
				</view>
			</view>
		</view>
		<!-- 资源下载链接 -->
		<view class="link-button">
			<u-button color="linear-gradient(to right, rgb(93, 188, 216), rgb(213, 51, 186))"
				v-for="(item,index) in sourceInfo.source_download" :key="index">
				<u-link color="#fff" :href="item.link" :text="item.name"></u-link>
			</u-button>
		</view>
	</view>
</template>

<script>
	import {
		querySourceById
	} from "@/http/api/source.js"
	import {
		showtime
	} from "@/utils/index.js"
	export default {
		props: {
			sourceId: {
				type: String,
				default: ''
			},
		},
		data() {
			return {
				sourceInfo: ''
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			// 格式化时间
			formatTime(time) {
				return showtime(time)
			},
			// 获取资源基本信息
			async init() {
				let params = {
					sourceId: this.sourceId
				}
				const data = await querySourceById(params);
				if (data.code === "00000") {
					this.sourceInfo = data.data; // 资源信息
				} else {
					uni.showToast({
						icon: "error",
						title: data.message
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.card-info-box {
		width: 100%;

		.card-top {
			background-color: $uni-bg-color;
			padding: 40rpx 0 0 0;

			.cover-box {
				display: flex;
				justify-content: center;
			}

			.source-tags {
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 40rpx;

				/deep/ .u-tag-wrapper {
					margin-right: 10rpx;
				}
			}

			.source-title {
				width: 100%;
				height: 100rpx;
				font-size: $uni-font-size-lg;
				font-weight: 800;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.source_abstract {
				padding: 0 80rpx;
				display: flex;
				text-align: justify;
			}

			.source-screen {
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				box-sizing: border-box;

				.title {
					margin: 40rpx 0 40rpx 0;
					box-sizing: border-box;
					font-size: $uni-font-size-title;
					font-weight: 600;
				}

				img {
					max-width: 80%;
					box-shadow: 0 13px 15px rgba(31, 45, 61, 0.1);
					border-radius: $uni-border-radius-base;
					margin-bottom: 20rpx;
				}
			}

			.source-tiem {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 40rpx;

				/deep/ .u-text {
					width: 100%;
					display: flex;
					justify-content: center !important;
					align-items: center;
				}
			}


			.source-views {
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


		.link-button {
			margin-top: 40rpx;
			background-color: $uni-bg-color;
			display: flex;
			flex-direction: column;
			padding: 40rpx 40rpx 0 40rpx;

			/deep/ .u-button {
				margin-bottom: 40rpx;
				.u-link {
					width: 100%;
					display: flex;
					justify-content: center;
				}
			}
		}
	}
</style>
