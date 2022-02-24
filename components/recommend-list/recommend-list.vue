<template>
	<u-transition :show="true" mode="slide-right" :duration="duration">
		<view class="recommend-card-box" @click="toDetail">
			<!-- <img class="bgc-img" :src="backgroundImage" mode="" /> -->
			<view class="bgc-img">
				<!-- <u--image :showLoading="true" :src="backgroundImage" width="100%" height="200rpx">
				</u--image> -->
			</view>
			<view class="left">
				<!-- 标题 -->
				<view class="title">
					{{title}}
				</view>
				<!-- 评论量等等 -->
				<view class="left-bottom">
					<!-- 浏览量 -->
					<view class="views">
						<i class="iconfont pig-liulan"></i>
						<text class="num">{{views}}</text>
					</view>
					<!-- 点赞量 -->
					<view class="likes">
						<i class="iconfont pig-changyong_dianzan"></i>
						<text class="num">{{likes}}</text>
					</view>
					<!-- 评论量 -->
					<view class="comments" v-if="comments !== ''">
						<i class="iconfont pig-changyong_xiaoxi"></i>
						<text class="num">{{comments}}</text>
					</view>
				</view>
			</view>
			<view class="right">
				<img class="cover" :src="imgUrl" />
			</view>
		</view>
	</u-transition>
</template>

<script>
	import {
		queryWebsite
	} from "@/http/api/website.js";
	import {
		querySourceById,
	} from "@/http/api/source.js"
	export default {
		// 样式穿透
		options: {
			styleIsolation: 'shared'
		},
		props: {
			// 推荐类型
			hottype: {
				type: String,
				default: ''
			},
			// 卡片信息
			itemInfo: {
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
				backgroundImage: 'https://smallpig.site:9000/navigation/bg/bg-1.jpg',
				imgUrl: '',
				title: '',
				views: '',
				likes: '',
				comments: '',
				websiteId: '',
				sourceId: '',
				duration: 300
			}
		},
		mounted() {
			this.duration = 300 + (this.index * 100);
			let randNum = this.getRandomInt(1, 8);
			this.backgroundImage = `https://smallpig.site:9000/navigation/bg/bg-${randNum}.jpg`
			if (this.hottype === 'website') {
				this.initWebsite(); // 热门网站
			} else if (this.hottype === 'source') {
				this.initSource(); // 精选资源
			} else {
				this.initToday() // 今日推荐
			}
		},
		methods: {
			// 获取随机数
			getRandomInt(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},
			// 跳转至详情
			toDetail() {
				if (this.hottype === 'website') {
					this.$emit("toDetail", 'website', this.itemInfo.website_id); // 触发父组件的跳转详情方法
				} else if (this.hottype === 'source') {
					this.$emit("toDetail", 'source', this.itemInfo.source_id); // 触发父组件的跳转详情方法
				} else {
					if (this.itemInfo.today_type === 'website') {
						this.$emit("toDetail", 'website', this.websiteId); // 触发父组件的跳转详情方法
					} else {
						this.$emit("toDetail", 'source', this.sourceId); // 触发父组件的跳转详情方法
					}
				}
			},
			// 初始化网站信息
			initWebsite() {
				this.title = this.itemInfo.website_title;
				this.imgUrl = this.itemInfo.website_favicon;
				this.views = this.itemInfo.website_views;
				this.likes = this.itemInfo.website_like_users.length || 0;
				this.comments = '';
			},
			// 初始化资源信息
			initSource() {
				this.title = this.itemInfo.source_title;
				this.imgUrl = this.itemInfo.source_cover;
				this.views = this.itemInfo.source_views;
				this.likes = this.itemInfo.source_likes_users.length || 0;
				this.comments = this.itemInfo.source_comment_num || 0;
			},
			// 初始化今日推荐信息
			async initToday() {
				if (this.itemInfo.today_type === 'website') {
					// 查询网站信息
					let params = {
						websiteId: this.itemInfo.today_projectId,
						isAddViews: true, // 是否需要增加浏览量
					}
					const data = await queryWebsite(params);
					if (data.code === "00000") {
						this.title = data.data.website_title;
						this.imgUrl = data.data.website_favicon;
						this.views = data.data.website_views;
						this.likes = data.data.website_like_users.length || 0;
						this.comments = '';
						this.websiteId = data.data.website_id;
					} else {
						uni.$u.toast(data.message)
					}
				} else {
					// 查询资源信息
					let params = {
						sourceId: this.itemInfo.today_projectId,
						isAddViews: true, // 是否需要增加浏览量
					}
					const data = await querySourceById(params);
					if (data.code === "00000") {
						this.title = data.data.source_title;
						this.imgUrl = data.data.source_cover;
						this.views = data.data.source_views;
						this.likes = data.data.source_likes_users.length || 0;
						this.comments = data.data.source_comment_num || 0;
						this.sourceId = data.data.source_id;
					} else {
						uni.showToast({
							icon: "error",
							title: data.message
						})
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.recommend-card-box {
		height: 200rpx;
		width: 80vw;
		// box-shadow: 0 8px 10px rgba(31, 45, 61, 0.2);
		border-radius: $uni-border-radius-base;
		display: flex;
		overflow: hidden;
		box-sizing: border-box;
		margin: 0 auto;
		margin-bottom: 30rpx;
		position: relative;

		.bgc-img {
			position: absolute;
			width: 100%;
			height: 200rpx;
			z-index: 1;
			background: #5614B0;
			/* fallback for old browsers */
			background: -webkit-linear-gradient(to right, #5614B0, #DBD65C);
			/* Chrome 10-25, Safari 5.1-6 */
			background: linear-gradient(to right, #5614B0, #DBD65C);
			/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
		}

		.left {
			flex: 1;
			z-index: 2;
			display: flex;
			flex-direction: column;
			padding: 0 20rpx 0 20rpx;
			overflow: hidden;

			.title {
				flex: 1;
				line-height: 160rpx;
				align-items: center;
				font-weight: 600;
				color: #fff;
				font-size: 28rpx;
				letter-spacing: 4rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.left-bottom {
				display: flex;
				height: 60rpx;

				.views {
					font-size: 18rpx;
					color: rgba(255, 255, 255, 0.7);
					display: flex;
					align-items: center;

					.iconfont {
						color: rgba(255, 255, 255, 0.7);
						margin-right: 6rpx;
					}
				}

				.comments {
					font-size: 18rpx;
					color: rgba(255, 255, 255, 0.7);
					display: flex;
					align-items: center;
					margin-left: 14rpx;

					.iconfont {
						color: rgba(255, 255, 255, 0.7);
						margin-right: 3px;
					}
				}

				.likes {
					font-size: 18rpx;
					color: rgba(255, 255, 255, 0.7);
					display: flex;
					align-items: center;
					margin-left: 14rpx;

					.iconfont {
						color: rgba(255, 255, 255, 0.7);
						margin-right: 3px;
					}
				}

				.num {
					font-size: 22rpx;
					color: rgba(255, 255, 255, 0.7);
				}
			}
		}

		.right {
			z-index: 2;
			width: 160rpx;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			background: linear-gradient(to right, rgba(170, 170, 127, 0.7), rgba(213, 51, 186, 0.7));
			border-radius: 100% / 100% 0 0 100%;


			.cover {
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
			}
		}
	}
</style>
