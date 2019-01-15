<template>
	<view class="content">
		<view class="reg-label"></view>
		<view class="input-group">
			<view class="input-row">
				<text  class="title">支付宝账号：</text>
				<input class="uni-input" type="number" maxlength="20"  v-model="alipay" placeholder-class="placeholder" placeholder="请输入支付宝账号" />
			</view>		
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" :disabled="!alipay" @tap="save">立即绑定</button>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		computed: {
			
		},
		data() {
			return {				
				alipay: ''
			}
		},
		onShow() {
			
		},
		methods: {		
			save() {
				var params = {
					alipay_code: this.alipay,
				}
				this.API.bindAlipay(params).then(res => {
					this.Util.Toast.success("绑定成功");
					setTimeout(() => {
						uni.navigateBack();
					}, 2000)
				})
			},			
		}
	}
</script>

<style lang="scss">
	.placeholder{
		color:#BBB;	
	}
	.input-row {
		margin: 0 0 0 30upx;
		padding-right: 30upx;
		.uni-input{
			width:340upx;
			font-size: 32upx;
			padding: 0;
		}
		.title {
			width: 200upx;
			
		}
	}

	.btn-row {
		width: 690upx;
		margin: 165upx auto 0;
	}

</style>
