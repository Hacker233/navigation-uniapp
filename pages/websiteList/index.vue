<template>
	<view class="websilte-card-lits-box">
		<!-- 内容区域 -->
		<view class="website-card-box">
			<template v-if="!isShowNoData">
				<website-card :websiteList="websiteList" :menuIcon="menuIcon" v-if="!showLoading"></website-card>
				<u-loading-icon color="red" :show="showLoading"></u-loading-icon>
			</template>
			<template v-else>
				<no-data></no-data>
			</template>
		</view>
	</view>
</template>

<script>
	import {
		queryMenuWebsite
	} from "@/http/api/website";
	export default {
		data() {
			return {
				isShowNoData: false, // 是否展示无数据页面
				websiteList: [],
				menuId: '', // 菜单id
				menuIcon: '',
				showLoading: false,
			}
		},
		onLoad(option) {
			this.menuId = option.menuId;
			this.menuIcon = option.menuIcon;
			uni.setNavigationBarTitle({
				title: option.title
			})
		},
		//监听下拉刷新
		onPullDownRefresh() {
			this.init();
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				this.queryMenuWebsiteAsync();
			},
			// 获取所有站点
			async queryMenuWebsiteAsync() {
				this.showLoading = true;
				let params = {
					menuId: this.menuId,
				};
				const data = await queryMenuWebsite(params);
				if (data.code === "00000") {
					this.websiteList = data.data;
					// 没有数据
					if (!this.websiteList.length) {
						this.isShowNoData = true;
					}
					this.showLoading = false;
					uni.stopPullDownRefresh();
				} else {
					uni.$u.toast(data.message);
					this.showLoading = false;
					uni.stopPullDownRefresh();
				}
			},
		}
	}
</script>

<style>
</style>
