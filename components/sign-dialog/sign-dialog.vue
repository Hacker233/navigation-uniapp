<template>
	<view class="sign-dialog-box" v-if="show">
		<view class="sign-box">
			<!-- 关闭按钮 -->
			<view class="close-box" @click="closeDialog">
				<i class="iconfont pig-changyong_guanbi"></i>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			// 关闭弹窗
			closeDialog(){
				this.$emit("closeDialog")
			},
		}
	}
</script>

<style lang="scss" scoped>
	.sign-dialog-box {
		position: fixed;
		height: 100vh;
		width: 100vw;
		background: rgba(0, 0, 0, 0.6);
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s;

		.sign-box {
			position: relative;
			width: 80vw;
			height: 50vh;
			margin-bottom: 80rpx;
			background: #fff;
			border-radius: 20rpx;
			box-shadow: 0 8px 10px rgba(31, 45, 61, 0.2);

			.close-box {
				width: 60rpx;
				height: 60rpx;
				background: rgba(255, 255, 255, 0.8);
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #333;
				position: absolute;
				bottom: -130rpx;
				left: 50%;
				transform: translate(-50%, 0);
				.iconfont {
					font-size: 24rpx;
				}
			}
		}
	}
</style>
