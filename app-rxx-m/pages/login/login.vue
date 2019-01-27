<template>
	<view class="content">
		<view class="auto-wrap">
			<image src="../../static/img/app-logo.png" class="logo" />
			<view class="input-group">
				<view class="input-row border">
					<image class="icon-m icon" src="../../static/img/shouji.png" />
					<uni-input class="uni-input" maxlength="11" type="tel" clearable focus v-model="account" placeholder="请输入手机号"></uni-input>
				</view>
				<view class="input-row">
					<image class="icon-p icon" src="../../static/img/suo.png" />
					<uni-input type="password" displayable v-model="password" placeholder="请输入密码"></uni-input>
				</view>
			</view>


			<view class="action-row">
				<navigator class="navigator f-pas" url="../pwd/pwd">忘记密码 ?</navigator>
				<navigator class="navigator register" url="../reg/reg">新用户注册</navigator>
			</view>

			<view class="btn-row login-wrap">
				<button type="primary" id="primary" :class="[!disabled?'primary':'']" :loading="loading" hover-class="other-button-hover"
				 :disabled="disabled" @tap="bindLogin">登录</button>
			</view>

			<view class="footer">
				<view class="footer-des">信贷用户请下载融小小客户端，此版为贷款经理专用</view>
				<view class="down-load">立即下载</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	import uniInput from '../../components/uni-input.vue'
	//#ifdef APP-PLUS
	import JPushPlugin from '../../utils/jpush.js'
	//#endif
	export default {
		components: {
			uniInput
		},
		data() {
			return {
				loading: false,
				account: '',
				password: '',
				positionTop: 0,
				cld: '',
			}
		},
		computed: {
			...mapState(['token']),
			disabled() {
				if (this.account && this.password) {
					return false
				}
				return true;
			}
		},
		methods: {
			...mapActions(['Login']),
			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			bindLogin() {
				if (this.account.length < 11) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的手机号'
					});
					return;
				}
				if (this.password.length < 4) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为4个字符'
					});
					return;
				}
				const data = {
					phone: this.account,
					password: this.password,
					type: 2,
				};

				//#ifdef MP-WEIXIN
				data['source'] = 1;
				data['getui_id'] = '';
				//#endif

				//#ifdef APP-PLUS	
				if (plus.os.name == 'Android') {
					data['getui_id'] = this.cld;
					data['source'] = 3
				} else {
					data['getui_id'] = '';
					data['source'] = 2
				}
				//#endif

				this.$store.dispatch('Login', data).then(res => {
					uni.setStorageSync('userInfo', JSON.stringify(res.data));
					uni.switchTab({
						url: '../home/home',
					});
				})
			},
			getClientId(){
				var that = this;
				uni.getProvider({
					service: 'push',
					success: function(res) {
						// 个推的名称为 igexin
						if (~res.provider.indexOf('igexin')) {
							// 已开启push接收
							uni.subscribePush({
								provider: 'igexin',
								success: function(res) {
									that.cld = res.clientid;
									plus.nativeUI.alert('success:' + JSON.stringify(res));
								}
							});
						}
					}
				});
			}


		},
		onLoad() {	
			var that = this;
			this.initPosition();		
			//#ifdef APP-PLUS	
			if (plus.os.name == 'iOS') {

			}else{
				this.getClientId();
				setTimeout(()=>{
					this.getClientId();
				}, 3000)
			}			 
			//#endif		
		}
	}
</script>

<style lang="scss">
	.content {
		height: 100%;
		background: #fff;
	}

	.auto-wrap {
		width: 600upx;
		margin: 0 auto;
	}

	.input-row {
		height: 116upx;
		display: flex;
		align-items: center;
		border-bottom: 2upx solid #e6e6e6;
	}

	.uni-input {
		padding-left: 36upx;
	}

	.logo {
		width: 134rpx;
		height: 134upx;
		margin: 134rpx auto;
		display: block;
	}

	.icon {
		width: 30rpx;
		height: 38upx;
		margin-right: 25upx;
	}

	.action-row {
		padding: 32upx 0;
		display: flex;
		justify-content: space-between;

		.f-pas {
			font-size: 30upx;
			color: #BBB;
		}

		.register {
			font-size: 30upx;
			color: #FF9833;
		}
	}

	.btn-row {
		margin: 80upx 0 135upx;
		border-radius: 100upx;
		over-flow: hidden;

		#primary {
			width: 600upx;
			height: 88upx;
			line-height: 88upx;
			background: #BBB;
			border-radius: 100upx;
			font-size: 34upx;

			&.primary {
				background: #FF9833;
				color: #fff;
			}
		}


	}

	.footer {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.footer-des {
			width: 360upx;
			color: #BBB;
			font-size: 30upx;
		}

		.down-load {
			width: 134upx;
			height: 60upx;
			line-height: 60upx;
			font-size: 30upx;
			color: #FF9833;
			text-align: center;
			border: 2upx solid #FF9833;
			border-radius: 6upx;
		}
	}
</style>
