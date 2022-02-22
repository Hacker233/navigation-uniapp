<template>
	<view class="person-box">
		<!-- 用户信息区域 -->
		<view class="userInfo-box">
			<!-- 背景图 -->
			<img class="bgc-img" :src="backgroundImage" mode="" />
			<!-- <person-design></person-design> -->
			<view class="status_bar">
				<!-- 这里是状态栏 -->
			</view>
			<!-- 页面标题 -->
			<view class="page-title">
				<view class="setting" v-if="userInfo" @click="toSetting">
					<i class="iconfont pig-changyong_shezhi"></i>
				</view>
				<view class="title">
					我的
				</view>
			</view>
			<!-- 个人信息卡片 -->
			<view class="user-info">
				<!-- 头像 -->
				<view class="left">
					<template v-if="userInfo">
						<u-avatar :src="userInfo.avatar" size="80" @click="updateAvater"></u-avatar>
						<i class="iconfont pig-xiangji3"></i>
					</template>
					<template v-else>
						<u-avatar text="猪" size="80"></u-avatar>
					</template>
				</view>
				<!-- 用户名称 -->
				<view class="right">
					<template v-if="userInfo">
						<view class="user-detail">
							<!-- 用户名 -->
							<view class="username">
								{{userInfo.username}}
							</view>
						</view>
					</template>
					<template v-else>
						<view class="toLogin" @click="toLogin">去登录</view>
					</template>
				</view>
				<!-- 签名 -->
				<view class="signature" v-if="userInfo">
					{{userInfo.signature}}
					<i class="iconfont pig-changyong_pingjia" @click="changeSignature"></i>
				</view>

				<!-- 其它信息区域 -->
				<view class="user-other-info">
					<!-- 用户积分 -->
					<view class="userlevel" @click="toscore">
						<view class="score-num">
							<i class="iconfont pig-jifen1"></i>
							<text class="score-text">{{userlevelInfo.level_score || 0}}</text>
						</view>
						<text class="my-score">我的积分</text>
					</view>
					<u-line direction="col"></u-line>
					<!-- 签到 -->
					<view class="user-sign" @click="tosign">
						<i class="iconfont pig-qiandao1"></i>
						<text v-show="!toIsSign">签到</text>
						<text v-show="toIsSign">已签到</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 用户菜单区域 -->
		<view class="user-setting-menu">
			<user-menu></user-menu>
		</view>

		<!-- tabbar -->
		<tab-bar></tab-bar>

		<!-- 签到弹窗 -->
		<sign-dialog :show="show" @closeDialog="closeDialog"></sign-dialog>
	</view>
</template>

<script>
	import UserMenu from "./components/UserMenu.vue"
	import CONFIG from "@/config/index.js"
	import moment from 'moment'
	import {
		throttle
	} from "@/utils/throttle.js"; //引入节流函数
	import {
		getUserSignList,
		userSign
	} from "@/http/api/sign"
	export default {
		data() {
			return {
				show: false,
				backgroundImage: 'https://smallpig.site:9000/navigation/bg/bg-1.jpg',
				show: false, // 签到弹窗
				signList: [],
				toIsSign: false, // 今日是否签到
				today: moment(new Date()).format("YYYY-MM-DD")
			}
		},
		computed: {
			// 用户基本信息
			userInfo() {
				return this.$store.state.userInfo
			},
			// 用户积分信息
			userlevelInfo() {
				return this.$store.state.userlevelInfo
			}
		},
		onShow() {
			let randNum = this.getRandomInt(1, 8);
			this.backgroundImage = `https://smallpig.site:9000/navigation/bg/bg-${randNum}.jpg`;
			// 获取用户签到信息
			if (uni.getStorageSync("token")) {
				this.getUserSignListInfo();
			}
		},
		components: {
			UserMenu
		},
		mounted() {},
		methods: {
			// 获取随机数
			getRandomInt(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},
			// 获取用户签到信息
			async getUserSignListInfo() {
				const data = await getUserSignList();
				if (data.code === "00000") {
					if (data.data.length) {
						this.signList = data.data; // 签到列表
						if (this.today == this.signList[0].sign_last) {
							this.toIsSign = true;
						} else {
							this.toIsSign = false;
						}
					} else {
						this.toIsSign = false;
					}
				} else {
					uni.$u.toast("请求签到信息失败！");
				}
			},
			// 跳转到登录页面
			toLogin() {
				uni.navigateTo({
					url: "/pages/login/login"
				})
			},
			// 跳转至设置页面
			toSetting() {
				uni.navigateTo({
					url: `/pages/setting/index`
				})
			},
			// 跳转到裁剪页面
			updateAvater() {
				uni.navigateTo({
					url: `/pages/avatar/index`
				})
			},
			// 修改签名
			changeSignature() {
				uni.navigateTo({
					url: `/pages/signature/index?oldSignature=${this.userInfo.signature}`
				})
			},
			// 跳转至积分
			toscore() {
				uni.$u.toast("卖力开发中");
			},
			tosign: throttle(async function() {
				if (this.toIsSign) {
					uni.$u.toast("今日已签到");
					return;
				} else {
					const data = await userSign();
					if (data.code === "00000") {
						this.getUserSignListInfo();
						this.$store.dispatch("getUserlevelInfo"); // 获取用户积分信息
						uni.$u.toast("签到成功，积分+1");
					} else {
						uni.$u.toast(data.message);
					}
				}
			}),
			// 跳转至签到
			// async tosign() {
			// 	if (this.toIsSign) {
			// 		uni.$u.toast("今日已签到");
			// 		return;
			// 	} else {
			// 		const data = await userSign();
			// 		if (data.code === "00000") {
			// 			this.getUserSignListInfo();
			// 			this.$store.dispatch("getUserlevelInfo"); // 获取用户积分信息
			// 			uni.$u.toast("签到成功，积分+1");
			// 		} else {
			// 			uni.$u.toast(data.message);
			// 		}
			// 	}
			// },
			// 关闭签到弹窗
			closeDialog() {
				this.show = false;
			},
		},
	}
