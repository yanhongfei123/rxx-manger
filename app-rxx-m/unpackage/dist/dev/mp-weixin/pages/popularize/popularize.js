require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([16],{46:function(e,t,s){"use strict";var a=i(s(1)),n=i(s(47));function i(e){return e&&e.__esModule?e:{default:e}}Page((0,a.default)(n.default))},47:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s(49),n=s.n(a),i=s(53),o=!1;var r=function(e){o||s(48)},c=s(0)(n.a,i.a,r,null,null);c.options.__file="..\\..\\..\\app-rxx-m\\pages\\popularize\\popularize.vue",c.esModule&&Object.keys(c.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),c.options.functional&&console.error("[vue-loader] popularize.vue: functional components are not supported with templates, they should use render functions."),t.default=c.exports},48:function(e,t){},49:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,n=s(8),i=(a=n)&&a.__esModule?a:{default:a};t.default={components:{loadMore:i.default},data:function(){return{oIndex:0,list1:[],yongjinList:[],ewm:"",pageNo:1,pageSize:10,loadingType:0,contentText:{contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"}}},methods:{changeTab:function(e){this.oIndex=e,this.loadingType=0,this.pageNo=1,1!=this.oIndex&&this.getUserSpread(1)},getUserSpread:function(e){var t=this;this.API.getUserSpread({pageNo:e,pageSize:10}).then(function(e){0!=e.data.length?(t.list1=t.list1.concat(e.data),t.loadingType=0):t.loadingType=2}).catch(function(e){t.loadingType=0})}},onShow:function(){var e=this;this.getUserSpread(1),this.API.getqrcode().then(function(t){e.ewm=t.data.qrcode})},onReachBottom:function(){0===this.loadingType&&(this.loadingType=1,this.pageNo++,this.getUserSpread(this.pageNo))}}},53:function(e,t,s){"use strict";var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("view",{staticClass:"content"},[s("view",{staticClass:"tab-wrap"},[s("view",{staticClass:"tab-item",class:{active:0===e.oIndex},attrs:{eventid:"aI9-0"},on:{click:function(t){e.changeTab(0)}}},[e._v("推广用户")]),s("view",{staticClass:"tab-item tab-item-mid",class:{active:1===e.oIndex},attrs:{eventid:"9eZ-1"},on:{click:function(t){e.changeTab(1)}}},[e._v("专属二维码")]),s("view",{staticClass:"tab-item",class:{active:2===e.oIndex},attrs:{eventid:"jhy-2"},on:{click:function(t){e.changeTab(2)}}},[e._v("佣金明细")])]),s("view",{directives:[{name:"show",rawName:"v-show",value:0===e.oIndex,expression:"oIndex===0"}],staticClass:"user-list"},e._l(e.list1,function(t,a){return s("view",{staticClass:"user"},[s("view",[e._v(e._s(t.name))]),s("view",[e._v(e._s(t.mobile))])])})),s("view",{directives:[{name:"show",rawName:"v-show",value:1===e.oIndex,expression:"oIndex===1"}],staticClass:"ewm-wrap"},[s("image",{attrs:{src:e.ewm,mode:"widthFix"}}),s("view",{staticClass:"code"},[e._v("660456")]),s("view",{staticClass:"des"},[e._v("我的推荐码")])]),s("view",{directives:[{name:"show",rawName:"v-show",value:2===e.oIndex,expression:"oIndex===2"}],staticClass:"yongjin-list"},e._l(e.yongjinList,function(t,a){return s("view",{staticClass:"uni-list-cell"},[s("view",{staticClass:"order-number"},[e._v("订单编号: "+e._s(t.orderNumber)+" ")]),s("view",{staticClass:"cell-mid"},[s("view",{staticClass:"apply-money h-70"},[e._v("客户名称: "+e._s(t.userNmae)+" ")]),s("view",{staticClass:"apply-name h-70"},[e._v("贷款产品: "+e._s(t.pruductname)+" ")]),s("view",{staticClass:"apply-type h-70"},[e._v("贷款类型: "+e._s(t.typename)+" ")]),s("view",{staticClass:"apply-date h-70"},[e._v("贷款周期: "+e._s(t.cyclename)+" ")])])])})),s("view",{directives:[{name:"show",rawName:"v-show",value:1!=e.oIndex,expression:"oIndex!=1"}]},[s("load-more",{attrs:{loadingType:e.loadingType,contentText:e.contentText,mpcomid:"CsL-0"}})],1)])};a._withStripped=!0;var n={render:a,staticRenderFns:[]};t.a=n}},[46]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/popularize/popularize.js.map