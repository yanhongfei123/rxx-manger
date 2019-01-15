<template>
	<view class="content">
		<view class="pad30">
			<view class="title">请选择充值金额</view>
			<view class="uni-list">
				<view @tap="selectRechargeAmount(item, index)" :class="[item=='其他金额'?'colo_A4A3AC':'',chargeAmountIndex==index?'selected':'']"
				 class="uni-list-cell" v-for="(item,index) in rechargeAmountTextList" :key="index">
					<view v-if="item !== '其他金额'">{{item}}</view>
					<view v-else>
						<input placeholder-style="color:#A4A3AC" placeholder="其他金额" v-model="otherAmount" type="number" />
					</view>

				</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="pad30">
			<!-- #ifdef APP-PLUS -->
			<view class="pay-title">请选择支付方式</view>
			<view class="recharge-list">
				<view @tap="chooseChargeType(0)" :class="[chargeTypeIndex==0?'choosed':'']" class="recharge-item">
					<view class="recharge-type">
						<image class="vm weixin-icon" src="../../static/img/img/weixin.png" mode="widthFix"></image>
						<view class="recharge-weixin vm">微信支付</view>
					</view>
					<view class="select-btn">
						<image src="../../static/img/img/choosed.png" mode="widthFix"></image>
					</view>
				</view>
				<view @tap="chooseChargeType(1)" :class="[chargeTypeIndex==1?'choosed':'']" class="recharge-item">
					<view class="recharge-type">
						<image class="vm zfb-icon" src="../../static/img/img/zfb.png" mode="widthFix"></image>
						<view class="recharge-zfb vm">支付宝支付</view>
					</view>
					<view class="select-btn">
						<image src="../../static/img/img/choosed.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<!-- #endif -->

			<!-- #ifdef MP-WEIXIN -->
			<view class="recharge-list">
				<view :class="[chargeTypeIndex==0?'choosed':'']" class="recharge-item">
					<view class="recharge-type">
						<image class="vm weixin-icon" src="../../static/img/img/weixin.png" mode="widthFix"></image>
						<view class="recharge-weixin vm">微信支付</view>
					</view>
					<view class="select-btn">
						<image src="../../static/img/img/choosed.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<!-- #endif -->

		</view>


		<!-- #ifdef APP-PLUS -->
		<button @tap="recharge" type="primary" id="primary" hover-class="other-button-hover">立即充值</button>
		<!-- #endif -->

		<!-- #ifdef MP-WEIXIN -->
		<button @tap="weixinRecharge" type="primary" id="primary" hover-class="other-button-hover">立即充值</button>
		<!-- #endif -->
	</view>
</template>
<script>
	import {
		mapState,
		mapActions
	} from "vuex";
	import uniInput from '../../components/uni-input.vue'
	export default {
		components: {
			uniInput
		},
		data() {
			return {
				chargeTypeIndex: 0,
				chargeAmountIndex: 0,
				rechargeAmountTextList: ['30元', '50元', '100元', '200元', '500元', '其他金额'],
				rechargeAmountList: [30, 50, 100, 200, 500, ''],
				otherAmount: '',
				rechargeAmount: ''
			}
		},
		computed: {
			...mapState(["token"])
		},
		methods: {
			selectRechargeAmount(value, index) {
				this.chargeAmountIndex = index;
				this.rechargeAmount = this.rechargeAmountList[index];
			},
			chooseChargeType(type) {
				this.chargeTypeIndex = type;
			},
			weixinRecharge() {
				if (this.otherAmount != '') {
					this.rechargeAmount = this.otherAmount;
				} else {
					this.rechargeAmount = this.rechargeAmountList[this.chargeAmountIndex];
				}
				uni.login({
					success: async (e) => {
						var res1 = await this.API.weixinLogin({
							code: e.code,
							token: this.token,
						});
						var res2 = await this.API.weixinPay({
							amount: this.rechargeAmount,
							openid: res1.data.data.openid,
							token: this.token
						});
						let paymentData = res2.data;
						uni.requestPayment({
							timeStamp: String(paymentData.timeStamp),
							nonceStr: paymentData.nonceStr,
							package: paymentData.package,
							signType: 'MD5',
							paySign: paymentData.paySign,
							success: (res) => {
								uni.showToast({
									title: "支付成功!"
								})
							},
							fail: (res) => {
								uni.showModal({
									content: "支付失败,原因为: " + res.errMsg,
									showCancel: false
								})
							}
						})
					},
					fail: (e) => {
						console.log("fail", e);
						uni.showModal({
							content: "微信登陆失败,原因为: " + e.errMsg,
							showCancel: false
						})
					}
				});
			},		
			async recharge() {	
				var that = this;
				var provider =  '', orderInfo = '';
				if (this.otherAmount != '') {
					this.rechargeAmount = this.otherAmount;
				} else {
					this.rechargeAmount = this.rechargeAmountList[this.chargeAmountIndex];
				}	
				
				if(this.chargeTypeIndex == 0){
					provider = 'wxpay';
					orderInfo = await this.API.CreateAliPayOrder({
						amount: this.rechargeAmount,					
					});
				}else{
					provider = 'alipay';
					orderInfo = await this.API.CreateAliPayOrder({
						amount: this.rechargeAmount									
					});
					
				}	
				uni.requestPayment({
					provider,
					orderInfo: orderInfo.message.data, //订单数据
					success: function (res) {
					  that.Util.Toast.toast("支付成功");
					},
					fail: function (err) {
					  that.Util.Toast.toast('支付失败:' + JSON.stringify(err));
					}
				});
				
			},

		},
  	onLoad() {
        
		}
	}
