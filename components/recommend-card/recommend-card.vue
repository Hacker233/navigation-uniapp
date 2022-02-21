<template>
	<u-transition :show="true" mode="slide-right" :duration="duration">
		<view class="timeline">
			<view @click="toDetail" :class="['list-card',{'list-card-spec': index%2 === 0}]">
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
	.timeline {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: repeat(3, 240rpx);
		justify-content: center;
	}

	.list-card {
		grid-column: span 2;
		border-radius: 100rpx;
		overflow: hidden;
		color: #fff;
		font-weight: bold;
		font-size: 25px;
		height: 150rpx;
		font-family: sans-serif;
		padding: 20rpx;
		border: 15rpx solid #0000;
		display: flex;
		align-items: center;
		margin-bottom: -15rpx;
		background: #800080;
		/* fallback for old browsers */

		// background: linear-gradient(to right, #800080, #ffc0cb) content-box,
		// 	linear-gradient(var(--c, #fcd000) 0 0) padding-box,
		// 	linear-gradient(var(--d, 90deg), #0000 75%, #42b132 0) border-box;

		background: linear-gradient(to right, #800080, #ffc0cb) content-box,
			linear-gradient(#ffffff 0 0) padding-box,
			linear-gradient(var(--d, 90deg), #0000 75%, #b8c7b6 0) border-box;

		.left {
			flex: 1;
			z-index: 2;
			display: flex;
			flex-direction: column;
			padding: 0 10rpx 0 20rpx;
			overflow: hidden;

			.title {
				flex: 1;
				font-weight: 600;
				color: #fff;
				font-size: 28rpx;
				letter-spacing: 2rpx;
				line-height: 90rpx;
				text-align: left;

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
			width: 110rpx;
			height: 110rpx;
			margin-right: 10rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			overflow: hidden;
			background: linear-gradient(to right, rgba(170, 170, 127, 0.7), rgba(213, 51, 186, 0.7));
			border-radius: 50%;

			.cover {
				width: 90rpx;
				height: 90rpx;
				border-radius: 50%;
			}
		}
	}

	.list-card-spec {
		grid-column-end: -1;
		--d: -90deg;
		--c: #009cda;
	}

	.list-card:before,
	.list-card:after {
		content: "";
		display: block;
		height: 0.6em;
	}
</style>
