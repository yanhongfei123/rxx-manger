/**
 * @Author: PerfectYan
 */

import fetch from './fetch';

import {
	API_DOMAIN
} from './config';


/**
 * @param {string} type   请求方式
 * @param {string} action 接口请求地址
 * @param {object} params [params={}]
 * @param {object} isNeedToken 是否需要携带token
 */
const fetchApi = (type, action, params = {}, isNeedToken = true) => {
	return fetch(type, `${API_DOMAIN}${action}`, params, isNeedToken)
};

const authLogin = (params) => {
	return fetchApi('POST', '/login', params).then(res => res)
};
const logout = (params) => {
	return fetchApi('POST', '/logout', params).then(res => res)
};
const registerManager = (params) => {
	return fetchApi('POST', '/register_manager', params, false).then(res => res)
};

const updateManager = (params) => {
	return fetchApi('POST', '/updateuserinfo_manager', params).then(res => res)
};

const feedbackCreate = (params) => {
	return fetchApi('POST', '/feedbackCreate', params).then(res => res)
};

const sendMsg = (params) => {
	return fetchApi('POST', '/sendMsg', {...params, usertype: 2}, false).then(res => res)
};
const forgetPas = (params) => {
	return fetchApi('POST', '/forget', params, false).then(res => res)
};

const weixinLogin = (params) => {
	return fetchApi('GET', '/weichatLogin_xcx', params).then(res => res)
};
const weixinPay = (params) => {
	return fetchApi('POST', '/wechatpay_xcx', params, false).then(res => res)
};

const CreateAliPayOrder = (params) => {
	return fetchApi('POST', '/CreateAliPayOrder', params).then(res => res)
};

// 首页
const getOrderbynearby = (params) => {
	return fetchApi('POST', '/getOrderbynearby', params).then(res => res)
};

// 抢单
const getOrder = (params) => {
	return fetchApi('POST', '/order_grab', params).then(res => res)
};

// 订单列表
const getOrderbymanger = (params) => {
	return fetchApi('POST', '/getOrderbymanger', params).then(res => res)
};

//  资金流水
const getaccessflow = (params) => {
	return fetchApi('POST', '/getaccessflow', params).then(res => res)
};

//  融单专区
const getOrderbyold = (params) => {
	return fetchApi('POST', '/getOrderbyold', params).then(res => res)
};

//  合伙人
const getUserSpread = (params) => {
	return fetchApi('POST', '/getUser_spread', params).then(res => res)
};

// 二维码
const getqrcode = (params) => {
	return fetchApi('POST', '/getqrcode', params).then(res => res)
};

// 查询代理产品H5宣传页，关于我们
const getDailiProductH5 = (params) => {
	return fetchApi('GET','/getdailiproducth5', params).then(res => res);
}

// 提现
const getCash = (params) => {
	return fetchApi('POST','/usercash', params).then(res => res);
}

const gettypelist = (params) => {
	return fetchApi('GET','/typelist', params).then(res => res);
}

const getui = (params) => {
	return fetchApi('POST','/getui', params).then(res => res);
}

const bindAlipay = (params) => {
	return fetchApi('POST','/bindingAliPay', params).then(res => res);
}

const jpushSaveID = (params) => {
	return fetchApi('POST','/jpush_saveID', params).then(res => res);
}

export default {
	weixinPay,
	weixinLogin,
	authLogin,
	logout,
	registerManager,
	updateManager,
	feedbackCreate,
	sendMsg,
	forgetPas,
	getOrderbynearby,
	getOrder,
	getOrderbymanger,
	getaccessflow,
	getOrderbyold,
	getUserSpread,
	getqrcode,
	getCash,
	CreateAliPayOrder,
	gettypelist,
	getui,
	bindAlipay,
	jpushSaveID
	
};
