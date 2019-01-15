<template>
	<view class="content">
		<textarea class="textarea" placeholder="请输入您宝贵的意见" v-model="textarea" auto-focus placeholder-style="color:#ccc;" />
		<view class="btn-row">
			<button type="primary"  :disabled="!textarea" @tap="submit">提交</button>
		</view>
	</view>
</template>

<script>
	
	export default {	
		data() {
			return {				
				textarea: '',				
			}
		},
		methods: {
			submit(){
				this.API.feedbackCreate({opinion: this.textarea}).then(res => {
					 this.Util.Toast.toast("提交成功");
				});
			}
		}
	}
</script>

<style lang="scss">
	.btn-row{
		width: 690upx;
		margin: 190upx auto;
	}
	.textarea{
		  width: 650upx;
			padding: 20upx;
			margin: 30upx auto;
			font-size: 32upx;
			border: 2upx solid #e6e6e6;
	}
</style>
