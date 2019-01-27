import Promise from '../libs/js/bluebird' //为了兼容异步请求问题

/**
 * 验证返回的的code码问题
 * @param {*} resolve
 * @param {*} res 返回的data
 */
const checkCode = (resolve, res, reject) => {
	if (res.code === 0) {
		resolve(res);
	}else if(res.code == -2000){
		console.log(res);
		uni.redirectTo({
			url: "/pages/login/login"
		});
		uni.clearStorageSync();
	} else {
		uni.showToast({
			title: res.message,
			icon: 'none',
			duration: 1500,
			mask: true
		});
		reject(res);
	}
};

const urlParam = function(obj) {
	var arr = [];
	for (var k in obj) {
		if (obj[k] != null && obj[k] != '') {
			arr.push(k + '=' + obj[k]);
		}
	}
	return arr.join('&');
};

/**
 * 请求API接口
 * @param  {String} api    api 根地址
 * @param  {String} path   请求路径
 * @param  {Object} params 参数
 * @return {Promise}       包含抓取任务的Promise
 */


export default function(methods, path, params, isNeedToken) {
	uni.showLoading({title: '加载中...',});
	let header = {
		"Content-Type": "application/x-www-form-urlencoded"
	};
	var token = uni.getStorageSync('token');
	if (!!token && isNeedToken) {
		params['token'] = token;
	}
    
	return new Promise((resolve, reject) => {
		uni.request({
			url: path,
			data: params,
			method: methods,
			timeout: '5000',
			header,
			success: function(res) {
				uni.hideLoading();
				checkCode(resolve, res.data, reject);
			},
			fail: function() {
				uni.hideLoading();
				uni.showToast({
					title: '服务器开小差啦',
					icon: 'none',
					duration: 3000,
					mask: true
				});

			}
		})
	})
};
