<template>

	<view class="category-list-box">
		<scroll-view scroll-x="true">
			<view class="category-item-box">
				<view :class="['category-item',{'active':current === index}]" v-for="(item,index) in categoryList"
					:key="index" @click="chooseCategory(item,index)">
					<i class="iconfont" :class="item.socategory_icon"></i>
					<text>{{item.socategory_name}}</text>
				</view>
			</view>
		</scroll-view>
	</view>

</template>

<script>
	export default {
		// 样式穿透
		options: {
			styleIsolation: 'shared'
		},
		props: {
			categoryList: {
				type: Array,
				default: () => []
			},
			current: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {}
		},
		mounted() {},
		methods: {
			// 选择分类
			chooseCategory(item, index) {
				item.index = index;
				console.log("item", item)
				this.$emit("chooseCategory", item);
			}
		}
	}
</script>

<style lang="scss">
	.category-list-box {
		height: 120rpx;
		display: flex;
		align-items: center;

		/deep/ .uni-scroll-view {
			height: 120rpx;

			.uni-scroll-view-content {
				display: flex;
				align-items: center;
				padding: 0 20rpx;
				box-sizing: border-box;
			}
		}

		.category-item-box {
			display: flex;
			padding: 0 20rpx;

			.category-item {
				height: 70rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border: 1px solid #ccc;
				flex-shrink: 0;
				margin-right: 16rpx;
				padding: 0 10rpx;
				border-radius: 20px;
				font-size: $uni-font-size-base;
				letter-spacing: 3rpx;
				transition: all 0.3s;
				margin: 20rpx 18rpx 20rpx 0;

				.iconfont {
					margin-right: 6rpx;
				}
			}

			.active {
				box-shadow: 0 6px 8px rgba(32, 160, 255, 30%);
				background: #20a0ff;
				color: $uni-bg-color;
				border: 1px solid $uni-color-primary;
			}
		}
	}
</style>
