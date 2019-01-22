<template>
	<view class="content">
		<view v-show="!orderList.length" class="no-data">暂无数据</view>
		<view class="uni-list">
			<view @tap="goDetail('apply-detail/apply-detail', item)" v-for="(item, index) in orderList" class="uni-list-cell" :key="index">
				<view class="order-number">订单编号: {{item.order_num}} </view>
				<view class="cell-mid">
					<view class="apply-money h-70">客户姓名: {{item.CUSTOMER.user.NAME}}</view>
					<view class="apply-money h-70">客户手机号: {{item.CUSTOMER.user.PHONE}}</view>
					<view class="apply-name h-70">贷款产品: {{item.productname}} </view>
					<view class="apply-type h-70">贷款类型: {{item.typename}} </view>
					<view  class="apply-date h-70">贷款周期: {{item.cyclename ||  ''}} </view>
				</view>			
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {		
				orderList: [],
			}
		},
		methods: {
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
		},
		onLoad(option) {

		},
		onShow() {
			this.API.getOrderbymanger().then(res=>{
				this.orderList = res.data.map((item, index) => {
					item.UPDATE_TIME = this.Util.getLastTime(Number(item.UPDATE_TIME));
					return item
				});
				
			})
		}
	}
</script>

<style lang="scss">
	page {
		background:#F5F5F5;
		margin-bottom: 100upx;
	}
	.no-data{
		text-align: center;
		font-size: 30upx;
		margin-top: 100upx;
	}

	.uni-list-cell {
		width: 690upx;
		margin: 28upx auto 0;
		background: #fff;
		box-sizing: border-box;
		font-size: 32upx;
		color: #1A1A1A;
		overflow: hidden;
		padding-bottom: 25upx;
	}

	.order-number {
		font-size: 30upx;
		height: 88upx;
		line-height: 88upx;
		padding-left: 20upx;
		border-bottom: 2upx solid #E6E6E6;
	}

	.h-70 {
		height: 70upx;
		line-height: 70upx;
		padding-left: 20upx;
	}
	
	.apply-date{
		color: #FF9833;
	}

	
</style>
