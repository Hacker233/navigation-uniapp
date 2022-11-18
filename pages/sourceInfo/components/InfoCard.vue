<template>
	<view class="card-info-box">

		<template v-if="sourceInfo">
			<view class="card-top">
				<!-- 资源封面图 -->
				<view class="cover-box">
					<u--image :showLoading="true" :src="sourceInfo.source_cover" width="120px" height="120px"
						shape="circle" mode="scaleToFill"></u--image>
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
					<text class="abstract-text" selectable="true">简介：{{sourceInfo.source_abstract}}</text>
					<!-- <u--text type="info" :text="'简介：' + sourceInfo.source_abstract" mode="text"></u--text> -->
				</view>
				<!-- 资源截图 -->
				<view class="source-screen">
					<text class="title">
						截图
					</text>

					<img class="screen-img" :src="item.response.data.fileUrl" v-for="(item,index) in sourceInfo.source_screen" :key="index"
						mode="widthFix" @click="previewImage(index)"></img>
				</view>
				<!-- 资源发布时间 -->
				<view class="source-tiem">
					<u--text v-if="sourceInfo" :text="`发布于${formatTime(sourceInfo.source_create_date)}`" type="info">
					</u--text>
				</view>
				<!-- 点赞等信息 -->
				<view class="source-views">
					<!-- 浏览量 -->
					<view class="views">
						<i class="iconfont pig-liulan"></i>
						<u--text type="info" :text="sourceInfo.source_views"></u--text>
					</view>
					<!-- 分割线 -->
					<view class="hr"></view>
					<!-- 评论量 -->
					<view class="views" @click="commentInput">
						<i class="iconfont pig-changyong_xiaoxi"></i>
						<u--text v-if="commentData" type="info" :text="commentData.commentSize"></u--text>
					</view>
					<!-- 分割线 -->
					<view class="hr"></view>
					<!-- 点赞量 -->
					<view class="views" @click="likeOrCancleLike">
						<i :class="['iconfont','pig-changyong_dianzan',{'like-active':isLike}]"></i>
						<text
							:class="['views-text',{'like-active':isLike}]">{{sourceInfo.source_likes_users.length}}</text>
					</view>
				</view>
			</view>
			<!-- 资源下载链接 -->
			<view class="link-button">
				<view class="link-bt" v-for="(item,index) in sourceInfo.source_download" :key="index">
					<u-link v-if="item.pass" color="#fff" :href="item.link" :text="`${item.name}(提取码:${item.pass})`">
					</u-link>
					<u-link v-else color="#fff" :href="item.link" :text="`${item.name}`"></u-link>
				</view>
			</view>

			<!-- 评论组件 -->
			<view class="comment-box-wrapper">
				<hb-comment ref="hbComment" @add="add" @del="del" @like="like" @focusOn="focusOn" :deleteTip="'确认删除？'"
					:cmData="commentData" v-if="commentData"></hb-comment>
			</view>
		</template>

		<!-- 骨架屏 -->
		<template v-else>
			<u-skeleton :loading="true" :animate="true" rows="5" :rowsHeight="rowsHeight"></u-skeleton>
		</template>
	</view>
</template>

