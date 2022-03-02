<template>
	<view class="web-view-box">
		<web-view :src="webViewSrc"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webViewSrc: ''
			}
		},
		onLoad(options) {
			this.webViewSrc = options.url;
		},
	}
</script>

<style>
</style>
