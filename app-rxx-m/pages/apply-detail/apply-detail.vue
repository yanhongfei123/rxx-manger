<template>
	<view class="content">
		<view class="con-wrap">
			<view class="capital-title">{{applyDetail.typename}}</view>
			<view class="cell-mid">
				<view>
					<view class="amount">{{applyDetail.amount}}</view>
					<view class="des">贷款金额</view>
				</view>
				<view class="mar110">
					<view class="date">{{applyDetail.cyclename||'无信息'}}</view>
					<view class="des">贷款期限</view>
				</view>
				<view>
					<view class="time">{{applyDetail.UPDATE_TIME}}</view>
					<view class="des">发布时间</view>
				</view>
			</view>
			<view class="cell-btm">
				<view class="info-title">基本信息</view>
				<view class="user-info">
					<view>姓名: {{applyDetail.name || '无信息'}}</view>
					<view>年龄: {{applyDetail.age || '无信息'}}</view>
					<view>月收入: {{applyDetail.income ||  '无信息'}}</view>
					<view>信用情况: {{applyDetail.Credit || '无信息'}}</view>
				</view>
			</view>
		</view>
		<view class="tips">提示：此信息由客户自行提交，请自行审核判断真伪</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				applyDetail:{
					amount: '',
					typename:'',
					cyclename: '',
					UPDATE_TIME:'',
					name: '',
					age: '',
					income: '',
					Credit:''		,	
				}
			};
		},
		onShow() {
			var applyDetailItem = JSON.parse(uni.getStorageSync('applyDetailItem'));
			this.applyDetail = applyDetailItem;
			
		}
	}
</script>

<style lang="scss">
	page {
	  background:rgba(245,245,245,1);
	}
   .content{
	   width: 688upx;
	   margin: 30upx auto;
	   .con-wrap{
		   background: #fff;
		   border-radius: 8upx;
	   }
	   .capital-title{
		   height: 104upx;
		   line-height: 104upx;
		   color: #1F1F1F;
		   text-align: center;
	   }
	   .cell-mid {
			padding: 30upx 0 55upx;
			font-size: 40upx;
			color: #FF9833;
			text-align: center;
			display: flex;
			justify-content: center;
			border-bottom: 2upx solid #e6e6e6;
			.des{
				font-size: 24upx;
				color: #A4A3AC;
				margin-top: 12upx;
			}
			.mar110{
				margin: 0 110upx;
			}
	   }
	   .cell-btm{
		   padding:0 0 20upx 30upx;
	   }
	   .info-title{
		   font-size: 32upx;
		   color: #1A1A1A;   
		   height: 70upx;
		   line-height: 70upx;
	   }
	   .user-info view{
		  font-size: 30upx; 
		  color: #A4A3AC;
		  height: 55upx;
		  line-height: 55upx;
	   }
	   .tips{
		   font-size: 24upx;
		   color: #FF9833;
		   margin-top: 30upx;
		   text-align: center;
	   }
	   
	   
	   
   }
</style>
