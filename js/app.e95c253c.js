(function(e){function t(t){for(var o,i,s=t[0],u=t[1],l=t[2],c=0,p=[];c<s.length;c++)i=s[c],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&p.push(a[i][0]),a[i]=0;for(o in u)Object.prototype.hasOwnProperty.call(u,o)&&(e[o]=u[o]);d&&d(t);while(p.length)p.shift()();return r.push.apply(r,l||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],o=!0,i=1;i<n.length;i++){var u=n[i];0!==a[u]&&(o=!1)}o&&(r.splice(t--,1),e=s(s.s=n[0]))}return e}var o={},a={app:0},r=[];function i(e){return s.p+"js/"+({administrator:"administrator",changepassword:"changepassword",goods:"goods",login:"login",managecarousels:"managecarousels",managegoods:"managegoods",reg:"reg",shopping:"shopping",user:"user",wishlist:"wishlist"}[e]||e)+"."+{administrator:"f9092b9c",changepassword:"71ed7b4b",goods:"bb52cdd1",login:"53eee55f",managecarousels:"e0430a69",managegoods:"dd8d9619",reg:"1b2d1ed1",shopping:"7c9da6dd",user:"1149bc8f",wishlist:"9aee2452"}[e]+".js"}function s(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n=a[e];if(0!==n)if(n)t.push(n[2]);else{var o=new Promise((function(t,o){n=a[e]=[t,o]}));t.push(n[2]=o);var r,u=document.createElement("script");u.charset="utf-8",u.timeout=120,s.nc&&u.setAttribute("nonce",s.nc),u.src=i(e);var l=new Error;r=function(t){u.onerror=u.onload=null,clearTimeout(c);var n=a[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+o+": "+r+")",l.name="ChunkLoadError",l.type=o,l.request=r,n[1](l)}a[e]=void 0}};var c=setTimeout((function(){r({type:"timeout",target:u})}),12e4);u.onerror=u.onload=r,document.head.appendChild(u)}return Promise.all(t)},s.m=e,s.c=o,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)s.d(n,o,function(t){return e[t]}.bind(null,o));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var c=0;c<u.length;c++)t(u[c]);var d=l;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("0cdd");var o=n("2b0e"),a=n("bc3a"),r=n.n(a),i=n("a7fe"),s=n.n(i),u=n("5f5b");n("ab8b"),n("2dd8");o["default"].use(u["a"]);var l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("b-navbar",{attrs:{toggleable:"lg",type:"dark",variant:"info"}},[n("b-container",[n("b-navbar-brand",{attrs:{to:"/"}},[n("font-awesome-icon",{attrs:{icon:["fas","desktop"],id:"icon"}})],1),n("b-navbar-toggle",{attrs:{target:"nav-collapse"}}),n("b-collapse",{attrs:{id:"nav-collapse","is-nav":""}},[n("b-navbar-nav",{staticClass:"m-auto"},[n("b-nav-item",{attrs:{to:"/shopping"}},[n("span",[e._v("商品目錄")])])],1),n("b-navbar-nav",{staticClass:"ml-auto"},[0===e.user.length?n("b-nav-item",{attrs:{to:"/login"}},[n("font-awesome-icon",{attrs:{icon:["fas","sign-in-alt"],id:"icon",title:"登入"}})],1):n("b-nav-item",{attrs:{to:"/user"}},[n("font-awesome-icon",{attrs:{icon:["fas","house-user"],id:"icon",title:"個人資料"}})],1),0===e.user.length?n("b-nav-item",{attrs:{to:"/reg"}},[n("font-awesome-icon",{attrs:{icon:["fas","registered"],id:"icon",title:"註冊"}})],1):n("b-nav-item",{on:{click:e.logout}},[n("font-awesome-icon",{attrs:{icon:["fas","sign-out-alt"],id:"icon",title:"登出"}})],1)],1)],1)],1)],1),n("router-view",{staticClass:"page"}),e._m(0)],1)},c=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("footer",{attrs:{id:"footer"}},[n("span",[e._v("Computer pairing 版權所有 © All Rights Reserved.")])])}],d={name:"app",computed:{user:function(){return this.$store.getters.user}},methods:{logout:function(){var e=this;this.axios.delete("https://zerozeroone-computerpairing.herokuapp.com/logout").then((function(t){var n=t.data;n.success?(alert("登出成功"),e.$store.commit("logout"),"/"!==e.$route.path&&e.$router.push("/")):alert(n.message)})).catch((function(e){alert(e.response.data.message)}))},heartbeat:function(){var e=this;this.axios.get("https://zerozeroone-computerpairing.herokuapp.com/heartbeat").then((function(t){var n=t.data;e.user.length>0&&(n||(alert("登入時效已過"),e.$store.commit("logout"),"/"!==e.$route.path&&e.$router.push("/")))})).catch((function(){alert("發生錯誤"),e.$store.commit("logout"),"/"!==e.$route.path&&e.$router.push("/")}))}},mounted:function(){var e=this;this.heartbeat(),setInterval((function(){e.heartbeat()}),5e3)}},p=d,f=n("2877"),g=Object(f["a"])(p,l,c,!1,null,null,null),m=g.exports,h=(n("d3b7"),n("8c4f")),b=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"home"}},[n("b-carousel",{staticStyle:{"text-shadow":"1px 1px 2px #333"},attrs:{id:"carousel-1",interval:5e3,fade:"",controls:"",indicators:"",background:"#ababab","img-width":"100%","img-height":"100vh"},on:{"sliding-start":e.onSlideStart,"sliding-end":e.onSlideEnd},model:{value:e.slide,callback:function(t){e.slide=t},expression:"slide"}},e._l(e.carousels,(function(e,t){return n("b-carousel-slide",{key:t,attrs:{"img-src":e.src}})})),1)],1)},v=[],w=(n("d81d"),{data:function(){return{slide:0,sliding:null,carousels:[]}},methods:{onSlideStart:function(e){this.sliding=!0},onSlideEnd:function(e){this.sliding=!1}},mounted:function(){var e=this;this.axios.get("https://zerozeroone-computerpairing.herokuapp.com/carousel").then((function(t){e.carousels=t.data.result.map((function(e){return{src:"https://zerozeroone-computerpairing.herokuapp.com/carousel/"+e.image}}))})).catch((function(){alert("發生錯誤")}))}}),y=w,P=Object(f["a"])(y,b,v,!1,null,null,null),C=P.exports,x=n("2f62"),_=n("0e44");o["default"].use(x["a"]);var k=new x["a"].Store({state:{user:""},mutations:{login:function(e,t){e.user=t},logout:function(e){e.user=""}},getters:{user:function(e){return e.user}},modules:{},plugins:[Object(_["a"])()]});o["default"].use(h["a"]);var j=[{path:"/",name:"Home",component:C,meta:{login:!1,title:"首頁"}},{path:"/reg",name:"Reg",component:function(){return n.e("reg").then(n.bind(null,"b8b8"))},meta:{login:!1,title:"CP | 註冊"}},{path:"/login",name:"Login",component:function(){return n.e("login").then(n.bind(null,"a55b"))},meta:{login:!1,title:"CP | 登入"}},{path:"/shopping",name:"Shopping",component:function(){return n.e("shopping").then(n.bind(null,"aa3f"))},meta:{login:!0,title:"CP | 目錄"}},{path:"/user",name:"User",component:function(){return n.e("user").then(n.bind(null,"1511"))},meta:{login:!0,title:"CP | 會員中心"}},{path:"/changepassword",name:"ChangePassword",component:function(){return n.e("changepassword").then(n.bind(null,"0060"))},meta:{login:!0,title:"CP | 會員中心-修改密碼"}},{path:"/wishlist",name:"Wishlist",component:function(){return n.e("wishlist").then(n.bind(null,"058a"))},meta:{login:!0,title:"CP | 會員中心-願望清單"}},{path:"/administrator",name:"Administrator",component:function(){return n.e("administrator").then(n.bind(null,"04be"))},meta:{login:!0,title:"CP | 管理員"}},{path:"/managecarousels",name:"ManageCarousels",component:function(){return n.e("managecarousels").then(n.bind(null,"39e3"))},meta:{login:!0,title:"CP | 管理輪播圖"}},{path:"/managegoods",name:"ManageGoods",component:function(){return n.e("managegoods").then(n.bind(null,"2b1b"))},meta:{login:!0,title:"CP | 管理商品"}},{path:"/goods/:id",name:"Goods",component:function(){return n.e("goods").then(n.bind(null,"8629"))},meta:{login:!0,title:"CP | 商品"}}],O=new h["a"]({routes:j});O.beforeEach((function(e,t,n){e.meta.login&&!k.state.user?n("/login"):n()})),O.afterEach((function(e,t){document.title=e.meta.title}));var S=O,$=n("ecee"),E=n("ad3d"),z=n("c074");n("df2d");$["c"].add(z["d"],z["e"],z["c"],z["b"],z["a"]),o["default"].component("font-awesome-icon",E["a"]),r.a.defaults.withCredentials=!0,o["default"].use(s.a,r.a),o["default"].config.productionTip=!1,new o["default"]({router:S,store:k,render:function(e){return e(m)}}).$mount("#app")},df2d:function(e,t,n){}});
//# sourceMappingURL=app.e95c253c.js.map