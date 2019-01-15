const  setStorageSync = (key, value)=>{
    uni.setStorageSync(key, value);
}

const  getStorageSync = (key) => {
  return  uni.getStorageSync(key);
}

const formatNumber = (n) => {
    n = n.toString();
    return n[1] ? n : '0' + n;
};

const formatDate = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    return [year, month].map(formatNumber).join('-');
};

const formatTime = (time) => {
	  let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    return [year, month, day].map(formatNumber).join('.') + ' ' + [hour, minute, second].map(formatNumber).join(':')
};

const  getLastTime = (creatTime) => {
	let oldtime = new Date(creatTime);
	let newtime = (new Date() - oldtime)/1000;
	let month = Math.floor(newtime/3600/24/30);
	let day = Math.floor(newtime/3600/24);
	let hours = Math.floor(newtime/3600);
	let mins = Math.floor(newtime/60);
	let str = '';
	if (hours === 0) {
		if (mins <= 3) {
			str = '刚刚';
		} else {
			str = mins + '分钟前';
		}
	} else if (day === 0){
		str = hours + '小时前';
	} else if (month === 0){
		str = day + '天前';
	} else {
		str = month + '月前';
	}
	return str;
}

const Toast = {
    warn: function (val) {
        uni.showToast({
            title: val,
            icon: 'warn',
            duration: 2000,
            mask: true
        })
    },
    toast: function (title) {   
				uni.showToast({
						icon: 'none',
						duration: 2000,
						title
				});		
    },
    success: function (val) {
        uni.showToast({
            title: val,
            icon: 'success',
            duration: 2000,
            mask: true
        })
    },
    error: function (val) {
        uni.showToast({
            title: val,
            //  image: 'https://www.ishiyaji.com/static/images/others/icon-error.png',
            duration: 2000,
            mask: true
        })
    },
    showLoading: function (param = 'loading') {
        uni.showLoading({
            title: param,
            mask: true
        })
    },
    hideLoading: function () {
        setTimeout(() => {
            uni.hideLoading()
        }, 100)
    },
    showModal: function (title, content, callback) {
        uni.showModal({
            title,
            content,
            showCancel: true,
            success: function (res) {
                typeof callback === 'function' && callback(res);
            }
        })
    },

};

export default {
    setStorageSync,
    getStorageSync,
    formatDate,
    formatTime,
		getLastTime,
    Toast
};