<template>
	<view class="content">
		<view class="upload-title">上传身份证</view>
		<view class="upload-wrap">
			<view @tap="upload('front')" class="front">
				<image class="icon-card icon" :src="idcardFront" />
			</view>
			<view @tap="upload('back')" class="back">
				<image class="icon-card icon" :src="idcardBack" />
			</view>
		</view>
		<view class="btn-row">
			<button class="btn-upload" type="primary" @tap="confirm" :disabled="disabled">完成</button>
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
				uploadAmount: 0,
				disabled: true,
				idcardFront: '/static/img/idcard-front.png',
				idcardBack: '/static/img/idcard-back.png'
			}
		},
		methods: {
			confirm() {
				uni.navigateBack()
// 				uni.navigateTo({
// 					url: '/pages/user/userInfo/userInfo'
// 				})

			},
			upload(flag) {			
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
								var imgSrc = JSON.parse(uploadFileRes.data).data;

								if(flag == 'front'){
									this.idcardFront = imgSrc;
									uni.setStorageSync('idcardFront', imgSrc);
								}else{
									this.idcardBack = imgSrc;
									uni.setStorageSync('idcardBack', imgSrc);
								}
								if(this.idcardFront.indexOf('http')!= -1 && this.idcardBack.indexOf('http')!= -1){
									this.disabled = false;
								}																				
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
			var idcardFront, idcardBack;
			var userInfo = uni.getStorageSync('userInfo');
			if(userInfo && JSON.parse(userInfo).manger.ID_PHOTO){
				idcardFront = JSON.parse(userInfo).manger.ID_PHOTO;			
			}else{
				idcardFront = uni.getStorageSync('idcardFront');			
			}
			
			if(userInfo && JSON.parse(userInfo).manger.ID_PHOTO_Negative){
				idcardBack = JSON.parse(userInfo).manger.ID_PHOTO_Negative;
				
			}else{
				idcardBack = uni.getStorageSync('idcardBack');
				
			}
			this.idcardFront = idcardFront ||  '/static/img/idcard-front.png';
			this.idcardBack = idcardBack ||  '/static/img/idcard-back.png';
			this.disabled = !idcardFront || !idcardBack;

		}
	}
</script>

<style lang="scss">
	.content {
		padding: 0 42upx 88upx;
	}

	.upload-title {
		margin: 54upx auto 86upx;
		text-align: center;
		font-size: 32upx;
		font-family: PingFang-SC-Regular;
		color: #454545;
	}

	.upload-wrap {
		display: flex;

		.front,
		.back {
			width: 47%;
			height: 232upx;
			border: 1upx dashed #eee;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.back {
			margin-left: 32upx;
		}
	}

	.btn-row {
		margin: 122upx auto 0;
		width: 500px;
		border-radius: 44upx;
		button{
			width: 100%;
		}
	}
</style>
