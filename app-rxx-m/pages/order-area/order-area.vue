<template>
	<view class="content">
		<view v-show="!orderList.length" class="no-data">暂无数据</view>
		<view class="uni-list">
			<view @tap="goDetail('apply-detail/apply-detail', item)" class="uni-list-cell" v-for="(item,index) in orderList" :key="index">
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
					<view class="order-des">{{item.CUSTOMER.customer.Career}}</view>
					<view class="order-des">{{item.CUSTOMER.customer.Property}}</view>
					<view class="order-des">{{item.CUSTOMER.customer.car}}</view>
					<view class="order-des">{{item.CUSTOMER.customer.bank_flow}}</view>
					<view class="order-des">{{item.CUSTOMER.customer.Credit}}</view>
					<view class="order-des">{{item.CUSTOMER.customer.census}}</view>
					<view class="order-des">{{item.CUSTOMER.customer.Social_security}}</view>
				</view>
				<view class="box-shadow"></view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				orderList: [],
				//desList: ['个人用户', '有银行流水', '个人用户', '有银行流水', '个人用户', '有银行流水', '个人用户', '有银行流水', '个人用户']
			}
		},
		computed: {

		},
		methods: {
			goDetail(path, item) {
				var applyDetailItem = {
					amount: item.amount,
					productname: item.productname,
					cyclename: item.cyclename,
					typename: item.typename,
					UPDATE_TIME: item.UPDATE_TIME,
					name: item.CUSTOMER.user.NAME,
					age: item.CUSTOMER.user.AGE,
					income: item.CUSTOMER.customer.income,
					Credit: item.CUSTOMER.customer.Credit,		
				}
				uni.setStorageSync('applyDetailItem', JSON.stringify(applyDetailItem));
				uni.navigateTo({
					url: `/pages/${path}`
				});				
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
				})
			}

		},
		onShow() {
			this.API.getOrderbyold().then(res=>{
				this.orderList = res.data.map((item, index) => {
					item.UPDATE_TIME = this.Util.getLastTime(Number(item.UPDATE_TIME));
					return item
				});
			})		
		}
	}
</script>
<style lang="scss">
	.content {
		margin-bottom: 100upx;
	}
	
	.no-data{
		text-align: center;
		font-size: 30upx;
		margin-top: 100upx;
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
				margin: 0 100upx;
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