</script>

<style lang="scss">
	page {
		padding: 0;
	}

	.person-box {
		.userInfo-box {
			width: 100%;
			height: 400rpx;
			position: relative;

			.status_bar {
				height: var(--status-bar-height);
				width: 100%;
			}

			.bgc-img {
				position: absolute;
				// filter: blur(1px);
				opacity: 0.9;
				width: 100%;
				height: 100%;
				border-radius: 100% / 0 0 28% 28%;
			}

			.page-title {
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0 30rpx 0 30rpx;
				box-sizing: border-box;
				position: relative;

				.title {
					font-weight: 600;
					font-size: $uni-font-size-lg;
					color: $uni-bg-color;
					z-index: 2;
				}

				.setting {
					position: absolute;
					left: 40rpx;
					top: 50%;
					transform: translate(0, -50%);
					z-index: 2;

					.pig-changyong_shezhi {
						font-size: 40rpx;
						color: $uni-bg-color;
					}
				}
			}

			.user-info {
				width: 80vw;
				background-color: $uni-bg-color;
				border-radius: 30rpx;
				position: absolute;
				left: 50%;
				top: 66%;
				transform: translate(-50%, 0);
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 20rpx 0 0 0;
				box-shadow: 0 8px 10px rgba(31, 45, 61, 0.2);
			}


			.left {
				display: flex;
				align-items: center;
				position: absolute;
				top: -80rpx;
				border: 12rpx solid #fff;
				border-radius: 50%;
				box-shadow: 13px 13px 15px rgba(255, 255, 255, 0.2);

				/deep/ .u-upload__wrap {
					width: 160rpx;
					height: 160rpx;

					.u-upload__wrap__preview {
						margin: 0;
					}
				}

				.pig-xiangji3 {
					font-size: 40rpx;
					position: absolute;
					right: -4rpx;
					top: 116rpx;
				}
			}

			.right {
				margin-top: 80rpx;
				height: 80rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				.user-detail {
					display: flex;
					flex-direction: column;

					.username {
						font-size: $uni-font-size-lg;
						margin-bottom: 10rpx;
						font-weight: 600;
					}
				}

				.toLogin {
					font-size: $uni-font-size-title;
					font-weight: 800;
					color: $uni-color-primary;
					letter-spacing: 4rpx;
				}
			}

			.signature {
				font-size: $uni-font-size-base;
				color: $uni-color-subtitle;
				display: flex;
				align-items: center;
				justify-content: center;

				.iconfont {
					margin-left: 20rpx;
				}
			}

			.user-other-info {
				height: 100rpx;
				width: 80vw;
				margin-top: 20rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				border-top: 1px solid #ccc;

				.userlevel {
					height: 100%;
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					color: #ccac09;
					font-size: 20rpx;

					.score-num {
						display: flex;

						.iconfont {
							margin-right: 6rpx;
						}

						.score-text {
							display: flex;
							align-items: center;
							padding: 0 0 2rpx 0;
						}
					}

					.my-score {
						font-size: 20rpx;
					}
				}

				// 签到
				.user-sign {
					height: 100%;
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					color: #ccac09;
					font-size: 24rpx;
				}
			}
		}

		// 菜单列表
		.my-like-box {
			margin: 140rpx 0;
		}

		.user-setting-menu {
			max-height: 360rpx;
			margin: 240rpx 20rpx 0 20rpx;
			box-shadow: 0 8px 10px rgba(31, 45, 61, 0.2);
			padding: 20rpx;
			box-sizing: border-box;
			border-radius: $uni-border-radius-lg;
		}
	}
</style>
