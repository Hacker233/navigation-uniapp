<template>
	<view class="tabs">
		<scroll-view class="active-switch" scroll-x :scroll-into-view="id" scroll-with-animation>
			<view class="switch-container">
				<view v-for="(item,index) in TabList" :key="index"
					:class="['active-item',{'active':currentTab === index}]" @tap="tabChange(index)"
					:id='`tab_${index}`'>
					<i class="iconfont" :class="item.socategory_icon"></i>
					<text>{{item.socategory_name}}</text>
				</view>
			</view>
		</scroll-view>
		<!-- 内容显示区域 -->
		<view class="tab-pane-view" @touchstart='touchstart' @touchend='touchend'>
			<view class="tab-pane-group" :style="{transform:transformXx}">
				<slot></slot>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'Tabs',
		data() {
			return {
				id: 'tab_0',
				start: 0
			}
		},
		props: {
			TabList: {
				default: () => {
					return []
				},
				type: Array
			},
			currentTab: {
				default: 0,
				type: Number
			}
		},
		computed: {
			transformX() {
				let currentTab = this.currentTab;
				return `translate3d(${currentTab*100}%, 0px, 0px)`
			},
			transformXx() {
				let currentTab = this.currentTab;
				return `translate3d(-${currentTab*100}%, 0px, 0px)`
			}
		},
		methods: {
			tabChange(index) {
				if (this.currentTab != index) {
					this.$emit('tabs', index);
					this.id = `tab_${index}`
				}
			},
			touchstart(e) {
				this.start = e.touches[0].clientX;
			},
			touchend(e) {
				let end = e.changedTouches[0].clientX;
				if (end - this.start > 100 && this.currentTab >= 1) {
					this.tabChange(this.currentTab - 1)
				} else if (this.start - end > 100 && this.currentTab < this.TabList.length - 1) {
					this.tabChange(this.currentTab + 1)
				}
			}
		}
	}
</script>
<style lang="scss">
	.tabs {
		min-height: 56vh;
		display: flex;
		flex-direction: column;

		.active-switch {
			overflow: scroll;
			padding: 0 20rpx 0 20rpx;
			box-sizing: border-box;

			.switch-container {
				display: flex;
				flex-direction: row;
			}

			.active-item {
				height: 70rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border: 1px solid #ccc;
				flex-shrink: 0;
				margin-right: 16rpx;
				padding: 0 16rpx;
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

		.tab-pane-view {
			overflow: hidden;
			flex: 1;

			.tab-pane-group {
				display: block;
				white-space: nowrap;
				-webkit-transition: all 0.3s;
				transition: all 0.3s;
				width: 100%;
				overflow: visible;
				will-change: transform, left, top;
				min-height: 100upx;

				.tab-pane-item {
					width: 100%;
					min-height: 100upx;
					display: inline-block;
					white-space: initial;
					vertical-align: top;
					box-sizing: border-box;
					overflow: auto;
				}
			}
		}
	}
</style>
