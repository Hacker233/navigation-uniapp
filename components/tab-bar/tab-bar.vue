<template>
	<u-tabbar :value="tabIndex" :fixed="true" :placeholder="true" :safeAreaInsetBottom="true" zIndex="99">
		<template v-for="(item,index) in tabbar">
			<u-tabbar-item v-if="item.tabbar_show === 1" :key="index" :name="index" :text="item.tabbar_name"
				@click="toPage">
				<i :class="['iconfont', item.tabbar_iconfont, 'active', 'u-page__item__slot-icon']"
					slot="active-icon"></i>
				<i :class="['iconfont', item.tabbar_iconfont, 'u-page__item__slot-icon']" slot="inactive-icon"></i>
			</u-tabbar-item>
		</template>
	</u-tabbar>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						iconfont: 'pig-zonghebaobiao',
						text: '推荐',
						pagePath: '/pages/recommend/index'
					},
					{
						iconfont: 'pig-liulanqi1',
						text: '网站',
						pagePath: '/pages/index/index'
					},
					{
						iconfont: 'pig-changyong_wenjian',
						text: '资源',
						pagePath: '/pages/create/index'
					},
					{
						iconfont: 'pig-geren',
						text: '我的',
						pagePath: '/pages/person/index'
					},
				]
			}
		},
		computed: {
			tabbar() {
				return this.$store.state.tabbar
			},
			tabIndex() {
				return this.$store.state.tabIndex
			}
		},
		methods: {
			toPage(index) {
				console.log("index", index)
				this.$store.commit('setTabbarindex', index);
				uni.switchTab({
					url: this.$store.state.tabbar[index].tabbar_path,
				})
			},
		},


	}
</script>

<style lang="scss" scoped>
	.iconfont {
		font-size: 36rpx;
	}

	.active {
		color: #1989fa;
	}
</style>
