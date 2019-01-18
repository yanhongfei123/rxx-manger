require("../../../common/manifest.js");
require("../../../common/vendor.js");
global.webpackJsonp([4],{94:function(e,t,s){"use strict";var i=o(s(1)),a=o(s(95));function o(e){return e&&e.__esModule?e:{default:e}}Page((0,i.default)(a.default))},95:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s(97),a=s.n(i),o=s(98),r=!1;var n=function(e){r||s(96)},c=s(0)(a.a,o.a,n,null,null);c.options.__file="Users/jack/Desktop/app-rxx-m/pages/user/userInfo/userInfo.vue",c.esModule&&Object.keys(c.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),c.options.functional&&console.error("[vue-loader] userInfo.vue: functional components are not supported with templates, they should use render functions."),t.default=c.exports},96:function(e,t){},97:function(e,t,s){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var i,a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var i in s)Object.prototype.hasOwnProperty.call(s,i)&&(e[i]=s[i])}return e},o=s(4),r=(i=o)&&i.__esModule?i:{default:i},n=s(3);t.default={components:{uniInput:r.default},computed:a({},(0,n.mapState)(["token"])),data:function(){return{businessTypeList:[],sexList:[{sex:"男"},{sex:"女"}],form:{PHONE:"",NAME:"",business_type_id:[],PASSWORD:"",AGE:"",SEX:0,ID_CARD_NO:"",VALIDITY:"",POST:"",COMPANY_NAME:""},ID_PHOTO:"",ID_PHOTO_Negative:"",WORK_PERMIT:"",isIdCardUploaded:!1,isWordCardUploaded:!1,isshowbox:!1,typeId:[]}},methods:{inputChange:function(){
//!this.token && uni.setStorageSync('form', JSON.stringify(this.form));
},chooseType:function(e){if(e.isChecked){var t=this.form.business_type_id.indexOf(e.ID);this.form.business_type_id.splice(t,1)}else!this.form.business_type_id.includes(e.ID)&&this.form.business_type_id.push(e.ID);e.isChecked=!e.isChecked},pickerBusinessType:function(e){var t=parseInt(e.detail.value);this.form=a({},this.form,{business_type_id:t+1})},sexChange:function(e){var t=parseInt(e.detail.value);this.$set(this.form,"SEX",t)},goDetail:function(t){e.navigateTo({url:"/pages/user/"+t})},removeStorage:function(){e.removeStorageSync("form"),e.removeStorageSync("phone"),e.removeStorageSync("smscode"),e.removeStorageSync("workCard"),e.removeStorageSync("businessCard"),e.removeStorageSync("idcardFront"),e.removeStorageSync("idcardBack")},save:function(){var t=this;if(this.token){var s=a({},this.form,{business_type_id:this.form.business_type_id.toString(),WORK_PERMIT:this.workCard,ID_PHOTO:this.idcardFront,ID_PHOTO_Negative:this.idcardBack,PromotionCode:this.PromotionCode});return 0==this.form.business_type_id.length?void this.Util.Toast.success("请选择业务类型"):void this.API.updateManager(s).then(function(s){t.Util.Toast.success("保存成功"),t.removeStorage(),e.setStorageSync("business_type_id",JSON.stringify(t.form.business_type_id)),e.setStorageSync("userInfo",JSON.stringify(s.data)),setTimeout(function(){e.switchTab({url:"/pages/user/user"})},500)})}s=a({},this.form,{business_type_id:this.form.business_type_id.toString(),smscode:this.smscode,WORK_PERMIT:this.workCard,ID_PHOTO:this.idcardFront,ID_PHOTO_Negative:this.idcardBack,PromotionCode:this.PromotionCode});this.form.PASSWORD?0!=this.form.business_type_id.length?this.API.registerManager(s).then(function(s){t.Util.Toast.success("注册成功"),t.removeStorage(),e.setStorageSync("userInfo",JSON.stringify(s.data)),e.setStorageSync("business_type_id",JSON.stringify(t.form.business_type_id)),setTimeout(function(){e.navigateTo({url:"/pages/login/login"})},1e3)}).catch(function(t){"验证码错误"==t.message&&setTimeout(function(){e.navigateTo({url:"/pages/reg/reg"})},1e3)}):this.Util.Toast.success("请选择业务类型"):this.Util.Toast.success("请设置密码")},setTypeLight:function(){var t=this,s=e.getStorageSync("business_type_id");if(console.log(s),s){var i=JSON.parse(s);this.$set(this.form,"business_type_id",i),console.log(i);var a=[];i.map(function(e,s){a=t.businessTypeList.map(function(t,s){return t.ID==e&&(t.isChecked=!0),t})}),this.businessTypeList=a,console.log(this.businessTypeList)}}},onLoad:function(t){var s=this;console.log("111111");var i=t.PromotionCode;this.phone=e.getStorageSync("phone"),this.$set(this.form,"PHONE",this.phone),this.smscode=e.getStorageSync("smscode"),this.PromotionCode=i||"",this.API.gettypelist().then(function(e){s.businessTypeList=e.data.map(function(e,t){return e.isChecked=!1,e}),s.setTypeLight()})},onShow:function(){if(this.token){var t=JSON.parse(e.getStorageSync("userInfo")),s=a({},t.manger,t.user,{PASSWORD:"",business_type_id:[]}),i={};for(var o in this.form)i[o]=s[o];return this.form=i,this.isWordCardUploaded=e.getStorageSync("workCard")||s.WORK_PERMIT,this.isIdCardUploaded=e.getStorageSync("idcardFront")&&e.getStorageSync("idcardBack")||!!s.ID_PHOTO&&!!s.ID_PHOTO_Negative,this.workCard=e.getStorageSync("workCard")||s.WORK_PERMIT,this.idcardFront=e.getStorageSync("idcardFront")||s.ID_PHOTO,void(this.idcardBack=e.getStorageSync("idcardBack")||s.ID_PHOTO_Negative)}this.workCard=e.getStorageSync("workCard"),this.idcardFront=e.getStorageSync("idcardFront"),this.idcardBack=e.getStorageSync("idcardBack"),this.isWordCardUploaded=!!e.getStorageSync("workCard"),this.isIdCardUploaded=!!e.getStorageSync("idcardFront")&&!!e.getStorageSync("idcardBack")}}}).call(t,s(2).default)},98:function(e,t,s){"use strict";var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("view",{staticClass:"content"},[s("view",{staticClass:"reg-label"}),s("view",{staticClass:"input-group"},[s("view",{staticClass:"input-row  space-between"},[s("text",{staticClass:"title"},[e._v("姓名")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.form.NAME,expression:"form.NAME"}],attrs:{type:"text","placeholder-class":"placeholder",placeholder:"请输入姓名",eventid:"GvB-0"},domProps:{value:e.form.NAME},on:{input:[function(t){t.target.composing||(e.form.NAME=t.target.value)},e.inputChange]}})]),s("view",{staticClass:"input-row  space-between"},[s("text",{staticClass:"title"},[e._v("手机号")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.form.PHONE,expression:"form.PHONE"}],attrs:{type:"text","placeholder-class":"placeholder",placeholder:"请输入手机号码",eventid:"b2v-1"},domProps:{value:e.form.PHONE},on:{input:[function(t){t.target.composing||(e.form.PHONE=t.target.value)},e.inputChange]}})]),s("view",{directives:[{name:"show",rawName:"v-show",value:!e.token,expression:"!token"}],staticClass:"input-row  space-between"},[s("text",{staticClass:"title"},[e._v("设置密码")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.form.PASSWORD,expression:"form.PASSWORD"}],attrs:{type:"password","placeholder-class":"placeholder",placeholder:"请输入密码",eventid:"6rP-2"},domProps:{value:e.form.PASSWORD},on:{input:[function(t){t.target.composing||(e.form.PASSWORD=t.target.value)},e.inputChange]}})]),s("view",{staticClass:"input-row  space-between"},[s("text",{staticClass:"title"},[e._v("年龄")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.form.AGE,expression:"form.AGE"}],attrs:{type:"text","placeholder-class":"placeholder",placeholder:"请输入年龄",eventid:"tc5-3"},domProps:{value:e.form.AGE},on:{input:[function(t){t.target.composing||(e.form.AGE=t.target.value)},e.inputChange]}})]),s("view",{staticClass:"input-row  space-between"},[s("text",{staticClass:"title"},[e._v("职位")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.form.POST,expression:"form.POST"}],attrs:{type:"text","placeholder-class":"placeholder",placeholder:"请输入职业",eventid:"E1P-4"},domProps:{value:e.form.POST},on:{input:[function(t){t.target.composing||(e.form.POST=t.target.value)},e.inputChange]}})]),s("view",{staticClass:"input-row  space-between"},[s("text",{staticClass:"title"},[e._v("公司名称")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.form.COMPANY_NAME,expression:"form.COMPANY_NAME"}],attrs:{type:"text","placeholder-class":"placeholder",placeholder:"请输入公司名称",eventid:"QNw-5"},domProps:{value:e.form.COMPANY_NAME},on:{input:[function(t){t.target.composing||(e.form.COMPANY_NAME=t.target.value)},e.inputChange]}})]),s("view",{staticClass:"input-row  space-between"},[s("text",{staticClass:"title"},[e._v("性别")]),s("picker",{staticClass:"picker-item",attrs:{mode:"selector",range:e.sexList,"range-key":"sex",eventid:"6Bc-6"},on:{change:e.sexChange}},[s("view",{staticClass:"picker-btn"},[e._v(e._s(e.sexList[e.form.SEX].sex))])]),s("view",{staticClass:"icon-right"})],1),s("view",{staticClass:"input-row  space-between",attrs:{eventid:"ttB-7"},on:{tap:function(t){e.isshowbox=!e.isshowbox}}},[s("text",{staticClass:"title"},[e._v("业务类型")]),s("view",{staticClass:"icon-right"})]),s("view",{directives:[{name:"show",rawName:"v-show",value:e.isshowbox,expression:"isshowbox"}],staticClass:"box-list  flex"},[s("view",{staticClass:"box-label"},[e._v("业务类型:")]),s("view",{staticClass:"box-cont"},e._l(e.businessTypeList,function(t,i){return s("view",{key:i,staticClass:"flex box-item",attrs:{eventid:"ZLv-8-"+i},on:{tap:function(s){e.chooseType(t)}}},[s("view",{staticClass:"select-btn",class:{checked:t.isChecked}},[s("image",{attrs:{src:"/static/img/img/choosed.png",mode:"widthFix"}})]),s("view",[e._v(e._s(t.name))])])}))]),s("view",{staticClass:"input-row  space-between"},[s("text",{staticClass:"title"},[e._v("身份证号码")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.form.ID_CARD_NO,expression:"form.ID_CARD_NO"}],attrs:{maxlength:"20","placeholder-class":"placeholder",type:"text",clearable:"",placeholder:"请输入身份证号码",eventid:"Mby-9"},domProps:{value:e.form.ID_CARD_NO},on:{input:[function(t){t.target.composing||(e.form.ID_CARD_NO=t.target.value)},e.inputChange]}})]),s("view",{staticClass:"input-row  space-between"},[s("text",{staticClass:"title"},[e._v("身份证有效期")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.form.VALIDITY,expression:"form.VALIDITY"}],attrs:{type:"text","placeholder-class":"placeholder",placeholder:"请输入身份证有效期",eventid:"sNr-10"},domProps:{value:e.form.VALIDITY},on:{input:[function(t){t.target.composing||(e.form.VALIDITY=t.target.value)},e.inputChange]}})]),s("view",{staticClass:"input-row  space-between",attrs:{eventid:"oO9-11"},on:{tap:function(t){e.goDetail("userInfo/idCard")}}},[s("text",{staticClass:"title"},[e._v("身份证")]),s("view",{directives:[{name:"show",rawName:"v-show",value:e.isIdCardUploaded,expression:"isIdCardUploaded"}],staticClass:"idcard-des des"},[e._v("已上传")]),s("view",{directives:[{name:"show",rawName:"v-show",value:!e.isIdCardUploaded,expression:"!isIdCardUploaded"}],staticClass:"idcard-des des"},[e._v("未上传")]),s("view",{staticClass:"icon-right"})]),s("view",{staticClass:"input-row  space-between",attrs:{eventid:"Kuc-12"},on:{tap:function(t){e.goDetail("userInfo/workCard")}}},[s("text",{staticClass:"title"},[e._v("工作证")]),s("view",{directives:[{name:"show",rawName:"v-show",value:e.isWordCardUploaded,expression:"isWordCardUploaded"}],staticClass:"workcard-des des"},[e._v("已上传")]),s("view",{directives:[{name:"show",rawName:"v-show",value:!e.isWordCardUploaded,expression:"!isWordCardUploaded"}],staticClass:"workcard-des des"},[e._v("未上传")]),s("view",{staticClass:"icon-right"})])]),s("view",{staticClass:"btn-row"},[s("button",{attrs:{type:"primary",eventid:"TUH-13"},on:{tap:e.save}},[e._v("保存")])],1)])};i._withStripped=!0;var a={render:i,staticRenderFns:[]};t.a=a}},[94]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/user/userInfo/userInfo.js.map