require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([17],{46:function(e,t,a){"use strict";var s=n(a(1)),i=n(a(47));function n(e){return e&&e.__esModule?e:{default:e}}Page((0,s.default)(i.default))},47:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a(49),i=a.n(s),n=a(53);var o=function(e){a(48)},c=a(0)(i.a,n.a,o,null,null);t.default=c.exports},48:function(e,t){},49:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s,i=a(8),n=(s=i)&&s.__esModule?s:{default:s};t.default={components:{loadMore:n.default},data:function(){return{oIndex:0,list1:[],yongjinList:[],ewm:"",pageNo:1,pageSize:10,loadingType:0,contentText:{contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"}}},methods:{changeTab:function(e){this.oIndex=e,this.loadingType=0,this.pageNo=1,1!=this.oIndex&&this.getUserSpread(1)},getUserSpread:function(e){var t=this;this.API.getUserSpread({pageNo:e,pageSize:10}).then(function(e){0!=e.data.length?(t.list1=t.list1.concat(e.data),t.loadingType=0):t.loadingType=2}).catch(function(e){t.loadingType=0})}},onShow:function(){var e=this;this.getUserSpread(1),this.API.getqrcode().then(function(t){e.ewm=t.data.qrcode})},onReachBottom:function(){0===this.loadingType&&(this.loadingType=1,this.pageNo++,this.getUserSpread(this.pageNo))}}},53:function(e,t,a){"use strict";var s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("view",{staticClass:"content"},[a("view",{staticClass:"tab-wrap"},[a("view",{staticClass:"tab-item",class:{active:0===e.oIndex},attrs:{eventid:"a4e-0"},on:{click:function(t){e.changeTab(0)}}},[e._v("推广用户")]),a("view",{staticClass:"tab-item tab-item-mid",class:{active:1===e.oIndex},attrs:{eventid:"74G-1"},on:{click:function(t){e.changeTab(1)}}},[e._v("专属二维码")]),a("view",{staticClass:"tab-item",class:{active:2===e.oIndex},attrs:{eventid:"X4p-2"},on:{click:function(t){e.changeTab(2)}}},[e._v("佣金明细")])]),a("view",{directives:[{name:"show",rawName:"v-show",value:0===e.oIndex,expression:"oIndex===0"}],staticClass:"user-list"},e._l(e.list1,function(t,s){return a("view",{staticClass:"user"},[a("view",[e._v(e._s(t.name))]),a("view",[e._v(e._s(t.mobile))])])})),a("view",{directives:[{name:"show",rawName:"v-show",value:1===e.oIndex,expression:"oIndex===1"}],staticClass:"ewm-wrap"},[a("image",{attrs:{src:e.ewm,mode:"widthFix"}}),a("view",{staticClass:"code"},[e._v("660456")]),a("view",{staticClass:"des"},[e._v("我的推荐码")])]),a("view",{directives:[{name:"show",rawName:"v-show",value:2===e.oIndex,expression:"oIndex===2"}],staticClass:"yongjin-list"},e._l(e.yongjinList,function(t,s){return a("view",{staticClass:"uni-list-cell"},[a("view",{staticClass:"order-number"},[e._v("订单编号: "+e._s(t.orderNumber)+" ")]),a("view",{staticClass:"cell-mid"},[a("view",{staticClass:"apply-money h-70"},[e._v("客户名称: "+e._s(t.userNmae)+" ")]),a("view",{staticClass:"apply-name h-70"},[e._v("贷款产品: "+e._s(t.pruductname)+" ")]),a("view",{staticClass:"apply-type h-70"},[e._v("贷款类型: "+e._s(t.typename)+" ")]),a("view",{staticClass:"apply-date h-70"},[e._v("贷款周期: "+e._s(t.cyclename)+" ")])])])})),a("view",{directives:[{name:"show",rawName:"v-show",value:1!=e.oIndex,expression:"oIndex!=1"}]},[a("load-more",{attrs:{loadingType:e.loadingType,contentText:e.contentText,mpcomid:"fRv-0"}})],1)])},staticRenderFns:[]};t.a=s}},[46]);