(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["shopping"],{aa3f:function(t,n,o){"use strict";o.r(n);var e=function(){var t=this,n=t.$createElement,o=t._self._c||n;return o("div",{attrs:{id:"shopping"}},[o("b-container",[o("h1",{staticClass:"text-center"},[t._v("商品目錄")]),o("b-row",{attrs:{id:"shoppingrow"}},t._l(t.commoditys,(function(n,e){return o("b-col",{key:e,staticClass:"d-flex justify-content-center",attrs:{cols:"12",md:"6",lg:"3"}},[o("b-card",{staticStyle:{"max-width":"300px","max-height":"500px"},attrs:{"img-src":n.src,"img-alt":"Image","img-top":""},on:{click:function(o){return t.jump(n._id)}}},[o("b-card-text",[o("p",[t._v(t._s(n.name))]),o("p",{staticStyle:{color:"red"}},[t._v("NT."+t._s(n.price))])])],1)],1)})),1)],1)],1)},c=[],r=(o("d81d"),o("b0c0"),{data:function(){return{commoditys:[]}},methods:{jump:function(t){this.$router.push("/goods/"+t)}},mounted:function(){var t=this;this.axios.get("https://zerozeroone-computerpairing.herokuapp.com/commodity").then((function(n){t.commoditys=n.data.result.map((function(t){return{_id:t._id,name:t.name,price:t.price,Screen:t.Screen,WorkingSystem:t.WorkingSystem,CPU:t.CPU,DRAM:t.DRAM,HDD:t.HDD,GPU:t.GPU,count:t.count,src:"https://zerozeroone-computerpairing.herokuapp.com/commodity/"+t.image}}))})).catch((function(){alert("發生錯誤")}))}}),i=r,a=o("2877"),s=Object(a["a"])(i,e,c,!1,null,null,null);n["default"]=s.exports},b0c0:function(t,n,o){var e=o("83ab"),c=o("9bf2").f,r=Function.prototype,i=r.toString,a=/^\s*function ([^ (]*)/,s="name";e&&!(s in r)&&c(r,s,{configurable:!0,get:function(){try{return i.call(this).match(a)[1]}catch(t){return""}}})}}]);
//# sourceMappingURL=shopping.7c9da6dd.js.map