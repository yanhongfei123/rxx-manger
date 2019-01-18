require("../../../common/manifest.js");
require("../../../common/vendor.js");
global.webpackJsonp([5],{109:function(t,a,e){"use strict";var n=r(e(1)),i=r(e(110));function r(t){return t&&t.__esModule?t:{default:t}}Page((0,n.default)(i.default))},110:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e(112),i=e.n(n),r=e(113),s=!1;var o=function(t){s||e(111)},c=e(0)(i.a,r.a,o,null,null);c.options.__file="Users/jack/Desktop/app-rxx-m/pages/user/userInfo/idCard.vue",c.esModule&&Object.keys(c.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),c.options.functional&&console.error("[vue-loader] idCard.vue: functional components are not supported with templates, they should use render functions."),a.default=c.exports},111:function(t,a){},112:function(t,a,e){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0});var n=e(5);a.default={data:function(){return{uploadAmount:0,disabled:!0,idcardFront:"/static/img/idcard-front.png",idcardBack:"/static/img/idcard-back.png"}},methods:{confirm:function(){t.navigateBack()},upload:function(a){var e=this;t.chooseImage({count:1,success:function(i){e.Util.Toast.showLoading("上传中...");var r=i.tempFilePaths;t.uploadFile({url:n.API_DOMAIN+"/uploadfile",filePath:r[0],name:"file",success:function(n){var i=JSON.parse(n.data).data;"front"==a?(e.idcardFront=i,t.setStorageSync("idcardFront",i)):(e.idcardBack=i,t.setStorageSync("idcardBack",i)),-1!=e.idcardFront.indexOf("http")&&-1!=e.idcardBack.indexOf("http")&&(e.disabled=!1)},fail:function(){e.Util.Toast.hideLoading(),e.Util.Toast.toast("上传失败"),console.log("上传失败")}}).onProgressUpdate(function(t){100==t.progress&&(e.Util.Toast.hideLoading(),e.Util.Toast.toast("上传成功"))})}})}},onShow:function(){var a,e,n=t.getStorageSync("userInfo");a=n&&JSON.parse(n).manger.ID_PHOTO?JSON.parse(n).manger.ID_PHOTO:t.getStorageSync("idcardFront"),e=n&&JSON.parse(n).manger.ID_PHOTO_Negative?JSON.parse(n).manger.ID_PHOTO_Negative:t.getStorageSync("idcardBack"),this.idcardFront=a||"/static/img/idcard-front.png",this.idcardBack=e||"/static/img/idcard-back.png",this.disabled=!a||!e}}}).call(a,e(2).default)},113:function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("view",{staticClass:"content"},[e("view",{staticClass:"upload-title"},[t._v("上传身份证")]),e("view",{staticClass:"upload-wrap"},[e("view",{staticClass:"front",attrs:{eventid:"Mzi-0"},on:{tap:function(a){t.upload("front")}}},[e("image",{staticClass:"icon-card icon",attrs:{src:t.idcardFront}})]),e("view",{staticClass:"back",attrs:{eventid:"VF8-1"},on:{tap:function(a){t.upload("back")}}},[e("image",{staticClass:"icon-card icon",attrs:{src:t.idcardBack}})])]),e("view",{staticClass:"btn-row"},[e("button",{staticClass:"btn-upload",attrs:{type:"primary",disabled:t.disabled,eventid:"jyS-2"},on:{tap:t.confirm}},[t._v("完成")])],1)])};n._withStripped=!0;var i={render:n,staticRenderFns:[]};a.a=i}},[109]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/user/userInfo/idCard.js.map