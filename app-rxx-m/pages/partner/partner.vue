<template>
    <view>
		<view class="partner-list" v-if="partnerList.length>0">
			<view class="partner-item" v-for="(partner,index) in partnerList" :key="index">
				<view class="name">姓名：{{partner.name}}</view>
				<view class="mobile">手机号码：{{partner.mobile}}</view>
			</view>
		</view>
		<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
	</view>
</template>

<script>
	import loadMore from '../../components/load-more.vue'
    export default {
        name: "partner",
		components: {
			loadMore
		},
        data() {
            return {
                partnerList: [],
				pageNo: 1,
				//pageSize: 10,
				loadingType: 0,
				contentText: { //上拉的状态：0-loading前；1-loading中；2-没有更多了
					contentdown: "没有更多数据了",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}
            }
        },
		methods: {		
			getaccessflow(pageNo){
				this.API.getUserSpread({pageNo, pageSize: 10}).then(res=>{
					if (res.data.length == 0) {
						this.loadingType = 2;
						return;
					}
					this.partnerList =  this.partnerList.concat(res.data);					
					this.loadingType = 0;	
									
				}).catch(res =>{
					this.loadingType = 0;
				})
			}
		},
		onShow(){
			this.getaccessflow(1);
		},
		onReachBottom() {
			if (this.loadingType !== 0) {
				return;
			}
			this.loadingType = 1;
			this.pageNo++;
			this.getaccessflow(this.pageNo);
		}
        
    }
</script>

<style scoped lang="scss">
    .no-record{
		text-align: center;
		margin-top: 100upx;
		font-size: 34upx;
	}
    .partner-item {
        margin-left: 30upx;
        padding: 24upx 0 24upx;
        color: #1A1A1A;
        font-size:30upx;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        box-shadow:0 1px 3px 0 #EBEBEB;
        line-height: 1;
        .mobile {
            margin-top: 16upx;
        }
    }

</style>
