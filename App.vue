<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			//隐藏官方tabbar
			uni.hideTabBar()
			// 请求用户信息
			this.init();
		},
		onShow: function() {
			let pages = getCurrentPages() // 获取栈实例
			if (pages.length) {
				let page = pages[pages.length - 1].route // 获取当前页面的数据，包含页面路由
				uni.setStorageSync("tabIndex", uni.getStorageSync('tabIndex'));
			} else {
				uni.setStorageSync("tabIndex", 0);
			}
			console.log("选中的tab", uni.getStorageSync('tabIndex'))
			//隐藏官方tabbar
			uni.hideTabBar()
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			init() {
				console.log("获取用户信息", this.$store)
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
