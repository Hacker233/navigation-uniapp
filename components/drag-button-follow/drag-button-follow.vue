<template>
	<view <!-- #ifndef MP-WEIXIN -->
		:style="{
		transform: `translate(${offsetX}px, ${offsetY}px)`,
		MsTransform: `translate(${offsetX}px, ${offsetY}px)`,
		MozTransform: `translate(${offsetX}px, ${offsetY}px)`,
		WebkitTransform: `translate(${offsetX}px, ${offsetY}px)`,
		OTransform: `translate(${offsetX}px, ${offsetY}px)`,
		transition: move ? 'none' : 'transform 0.2s ease-in-out',
		MsTransition: move ? 'none' : 'transform 0.2s ease-in-out',
		MozTransition: move ? 'none' : 'transform 0.2s ease-in-out',
		WebkitTransition: move ? 'none' : 'transform 0.2s ease-in-out',
		OTransition: move ? 'none' : 'transform 0.2s ease-in-out'
		}"
		<!-- #endif -->
		@click.stop="click"
		@touchmove.stop.prevent="touchmove"
		@touchstart="touchstart"
		@touchend="touchend"
		>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: 'DragButtonFollow',
		props: {
			className: {
				type: String,
				default: ''
			},
			// #ifdef MP-WEIXIN
			style: {
				type: String,
				default: ''
			},
			// #endif
			drag: {
				type: Boolean,
				default: true
			},
			follow: {
				type: String | Boolean,
				default: 'all'
			},
			followNum: {
				type: Number,
				default: 0
			},
		},
		safeArea: {},
		data() {
			return {
				offsetX: 0,
				offsetY: 0,
				width: 0,
				height: 0,
				left: 0,
				top: 0,
				move: false,
				foll: {

				}
			}
		},
		mounted() {
			const systemInfo = uni.getSystemInfoSync() || {}
			this.$options.safeArea = {
				left: 0,
				top: 0,
				right: systemInfo.windowWidth,
				bottom: systemInfo.windowHeight
			}
			const query = this.$parent.createSelectorQuery()
			query.select(`.${this.className}`).boundingClientRect(data => {
				if (data) {
					this.width = data.width
					this.height = data.height
					this.left = data.left
					this.top = data.top
				}
			}).exec()
			if (this.follow) {
				const type = this.follow.split(",")
				let isLeft, isRight, isTop, isBottom, isAll, num
				type.forEach(_ => {
					if (_ === 'all') isAll = true
					if (_ === 'left') isLeft = true
					if (_ === 'right') isRight = true
					if (_ === 'top') isTop = true
					if (_ === 'bottom') isBottom = true
				})
				if (isAll) isLeft = isRight = isTop = isBottom = true
				num = Math.round(this.width * this.followNum / 100)
				this.foll = {
					isLeft,
					isRight,
					isTop,
					isBottom,
					num
				}
			}
		},
		methods: {
			click() {
				this.$emit('btnClick');
			},
			touchstart(e) {
				if (!this.drag) return
				this.move = true
			},
			touchmove(e) {
				if (!this.drag) return
				if (!this.move) return
				const {
					left,
					right,
					top,
					bottom
				} = this.$options.safeArea
				const dot = e.changedTouches[0]
				if (dot.clientX < left + this.width / 2) dot.clientX = left + this.width / 2
				if (dot.clientX > right - this.width / 2) dot.clientX = right - this.width / 2
				if (dot.clientY < top + this.height / 2) dot.clientY = top + this.height / 2
				if (dot.clientY > bottom - this.height / 2) dot.clientY = bottom - this.height / 2
				this.offsetX = dot.clientX - this.left - this.width / 2
				this.offsetY = dot.clientY - this.top - this.height / 2
				// #ifdef MP-WEIXIN
				this.$emit("update:style", `
					transform: translate(${this.offsetX}px, ${this.offsetY}px);
					WebkitTransform: translate(${this.offsetX}px, ${this.offsetY}px);
					transition: ${this.move ? 'none' : 'transform 0.2s ease-in-out'};
					WebkitTransition: ${this.move ? 'none' : 'transform 0.2s ease-in-out'};
				`)
				// #endif
			},
			touchend(e) {
				if (!this.drag) return
				this.move = false
				if (!this.follow) return
				const dot = e.changedTouches[0]
				const {
					left,
					right,
					top,
					bottom
				} = this.$options.safeArea
				if (this.foll.isLeft && this.foll.isRight) {
					if (dot.clientX <= (left + right) / 2) this.offsetX = this.foll.num - this.left
					if (dot.clientX > (left + right) / 2) this.offsetX = right - this.width - this.foll.num - this.left
				} else if (this.foll.isLeft) {
					this.offsetX = this.foll.num - this.left
				} else if (this.foll.isRight) {
					this.offsetX = right - this.width - this.foll.num - this.left
				}
				if (this.foll.isTop && this.foll.isBottom) {
					if (dot.clientY <= (top + bottom) / 2) this.offsetY = this.foll.num - this.top
					if (dot.clientY > (top + bottom) / 2) this.offsetY = bottom - this.height - this.foll.num - this.top
				} else if (this.foll.isTop) {
					this.offsetY = this.foll.num - this.top
				} else if (this.foll.isBottom) {
					this.offsetY = bottom - this.height - this.foll.num - this.top
				}
				// #ifdef MP-WEIXIN
				this.$emit("update:style", `
					transform: translate(${this.offsetX}px, ${this.offsetY}px);
					WebkitTransform: translate(${this.offsetX}px, ${this.offsetY}px);
					transition: ${this.move ? 'none' : 'transform 0.2s ease-in-out'};
					WebkitTransition: ${this.move ? 'none' : 'transform 0.2s ease-in-out'};
				`)
				// #endif
			},
		}
	}
</script>
<style scoped>
	/* #ifdef MP-WEIXIN */
	view {
		height: 100%;
		width: 100%;
		display: inherit;
		justify-content: inherit;
		align-items: inherit;
	}

	/* #endif */
</style>
