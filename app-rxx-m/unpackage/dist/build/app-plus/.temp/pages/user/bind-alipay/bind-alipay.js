require("../../../common/manifest.js");
require("../../../common/vendor.js");
global.webpackJsonp([12],{64:function(t,e,a){"use strict";var i=s(a(1)),n=s(a(65));function s(t){return t&&t.__esModule?t:{default:t}}Page((0,i.default)(n.default))},65:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(67),n=a.n(i),s=a(68);var l=function(t){a(66)},u=a(0)(n.a,s.a,l,null,null);e.default=u.exports},66:function(t,e){},67:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default={components:{},computed:{},data:function(){return{alipay:""}},onShow:function(){},methods:{save:function(){var e=this,a={alipay_code:this.alipay};this.API.bindAlipay(a).then(function(a){e.Util.Toast.success("绑定成功"),setTimeout(function(){t.navigateBack()},2e3)})}}}}).call(e,a(2).default)},68:function(t,e,a){"use strict";var i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"content"},[a("view",{staticClass:"reg-label"}),a("view",{staticClass:"input-group"},[a("view",{staticClass:"input-row"},[a("text",{staticClass:"title"},[t._v("支付宝账号：")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.alipay,expression:"alipay"}],staticClass:"uni-input",attrs:{type:"number",maxlength:"20","placeholder-class":"placeholder",placeholder:"请输入支付宝账号",eventid:"AhL-0"},domProps:{value:t.alipay},on:{input:function(e){e.target.composing||(t.alipay=e.target.value)}}})])]),a("view",{staticClass:"btn-row"},[a("button",{staticClass:"primary",attrs:{type:"primary",disabled:!t.alipay,eventid:"2L1-1"},on:{tap:t.save}},[t._v("立即绑定")])],1)])},staticRenderFns:[]};e.a=i}},[64]);