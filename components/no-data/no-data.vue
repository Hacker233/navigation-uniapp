<template>
	<view class="no-data-box">
		<img class="no-data-img" src="../../static/img/no-data.png" mode="" />
		<p class="text">暂无数据</p>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.no-data-box {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 600rpx;
		.no-data-img {
			width: 200rpx;
			height: 200rpx;
		}
	}
</style>
