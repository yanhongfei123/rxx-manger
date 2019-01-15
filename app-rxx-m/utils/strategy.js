const strategys = {
  isEmpty: function(value, errorMsg) {
    if (value === '') {
      return errorMsg;
    }
  },
  minLength: function(value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg;
    }
  },
  maxLength: function(value, length, errorMsg) {
    if (value.length > length) {
      return errorMsg;
    }
  },
  isChinese: function (value, errorMsg){
    if (/[^\u4e00-\u9fa5]/g.test(value)){
      return errorMsg;
    }
  },
  // 手机号码格式
  mobile: function(value, errorMsg) {
    if (!/(^1\d{1}[0-9]{9}$)/.test(value)) {
      return errorMsg;
    }
  },
  // 身份证号码
  idCard: function (value, errorMsg) {
    if (!/^(\d|x|X){18}$/.test(value)) {
      return errorMsg;
    }
  },


}
export default strategys;
