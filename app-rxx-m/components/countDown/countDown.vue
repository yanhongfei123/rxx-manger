<template>
	<view class="get-code" :style="{color:color,'font-size': fontSize}" @click="dispatchCountDown">{{ countMsg }}</view>
</template>

<script>
	export default {
		props: {
			countDownText: {
				type: [String],
				default: '获取验证码'
			},
			color: {
				type: [String],
				default: '#FF9833'
			},
			size: {
				type: [Number],
				default: 30
			},
			count: {
				type: [Number],
				default: 60
			},

		},
		data() {
			return {
				disabled: false,
				isCountIng: false,
				defaultNum: 0,
			}
		},
		computed: {
			countMsg() {
				if (this.isCountIng) {
					return `${this.defaultNum}秒后重发`
				}
				return '获取验证码'
			},
			fontSize(){
				return `${this.size}upx`
			}
		},
		methods: {
			countDown() {
				if (this.isCountIng) {
					return
				}
				let defaultNum = this.count;
				defaultNum--;
				this.defaultNum = defaultNum;
				this.isCountIng = true;
				this.timer = setInterval(() => {
					if (this.defaultNum > 1) {
						this.defaultNum--;
					} else {
						this.isCountIng = false;
						//this.disabled = false;
						clearInterval(this.timer);
					}
				}, 1000)

			},
			dispatchCountDown() {
				if(!this.isCountIng){
					this.$emit('countDown'); // 派发一个countDown事件
				}				
			}
		},
		onUnload() {
			this.isCountIng = false;
			clearInterval(this.timer);
			//console.log('退出了页面')
			//console.log(this.defaultNum)
		},
		onShow() {
			//this.isCountIng = false;
			//console.log(this.defaultNum)
		}
	}
</script>

<style>

</style>
