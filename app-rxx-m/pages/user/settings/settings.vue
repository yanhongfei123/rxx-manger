<template>
	<view class="content">
		<view class="reg-label"></view>
		<view class="input-group">
			<navigator url="../../pwd/pwd">
				<view class="input-row space-between">
					<text class="title">修改密码</text>
					<view class="icon-right"></view>
				</view>
			</navigator>
		</view>
		
		<view class="input-group">
			<navigator url="../bind-alipay/bind-alipay">
				<view class="input-row space-between">
					<text style="width: 200upx;" class="title">绑定支付宝</text>
					<view class="icon-right"></view>
				</view>
			</navigator>
		</view>
		
		<view class="btn-row">
			<button type="primary" @tap="loginOut">退出登录</button>
		</view>
	</view>
</template>

<script>
	import uniInput from '../../../components/uni-input.vue';
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		components: {
			uniInput
		},
		computed: {
			...mapState(['hasLogin'])
		},
		data() {
			return {
				name: '',
				mobile: '',
				password: '',
				code: '',
			}
		},
		methods: {
			//	...mapMutations(['logout']),
			loginOut() {
				this.$store.dispatch('LoginOut').then(() => {
					uni.redirectTo({
						url: '/pages/login/login',
					});
				})
			}
		}
	}
</script>

<style lang="scss">
	.reg-label {
		margin: 40upx 0 0 0;
	}

	.btn-row {
		width: 690upx;
		margin: 380upx auto 0;
	}
</style>
