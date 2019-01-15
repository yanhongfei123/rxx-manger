<template>
	<view class="content">
		<view class="reg-label"></view>
		<view class="input-group">
			<!-- <view class="input-row">
				<text class="title">手机号：</text>
				<uni-input type="text" maxlength="11" clearable v-model="phone" placeholder="请输入手机号码"></uni-input>
			</view> -->
			<view class="input-row">
				<text class="title">手机号：</text>
				<input class="uni-input" type="number" maxlength="11"  v-model="phone" placeholder-class="placeholder" placeholder="请输入手机号码" />
			</view>
			
			<view class="input-row">
				<text class="title">验证码：</text>
				<input class="uni-input" type="number" maxlength="6" v-model="smscode" placeholder-class="placeholder" placeholder="请输入短信验证码" />
				<!-- <uni-input type="text" maxlength="4" v-model="smscode" placeholder="请输入短信验证码"></uni-input> -->
				<count-down ref="countDown" color="FF9833" size="30" @countDown="getCode"></count-down>
			</view>
			<view class="input-row">
				<text class="title">新的密码：</text>
				<input type="password"  placeholder-class="placeholder" v-model="password" placeholder="请输入新的密码" />
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" :disabled="_disabled" @tap="save">保存</button>
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
				if (this.phone && this.password && this.smscode) {
					return false
				}
				return true;
			}
		},
		data() {
			return {
				disabled: false,
				type: 2,
				phone: '',
				password: '',
				smscode: ''
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
				console.log(this.disabled)
				if(!this.disabled){
					this.disabled = true;
					this.API.sendMsg({
						phone: this.phone,
						type: 2
					}).then(res => {
						// 短信发送成功才能开始倒计时
						this.$refs.countDown.countDown();
						this.Util.Toast.success("验证码已发送");
						setTimeout(()=>{ this.disabled = false;  }, 6 * 1000)
					}).catch((res)=>{
						this.disabled = false;
					});
				}							
			},
			save() {
				var errorMsg = this.validateFunc();
				if (errorMsg) {
					this.Util.Toast.toast(errorMsg);
					return
				}
				var params = {
					type: this.type,
					phone: this.phone,
					password: this.password,
					smscode: this.smscode
				}
				this.API.forgetPas(params).then(res => {
					this.Util.Toast.success("保存成功");
					setTimeout(() => {
						uni.navigateBack();
					}, 2000)
				})

			},
			validateMobileFunc() {
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
			validateFunc() {
				var validator = new Validator(strategys); // 创建一个Validator对象
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
				validator.addRules(this.password, [{
						'strategy': 'minLength:5',
						'errorMsg': '密码长度不能少于5个字符'
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
		margin: 40upx 0 0 0;
	}
	.placeholder{
		color:#BBB;
		font-size: 32upx;
	}
	.input-row {
		margin: 0 0 0 30upx;
		padding-right: 30upx;
		input{
			font-size: 32upx;
		}
		.uni-input{
			width:340upx;
			font-size: 32upx;
			padding: 0;
		}
		.title {
			width: 166upx;
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
