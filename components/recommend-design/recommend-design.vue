<template>
	<view class="c">
		<view class="drop drop1"></view>
		<view class="drop drop2"></view>
		<view class="text-c">
			<h1 class="title">科技趣玩</h1>
			<p class="subtitle">资料分享大师</p>
		</view>
	</view>
</template>

<script>
</script>

<style>
	.c {
		position: relative;
		background: linear-gradient(to right, #12c2e9, #c471ed, #f64f59);
		background: #318cfe;
		font-family: "Montserrat", sans-serif;
		height: 300rpx;
		width: 100vw;
		overflow: hidden;
	}

	.text-c {
		position: relative;
		z-index: 3;
		display: flex;
		height: 300rpx;
		width: 100vw;
		flex-direction: column;
		align-items: center;
	}

	.title {
		font-size: 70rpx;
		color: white;
		margin-bottom: 20rpx;
		margin-top: 88rpx;
	}

	.drop {
		position: absolute;
		height: 80px;
		width: 80px;
		background: #54abfb;
		border-radius: 51% 49% 48% 52% / 62% 44% 56% 38%;
		opacity: 0.8;
		border: 2px solid #3d93ff;
	}

	.drop::before {
		content: "";
		position: absolute;
		height: 100%;
		width: 100%;
		background: #318cfe;
		border-radius: 51% 49% 48% 52% / 62% 44% 56% 38%;
		box-shadow: -20px 30px 16px #1b6cfb, -40px 60px 32px #1b6cfb,
			inset -6px 6px 10px #1b6cfb, inset 2px 6px 10px #1a74e5,
			inset 20px -20px 22px white, inset 40px -40px 44px #a8ceff;
	}

	.drop::after {
		content: "";
		position: absolute;
		height: 40rpx;
		width: 40rpx;
		background: #e6fdfb;
		border-radius: 44% 56% 46% 54% / 36% 50% 50% 64%;
		left: 94rpx;
		top: 36rpx;
		box-shadow: 16px 40px 0 -10px white;
		opacity: 0.8;
	}

	.drop1 {
		left: 120rpx;
		top: 52rpx;
	}

	.drop2 {
		right: 148rpx;
		bottom: 40rpx;
		z-index: 1;
		border-radius: 46% 50% 39% 54% / 56% 57% 50% 50%;
	}

	.drop2::before {
		border-radius: 46% 50% 39% 54% / 56% 57% 50% 50%;
	}

	.subtitle {
		line-height: 0;
		color: white;
		font-size: 30rpx;
		font-family: "Montserrat";
	}
</style>