<script>
	import {
		querySourceById,
		likeSourceById,
		cancleLikeSourceById
	} from "@/http/api/source.js"
	import {
		showtime
	} from "@/utils/index.js"
	import {
		getCommentList,
		addComment,
		likeComment,
		deleteComment
	} from "@/http/api/comment.js";
	export default {
		// 样式穿透
		options: {
			styleIsolation: 'shared'
		},
		props: {
			sourceId: {
				type: String,
				default: ''
			},
		},
		data() {
			return {
				sourceInfo: '',
				commentData: null, // 评论列表
				commentList: [],
				rowsHeight: [80, 40, 130, 40, 40],
				commentType: 'source' // 评论类型
			}
		},
		computed: {
			isLike() {
				return this.sourceInfo.isLike === 1
			}
		},
		mounted() {
			this.init(); // 获取资源基本信息
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
					this.getCommentListAsync(); // 获取文章评论列表
				} else {
					uni.showToast({
						icon: "error",
						title: data.message
					})
				}
			},
			// 预览图片
			previewImage(index) {
				let photoList = this.sourceInfo.source_screen.map(item => {
					return item.response.data.fileUrl;
				});
				uni.previewImage({
					current: index,
					urls: photoList
				});
			},
			// 点击评论图标
			commentInput() {
				this.$refs.hbComment.commentInput()
			},
			// 点赞或者取消点赞资源
			likeOrCancleLike() {
				console.log(this.isLike)
				if (this.isLike) {
					this.cancleLikeSource();
				} else {
					this.likeSource();
				}
			},
			// 取消点赞资源
			async cancleLikeSource() {
				let params = {
					sourceId: this.sourceId
				}
				const data = await cancleLikeSourceById(params);
				if (data.code === "00000") {
					uni.showToast({
						icon: "success",
						title: "取消点赞成功"
					})
					this.sourceInfo.isLike = 0;
					this.sourceInfo.source_likes_users.pop(); // 点赞数减一
				} else {
					uni.showToast({
						icon: "error",
						title: data.message
					})
				}
			},
			// 点赞资源
			async likeSource() {
				let params = {
					sourceId: this.sourceId
				}
				const data = await likeSourceById(params);
				if (data.code === "00000") {
					uni.showToast({
						icon: "success",
						title: "点赞成功"
					})
					this.sourceInfo.isLike = 1;
					this.sourceInfo.source_likes_users.push(2); // 点赞数加一
				} else {
					uni.showToast({
						icon: "error",
						title: data.message
					})
				}
			},
			// 获取所有评论列表
			async getCommentListAsync() {
				let params = {
					article_id: this.sourceId,
					commentType: this.commentType
				};
				const data = await getCommentList(params);
				if (data.code === "00000") {
					this.commentList = data.data.commentList;
					this.commentData = {
						"readNumer": this.sourceInfo.source_views,
						"commentSize": data.data.commentList.length,
						"comment": this.getTree(data.data.commentList)
					}
				} else {
					uni.showToast({
						icon: "error",
						title: data.message
					})
				}
			},
			// 格式化评论列表
			getTree(data) {
				let result = [];
				let map = {};
				data.forEach(item => {
					map[item.id] = item;
				});
				data.forEach(item => {
					let parent = map[item.parentId];
					if (parent) {
						(parent.children || (parent.children = [])).push(item);
					} else {
						result.push(item);
					}
				});
				console.log("格式化之后", result)
				return result;
			},
			// 添加评论
			async add(item) {
				let params = {
					articleId: this.sourceId,
					pId: item.pId,
					content: item.content,
					commentType: this.commentType
				}
				const data = await addComment(params);
				if (data.code === "00000") {
					uni.showToast({
						icon: "success",
						title: "评论成功"
					})
					this.getCommentListAsync();
					this.$refs.hbComment.closeInput();
				} else {
					uni.showToast({
						icon: "error",
						title: data.message
					})
				}
			},
			// 删除评论
			async del(item) {
				console.log("删除评论", item);
				let params = {
					id: item,
					articleId: this.sourceInfo.source_id,
					commentType: this.commentType
				}
				const data = await deleteComment(params);
				if (data.code === "00000") {
					uni.showToast({
						icon: "success",
						title: "删除成功"
					})
					this.getCommentListAsync(); // 点赞成功刷新评论
				} else {
					uni.showToast({
						icon: "error",
						title: data.message
					})
				}
			},
			// 点赞评论
			async like(item) {
				let params = {
					id: item,
					commentType: this.commentType
				}
				const data = await likeComment(params);
				if (data.code === "00000") {
					this.getCommentListAsync(); // 点赞成功刷新评论
				} else {
					uni.showToast({
						icon: "error",
						title: data.message
					})
				}
			},
			// 聚焦回复
			focusOn() {
				// 未登录
				if (!this.$store.state.token) {
					uni.navigateTo({
						url: "/pages/login/login"
					})
				}
			},
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
				margin: 20rpx 0;
				font-size: $uni-font-size-lg;
				font-weight: 800;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 50rpx;
				box-sizing: border-box;
				word-break: break-word;
				text-align: center;
			}

			.source_abstract {
				padding: 0 80rpx;
				display: flex;
				text-align: justify;
				.abstract-text {
					color: #909399;
					font-size: 30rpx;
				}
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

				.screen-img {
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

				.hr {
					height: 100%;
					width: 2rpx;
					background-color: #eee;
				}

				.views {
					height: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					flex: 1;

					.iconfont {
						margin-right: 10rpx;
						font-size: $uni-font-size-lg;
					}

					/deep/ .u-text {
						flex: initial !important;
					}

					.views-text {
						color: #909399;
					}

					.like-active {
						color: $uni-color-primary;
					}
				}

				.like-active {
					color: $uni-color-primary;
				}
			}
		}


		.link-button {
			margin-top: 40rpx;
			background-color: $uni-bg-color;
			display: flex;
			flex-direction: column;
			padding: 40rpx 40rpx 0 40rpx;

			.link-bt {
				height: 100rpx;
				width: 100%;
				background: linear-gradient(to right, rgb(93, 188, 216), rgb(213, 51, 186));
				margin-bottom: 40rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: $uni-border-radius-lg;

				/deep/ .u-link {
					flex: inherit;
					display: flex;
					width: 100%;
					justify-content: center;
					height: 100%;
					align-items: center;
				}
			}
		}

		.comment-box-wrapper {
			background-color: $uni-bg-color;
			margin-top: 20rpx;
		}
	}
</style>
