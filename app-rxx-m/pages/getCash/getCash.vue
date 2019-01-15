<template>
	<view class="content">
		<view class="title">请输入提现金额</view>
		<view class="input-wrap">
			  <view class="icon">￥</view>
			  <input v-model="amount" type="number"  />
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" :disabled="!amount" @tap="getCash">提现</button> 
		</view>
	</view>
</template>

<script>
	import uniInput from '../../components/uni-input.vue';
	export default {
		data() {
			return {
				amount: ''
			};
		},
		computed:{
			
		},
		methods:{
			getCash(){
				this.API.getCash({amount: this.amount}).then(res=>{
					this.Util.Toast.toast("提现成功");
				})
			}
		}
	}
</script>

<style lang="scss">
	.title{
		color: #1A1A1A;
		font-size: 34upx;
		margin: 100upx 0 70upx;
		text-align: center;
	}
	.input-wrap{
		width: 650upx;
		height: 100upx;
		margin: 0 auto;
		border: 2upx solid #E6E6E6;
		display: flex;
		align-items: center;
		.icon{
			font-size: 55upx;
			color: #FF9833;
			margin: 0 30upx;
		}
		input{
			font-size: 36upx;
			
		}
	}
   .btn-row{
	   margin: 210upx auto;
   }
   
</style>
