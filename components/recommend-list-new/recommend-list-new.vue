<template>
	<view class="recommend-list-new-box" @click="toDetail">
		<!-- 封面图 -->
		<view class="cover-box">
			<u--image :showLoading="true" :src="imgUrl" width="50px" height="50px" shape="circle"></u--image>
		</view>

		<!-- 标题 -->
		<view class="card-title">
			{{title}}
		</view>

		<!-- 资源类型 -->
		<view class="card-type">
			{{cardType}}
		</view>

		<!-- 简介 -->
		<view class="card-abstarct">
			{{abstract}}
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
				abstract: '',
				comments: '',
				websiteId: '',
				sourceId: '',
				duration: 300
			}
		},
		computed: {
			cardType() {
				if (this.hottype === 'website') {
					return '网站'
				} else if (this.hottype === 'source') {
					return '资源'
				} else {
					if (this.itemInfo.today_type === 'website') {
						return '网站'
					} else {
						return '资源'
					}
				}
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
				this.abstract = this.itemInfo.website_abstract;
				this.comments = '';
			},
			// 初始化资源信息
			initSource() {
				this.title = this.itemInfo.source_title;
				this.imgUrl = this.itemInfo.source_cover;
				this.views = this.itemInfo.source_views;
				this.likes = this.itemInfo.source_likes_users.length || 0;
				this.abstract = this.itemInfo.source_abstract;
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
						this.abstract = data.data.website_abstract;
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
						this.abstract = data.data.source_abstract;
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
	.recommend-list-new-box {
		position: relative;
		margin-left: 16vw;
		margin-bottom: 40rpx;
		width: 74vw;
		height: 200rpx;
		background: #fff;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		padding: 20rpx 16rpx 10rpx 106rpx;
		box-sizing: border-box;
		box-shadow: 0 10px 10px rgba(31, 45, 61, 0.2);



		.cover-box {
			width: 148rpx;
			height: 148rpx;
			position: absolute;
			position: absolute;
			top: 50%;
			left: -60rpx;
			transform: translate(0, -50%);
			box-shadow: 0px 14px 60px rgba(34, 35, 58, 0.4);
			border-radius: 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #D3CCE3;
			/* fallback for old browsers */
			background: -webkit-linear-gradient(to right, #E9E4F0, #D3CCE3);
			/* Chrome 10-25, Safari 5.1-6 */
			background: linear-gradient(to right, #E9E4F0, #D3CCE3);
			/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
		}

		.cover-left {
			left: -60rpx;
		}

		.cover-right {
			right: -60rpx;
		}

		.card-title {
			width: 40vw;
			height: 50rpx;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.card-type {
			position: absolute;
			right: -10rpx;
			top: -10rpx;
			padding: 4rpx 8rpx;
			letter-spacing: 4rpx;
			border-radius: 10rpx;
			color: #fff;
			font-size: 18rpx;
			background: #DA4453;
			opacity: 0.8;
			font-family: "微软雅黑";
			/* fallback for old browsers */
			background: -webkit-linear-gradient(to right, #89216B, #DA4453);
			/* Chrome 10-25, Safari 5.1-6 */
			background: linear-gradient(to right, #89216B, #DA4453);
			/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
		}

		.card-abstarct {
			font-size: 20rpx;
			line-height: 36rpx;
			letter-spacing: 6rpx;
			color: rgb(144, 147, 153);
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;

		}

		.left-bottom {
			display: flex;
			justify-content: flex-end;
			box-sizing: border-box;
			color: #333;
			flex: 1;

			.views {
				font-size: 18rpx;
				color: #333;
				display: flex;
				align-items: flex-end;

				.iconfont {
					color: #333;
					margin-right: 6rpx;
				}
			}

			.comments {
				font-size: 18rpx;
				color: #333;
				display: flex;
				align-items: flex-end;
				margin-left: 14rpx;

				.iconfont {
					color: #333;
					margin-right: 3px;
				}
			}

			.likes {
				font-size: 18rpx;
				color: #333;
				display: flex;
				align-items: flex-end;
				margin-left: 14rpx;

				.iconfont {
					color: #333;
					margin-right: 3px;
				}
			}

			.num {
				font-size: 22rpx;
				color: #333;
			}
		}
	}

	.recommend-list-new-box-right {
		padding: 20rpx 106rpx 10rpx 10rpx;
	}
</style>
