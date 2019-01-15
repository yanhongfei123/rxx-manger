require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([14],{137:function(e,t,s){"use strict";var n=a(s(1)),o=a(s(138));function a(e){return e&&e.__esModule?e:{default:e}}Page((0,n.default)(o.default))},138:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s(140),o=s.n(n),a=s(141);var i=function(e){s(139)},l=s(0)(o.a,a.a,i,null,null);t.default=l.exports},139:function(e,t){},140:function(e,t,s){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=l(s(4)),o=l(s(13)),a=l(s(14)),i=l(s(15));function l(e){return e&&e.__esModule?e:{default:e}}t.default={components:{uniInput:n.default,countDown:o.default},computed:{_disabled:function(){return!this.phone||!this.smscode}},data:function(){return{disabled:!1,phone:"",smscode:""}},onLoad:function(e){},onShow:function(){console.log(this.disabled)},methods:{getCode:function(){var e=this,t=this.validateMobileFunc();t?this.Util.Toast.toast(t):this.disabled||(this.disabled=!0,this.API.sendMsg({phone:this.phone,type:1}).then(function(t){e.$refs.countDown.countDown(),e.Util.Toast.success("验证码已发送"),setTimeout(function(){e.disabled=!1},6e3)}).catch(function(t){e.disabled=!1}))},register:function(){var t=this.validateFunc();t?this.Util.Toast.toast(t):(e.setStorageSync("phone",this.phone),e.setStorageSync("smscode",this.smscode),this.disabled=!1,this.phone="",this.smscode="",e.navigateTo({url:"/pages/user/userInfo/userInfo"}))},validateMobileFunc:function(){var e=new a.default(i.default);return e.addRules(this.phone,[{strategy:"mobile",errorMsg:"请输入正确的手机号"}],function(){console.log("验证通过")}),e.start()},validateFunc:function(){var e=new a.default(i.default);return e.addRules(this.phone,[{strategy:"mobile",errorMsg:"请输入正确的手机号"}],function(){console.log("验证通过")}),e.addRules(this.smscode,[{strategy:"minLength:4",errorMsg:"请输入短信验证码"}],function(){console.log("验证通过")}),e.start()}}}}).call(t,s(2).default)},141:function(e,t,s){"use strict";var n={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("view",{staticClass:"content"},[s("view",{staticClass:"reg-label"},[e._v("新用户注册")]),s("view",{staticClass:"input-group"},[s("view",{staticClass:"input-row"},[s("text",{staticClass:"title"},[e._v("手机号：")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.phone,expression:"phone"}],staticClass:"uni-input",attrs:{type:"number",maxlength:"11","placeholder-class":"placeholder",placeholder:"请输入手机号码",eventid:"HVH-0"},domProps:{value:e.phone},on:{input:function(t){t.target.composing||(e.phone=t.target.value)}}})]),s("view",{staticClass:"input-row"},[s("text",{staticClass:"title"},[e._v("验证码：")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.smscode,expression:"smscode"}],staticClass:"uni-input",attrs:{type:"number",maxlength:"6","placeholder-class":"placeholder",placeholder:"请输入短信验证码",eventid:"7ac-1"},domProps:{value:e.smscode},on:{input:function(t){t.target.composing||(e.smscode=t.target.value)}}}),s("count-down",{ref:"countDown",attrs:{color:"FF9833",size:"30",eventid:"S1L-2",mpcomid:"rjr-0"},on:{countDown:e.getCode}})],1)]),s("view",{staticClass:"btn-row"},[s("button",{staticClass:"primary",attrs:{type:"primary",disabled:e._disabled,eventid:"P4t-3"},on:{tap:e.register}},[e._v("下一步")])],1)])},staticRenderFns:[]};t.a=n}},[137]);