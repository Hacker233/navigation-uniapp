<template>
	<view class="create-box">
		<!-- 轮播图 -->
		<view class="u-demo-block">
			<u-swiper :list="fileterCarouselList" previousMargin="10" nextMargin="10" circular radius="5"
				imgMode="scaleToFill" :height="150" bgColor="#ffffff" @click="clickSwiper"></u-swiper>
		</view>

		<!-- tabs栏 -->
		<comm-tabs :TabList="categoryList" :currentTab="currentTab" @tabs="chooseCategory">
			<tab-pane v-for="i in categoryList.length" :key="i">
				<!-- 资源卡片列表栏 -->
				<u-transition :show="true" mode="slide-up">
					<template v-if="!isShowNoData">
						<view class="source-card-box" v-if="sourceList.length">
							<source-card v-for="(item,index) in sourceList" :key="index" :sourceInfo="item"
								:index="index" @toSourceDetail="toSourceDetail">
							</source-card>
						</view>
					</template>
					<template v-else>
						<view class="no-data">
							<no-data></no-data>
						</view>
					</template>
				</u-transition>
			</tab-pane>
		</comm-tabs>



		<!-- 上拉加載动画 -->
		<our-loading active v-if="isloading"></our-loading>
		<!-- <view class="loading-box" >
			<u-loading-icon></u-loading-icon>
		</view> -->
		<!-- 是否已经到底部了 -->
		<u-divider v-if="isEnd && !isShowNoData" text="到底啦~~~"></u-divider>

		<!-- 滚动到顶部 -->
		<u-back-top :scroll-top="scrollTop"></u-back-top>

		<!-- 确认弹窗 -->
		<u-modal :show="showad" @confirm="confirm" @cancel="cancle" showCancelButton ref="uModal"
			content="需要观看一段广告方可进入哦!"></u-modal>

		<!-- tabbar -->
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import {
		querySocategoryAll,
		querySourceByCategory
	} from '@/http/api/source';
	import {
		getCarsouelByPage
	} from "@/http/api/carsouel.js";
	export default {
		// 样式穿透
		options: {
			styleIsolation: 'shared'
		},
		data() {
			return {
				categoryList: [], // 分类列表
				sourceCategory: '', // 选择的分类
				sourceList: [], // 资源列表
				scrollTop: 0,
				total: 0, // 总条数
				pageCount: 0, // 总页数
				currentPage: 1, // 当前页
				isEnd: false, // 是否到底部了
				isloading: false, // 是否在加载中
				pageParams: {
					page: 1,
					pageSize: 10,
				},
				currentTab: 0,
				carsouelList: [],
				fileterCarouselList: [],
				startData: {
					clientX: '',
					clientY: ''
				},
				isShowNoData: false,
				videoAd: null, // 是否加载激励广告
				sourceId: '',
				showad: false,
				interstitialAd: null, // 弹窗广告
			}
		},
		onShow(){
			// 在适合的场景显示插屏广告
			// if (this.interstitialAd) {
			// 	console.log("弹窗广告")
			// 	this.interstitialAd.show().catch((err) => {
			// 		console.error(err)
			// 	})
			// }
		},
		//监听下拉刷新
		onPullDownRefresh() {
			this.currentTab = 0;
			this.sourceList = [];
			this.pageParams = {
				page: 1,
				pageSize: 10,
			};
			this.getSocategoryAll(); // 初始化分类列表
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		// 监听上拉加载更多
		onReachBottom() {
			if (this.isEnd) {
				return;
			}
			this.currentPage += 1;
			this.pageParams.page = this.currentPage
			this.querySourceByCategoryAsync();
		},
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
							url: `/pages/sourceInfo/index?sourceId=${this.sourceId}`
						})
					} else {
						// 播放中途退出，不下发游戏奖励
						return;
					}
				})
			}

			// 在页面onLoad回调事件中创建插屏广告实例
			if (wx.createInterstitialAd) {
				this.interstitialAd = wx.createInterstitialAd({
					adUnitId: 'adunit-fb3277fee290149f'
				})
				this.interstitialAd.onLoad(() => {
					console.log("弹窗广告加载")
				})
				this.interstitialAd.onError((err) => {})
				this.interstitialAd.onClose(() => {})
			}
			// #endif
		},
		mounted() {
			this.getSocategoryAll();
			this.getCarsouelByPageAsync();
			// 在适合的场景显示插屏广告
			if (this.interstitialAd) {
				console.log("弹窗广告")
				this.interstitialAd.show().catch((err) => {
					console.error(err)
				})
			}
		},
		methods: {
			// 初始化分类列表
			async getSocategoryAll() {
				const data = await querySocategoryAll();
				if (data.code === "00000") {
					this.categoryList = data.data;
					this.sourceCategory = this.categoryList[0].socategory_name; // 默认查询第一项
					this.querySourceByCategoryAsync();
				} else {
					uni.$u.toast(data.message);
				}
			},
			// 初始化资源页面轮播图
			async getCarsouelByPageAsync() {
				let params = {
					carsouelPage: 'source',
				}
				const data = await getCarsouelByPage(params);
				if (data.code === "00000") {
					this.carsouelList = data.data;
					this.fileterCarouselList = data.data.map(item => item.carsouel_url)
				} else {
					uni.$u.toast(data.message)
				}
			},
			// 查询该分类下的资源
			async querySourceByCategoryAsync() {
				this.isloading = true;
				this.isShowNoData = false;
				let params = {
					page: this.pageParams.page,
					pageSize: this.pageParams.pageSize,
					sourceCategory: this.sourceCategory
				}
				const data = await querySourceByCategory(params);
				if (data.code === "00000") {
					this.sourceList = this.sourceList.concat(data.data.data);
					this.total = data.data.page.count; // 总条数
					this.pageCount = data.data.page.pageCount; // 总页数
					this.currentPage = data.data.page.currentPage; // 当前页
					this.isEnd = data.data.page.isEnd;
					this.isloading = false;
					// 无数据
					if (!this.sourceList.length) {
						this.isShowNoData = true;
					}
					uni.stopPullDownRefresh();
				} else {
					uni.$u.toast(data.message);
					this.isloading = false;
				}
			},
			// 选择分类
			chooseCategory(index) {
				this.currentTab = index;
				console.log("this.currentTab", this.currentTab)
				this.isEnd = false;
				this.sourceList = [];
				this.pageParams = {
					page: 1,
					pageSize: 10,
				};
				this.sourceCategory = this.categoryList[index].socategory_name;
				this.querySourceByCategoryAsync();
			},
			// 点击轮播图切换
			clickSwiper(index) {
				let item = this.carsouelList[0];
				if (!item.carsouel_path) {
					return
				} else {
					let path = item.carsouel_path;
					if (item.carsouel_params) {
						let params = JSON.parse(item.carsouel_params);
						let paramsArr = []
						Object.keys(params).forEach(key => {
							paramsArr.push(key + "=" + params[key]);
						})
						let paramsStr = paramsArr.join('&');
						uni.navigateTo({
							url: `${path}?${paramsStr}`
						})
					} else {
						uni.navigateTo({
							url: `${path}`
						})
					}
				}
			},
			confirm() {
				this.showad = false;
				if (this.videoAd) {
					this.videoAd.show().catch(() => {
						// 失败重试
						this.videoAd.load()
							.then(() => this.videoAd.show())
							.catch(err => {
								uni.navigateTo({
									url: `/pages/sourceInfo/index?sourceId=${this.sourceId}`
								}) // 拉取失败直接跳转
							})
					})
				} else {
					// 非微信小程序，直接跳转
					uni.navigateTo({
						url: `/pages/sourceInfo/index?sourceId=${this.sourceId}`
					})
				}
			},
			cancle() {
				this.showad = false;
			},
			// 跳转至资料详情
			toSourceDetail(source_id) {
				this.sourceId = source_id;
				this.showad = true;
			}
		}
	}
</script>

<style lang="scss">
	page {
		padding: 0;
	}

	.create-box {
		width: 100%;
		position: relative;

		.category {
			background-color: #fff;
			padding-right: 20rpx;
		}

		.source-card-box {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			padding: 0 32rpx;
			box-sizing: border-box;
			// min-height: 50vh;
		}

	}
</style>
