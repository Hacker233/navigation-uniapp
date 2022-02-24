<script>
	export default {
		onLaunch: function() {
			this.$store.commit('setTabbarindex', 0); // 首次打开应用，tabbar默认选中第一个
			//隐藏官方tabbar
			uni.hideTabBar()
			// 请求用户信息
			this.init();
		},
		onShow: function() {
			//隐藏官方tabbar
			uni.hideTabBar()
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			init() {
				this.$store.dispatch("getUserInfo"); // 获取用户信息
				this.$store.dispatch("getUserlevelInfo"); // 获取用户积分信息
				this.$store.dispatch("getTabbarList"); // 获取tabbar
			},
		},
	}
</script>

<style lang="scss">
	@import "@/uni_modules/uview-ui/index.scss"; // 全局样式
	@import "style/article.scss"; // 文章详情样式
	@import url("./static/fonts/iconfont.css"); // 图标

	/*每个页面公共css */
	page {
		background-color: #f2f2f2;
		padding: 30rpx 30rpx;
		box-sizing: border-box;
	}
</style>
