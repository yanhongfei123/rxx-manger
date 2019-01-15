<template>
	<view class="content">
		<web-view :webview-styles="webviewStyles" src="http://api.rongxiaoxiao.com/about"></web-view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				 webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                }
			}
		},
		onLoad() {
// 			let params = { ID: 32};
// 			this.API.getDailiProductH5(params).then(res=> {
// 				this.content = res.data.description || '';
// 			});
		}
	}
</script>

<style lang="scss">

</style>
