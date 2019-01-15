<template>
	<view class="content">
		<view class="reg-label">新用户注册</view>
		<view class="input-group">
		<!-- 	<view class="input-row">
				<text class="title">手机号：</text>
				<uni-input type="text" maxlength="11" focus clearable v-model="phone" placeholder="请输入手机号码"></uni-input>
			</view> -->
			
			<view class="input-row">
				<text class="title">手机号：</text>
				<input class="uni-input" type="number" maxlength="11" v-model="phone" placeholder-class="placeholder" placeholder="请输入手机号码" />
			</view>

			<view class="input-row">
				<text class="title">验证码：</text>
				<!-- <uni-input type="text" maxlength="6" v-model="smscode" placeholder="请输入短信验证码"></uni-input> -->
				<input class="uni-input" type="number" maxlength="6" v-model="smscode" placeholder-class="placeholder" placeholder="请输入短信验证码" />
				<!-- <view @tap="getCode" class="get-code">获取验证码</view> -->
				<count-down ref="countDown" color="FF9833" size="30" @countDown="getCode"></count-down>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" :disabled="_disabled" @tap="register">下一步</button>
		</view>
	</view>
</template>

<script>
	import uniInput from '../../components/uni-input.vue';
	import countDown from '../../components/countDown/countDown.vue';
	import Validator from '../../utils/validator.js';
	import strategys from '../../utils/strategy.js';
	export default {
		components: {
			uniInput,
			countDown
		},
		computed: {
			_disabled() {
				if (this.phone && this.smscode) {
					return false
				}
				return true;
			}
		},
		data() {
			return {
				disabled: false,
				phone: '',
				smscode: ''
			}
		},
		onLoad(option) {
			if (option) {

			}
		},
		onShow() {
			console.log(this.disabled)
		},
		methods: {
			getCode() {
				var errorMsg = this.validateMobileFunc();
				if (errorMsg) {
					this.Util.Toast.toast(errorMsg);
					return
				}

				if (!this.disabled) {
					this.disabled = true;
					this.API.sendMsg({
						phone: this.phone,
						type: 1
					}).then(res => {
						// 短信发送成功才能开始倒计时
						this.$refs.countDown.countDown();
						this.Util.Toast.success('验证码已发送');
						setTimeout(() => {
							this.disabled = false;
						}, 6 * 1000)
					}).catch((res) => {
						this.disabled = false;
					});
				}
			},
			register() {
				var errorMsg = this.validateFunc();
				if (errorMsg) {
					this.Util.Toast.toast(errorMsg);
					return
				};
				uni.setStorageSync('phone', this.phone);
				uni.setStorageSync('smscode', this.smscode);
				this.disabled = false;
				this.phone = '';
				this.smscode = '';
				uni.navigateTo({
					url: `/pages/user/userInfo/userInfo`
				});
			},
			validateMobileFunc: function() {
				var validator = new Validator(strategys); // 创建一个Validator对象
				/* 添加一些效验规则 */
				validator.addRules(this.phone, [{
						'strategy': 'mobile',
						'errorMsg': '请输入正确的手机号'
					}],
					function() {
						console.log('验证通过');
					}
				);
				var errorMsg = validator.start(); // 执行验证函数，并返回效验结果
				return errorMsg;
			},
			validateFunc: function() {
				var validator = new Validator(strategys); // 创建一个Validator对象
				/* 添加一些效验规则 */
				validator.addRules(this.phone, [{
						'strategy': 'mobile',
						'errorMsg': '请输入正确的手机号'
					}],
					function() {
						console.log('验证通过');
					}
				);
				validator.addRules(this.smscode, [{
						'strategy': 'minLength:4',
						'errorMsg': '请输入短信验证码'
					}],
					function() {
						console.log('验证通过');
					}
				);

				var errorMsg = validator.start(); // 执行验证函数，并返回效验结果
				return errorMsg;
			}
		}
	}
</script>

<style lang="scss">
	.reg-label {
		margin: 96upx 0 66px 30upx;
		font-size: 55upx;
		color: #000;
		font-weight: bold;
	}
	.placeholder{
		color:#BBB;	
		font-size: 32upx;
	}

	.input-row {
		margin: 0 0 0 30upx;
		padding-right: 30upx;
		.uni-input{
			font-size: 32upx;
			padding: 0;
		}
	}

	.btn-row {
		width: 690upx;
		margin: 165upx auto 0;
	}

	.get-code {
		font-size: 30upx;
		color: #FF9833;
		//margin-right: 30upx;
	}
</style>
