<template>
	<view class="home">
		<view class="top-block">
			<view @tap="goDetail('order-area/order-area')" class="financing flex1 fl">
				<image class="img-l" mode="widthFix"  src="../../static/img/home/area-financing.png"></image>
			</view>
			<view @tap="goDetail('partner/partner')" class="partner flex1 fl">
				<image class="img-r" mode="widthFix" src="../../static/img/home/area-partner.png"></image>
			</view>
		</view>
		<view class="split"></view>
		<view class="action-block">
			<image src="../../static/img/home/action-btn.png"></image>
		</view>
		
	
	<!-- 	<button @tap="openPush" type="primary">开始监听推送消息</button>
		<button @tap="closePush" type="primary">关闭监听推送消息</button>	
 -->
		
		<view class="customer-list">
			<view class="title">周边借款人</view>			
      <view v-show="!orderList.length" class="no-data">暂无数据</view>
			<view class="uni-list">
				<view @tap="goDetail('apply-detail/apply-detail', item)" class="uni-list-cell" v-for="(item,index) in orderList"
				 :key="index">
					<view class="cell-top">
						<view class="user-name">{{item.CUSTOMER.user.NAME}}</view>
						<view @tap.stop="getOrder(item.ID)" class="get-order">抢单</view>
					</view>
					<view class="cell-mid">
						<view class="amount">{{item.amount}}</view>
						<view class="date">{{item.cyclename}}</view>
						<view class="time">{{item.UPDATE_TIME}}</view>
					</view>
					<view class="cell-btm">
						<view class="order-des">{{item.typename}}</view>
						<view class="order-des">{{ item.CUSTOMER.customer && item.CUSTOMER.customer.Career || ''}}</view>
						<view class="order-des">{{ item.CUSTOMER.customer && item.CUSTOMER.customer.Property || ''}}</view>
						<view class="order-des">{{ item.CUSTOMER.customer && item.CUSTOMER.customer.car || ''}}</view>
						<view class="order-des">{{ item.CUSTOMER.customer && item.CUSTOMER.customer.bank_flow || ''}}</view>
						<view class="order-des">{{ item.CUSTOMER.customer && item.CUSTOMER.customer.Credit || ''}}</view>
						<view class="order-des">{{ item.CUSTOMER.customer && item.CUSTOMER.customer.census || ''}}</view>
						<view class="order-des">{{ item.CUSTOMER.customer && item.CUSTOMER.customer.Social_security || ''}}</view>
					</view>
					<view class="box-shadow"></view>
				</view>
			</view>
		</view>

		<audio @ended="ended" src="https://fangyuansu.oss-cn-shenzhen.aliyuncs.com/notifition.mp3" :action="audioAction"></audio>

	</view>
</template>

