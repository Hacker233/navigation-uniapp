<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 请求用户信息
			this.init();
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			init() {
				console.log("获取用户信息",this.$store)
				this.$store.dispatch("getUserInfo"); // 获取用户信息
			}
		},
	}
</script>

<style lang="scss">
	@import "@/uni_modules/uview-ui/index.scss"; // 全局样式
	@import  "style/article.scss"; // 文章详情样式
	@import url("./static/fonts/iconfont.css"); // 图标
	/*每个页面公共css */
	page {
		background-color: #f2f2f2;
		padding: 30rpx 30rpx;
		box-sizing: border-box;
	}
</style>
