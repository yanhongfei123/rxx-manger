<template>
	<view class="content">
		<view class="tab-wrap">
			<view @click="changeTab(0)" class="tab-item" :class="{active: oIndex===0}">推广用户</view>
			<view @click="changeTab(1)" class="tab-item tab-item-mid" :class="{active: oIndex===1}">专属二维码</view>
			<view @click="changeTab(2)" class="tab-item" :class="{active: oIndex===2}">佣金明细</view>
		</view>
		<view class="user-list" v-show="oIndex===0">
			<view :key="index" v-for="(item, index) in  list1" class="user">
				<view>{{item.name}}</view>
				<view>{{item.mobile}}</view>
			</view>
		</view>
		
		<view class="ewm-wrap" v-show="oIndex===1">
			<image :src="ewm" mode="widthFix"></image>
			<view class="code">660456</view>
			<view class="des">我的推荐码</view>
		</view>
		
		<view class="yongjin-list" v-show="oIndex===2">
			<view :key="index" v-for="(item, index) in yongjinList" class="uni-list-cell">
				<view class="order-number">订单编号: {{item.orderNumber}} </view>
				<view class="cell-mid">
					<view class="apply-money h-70">客户名称: {{item.userNmae}} </view>
					<view class="apply-name h-70">贷款产品: {{item.pruductname}} </view>
					<view class="apply-type h-70">贷款类型: {{item.typename}} </view>
					<view  class="apply-date h-70">贷款周期: {{item.cyclename}} </view>
				</view>			
			</view>
		</view>
		
				
		<view v-show="oIndex!=1">
			<load-more  :loadingType="loadingType" :contentText="contentText"></load-more>
		</view>
		
	</view>
</template>

<script>
	import loadMore from '../../components/load-more.vue'
	export default {
		components: {
			loadMore
		},
		data() {
			return {
				oIndex: 0,
				list1:[],
				yongjinList:[],
				ewm: '',
			  pageNo: 1,
				pageSize: 10,
				loadingType: 0,
				contentText: { //上拉的状态：0-loading前；1-loading中；2-没有更多了
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}
			};
		},
		methods:{
			changeTab(index){
				this.oIndex = index;
				this.loadingType = 0;
				this.pageNo = 1;
				this.oIndex != 1 && this.getUserSpread(1);
			},
			getUserSpread(pageNo){
				this.API.getUserSpread({pageNo, pageSize: 10}).then(res=>{
					if (res.data.length == 0) {
						this.loadingType = 2;
						return;
					}
					this.list1 =  this.list1.concat(res.data);					
					this.loadingType = 0;	
									
				}).catch(res =>{
					this.loadingType = 0;
				})
			},
			
		},
		onShow() {
			
			this.getUserSpread(1);
			this.API.getqrcode().then(res=>{
				 this.ewm = res.data.qrcode;
			});
			
			
		},
		onReachBottom() {
			if (this.loadingType !== 0) {
				return;
			}
			this.loadingType = 1;
			this.pageNo++;
			this.getUserSpread(this.pageNo);
		}
	}
</script>

<style lang="scss">
	page{
		height: auto;
	}
	.content{
		padding: 0 30upx;
		height: 100%;
	}
   .tab-wrap{
	  width: 686upx;
	  margin: 20upx auto;
	   height: 58upx;
	   line-height: 58upx;	
	   display: flex;
	   text-align: center;
		border: 2upx solid #FF9500;
		border-radius: 30upx;
		overflow: hidden;
		
   }
   .tab-item{
	   flex: 1;
	   color: #454545;
	   font-size: 30upx;
	   &.tab-item-mid{
		   border-left: 2upx solid  #FF9500;
		   border-right: 2upx solid  #FF9500;
	   }
	   &.active{
		   background: #FF9500;
		   color: #fff;
	   }
   }
   .user-list{
	    color: #454545;
		font-size: 32upx;
	   .user{
		   height: 100upx;
		   line-height: 100upx;
		   display: flex;
		   justify-content: space-between;
		   border-bottom: 2upx solid #E6E6E6;
	   }
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
	.ewm-wrap{
		width: 610upx;
		padding: 75upx 0 155upx;
		margin: 75upx auto;
		text-align: center;
		border: 2upx solid #E6E6E6;
		image{
			width: 430upx;
			height: 430upx;		
		}
		.code{
			font-size: 80upx;
			color: #FF9833;
			margin: 54upx 0 30upx;
		}
		.des{
			font-size: 30upx;
			color: #454545;
		}
		
	}
   
</style>