<script>
	const io = require('../../utils/socket.io.js');
	import {
		mapState,
		mapActions
	} from "vuex";
	export default {
		computed: {
			...mapState(["token"])
		},
		data() {
			return {
				audioAction: {
					method: 'pause'
				},
				orderList: [],
			}
		},
		methods: {
			initPlus() {
// 				var _BARCODE = 'Push' // 插件名称
// 				var B = plus.bridge
// 				var JPushPlugin = {
// 					receiveMessage: {},
// 					openNotification: {},
// 					receiveNotification: {},
// 					callNative: function(fname, args, successCallback) {
// 						var callbackId = this.getCallbackId(successCallback, this.errorCallback)
// 						if (args != null) {
// 							args.unshift(callbackId)
// 						} else {
// 							var args = [callbackId]
// 						}
// 						return B.exec(_BARCODE, fname, args)
// 					},
// 					getCallbackId: function(successCallback) {
// 						var success = typeof successCallback !== 'function' ? null : function(args) {
// 							successCallback(args)
// 						}
// 						return B.callbackId(success, this.errorCallback)
// 					},
// 					errorCallback: function(errorMsg) {
// 						console.log('Javascript callback error: ' + errorMsg)
// 					},
// 					fireDocumentEvent: function(ename, jsonData) {
// 						var event = document.createEvent('HTMLEvents')
// 						event.initEvent(ename, true, true)
// 						event.eventType = 'message'
// 			
// 						jsonData = JSON.stringify(jsonData)
// 						var data = JSON.parse(jsonData)
// 						event.arguments = data
// 						document.dispatchEvent(event)
// 					},
// 					// Common method
// 					getRegistrationID: function(successCallback) {
// 						this.callNative('getRegistrationID', null, successCallback)
// 					},
// 					setTags: function(tags) {
// 						this.callNative('setTags', [tags], null)
// 					},
// 					setAlias: function(alias, successCallback) {
// 						this.callNative('setAlias', [alias], successCallback)
// 					},
// 					setTagsWithAlias: function(tags, alias) {
// 						if (alias == null) {
// 							this.setTags(tags)
// 							return
// 						}
// 						if (tags == null) {
// 							this.setAlias(alias)
// 							return
// 						}
// 						var arrayTagWithAlias = [tags]
// 						arrayTagWithAlias.unshift(alias)
// 						this.callNative('setTagsWithAlias', arrayTagWithAlias, null)
// 					},
// 					stopPush: function() {
// 						this.callNative('stopPush', null, null)
// 					},
// 					resumePush: function() {
// 						this.callNative('resumePush', null, null)
// 					},
// 					isPushStopped: function(successCallback) {
// 						this.callNative('isPushStopped', null, successCallback)
// 					},
// 			
// 					// Android methods
// 					init: function() {
// 						if (plus.os.name == 'Android') {
// 							this.callNative('init', null, null)
// 						}
// 					},
// 					setDebugMode: function(mode) {
// 						if (plus.os.name == 'Android') {
// 							this.callNative('setDebugMode', [mode], null)
// 						}
// 					},
// 					addLocalNotification: function(builderId, content, title, notiID, broadcastTime, extras) {
// 						if (plus.os.name == 'Android') {
// 							data = [builderId, content, title, notiID, broadcastTime, extras]
// 							this.callNative('addLocalNotification', data, null)
// 						}
// 					},
// 					removeLocalNotification: function(notificationId) {
// 						if (plus.os.name == 'Android') {
// 							this.callNative('removeLocalNotification', [notificationId], null)
// 						}
// 					},
// 					clearLocalNotifications: function() {
// 						if (plus.os.name == 'Android') {
// 							this.callNative('clearLocalNotifications', null, null)
// 						}
// 					},
// 					clearAllNotification: function() {
// 						if (plus.os.name == 'Android') {
// 							this.callNative('clearAllNotification', null, null)
// 						}
// 					},
// 					clearNotificationById: function(notificationId) {
// 						if (plus.os.name == 'Android') {
// 							this.callNative('clearNotificationById', [notificationId], null)
// 						}
// 					},
// 					setBasicPushNotificationBuilder: function() {
// 						if (plus.os.name == 'Android') {
// 							this.callNative('setBasicPushNotification', null, null)
// 						}
// 					},
// 					setCustomPushNotificationBuilder: function() {
// 						if (plus.os.name == 'Android') {
// 							this.callNative('setCustomPushNotificationBuilder', null, null)
// 						}
// 					},
// 					setLatestNotificationNum: function(num) {
// 						if (plus.os.name == 'Android') {
// 							this.callNative('setLatestNotificationNum', [num], null)
// 						}
// 					},
// 					setPushTime: function(successCallback, weekDays, startHour, endHour) {
// 						if (plus.os.name == 'Android') {
// 							this.callNative('setPushTime', [weekDays, startHour, endHour], successCallback)
// 						}
// 					},
// 					setSilenceTime: function(successCallback, startHour, startMinute, endHour, endMinute) {
// 						if (plus.os.name == 'Android') {
// 							this.callNative('setSilenceTime', [startHour, startMinute, endHour, endMinute], successCallback)
// 						}
// 					},
// 					requestPermission: function() {
// 						if (plus.os.name == 'Android') {
// 							this.callNative('requestPermission', null, null)
// 						}
// 					},
// 					getConnectionState: function(successCallback) {
// 						if (plus.os.name == 'Android') {
// 							this.callNative('getConnectionState', null, successCallback)
// 						}
// 					},
// 					onGetRegistrationId: function(rId) {
// 						if (plus.os.name == 'Android') {
// 							this.fireDocumentEvent('jpush.onGetRegistrationId', rId)
// 						}
// 					},
// 					getLaunchAppCacheNotification: function(successCallback) {
// 						this.callNative('getLaunchAppCacheNotification', null, successCallback)
// 					},
// 					clearLaunchAppCacheNotification: function() {
// 						if (plus.os.name == 'Android') {
// 							this.callNative('clearLaunchAppCacheNotification', null, null)
// 						}
// 					},
// 					receiveMessageInAndroidCallback: function(data) {
// 						if (plus.os.name == 'Android') {
// 							data = JSON.stringify(data)
// 							var jsonObj = JSON.parse(data)
// 							this.receiveMessage = jsonObj
// 							this.fireDocumentEvent('jpush.receiveMessage', this.receiveMessage)
// 						}
// 					},
// 					openNotificationInAndroidCallback: function(data) {
// 						if (plus.os.name == 'Android') {
// 							data = JSON.stringify(data)
// 							var jsonObj = JSON.parse(data)
// 							this.openNotification = jsonObj
// 							this.fireDocumentEvent('jpush.openNotification', this.openNotification)
// 						}
// 					},
// 					openNotificationIniOSCallback: function(data) {
// 						if (plus.os.name == 'iOS') {
// 							data = JSON.stringify(data)
// 							var jsonObj = JSON.parse(data)
// 							this.openNotification = jsonObj
// 							this.fireDocumentEvent('jpush.openNotification', this.openNotification)
// 						}
// 					},
// 					receiveNotificationInAndroidCallback: function(data) {
// 						if (plus.os.name == 'Android') {
// 							data = JSON.stringify(data)
// 							var jsonObj = JSON.parse(data)
// 							this.receiveNotification = jsonObj
// 							this.fireDocumentEvent('jpush.receiveNotification', this.receiveNotification)
// 						}
// 					},
// 					receiveNotificationIniOSCallback: function(data) {
// 						if (plus.os.name == 'iOS') {
// 							data = JSON.stringify(data)
// 							var jsonObj = JSON.parse(data)
// 							this.receiveNotification = jsonObj
// 			
// 							this.fireDocumentEvent('jpush.receiveNotification', this.receiveNotification)
// 						}
// 					},
// 					receiveMessageIniOSCallback: function(data) {
// 						if (plus.os.name == 'iOS') {
// 							data = JSON.stringify(data)
// 							var jsonObj = JSON.parse(data)
// 							this.receiveMessage = jsonObj
// 							this.fireDocumentEvent('jpush.receiveMessage', this.receiveMessage)
// 						}
// 					},
// 					receiveNotificationLaunceAppIniOSCallback: function(data) {
// 						if (plus.os.name == 'iOS') {
// 							data = JSON.stringify(data)
// 							var jsonObj = JSON.parse(data)
// 							this.receiveMessage = jsonObj
// 							this.fireDocumentEvent('jpush.receiveNotificationLaunchApp', this.receiveMessage)
// 						}
// 					},
// 					receiveNotificationBackgroundIniOSCallback: function(data) {
// 						if (plus.os.name == 'iOS') {
// 							data = JSON.stringify(data)
// 							var jsonObj = JSON.parse(data)
// 							this.receiveMessage = jsonObj
// 							this.fireDocumentEvent('jpush.receiveNotificationBackground', this.receiveMessage)
// 						}
// 					},
// 					// iOS methods
// 					setBadge: function(value) {
// 						if (plus.os.name == 'iOS') {
// 							try {
// 								this.callNative('setBadge', [value], null)
// 							} catch (exception) {
// 								console.log(exception)
// 							}
// 						}
// 					},
// 					resetBadge: function() {
// 						if (plus.os.name == 'iOS') {
// 							try {
// 								this.callNative('resetBadge', [], null)
// 							} catch (exception) {
// 								console.log(exception)
// 							}
// 						}
// 					},
// 					setApplicationIconBadgeNumber: function(badge) {
// 						if (plus.os.name == 'iOS') {
// 							this.callNative('setApplicationIconBadgeNumber', [badge], null)
// 						}
// 					},
// 					getApplicationIconBadgeNumber: function(callback) {
// 						if (plus.os.name == 'iOS') {
// 							this.callNative('getApplicationIconBadgeNumber', [], callback)
// 						}
// 					},
// 					startLogPageView: function(pageName) {
// 						if (plus.os.name == 'iOS') {
// 							this.callNative('startLogPageView', [pageName], null)
// 						}
// 					},
// 					stopLogPageView: function(pageName) {
// 						if (plus.os.name == 'iOS') {
// 							this.callNative('stopLogPageView', [pageName], null)
// 						}
// 					},
// 					beginLogPageView: function(pageName, duration) {
// 						if (plus.os.name == 'iOS') {
// 							this.callNative('beginLogPageView', [pageName, duration], null)
// 						}
// 					},
// 					setLogOFF: function() {
// 						if (plus.os.name == 'iOS') {
// 							this.callNative('setLogOFF', [], null)
// 						}
// 					},
// 					setCrashLogON: function() {
// 						if (plus.os.name == 'iOS') {
// 							this.callNative('crashLogON', [], null)
// 						}
// 					},
// 					setLocation: function(latitude, longitude) {
// 						if (plus.os.name == 'iOS') {
// 							this.callNative('setLocation', [latitude, longitude], null)
// 						}
// 					},
// 					addLocalNotificationIniOS: function(delayTime, content, badge, notificationID, extras) {
// 						if (plus.os.name == 'iOS') {
// 							var data = [delayTime, content, badge, notificationID, extras]
// 							this.call_native('setLocalNotification', data, null)
// 						}
// 					},
// 					deleteLocalNotificationWithIdentifierKeyIniOS: function(identifierKey) {
// 						if (plus.os.name == 'iOS') {
// 							var data = [identifierKey]
// 							this.call_native('deleteLocalNotificationWithIdentifierKey', data, null)
// 						}
// 					},
// 					clearAllLocalNotificationsIniOS: function() {
// 						if (plus.os.name == 'iOS') {
// 							this.call_native('clearAllLocalNotifications', [], null)
// 						}
// 					}
// 				}
// 			
// 				JPushPlugin.init();
// 			
// 				plus.Push = JPushPlugin
			
			},
			getRegistrationID(){ // 保存 id ，设备唯一标识， 用来推送的标识
				var that = this;
				plus.Push.getRegistrationID(function (data) {
					if (data.length != 0) {
					  that.API.jpushSaveID({ registration_id: data }).then(res=>{})
					}
				  })
			},
			getLaunchAppCacheNotification(){ // 获取点击推送启动应用
			    var that = this;
				plus.Push.getLaunchAppCacheNotification(function (notification) {
					 that.Util.Toast.toast('app处于离线，打开app收到的消息' + JSON.stringify(notification));
				  })
			},
			openNotification(){  // 点击通知进入应用程序时会出发该事件
				var that = this;
				plus.Push.openNotification(function(){
					  var content;
					  if (plus.os.name == 'iOS') {
						content = plus.Push.openNotification.aps.alert
					  } else {
						//content = plus.Push.openNotification.alert
						//plus.Push.clearLaunchAppCacheNotification();
					  }
					  that.Util.Toast.toast('后台切换到前台app获取到的消息===' + content);
					}
				)
			},	
			receiveNotification(){ // App 处于前台收到通知会触发该事件
				var that = this;
				plus.Push.receiveNotification(function(event){
					 var content;
					  if (plus.os.name == 'iOS') {
						content = event.aps.alert || plus.Push.receiveNotification.aps.alert
					  } else {
						//content = window.plus.Push.receiveNotification.alert
					  }
					  that.Util.Toast.toast('前台收到的消息====' + content);
				})
			},
			onReceiveMessage(){ // 接手自定义消息
				var that = this;
				plus.Push.receiveMessage(function(event){
					  var content;
					   if (plus.os.name == 'iOS') {
					  		content = event.content;
					   } else {
					  		//content = window.plus.Push.receiveNotification.alert
					   }
					  that.Util.Toast.toast(content);
				})
			},
			openPush(){
				this.timerO = setInterval(()=>{
					this.API.getui({
						PHONE: '15888888888',
						type: 2
					}).then(res=>{
						this.Util.Toast.toast(res.message)
					})
				}, 10000)
			},
			closePush(){
				clearInterval(this.timerO);
				this.timerO = null;
			},
			goDetail(path, item) {
				if (item) {
					var applyDetailItem = {
						amount: item.amount,
						productname: item.productname,
						cyclename: item.cyclename,
						typename: item.typename,
						UPDATE_TIME: item.UPDATE_TIME,
						name: item.CUSTOMER.user.NAME,
						age: item.CUSTOMER.user.AGE,
						income: item.CUSTOMER.customer.income,
						Credit: item.CUSTOMER.customer.Credit
					}
					uni.setStorageSync('applyDetailItem', JSON.stringify(applyDetailItem));
				}
				uni.navigateTo({
					url: `/pages/${path}`
				})
			},
			getOrder(orderId) {
				this.API.getOrder({
					orderId
				}).then(res => {
					this.Util.Toast.toast("抢单成功");
					setTimeout(() => {
						uni.switchTab({
							url: `/pages/order/order`
						})
					}, 500)
				});
			},
			getLocation() {
				// 获得经纬度
				var that = this;
				uni.getLocation({
					type: 'gcj02',
					success: function(res) {
						var latitude = res.latitude;
						var longitude = res.longitude;
						that.token && that.socket.emit('position', {
							longitude,
							latitude
						});
					},
					fail: function(res) {
						that.Util.Toast.toast("定位失败");
					}
				})
			},
			ended() {
				this.audioAction.method = 'pause';
				console.log('end')
			},
			initSocket(latitude, longitude) {
				const socket = (this.socket = io(
					'http://manager.rongxiaoxiao.com/',
				));
				socket.on('connect', () => {
					this.hasConnected = true;
					if(this.token){
						socket.emit('authentication', {
							token: this.token
						});
						socket.on('authenticated', (data) => {
							//this.Util.Toast.toast('token认证结果:' + JSON.stringify(data));
						});
					}				
					// 上报经纬度	
					this.timer = setInterval(() => {
						this.getLocation();
					}, 5000)
				})
				// 添加一个关闭连接的监听器
				socket.on('disconnect', () => {
					this.Util.Toast.toast("socket与服务器断开连接了");
				});

				socket.on('connect_error', d => {
					this.Util.Toast.toast("connect_error");
				})
				
				// 客户新申请的订单
				socket.on('order', (data) => {
					this.Util.Toast.toast('接收到客户新的订单:' + JSON.stringify(data));
					if (this.audioAction.method == 'pause') {
						this.audioAction.method = 'play';
					}
				}); 
				// 添加一个关闭连接的监听器
				socket.on('disconnect', () => {
					this.Util.Toast.toast('The client has disconnected!');
				});
			},

		},
		onUnload() {
			 clearInterval(this.timer);
			 this.timer = null;
		},
		onLoad() {
			
		},
		onShow() {
			var that = this;
			//#ifdef APP-PLUS
			if(plus.os.name == 'Android'){
				// 已开启push接收
				uni.getProvider({
					service: 'push',
					success: function (res) {
						// 个推的名称为 igexin
						if (~res.provider.indexOf('igexin')) {
							uni.subscribePush({
								provider: 'igexin',
								success: function (res) {								
									//that.cld = res.clientid
									//plus.nativeUI.alert('success:' + JSON.stringify(res));
								}
							});										
						}
					}
				});
				//点击消息
// 				  plus.push.addEventListener("click", function(msg) {
//                     console.log(msg.payload);
//                 }, false);
				
				//监听在线消息事件
// 				plus.push.addEventListener("receive", function(msg){
// 						//msg就是获取到的消息
// 						plus.nativeUI.alert("数据来啦：====" + JSON.parse(msg.payload));
// 						if (that.audioAction.method == 'pause') {
// 							that.audioAction.method = 'play';
// 						}		
// 				}, false);
				
				// 监听透传数据
				uni.onPush({
					provider: 'igexin',
					success: function () {
							//plus.nativeUI.alert('监听透传成功');
					},
					callback: function (data) {
							plus.nativeUI.alert("接收到透传数据：" + JSON.stringify(data));
// 							plus.push.createMessage('哈哈哈','payload', {
// 								title: '我是标题',
// 								icon: '../../static/img/app-logo.png'
// 							} );
							if (that.audioAction.method == 'pause') {
								that.audioAction.method = 'play';
							}		
					}
				});
						
			}else{  // ios
				//this.initPlus();
				//this.getRegistrationID(); // 获取id		
				//this.openNotification(); 
				//this.receiveNotification(); 
											
			}			
			//#endif	
			
			if (!this.token) {
				uni.reLaunch({
					url: "../login/login"
				});
				return
			}

			!this.hasConnected && this.initSocket();

			this.API.getOrderbynearby().then(res => {
				this.orderList = res.data.map((item, index) => {
					item.UPDATE_TIME = this.Util.getLastTime(Number(item.UPDATE_TIME));
					return item
				});

			})
		}
	}