</script>

<style lang="scss">
	.content{
		overflow-x: hidden;
	}
	button[type=primary] {
		width: 690upx;
		margin: 0 auto;
		height: 88upx;
		line-height: 88upx;
		text-align: center;
		background-color: #FF9833;
	}

	button[disabled][type=primary] {
		background-color: #BBB;
	}

	#primary {
		margin-top: 150upx;
		color: #fff;
		font-size: 34upx;
	}

	.content {
		height: 100%;
		font-size: 30upx;
		color: #565656;
		padding-top: 30upx;

		.pad30 {
			padding: 0 30upx;
		}

		.title {
			margin: 35upx 0 50upx;
		}

		.uni-list {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			align-content: flex-start;
			padding-bottom: 45upx;
		}

		.uni-list-cell {
			width: 210upx;
			height: 110upx;
			margin-bottom: 40upx;
			color: #FF9833;
			font-size: 40upx;
			text-align: center;
			line-height: 110upx;
			border-radius: 10upx;
			border: 2upx solid #FF9833;

			&.colo_A4A3AC {
				color: #A4A3AC;
				border-color: #A4A3AC;
			}

			&.selected {
				background: #FF9833;
				color: #fff;
				;
			}

			&.colo_A4A3AC.selected {
				background: none;
				border-color: #FF9833;
				color: #FF9833;
			}

			input {
				height: 110upx;
				line-height: 110upx;
			}
		}

		.line {
			height: 20upx;
			background: #F5F5F5;
		}

		.pay-title {
			margin: 35upx 0 10upx;
		}

		.recharge-list {
			//padding-right: 28upx;
		}

		.recharge-item {
			position: relative;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100upx;
			line-height: 100upx;
			padding-right: 26upx;

			//overflow: hidden;
			&::after {
				content: '';
				position: absolute;
				width: 750upx;
				height: 2upx;
				left: 0;
				bottom: 0;
				background: #E6E6E6;
			}

			.recharge-type {
				font-size: 34upx;

				.vm {
					display: inline-block;
					vertical-align: middle;
				}

				image {
					margin-right: 38upx;
				}

				.weixin-icon {
					width: 55upx;
					height: 47upx;
				}

				.zfb-icon {
					width: 53upx;
					height: 53upx;
				}

				.recharge-weixin {}

				.recharge-zfb {}
			}

			.select-btn {
				width: 34upx;
				height: 34upx;
				border: 2upx solid #FF9833;
				border-radius: 4upx;

				image {
					width: 34upx;
					height: 34upx;
					display: none;
				}
			}
		}

		.choosed {
			.select-btn {
				image {
					display: block;
				}
			}
		}

	}
</style>
