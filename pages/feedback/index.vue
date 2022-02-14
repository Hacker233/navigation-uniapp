<template>
	<view class="feedback-box">
		<view class="feedback-title">
			联系我们
		</view>
		<!-- 二维码 -->
		<view class="feedback-qrcode">
			<img class="feedback-img" src="../../static/img/qrcode.jpg" mode="" @click="previewImage(0)" />
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			previewImage(index) {
				let photoList = [];
				photoList.push('../../static/img/qrcode.jpg')
				uni.previewImage({
					current: index,
					urls: photoList
				});
			},
		}
	}
</script>

<style lang="scss">
	.feedback-box {
		.feedback-title {
			width: 30vw;
			height: 60rpx;
			border-radius: 20rpx;
			margin: 0 auto;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
			background: #b92b27;
			/* fallback for old browsers */
			background: -webkit-linear-gradient(to right, #1565C0, #b92b27);
			/* Chrome 10-25, Safari 5.1-6 */
			background: linear-gradient(to right, #1565C0, #b92b27);
			/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
		}

		.feedback-qrcode {
			width: 400rpx;
			height: 400rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 0 auto;
			margin-top: 40rpx;
			border-radius: 20rpx;
			background: #7F7FD5;
			/* fallback for old browsers */
			background: -webkit-linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);
			/* Chrome 10-25, Safari 5.1-6 */
			background: linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);

			/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
			.feedback-img {
				width: 360rpx;
				height: 360rpx;
			}
		}
	}
</style>
