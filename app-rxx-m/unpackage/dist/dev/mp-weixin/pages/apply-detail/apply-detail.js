require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([23],{74:function(e,t,a){"use strict";var s=l(a(1)),i=l(a(75));function l(e){return e&&e.__esModule?e:{default:e}}Page((0,s.default)(i.default))},75:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a(77),i=a.n(s),l=a(78),n=!1;var c=function(e){n||a(76)},o=a(0)(i.a,l.a,c,null,null);o.options.__file="Users/jack/Desktop/app-rxx-m/pages/apply-detail/apply-detail.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] apply-detail.vue: functional components are not supported with templates, they should use render functions."),t.default=o.exports},76:function(e,t){},77:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{applyDetail:{amount:"",typename:"",cyclename:"",UPDATE_TIME:"",name:"",age:"",income:"",Credit:""}}},onShow:function(){var t=JSON.parse(e.getStorageSync("applyDetailItem"));this.applyDetail=t}}}).call(t,a(2).default)},78:function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("view",{staticClass:"content"},[a("view",{staticClass:"con-wrap"},[a("view",{staticClass:"capital-title"},[e._v(e._s(e.applyDetail.typename))]),a("view",{staticClass:"cell-mid"},[a("view",[a("view",{staticClass:"amount"},[e._v(e._s(e.applyDetail.amount))]),a("view",{staticClass:"des"},[e._v("贷款金额")])]),a("view",{staticClass:"mar110"},[a("view",{staticClass:"date"},[e._v(e._s(e.applyDetail.cyclename))]),a("view",{staticClass:"des"},[e._v("贷款期限")])]),a("view",[a("view",{staticClass:"time"},[e._v(e._s(e.applyDetail.UPDATE_TIME))]),a("view",{staticClass:"des"},[e._v("发布时间")])])]),a("view",{staticClass:"cell-btm"},[a("view",{staticClass:"info-title"},[e._v("基本信息")]),a("view",{staticClass:"user-info"},[a("view",[e._v("姓名: "+e._s(e.applyDetail.name))]),a("view",[e._v("年龄: "+e._s(e.applyDetail.age))]),a("view",[e._v("月收入: "+e._s(e.applyDetail.income||""))]),a("view",[e._v("信用情况: "+e._s(e.applyDetail.Credit))])])])]),a("view",{staticClass:"tips"},[e._v("提示：此信息由客户自信提交，请自行审核判断真伪")])])};s._withStripped=!0;var i={render:s,staticRenderFns:[]};t.a=i}},[74]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/apply-detail/apply-detail.js.map