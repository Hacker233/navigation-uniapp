<template>
	<!-- 打分弹窗 -->
	<u-modal :show="ratingShow" title="给小程序打个分吧" @confirm="confirm" confirmText="提交评价" @close="closeRating"
		:closeOnClickOverlay="true">
		<view class="content-box">
			<!-- 五角星 -->
			<view class="star-box">
				<view class="star" v-for="(item,index) in starList" :key="index" @click="selectStar(item,index)">
					<i
						:class="['iconfont','pig--wujiaoxing',{'active': (curentStarIndex !== '') && index <= curentStarIndex}]"></i>
					<text :class="['title',{'select':curentStarIndex === index}]">{{item.title}}</text>
				</view>
			</view>
			<!-- 评价标签列表 -->
			<view class="tags-box">
				<view :class="['tags',{'active':index === curentTagIndex}]" v-for="(item,index) in tagsList"
					:key="index" @click="selectTag(item, index)">
					{{item.tag}}
				</view>
			</view>

			<!-- 吐槽内容区域 -->
			<view class="spit-box">
				<text class="spit">吐槽：</text>
				<u--textarea v-model="spitValue" placeholder="请输入内容" count></u--textarea>
			</view>

			<!-- 查看所有评价 -->
			<view class="see-all-rating">
				<view class="see-text" @click="toAllrating">
					查看所有评价
				</view>
			</view>
		</view>
	</u-modal>
</template>

<script>
	import {
		addRating
	} from "@/http/api/rating"
	export default {
		props: {
			ratingShow: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				starList: [{
					iconfont: 'pig--wujiaoxing',
					title: "很差",
				}, {
					iconfont: 'pig--wujiaoxing',
					title: "差",
				}, {
					iconfont: 'pig--wujiaoxing',
					title: "一般",
				}, {
					iconfont: 'pig--wujiaoxing',
					title: "满意",
				}, {
					iconfont: 'pig--wujiaoxing',
					title: "超赞",
				}],
				tagsList: [{
					tag: "很流畅"
				}, {
					tag: "广告太多"
				}, {
					tag: "卡爆了"
				}, {
					tag: "内容丰富"
				}, {
					tag: "配色难看"
				}],
				curentStarIndex: '', // 选中的star
				curentTagIndex: '', // 选中的标签
				spitValue: '', // 吐槽内容
				ratingKeyword: '', // 关键词
			}
		},
		methods: {
			// 关闭弹窗
			closeRating() {
				this.$emit("closeRating")
			},
			// 点击星星
			selectStar(item, index) {
				this.curentStarIndex = index;
			},
			// 点击标签
			selectTag(item, index) {
				this.curentTagIndex = index;
				this.ratingKeyword = item.tag;
			},
			// 提交评价
			async confirm() {
				if (this.curentStarIndex === '') {
					uni.$u.toast("请评价小星星哦~");
					return
				}
				let params = {
					ratingViews: this.spitValue,
					ratingGrade: this.curentStarIndex + 1,
					ratingKeyword: this.ratingKeyword,
				}
				const data = await addRating(params);
				if (data.code === "00000") {
					this.$emit("closeRating");
					uni.$u.toast("谢谢你的评价");
				} else {
					this.$emit("closeRating");
					uni.$u.toast(data.message);
				}
			},
			// 跳转至所有评价
			toAllrating() {
				uni.navigateTo({
					url: "/pages/allrating/index"
				})
			}
		}
	}
</script>

<style lang="scss">
	.content-box {
		display: flex;
		flex-direction: column;

		.star-box {
			display: flex;
			margin: 0 auto;
			align-items: center;
			height: 120rpx;

			.star {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.iconfont {
					margin: 0 10rpx;
					font-size: 36rpx;
					color: #ccc;
				}

				.active {
					color: yellow;
				}

				.title {
					font-size: 20rpx;
					margin-top: 10rpx;
					color: #b92b27;
					opacity: 0;
				}

				.select {
					opacity: 1;
				}
			}
		}

		.tags-box {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.tags {
				border: 2rpx solid #ccc;
				border-radius: 10rpx;
				font-size: 26rpx;
				padding: 6rpx 10rpx;
				margin-bottom: 20rpx;
			}

			.active {
				color: #fff;
				background: #b92b27;
				/* fallback for old browsers */
				background: -webkit-linear-gradient(to right, #1565C0, #b92b27);
				/* Chrome 10-25, Safari 5.1-6 */
				background: linear-gradient(to right, #1565C0, #b92b27);
				/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
			}
		}

		.spit-box {
			display: flex;
			justify-content: space-between;
			margin-top: 20rpx;

			.spit {
				font-size: 30rpx;
				color: #b92b27;
			}
		}

		.see-all-rating {
			display: flex;
			justify-content: center;
			align-items: flex-end;
			height: 74rpx;

			.see-text {
				font-size: 28rpx;
				color: rgb(41, 121, 255);
			}
		}
	}
</style>