</script>

<style lang="scss" scoped>
	.no-data{
		text-align: center;
		font-size: 30upx;
		margin-top: 100upx;
	}
	.home {
		margin-bottom: 100upx;
	}

	.flex1 {
		flex: 1;
	}

	image {
		display: block;
		width: 100%;
		height: 100%;
	}

	.top-block {
		padding: 30upx 30upx 26upx;
		//display: flex;
		height: 200upx;
		over-flow:hidden;
		.partner {
			margin-left: 20upx;
		}
		.fl{
			float: left;
		}
		.img-l{
			width: 335upx;
			height: 201upx;
		}
		.img-r{
			width: 333upx;
			height: 201upx;
		}
	}

	.split {
		height: 20upx;
		background-color: #F5F5F5;
	}

	.action-block {
		height: 172upx;
		padding: 28upx 16upx 0;
	}

	.customer-list {
		padding: 0 30upx;

		.title {
			padding: 28upx 0;
			font-size: 34upx;
			line-height: 1;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(26, 26, 26, 1);
		}

		.customer-item {
			height: 380upx;
			border: 2upx solid #F5F5F5;
			box-shadow: 0 3px 4px 0 #EFEFEF;
		}
	}

	.uni-list-cell {
		position: relative;
		width: 690upx;
		margin: 40upx auto 0;
		border: 2upx solid #E6E6E6;

		// 		.box-shadow{
		// 			position: absolute;
		// 			left: 0;
		// 			bottom: -4upx;
		// 			width: 98%;
		// 			height: 1px;
		// 			z-index: 10;
		// 			box-shadow: 0 4upx 10upx  #BBB;
		// 		}
		.cell-top {
			position: relative;
			padding-top: 26upx;
			display: flex;
			justify-content: space-between;

			.user-name {
				font-size: 36upx;
				color: #1F1F1F;
				padding-left: 40upx;
				height: 55upx;
				line-height: 55upx;
				border-left: 10upx solid #FF9833;
			}

			.get-order {
				width: 134upx;
				height: 60upx;
				line-height: 60upx;
				text-indent: 10upx;
				color: #fff;
				font-size: 34upx;
				background: #FF9833;
				text-align: center;
				border-top-left-radius: 30px;
				border-bottom-left-radius: 30px;
			}
		}

		.cell-mid {
			text-align: center;
			margin: 52upx 0 62upx;
			font-size: 40upx;
			color: #FF9833;
			display: flex;
			justify-content: center;

			.date {
				margin: 0 90upx;
			}
		}

		.cell-btm {
			width: 652upx;
			margin: 0 auto 20upx;
			font-size: 28upx;
			padding: 20upx;
			box-sizing: border-box;
			color: #A4A3AC;
			background: rgba(254, 249, 244, 1);
			overflow: hidden;

			.order-des {
				float: left;
				width: 25%;
				text-align: center;
				margin-bottom: 20upx;
			}

		}

	}
</style>
