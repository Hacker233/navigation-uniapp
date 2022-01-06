<template>
	<view class="article-content-index-box">
		<!-- 文章文章内容 -->
		<view class="article-left-box">
			<article-content :articleId="articleId"></article-content>
		</view>
	</view>
</template>
<script>
	import ArticleContent from "./components/ArticleContent";
	export default {
		// 样式穿透
		options: {
			styleIsolation: 'shared'
		},
		data() {
			return {
				articleId: 0,
			}
		},
		components: {
			ArticleContent
		},
		onLoad(option) {
			this.articleId = Number(option.articleId);
		}
	};
</script>
<style lang="scss">
	.article-content-index-box {
		overflow: hidden;
		border-radius: $uni-border-radius-base;

		.article-left-box {}
	}
</style>
