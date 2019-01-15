<template>
	<view class="content">
		<view class="tab-list">
			<view @tap="tabChange(index)" :class="[index==oInddex?'selected':'']" class="tab-list-cell" v-for="(item,index) in tabList"
			 :key="index">{{item}}</view>
		</view>
		<view class="flow-list">
			<view class="flow-item" v-for="(item, index) in flowList">
				<view class="type">变更类型: {{tabList[item.type]}}</view>
				<view class="amout">变更金额: {{item.changeAmount}}</view>
				<view class="type">变更前: {{item.beforechange}}</view>
				<view class="type">变更后: {{item.AfterChange}}</view>
				<view class="type">变更时间: {{item.updatetime}}</view>
			</view>
		</view>
		<load-more :loadingType="loadingType" :contentText="contentText"></load-more>

	</view>
</template>

<script>
	import loadMore from '../../../components/load-more.vue'
	
	// 1,充值，2，提现，3，抢单手续费，4，返佣
	export default {
		components: {
			loadMore
		},
		data() {
			return {
				oInddex: 0,
				tabList: ['全部', '充值', '提现', '抢单', '返佣'],
				flowList: [],
				pageNo: 1,
				//pageSize: 10,
				loadingType: 0,
				contentText: { //上拉的状态：0-loading前；1-loading中；2-没有更多了
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}		
			}
		},
		methods: {
			tabChange(index) {
				this.oInddex = index;
				this.pageNo = 1;
				this.loadingType = 0;
				this.flowList = [];
				this.getaccessflow(index, 1);
			},
			getaccessflow(type,pageNo){
				this.API.getaccessflow({type, pageNo, pageSize: 10}).then(res=>{
					if (res.data.length == 0) {
						this.loadingType = 2;
						return;
					}
					this.flowList =  this.flowList.concat(res.data.map((item, index)=> {
						item.updatetime = this.Util.formatTime(Number(item.updatetime));
						return  item
					}));					
					this.loadingType = 0;	
									
				}).catch(res =>{
					this.loadingType = 0;
				})
			}
		},
		onShow(){
			this.getaccessflow(this.oInddex, 1);
		},
		onReachBottom() {
			if (this.loadingType !== 0) {
				return;
			}
			this.loadingType = 1;
			this.pageNo++;
			this.getaccessflow(this.oInddex, this.pageNo);
		}
		
	}
</script>

<style lang="scss">
	page {
		background: rgba(247, 247, 247, 1);

	}

	.content {}

	.tab-list {
		height: 88upx;
		line-height: 88upx;
		padding: 0 40upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;

		.tab-list-cell {
			font-size: 30upx;
			width: 110upx;
			height: 56upx;
			line-height: 56upx;
			text-align: center;
			background: rgba(247, 247, 247, 1);
			border-radius: 30upx;

			&.selected {
				border: 2upx  solid #FF9833;
				color: #FF9833;
			}
		}
	}

	.flow-list {}

	.flow-item {
		width: 690upx;		
		font-size: 32upx;
		margin: 25upx auto 0;
		padding: 22upx 0 33upx 32upx;
		background: #fff;
		box-sizing:border-box;
			
		view{
			height: 70upx;
			line-height: 70upx;
		}

		.amout {
			color: #FF9833;
		}
	}
</style>
