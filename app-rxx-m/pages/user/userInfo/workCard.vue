<template>
	<view class="content">
		<view class="upload-title">上传工作证</view>
		<view class="upload-wrap" @tap=upload>
			<image class="icon-card icon" :src="imgSrc" />
		</view>
		<view class="btn-row">
			<button class="btn-upload" type="primary" @tap="submit" :disabled="disabled">完成</button>
		</view>
	</view>
</template>

<script>
	import {
		API_DOMAIN
	} from '../../../utils/config.js';
	export default {
		data() {
			return {
				disabled: true,
				imgSrc: '/static/img/work-card.png',

			}
		},
		methods: {
			submit() {
				uni.navigateBack()
				// 				uni.navigateTo({
				// 					url: '/pages/user/userInfo/userInfo'
				// 				})
			},
			upload() {
				uni.chooseImage({
					count: 1,
					success: (chooseImageRes) => {
						this.Util.Toast.showLoading("上传中...")
						const tempFilePaths = chooseImageRes.tempFilePaths;
						const uploadTask = uni.uploadFile({
							url: `${API_DOMAIN}/uploadfile`,
							filePath: tempFilePaths[0],
							name: 'file',
							success: (uploadFileRes) => {
								this.disabled = false;
								this.imgSrc = JSON.parse(uploadFileRes.data).data;
								uni.setStorageSync('workCard', this.imgSrc);
							},
							fail: () => {
								this.Util.Toast.hideLoading();
								this.Util.Toast.toast("上传失败");
								console.log('上传失败')
							}
						});

						uploadTask.onProgressUpdate((res) => {
							if (res.progress == 100) {
								this.Util.Toast.hideLoading();
								this.Util.Toast.toast("上传成功");
							}
						});
					}
				})
			}
		},
		onShow() {
		  var workCard;
		  var userInfo = uni.getStorageSync('userInfo');
		  if(userInfo && JSON.parse(userInfo).manger.WORK_PERMIT){
			  workCard = JSON.parse(userInfo).manger.WORK_PERMIT;
		  }else{
			  workCard = uni.getStorageSync('workCard');
		  }
		  this.imgSrc = workCard || '/static/img/work-card.png';
		  this.disabled = !workCard;

		   
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 0 124upx 88upx;
	}

	.upload-title {
		margin: 54upx auto 86upx;
		text-align: center;
		font-size: 32upx;
		font-family: PingFang-SC-Regular;
		color: #454545;
	}

	.icon-card {
		display: block;
		width: 450upx;
		height: 260upx;
		margin: 0 auto;
	}
	.btn-row {
  	width: 500upx;
		margin: 98upx auto 0;
		border-radius: 44upx;
		button{
			width: 100%;
		}
	}
</style>
