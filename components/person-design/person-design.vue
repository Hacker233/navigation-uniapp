<template>
	<view class="person-design-box">
		<div class='box'>
			<view class="title">{{username}}</view>
		</div>
	</view>
</template>
<script>
	export default {
		computed: {
			username() {
				return this.$store.state.userInfo.username ? this.$store.state.userInfo.username : 'HELLO'
			}
		}
	}
</script>
<style>
	/* latin-ext */
	@font-face {
		font-family: 'Wendy One';
		font-style: normal;
		font-weight: 400;
		font-display: swap;
		src: url(https://fonts.gstatic.com/s/wendyone/v12/2sDcZGJOipXfgfXV5wgzZmW5O7w.woff2) format('woff2');
		unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
	}

	/* latin */
	@font-face {
		font-family: 'Wendy One';
		font-style: normal;
		font-weight: 400;
		font-display: swap;
		src: url(https://fonts.gstatic.com/s/wendyone/v12/2sDcZGJOipXfgfXV5wgzaGW5.woff2) format('woff2');
		unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
	}

	.person-design-box {
		position: absolute;
		width: 100vw;
		height: 400rpx;
		font-family: 'Wendy One', sans-serif;
		background: #F7CA05;
		display: flex;
		align-content: center;
		justify-content: center;
		border-radius: 100% / 0 0 28% 28%;
	}

	.box {}

	.title {
		margin-top: 120rpx;
		font-size: 10vw;
		white-space: nowrap;
		overflow: hidden;
		color: #F7CA05;
		text-shadow: 0 10px 7px rgba(0, 0, 0, 0.4), 0 -4px 1px #fff;
		letter-spacing: 6rpx;
	}

	.title:hover {
		animation: glitch .3s linear infinite;
		cursor: pointer;
	}

	@keyframes glitch {
		0% {
			transform: translate(0);
		}

		20% {
			transform: translate(-2px, 2px);
		}

		40% {
			transform: translate(-2px, -2px);
		}

		60% {
			transform: translate(2px, 2px);
		}

		80% {
			transform: translate(2px, -2px);
		}

		100% {
			transform: translate(0);
		}
	}
</style>
