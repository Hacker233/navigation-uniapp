<template>
	<view class='tab-pane-item'>
		<slot></slot>
	</view>
</template>
<script>
	export default {
		name: 'TabPane',
		props: {
			current: {
				default: 0,
				type: Number
			}
		}
	}
</script>
<style lang="scss">
	.tab-pane-item {
		width: 100%;
		height: 100%;
		display: inline-block;
		white-space: initial;
		vertical-align: top;
		font-size: 24upx;
		box-sizing: border-box;
		overflow: auto;
	}
</style>
