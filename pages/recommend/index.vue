<template>
	<view class="recommend-box">
		<!-- 头部背景图片 -->
		<img class="bg-img" src="../../static/img/recommend.webp" mode="" />

		<!-- 今日推荐 -->
		<view class="today-recomment-title">
			<i class="iconfont pig-ico_zonghexinxi_xuanzhong"></i>
			<text class="title">今日推荐</text>
		</view>
		<!-- 今日推荐卡片列表 -->
		<view class="recommend-card-list-box">
			<template v-if="hotTodayList.length">
				<recommend-list v-for="(item,index) in hotTodayList" :key="index" :itemInfo="item" hottype="today"
					:index="index" @toDetail="toDetail">
				</recommend-list>
			</template>
			<our-loading v-else active></our-loading>
		</view>

		<!-- 热门网站 -->
		<view class="today-recomment-title hot-website">
			<i class="iconfont pig-wangzhan1"></i>
			<text class="title">热门网站</text>
		</view>
		<!-- 热门网站推荐卡片 -->
		<view class="recommend-card-list-box">
			<template v-if="hotWebsiteList.length">
				<recommend-list v-for="(item,index) in hotWebsiteList" hottype="website" :itemInfo="item" :key="index"
					:index="index" @toDetail="toDetail">
				</recommend-list>
			</template>
			<our-loading v-else active></our-loading>
		</view>

		<!-- 精选资源 -->
		<view class="today-recomment-title hot-source">
			<i class="iconfont pig-ruanjianxiazai2"></i>
			<text class="title">精选资源</text>
		</view>
		<!-- 热门资源推荐卡片 -->
		<view class="recommend-card-list-box">
			<template v-if="hotSourceList.length">
				<recommend-list v-for="(item,index) in hotSourceList" hottype="source" :itemInfo="item" :key="index"
					:index="index" @toDetail="toDetail">
				</recommend-list>
			</template>
			<our-loading v-else active></our-loading>
		</view>
	</view>
</template>

<script>
	import {
		getRecommendToday,
		getHotWebsite,
		getHotSource
	} from "@/http/api/recommend.js"
	export default {
		data() {
			return {
				hotTodayList: [],
				hotWebsiteList: [],
				hotSourceList: [],
				videoAd: null,
				tourl: '', // 跳转详情的url
			}
		},
		//监听下拉刷新
		onPullDownRefresh() {
			this.initToday();
			this.initHotWebsite();
			this.initHotSource();
		},
		mounted() {
			this.initToday();
			this.initHotWebsite();
			this.initHotSource();
		},
		// 广告拉取
		onLoad() {
			if (wx.createRewardedVideoAd) {
				this.videoAd = wx.createRewardedVideoAd({
					adUnitId: 'adunit-9107224b678eda79'
				})
				this.videoAd.onLoad(() => {
					console.log('激励广告拉取成功')
				})
				this.videoAd.onError((err) => {
					console.log('激励广告拉去失败', err)
				})
				this.videoAd.onClose((res) => {
					// 用户点击了【关闭广告】按钮
					if (res && res.isEnded) {
						// 正常播放结束，可以下发游戏奖励
						uni.navigateTo({
							url: this.tourl
						})
					} else {
						// 播放中途退出，不下发游戏奖励
						return;
					}
				})
			}
		},
		methods: {
			// 获取今日推荐
			async initToday() {
				const data = await getRecommendToday();
				if (data.code === "00000") {
					this.hotTodayList = data.data;
					uni.stopPullDownRefresh();
				} else {
					uni.$u.toast(data.message);
					uni.stopPullDownRefresh();
				}
			},
			// 获取热门网站
			async initHotWebsite() {
				const data = await getHotWebsite();
				if (data.code === "00000") {
					this.hotWebsiteList = data.data;
					uni.stopPullDownRefresh();
				} else {
					uni.$u.toast(data.message);
					uni.stopPullDownRefresh();
				}
			},
			// 获取精选资源
			async initHotSource() {
				const data = await getHotSource();
				if (data.code === "00000") {
					this.hotSourceList = data.data;
					uni.stopPullDownRefresh();
				} else {
					uni.$u.toast(data.message);
					uni.stopPullDownRefresh();
				}
			},
			// 跳转至卡片详情
			toDetail(name, id) {
				if (name === 'website') {
					this.tourl = `../../pages/website/index?websiteId=${id}`
					if (this.videoAd) {
						this.videoAd.show().catch(() => {
							// 失败重试
							this.videoAd.load()
								.then(() => this.videoAd.show())
								.catch(err => {
									uni.navigateTo({
										url: this.tourl
									})
								})
						})
					} else {
						// 非微信小程序，直接跳转
						uni.navigateTo({
							url: this.tourl
						})
					}
				} else {
					this.tourl = `/pages/sourceInfo/index?sourceId=${id}`;
					if (this.videoAd) {
						this.videoAd.show().catch(() => {
							// 失败重试
							this.videoAd.load()
								.then(() => this.videoAd.show())
								.catch(err => {
									uni.navigateTo({
										url: this.tourl
									})
								})
						})
					} else {
						// 非微信小程序，直接跳转
						uni.navigateTo({
							url: this.tourl
						})
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		padding: 0 0 30rpx 0;
		background: linear-gradient(to right, rgba(170, 170, 127, 0.1), rgba(213, 51, 186, 0.1));
	}

	.recommend-box {
		display: flex;
		align-items: center;
		flex-direction: column;

		.bg-img {
			position: absolute;
			height: 350rpx;
			width: 100vw;
			z-index: 1;
			border-radius: 100% / 0 0 30% 30%;
			opacity: 0.9;
		}

		.today-recomment-title {
			margin-top: 260rpx;
			margin-bottom: 30rpx;
			width: 30vw;
			height: 160rpx;
			z-index: 2;
			background: rgba(255, 255, 255, 0.8);
			border-radius: $uni-border-radius-lg;
			box-shadow: 0 8px 10px rgba(31, 45, 61, 0.2);
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.iconfont {
				font-size: 30rpx;
				color: #333333;
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #fff;
				background: linear-gradient(to right, rgb(170, 170, 127), rgb(213, 51, 186));
				margin-bottom: 10rpx;
			}

			.title {
				font-size: $uni-font-size-base;
				font-weight: 600;
				letter-spacing: 6rpx;
				margin-left: 6rpx;
				position: relative;

				&::after {
					content: "";
					position: absolute;
					width: 80rpx;
					height: 4rpx;
					border-radius: $uni-border-radius-lg;
					background: linear-gradient(to right, rgb(170, 170, 127), rgb(213, 51, 186));
					bottom: -40%;
					left: 50%;
					transform: translate(-50%, 0);
				}
			}
		}

		.recommend-card-list-box {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 30rpx;
			box-sizing: border-box;
			width: 90vw;
			background: rgba(255, 255, 255, 0.3);
			border-radius: $uni-border-radius-lg;
			box-shadow: 0 8px 10px rgba(31, 45, 61, 0.2);
			min-height: 220rpx;
			position: relative;
			margin-bottom: 10rpx;
		}

		.hot-website {
			margin-top: 50rpx;
		}

		.hot-source {
			margin-top: 50rpx;
		}
	}
</style>
