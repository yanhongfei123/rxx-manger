<script>
    export default {
        onLaunch: function () {
            console.log('App Launch');
        },
        onShow: function () {
            console.log('App Show');
        },
        onHide: function () {
            console.log('App Hide');
        }
    }
</script>

<style lang="scss">
    /*每个页面公共css */
    /* uni-app默认全局使用flex布局。因为flex布局有利于跨更多平台，尤其是采用原生渲染的平台。如不了解flex布局，请参考http://www.w3.org/TR/css3-flexbox/。如不使用flex布局，请删除或注释掉本行。*/

    page {
        min-height: 100%;
    }
	
	.placeholder{
		color:#BBB;
		font-size: 32upx;
	}
	
	input{
		font-size: 32upx;
	}

	button[type=primary]{
		display: block;
		width: 690upx;
		margin: 0 auto;
		height: 88upx;
		line-height:88upx;
		text-align: center;
		background-color: #FF9833;
	}
	
	button[disabled][type=primary]{
		color: #fff;
		background-color: #BBB;
	}
	
	.btn-upload{
		border-radius: 44upx;
	}
	
	.icon-right{
		width: 22upx;
		height: 22px;
		border:2upx solid #bbb;
		border-left:none;
		border-bottom:none;
		transform:rotate(45deg) ;
	}
	
	.input-row {
		position:relative;
		height: 116upx;     
		display: flex;
		align-items: center;
		border-bottom: 2upx solid #e6e6e6;
		.title{
			width: 158upx;
			font-size:32upx;
			color:#454545;
		}	
	}
	.space-between{
		margin:0 0 0 30upx;
		padding-right:30upx;
		justify-content:space-between
	}
	
	.uni-input{
		padding-left: 36upx;
	}

//     .input-group::before {
//         position: absolute;
//         right: 0;
//         top: 0;
//         left: 0;
//         height: 1px;
//         content: '';
//         -webkit-transform: scaleY(.5);
//         transform: scaleY(.5);
//         background-color: #c8c7cc;
//     }

 
</style>
