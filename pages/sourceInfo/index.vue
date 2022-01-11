<template>
	<view class="source-info-box">
		<!-- 资源详情卡片 -->
		<info-card :sourceId="sourceId"></info-card>
	</view>
</template>

<script>
	import InfoCard from "./components/InfoCard.vue"
	export default {
		data() {
			return {
				sourceId: '',
			}
		},
		components: {
			InfoCard
		},
		onLoad(option) {
			this.sourceId = option.sourceId;
		},
		
	}
</script>

<style>
</style>
