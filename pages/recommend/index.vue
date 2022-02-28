<template>
	<view class="recommend-box">
		<!-- 头部背景图片 -->
		<view class="bg-img">
			<recommend-design></recommend-design>
		</view>

		<!-- tab栏 -->
		<view class="tab-box">
			<!-- tab列表 -->
			<view :class="['today-recomment-title',{'active': currentIndex === index}]" v-for="(item,index) in tabList"
				:key="index" @click="getList(item, index)">
				<i :class="['iconfont', item.iconfont]"></i>
				<text class="title">{{item.title}}</text>
			</view>
		</view>

		<!-- 列表栏 -->
		<view class="list-box">
			<!-- 今日推荐卡片列表 -->
			<view class="recommend-card-list-box">
				<!-- <template v-if="recommendList.length">
					<recommend-card v-for="(item,index) in recommendList" :key="index" :index="index" :itemInfo="item"
						:hottype="selectTab" @toDetail="toDetail"></recommend-card>
						<view class="ad-box">
							<ad unit-id="adunit-52382c340c3ca354"></ad>
						</view>
				</template>
				<our-loading v-else active></our-loading> -->
				<template v-if="recommendList.length">
					<recommend-list-new v-for="(item,index) in recommendList" :key="index" :itemInfo="item"
						:hottype="selectTab" :index="index" @toDetail="toDetail"></recommend-list-new>
					<view class="ad-box">
						<ad unit-id="adunit-52382c340c3ca354"></ad>
					</view>
				</template>
				<!-- <recommend-list v-for="(item,index) in recommendList" :key="index" :itemInfo="item"
						:hottype="selectTab" :index="index" @toDetail="toDetail">
					</recommend-list> -->

				<our-loading v-else active></our-loading>
			</view>

		</view>
		<!-- 确认弹窗 -->
		<u-modal :show="showad" @confirm="confirm" @cancel="cancle" showCancelButton ref="uModal"
			content="需要观看一段广告方可进入哦!"></u-modal>

		<!-- tabbar -->
		<tab-bar></tab-bar>

		<!-- 评价组件 -->
		<drag-button-follow :style.sync="style" :follow="true" className="drag-button" class="drag-button"
			@btnClick="ratingClick">
			<view class="content-box">
				打分
			</view>
		</drag-button-follow>

		<!-- 打分弹窗 -->
		<rating-modal :ratingShow="ratingShow" @closeRating="closeRating"></rating-modal>
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
				recommendList: [],
				videoAd: null,
				tourl: '', // 跳转详情的url
				showad: false, // 是否显示弹窗
				tabList: [{
					id: 'today',
					title: "今日推荐",
					iconfont: 'pig-ico_zonghexinxi_xuanzhong',
				}, {
					id: 'website',
					title: "热门网站",
					iconfont: 'pig-wangzhan1',
				}, {
					id: 'source',
					title: "精选资源",
					iconfont: 'pig-ruanjianxiazai2',
				}],
				currentIndex: 0,
				selectTab: 'today', // 选中的tab

				name: '',
				id: '',
				style: '',
				ratingShow: false, // 打分弹窗
			}
		},
		//监听下拉刷新
		onPullDownRefresh() {
			this.recommendList = [];
			this.currentIndex = 0;
			this.selectTab = 'today', // 选中的tab
				this.initToday();
		},
		computed: {
			userInfo() {
				return this.$store.state.userInfo
			}
		},
		mounted() {
			this.initToday();
		},
		// 广告拉取
		onLoad() {
			// #ifdef MP-WEIXIN
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
			// #endif
		},
		methods: {
			// 点击tab获取详细列表
			getList(item, index) {
				this.currentIndex = index;
				this.selectTab = item.id;
				this.recommendList = [];
				if (item.id === 'today') {
					this.initToday();
				} else if (item.id === 'website') {
					this.initHotWebsite();
				} else {
					this.initHotSource();
				}
			},
			// 获取今日推荐
			async initToday() {
				const data = await getRecommendToday();
				if (data.code === "00000") {
					this.recommendList = data.data;
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
					this.recommendList = data.data;
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
					this.recommendList = data.data;
					uni.stopPullDownRefresh();
				} else {
					uni.$u.toast(data.message);
					uni.stopPullDownRefresh();
				}
			},
			cancle() {
				this.showad = false;
			},
			confirm() {
				this.showad = false;
				if (this.name === 'website') {
					this.tourl = `../../pages/website/index?websiteId=${this.id}`
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
					this.tourl = `/pages/sourceInfo/index?sourceId=${this.id}`;
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
			},
			// 跳转至卡片详情
			toDetail(name, id) {
				this.name = name;
				this.id = id;
				this.showad = true;
			},
			// 打开打分弹窗
			ratingClick() {
				if (this.userInfo) {
					this.ratingShow = true;
				} else {
					// 未登录跳转到登录页面
					uni.navigateTo({
						url: `/pages/login/login`
					})
				}
			},
			// 关闭打分弹窗
			closeRating() {
				this.ratingShow = false;
			}
		}
	}
</script>

<style lang="scss">
	page {
		padding: 0;
		background: linear-gradient(to right, rgba(170, 170, 127, 0.1), rgba(213, 51, 186, 0.1));
	}

	.recommend-box {
		display: flex;
		align-items: center;
		flex-direction: column;

		.bg-img {
			height: 300rpx;
			width: 100vw;
			z-index: 1;
			opacity: 0.9;
		}

		// tab栏目
		.tab-box {
			z-index: 2;
			display: flex;
			width: 100vw;
			justify-content: space-around;
			position: absolute;
			top: 240rpx;

			.active {
				box-shadow: 0 10px 10px rgba(31, 45, 61, 0.4);
			}

			.today-recomment-title {
				width: 23vw;
				height: 130rpx;
				z-index: 2;
				background: rgba(255, 255, 255, 0.8);
				border-radius: $uni-border-radius-lg;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				transition: all 0.3s;

				.iconfont {
					font-size: 20rpx;
					color: #333333;
					width: 40rpx;
					height: 40rpx;
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
					letter-spacing: 2rpx;
					margin-left: 6rpx;
					position: relative;

					&::after {
						content: "";
						position: absolute;
						width: 80rpx;
						height: 4rpx;
						border-radius: $uni-border-radius-lg;
						background: linear-gradient(to right, rgb(170, 170, 127), rgb(213, 51, 186));
						bottom: -25%;
						left: 50%;
						transform: translate(-50%, 0);
					}
				}
			}
		}

		// 列表栏
		.list-box {
			width: 100vw;
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;

			.recommend-card-list-box {
				width: 100vw;
				min-height: 50vh;
				padding: 130rpx 0 30rpx 0;
			}

			.ad-box {
				width: 80vw;
				margin: 0 auto;
			}
		}

		.drag-button {
			background: #FFFFFF;
			border: 0.5px solid #EEEEEE;
			box-shadow: 0 5rpx 10rpx 0 rgba(0, 0, 0, 0.2);
			width: 80rpx;
			height: 80rpx;
			opacity: 0.8;
			z-index: 9;
			font-size: 20rpx;
			color: #bd6a44;
			position: fixed;
			right: 0;
			bottom: 180rpx;
			border-radius: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			.content-box {
				height: 100%;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>
