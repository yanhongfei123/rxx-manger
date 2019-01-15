<template>
	<view class="content">
		<view class="top-wrap">
			<view class="info-wrap">
				<image style="width: 120upx;height: 120upx;" @tap="upload" class="logo" :src="logoSrc" mode="widthFix"></image>
				<view class="info">
					<view class="name">{{name}}</view>
					<view class="tel">{{phone}}</view>
				</view>
			</view>
			<view class="btn-wrap">
				<button @tap="goDetail('recharge/recharge')" type="primary" class="deposit">充值</button>
				<button @tap="goDetail('getCash/getCash')" type="primary" class="withdraw">提现</button>
			</view>
		</view>
		<view class="b-line"></view>
		<view class="uni-list">
			<view @tap="goDetail('user/userInfo/userInfo')" class="uni-list-cell">
				<image style="width: 36upx;height: 36upx;" class="icon" mode="widthFix" src="/static/img/info.png" />
				<view class="input-row  space-between">
					<text class="title">个人信息</text>
					<view class="icon-right"></view>
				</view>
			</view>

			<!-- #ifdef APP-PLUS -->
			<view @tap="showMask(true)" class="uni-list-cell">
				<image style="width: 36upx;height: 36upx;" class="icon" mode="widthFix" src="/static/img/friend.png" />
				<view class="input-row  space-between">
					<text class="title">好友</text>
					<view class="icon-right"></view>
				</view>
			</view>
			<!-- #endif -->


			<!-- #ifdef MP-WEIXIN -->
			<view class="uni-list-cell">
				<image style="width: 36upx;height: 36upx;" class="icon" mode="widthFix" src="/static/img/friend.png" />
				<view class="input-row  space-between">
					<text class="title">好友</text>
					<view class="icon-right"></view>
					<button class="share-btn" open-type="share"></button>
				</view>
			</view>
			<!-- #endif -->

			<view @tap="goDetail('popularize/popularize')" class="uni-list-cell">
				<image style="width: 36upx;height: 36upx;" class="icon" mode="widthFix" src="/static/img/friend.png" />
				<view class="input-row  space-between">
					<text class="title">我的推广</text>
					<view class="icon-right"></view>
				</view>
			</view>

			<view @tap="goDetail('user/suggestion/suggestion')" class="uni-list-cell">
				<image style="width: 36upx;height: 36upx;" class="icon" mode="widthFix" src="/static/img/comment.png" />
				<view class="input-row  space-between">
					<text class="title">意见反馈</text>
					<view class="icon-right"></view>
				</view>
			</view>
			<view @tap="goDetail('user/about/about')" class="uni-list-cell">
				<image style="width: 36upx;height: 36upx;" class="icon" mode="widthFix" src="/static/img/about.png" />
				<view class="input-row  space-between">
					<text class="title">关于融小小</text>
					<view class="icon-right"></view>
				</view>
			</view>
			<view @tap="goDetail('user/settings/settings')" class="uni-list-cell">
				<image style="width: 36upx;height: 36upx;" class="icon" mode="widthFix" src="/static/img/set.png" />
				<view class="input-row  space-between">
					<text class="title">设置</text>
					<view class="icon-right"></view>
				</view>
			</view>
			<view @tap="goDetail('user/flow/flow')" class="uni-list-cell">
				<image style="width: 36upx;height: 36upx;" class="icon" mode="widthFix" src="/static/img/set.png" />
				<view class="input-row  space-between">
					<text class="title">资金流水</text>
					<view class="icon-right"></view>
				</view>
			</view>
		</view>

		<view v-show="isShowMask" @tap="showMask(false)" class="share-content-mask">
			<view class="share-content">
				<view class="share-des">分享至</view>
				<view class="share-list">
					<view @tap="shareWeiXin('WXSceneSession')" class="share-item">
						<image src="/static/img/img/wx.png" mode="widthFix"></image>
						<view class="share-type">微信</view>
					</view>
					<view @tap="shareWeiXin('WXSenceTimeline')" class="share-item">
						<image src="/static/img/img/pyq.png" mode="widthFix"></image>
						<view class="share-type">朋友圈</view>
					</view>
					<view @tap="shareQQ" class="share-item">
						<image src="/static/img/img/qq.png" mode="widthFix"></image>
						<view class="share-type">QQ</view>
					</view>
					<!-- <view @tap="shareQQ2" class="share-item">
						<image src="/static/img/img/qq.png" mode="widthFix"></image>
						<view class="share-type">QQ</view>
					</view> -->
				</view>
				<button @tap="showMask(false)" class="hideMask" type="primary">取消</button>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from "vuex";
	import {
		API_DOMAIN
	} from '../../utils/config.js';
	export default {
		onShareAppMessage() {
			return {
				title: this.title,
				path: '/pages/home/home',
				imageUrl: this.imageUrl
			}
		},
		data() {
			return {
				shareParams: {
					provider: "weixin",
					type: 0,
					href: "https://www.baidu.com/",
					title: "融小小分享",
					summary: "融小小分享内容",
					imageUrl: "/static/img/about.png",
				},
				isShowMask: false,
				phone: '',
				name: '',
				logoSrc: '../../static/img/logo.png' // /static/img/info.png  
			}
		},
		computed: {
			//...mapState(["avatar"]),
		},
		methods: {
			showMask(flag) {
				this.isShowMask = flag;
			},
			goDetail(path) {
				uni.navigateTo({
					url: `/pages/${path}`
				})
			},
			updateUserInfo() {
				var params = {
					AVATAR: this.logoSrc
				};
				this.API.updateManager(params).then(res => {
					this.Util.Toast.success("头像上传成功");
				});
			},
			upload() {
				var me = this;
				uni.chooseImage({
					count: 1,
					success: (chooseImageRes) => {
						this.Util.Toast.showLoading("上传中...")
						const tempFilePaths = chooseImageRes.tempFilePaths;
						const uploadTask = uni.uploadFile({
							url: `${API_DOMAIN}/uploadfile`,
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'token': uni.getStorageSync('token')
							},
							success: (uploadFileRes) => {
								me.logoSrc = JSON.parse(uploadFileRes.data).data;
								uni.setStorageSync('avatar', me.logoSrc);
								me.updateUserInfo();
							},
							fail: () => {
								me.Util.Toast.hideLoading();
								me.Util.Toast.toast("上传失败");
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
			},
			shareWeiXin(scene) {
				var params = this.shareParams;
				uni.share({
					scene,
					...params,
					success: function(res) {
						//plus.nativeUI.toast('分享成功');
					},
					fail: function(err) {
						plus.nativeUI.toast('分享失败');
					}
				});
			},
			shareQQ() {
				var params = this.shareParams;
				uni.share({
					...params,
					provider: 'qq',
					success: function(res) {
						//plus.nativeUI.toast('分享成功');
					},
					fail: function(err) {
						plus.nativeUI.toast('分享失败');
					}
				});
			},
			shareQQ2() {
				var shareObj = null;
				plus.share.getServices(
					//获取分享服务成功
					function(services) {
						for (var i in services) {
							//判断微信分享服务
							if (services[i].id == 'qq') {
								shareObj = services[i];
							}
						}
						if (shareObj == null) {
							plus.nativeUI.toast('获取分享服务失败');
							return;
						} else {
							plus.nativeUI.toast(JSON.stringify(services));
						}

						//分享核心代码
						shareObj.send({
								content: "我是QQ分享00",
								thumbs: ['../../static/img/about.png'],
								href: 'https://www.baidu.com/',
								title: 'test'
							},
							function() {
								plus.nativeUI.alert("分享成功！");
							},
							function(e) {
								//plus.nativeUI.alert("分享失败：" + e.message);
							}
						);
					},
					//获取分享服务失败
					function(e) {
						plus.nativeUI.alert(e.message);
					}
				);

			},
		},
		onLoad: function () {
			
		},
		onShow() {
			var _userInfo = uni.getStorageSync('userInfo');
			if (_userInfo) {
				var userInfo = JSON.parse(_userInfo);
				this.name = userInfo.user.NAME;
				this.phone = userInfo.user.PHONE;
			}

			var avatar = uni.getStorageSync('avatar');
			if (avatar) {
				this.logoSrc = avatar;
			}
		}

	}
</script>

<style lang="scss">
	.top-wrap {
		padding: 80upx 46upx 50upx;
		text-align: center;
		font-size: 32upx;
		color: #1A1A1A;

		.info-wrap {
			display: flex;
			margin-bottom: 52upx;

			.logo {
				width: 120upx !important;
				height: 120upx !important;
				//min-height: 120upx!important;
			}

			.info {
				flex: 1;
				line-height: 1;
				margin-left: 20upx;
				text-align: left;

				.name {
					margin-top: 20upx;
					font-family: PingFang-SC-Medium;
					font-weight: meduim;
					font-size: 32upx;
				}

				.tel {
					margin-top: 20upx;
					font-size: 30upx;
					font-family: PingFang-SC-Regular;
				}
			}
		}

		.btn-wrap {
			display: flex;

			button {
				flex: 1;

				&:last-child {
					margin-left: 30upx;
					background-color: #F87354;
				}
			}
		}
	}

	.b-line {
		height: 20upx;
		background-color: #F5F5F5;
	}

	.uni-list {
		padding: 0 20rpx 0 50upx;
	}

	.uni-list-cell {
		display: flex;
		align-items: center;

		.input-row {
			position: relative;
			height: 100upx;
			flex: 1;
			margin: 0;

			.title {
				width: 200upx;
			}
			
			.share-btn {
				position: absolute;
				width: 100%;
				height: 100upx;
				left: 0;
				top: 0;
				opacity: 0;
				z-index: 1;
			}
			
		}

		.icon {
			width: 36upx;
			margin: 0 45upx 0 0;
		}


	}
	
	.share-content-mask {
			position: fixed;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			z-index: 10;
			background: rgba(0, 0, 0, 0.6);
		}
	
		.share-content {
			position: absolute;
			bottom: 0;
			width: 100%;
			background: #fff;
			padding: 50upx 0 75upx;
			text-align: center;
	
			.share-des {
				font-size: 30upx;
				color: #FF9833;
				margin-bottom: 72upx;
			}
	
			.share-list {
				display: flex;
				justify-content: center;
	
				.share-item {
					margin: 0 60upx;
				}
	
				image {
					width: 90upx;
					height: 90upx;
					margin-bottom: 22upx;
				}
	
				.share-type {
					font-size: 30upx;
					color: #1A1A1A;
				}
			}
	
			.hideMask {
				width: 690upx;
				margin: 75upx auto 0;
			}
		}
</style>
