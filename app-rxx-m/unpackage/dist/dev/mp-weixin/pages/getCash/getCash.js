require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([22],{34:function(t,e,a){"use strict";var s=o(a(1)),n=o(a(35));function o(t){return t&&t.__esModule?t:{default:t}}Page((0,s.default)(n.default))},35:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(37),n=a.n(s),o=a(45),u=!1;var r=function(t){u||a(36)},i=a(0)(n.a,o.a,r,null,null);i.options.__file="Users/jack/Desktop/app-rxx-m/pages/getCash/getCash.vue",i.esModule&&Object.keys(i.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),i.options.functional&&console.error("[vue-loader] getCash.vue: functional components are not supported with templates, they should use render functions."),e.default=i.exports},36:function(t,e){},37:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s,n=a(4);(s=n)&&s.__esModule;e.default={data:function(){return{amount:"",useraccount:0}},computed:{},methods:{getCash:function(){var t=this;this.amount>this.useraccount?this.Util.Toast.toast("余额不足"):this.API.getCash({amount:this.amount}).then(function(e){t.Util.Toast.toast("提现成功")})}},onLoad:function(){var t=this;this.API.getuseraccount().then(function(e){var a=parseFloat(e.data.Balance)-parseFloat(e.data.freeze);t.useraccount=a>0?a:0})}}},45:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"content"},[a("view",{staticClass:"useraccount"},[t._v("我的余额: "+t._s(t.useraccount)+"元")]),a("view",{staticClass:"title"},[t._v("请输入提现金额")]),a("view",{staticClass:"input-wrap"},[a("view",{staticClass:"icon"},[t._v("￥")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.amount,expression:"amount"}],attrs:{type:"number",eventid:"Yrb-0"},domProps:{value:t.amount},on:{input:function(e){e.target.composing||(t.amount=e.target.value)}}})]),a("view",{staticClass:"btn-row"},[a("button",{staticClass:"primary",attrs:{type:"primary",disabled:!t.amount,eventid:"z9A-1"},on:{tap:t.getCash}},[t._v("提现")])],1)])};s._withStripped=!0;var n={render:s,staticRenderFns:[]};e.a=n}},[34]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/getCash/getCash.js.map