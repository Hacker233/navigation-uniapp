<template>
	<!-- #ifdef H5 -->
	<transition name="fade">
	<!-- #endif -->
		<view class="mask" v-show="isActive" :class="{ 'full-screen': isFullScreen }" :style="{ backgroundColor }">
			<view class="spinner">
				<slot>
					<!--  ==========在这里改成选择的那一个========== -->
					<shrinkRect :color="color" :size="size" />
					<!--  ==========在这里改成选择的那一个========== -->
				</slot>
				<view v-if="text.length" :style="{ color:textColor }">
					{{ text }}
				</view>
			</view>
		</view>
	<!-- #ifdef H5 -->
	</transition>
	<!-- #endif -->
</template>

<script>
	// ==========在这里选一个你要的其他去掉也行==========
	// import loop from './loaders/loop.vue'
	// import bounce from './loaders/bounce.vue'
	// import doubleBounce from './loaders/double-bounce.vue'
	// import doubleCube from './loaders/double-cube.vue'
	// import doubleDot from './loaders/double-dot.vue'
	// import rotatePlane from './loaders/rotate-plane.vue'
	// import scaleOut from './loaders/scale-out.vue'
	import shrinkRect from './loaders/shrink-rect.vue'
	// ==========在这里选一个你要的其他去掉也行==========

	export default {
		name: 'ourLoading',
		components: {
			// ==========在这里选择一个==========
			// loop,
			// bounce,
			// doubleBounce,
			// doubleCube,
			// doubleDot,
			// rotatePlane,
			// scaleOut,
			shrinkRect
			// ==========在这里选择一个==========
		},
		props: {
			active: Boolean,
			translateY: {
				type: Number,
				default: 150
			},
			text: {
				type: String,
				default: ''
			},
			color: {
				type: String,
				default: 'rgb(213, 51, 186)'
			},
			textColor: {
				type: String,
				default: '#333'
			},
			isFullScreen: {
				type: Boolean,
				default: false
			},
			backgroundColor: {
				type: String,
				default: ''
			},
			size: {
				type: Number,
				default: 40
			}
		},
		data() {
			return {
				isActive: this.active || false
			}
		},
		watch: {
			active(value) {
				this.isActive = value
			}
		}
	}
</script>

<style scoped>
	.mask {
		transition: opacity .3s linear;
	}

	.full-screen {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}

	.spinner {
		margin-bottom: 30rpx;
		text-align: center;
	}

	/* #ifdef H5 */
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .3s;
	}

	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
	/* #endif */
</style>
