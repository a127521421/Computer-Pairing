(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["managegoods"],{2532:function(e,t,n){"use strict";var i=n("23e7"),r=n("5a34"),o=n("1d80"),a=n("ab13");i({target:"String",proto:!0,forced:!a("includes")},{includes:function(e){return!!~String(o(this)).indexOf(r(e),arguments.length>1?arguments[1]:void 0)}})},"2b1b":function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"managegoods"}},[n("b-container",[n("b-breadcrumb",[n("b-breadcrumb-item",{attrs:{to:"/administrator"}},[e._v(" 管理員 ")]),n("b-breadcrumb-item",{attrs:{active:""}},[e._v("管理商品")])],1)],1),n("b-container",{staticClass:"text-center"},[n("b-form",{on:{submit:e.submit}},[n("b-form-file",{attrs:{state:e.state,placeholder:"選擇檔案或拖曳至此","drop-placeholder":"將檔案拖曳至此",required:"","browse-text":"瀏覽",accept:"image/*"},on:{input:e.File},model:{value:e.file,callback:function(t){e.file=t},expression:"file"}}),n("b-form-textarea",{attrs:{placeholder:"型號"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),n("b-form-textarea",{attrs:{placeholder:"價格"},model:{value:e.price,callback:function(t){e.price=t},expression:"price"}}),n("b-form-textarea",{attrs:{placeholder:"螢幕"},model:{value:e.Screen,callback:function(t){e.Screen=t},expression:"Screen"}}),n("b-form-textarea",{attrs:{placeholder:"作業系統"},model:{value:e.WorkingSystem,callback:function(t){e.WorkingSystem=t},expression:"WorkingSystem"}}),n("b-form-textarea",{attrs:{placeholder:"CPU"},model:{value:e.CPU,callback:function(t){e.CPU=t},expression:"CPU"}}),n("b-form-textarea",{attrs:{placeholder:"DRAM"},model:{value:e.DRAM,callback:function(t){e.DRAM=t},expression:"DRAM"}}),n("b-form-textarea",{attrs:{placeholder:"HDD"},model:{value:e.HDD,callback:function(t){e.HDD=t},expression:"HDD"}}),n("b-form-textarea",{attrs:{placeholder:"GPU"},model:{value:e.GPU,callback:function(t){e.GPU=t},expression:"GPU"}}),n("b-form-textarea",{attrs:{placeholder:"庫存"},model:{value:e.count,callback:function(t){e.count=t},expression:"count"}}),n("b-button",{attrs:{type:"submit",variant:"primary",id:"button"}},[e._v("上傳")])],1)],1),e._l(e.commoditys,(function(t,i){return n("b-container",{key:i,staticClass:"text-center"},[n("b-card",{staticClass:"mb-2 overflow-hidden"},[n("b-row",{attrs:{"no-gutters":""}},[n("b-col",{attrs:{md:"6"}},[n("b-card-img",{staticClass:"rounded-0",attrs:{src:t.src,id:"mgimg"}})],1),n("b-col",{attrs:{md:"6"}},[n("b-card-text",[n("h3",[e._v("型號")]),t.edit?n("b-form-textarea",{model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}):n("p",[e._v(e._s(t.name))]),n("h3",[e._v("價格")]),t.edit?n("b-form-textarea",{model:{value:e.price,callback:function(t){e.price=t},expression:"price"}}):n("p",[e._v(e._s(t.price))]),n("h3",[e._v("螢幕")]),t.edit?n("b-form-textarea",{model:{value:e.Screen,callback:function(t){e.Screen=t},expression:"Screen"}}):n("p",[e._v(e._s(t.Screen))]),n("h3",[e._v("作業系統")]),t.edit?n("b-form-textarea",{model:{value:e.WorkingSystem,callback:function(t){e.WorkingSystem=t},expression:"WorkingSystem"}}):n("p",[e._v(e._s(t.WorkingSystem))]),n("h3",[e._v("CPU")]),t.edit?n("b-form-textarea",{model:{value:e.CPU,callback:function(t){e.CPU=t},expression:"CPU"}}):n("p",[e._v(e._s(t.CPU))]),n("h3",[e._v("DRAM")]),t.edit?n("b-form-textarea",{model:{value:e.DRAM,callback:function(t){e.DRAM=t},expression:"DRAM"}}):n("p",[e._v(e._s(t.DRAM))]),n("h3",[e._v("HDD")]),t.edit?n("b-form-textarea",{model:{value:e.HDD,callback:function(t){e.HDD=t},expression:"HDD"}}):n("p",[e._v(e._s(t.HDD))]),n("h3",[e._v("GPU")]),t.edit?n("b-form-textarea",{model:{value:e.GPU,callback:function(t){e.GPU=t},expression:"GPU"}}):n("p",[e._v(e._s(t.GPU))]),n("h3",[e._v("庫存")]),t.edit?n("b-form-textarea",{model:{value:e.count,callback:function(t){e.count=t},expression:"count"}}):n("p",[e._v(e._s(t.count))])],1),t.edit?n("b-button",{attrs:{variant:"success",id:"button"},on:{click:function(n){return e.update(t)}}},[e._v("更新")]):n("b-button",{attrs:{variant:"success",id:"button"},on:{click:function(n){return e.edit(t)}}},[e._v("編輯")]),t.edit?n("b-button",{attrs:{variant:"danger",id:"button"},on:{click:function(n){return e.cancel(t)}}},[e._v("取消")]):n("b-button",{attrs:{variant:"danger",id:"button"},on:{click:function(n){return e.del(t,i)}}},[e._v("刪除")])],1)],1)],1)],1)}))],2)},r=[],o=(n("caad"),n("d81d"),n("a434"),n("b0c0"),n("2532"),{data:function(){return{file:null,state:!1,commoditys:[],name:"",price:"",Screen:"",WorkingSystem:"",CPU:"",DRAM:"",HDD:"",GPU:"",count:""}},methods:{File:function(){null!=this.file&&(this.file.size>=1048576||!this.file.type.includes("image")?(this.state=!1,this.file=null):this.state=!0)},submit:function(e){var t=this;if(e.preventDefault(),null===this.file||this.file.size>=1048576||!this.file.type.includes("image"))alert("檔案格式不符");else{var n=new FormData;n.append("image",this.file),n.append("name",this.name),n.append("price",this.price),n.append("Screen",this.Screen),n.append("WorkingSystem",this.WorkingSystem),n.append("CPU",this.CPU),n.append("DRAM",this.DRAM),n.append("HDD",this.HDD),n.append("GPU",this.GPU),n.append("count",this.count),this.axios.post("https://zerozeroone-computerpairing.herokuapp.com/commodity",n,{headers:{"Content-Type":"multipart/form-data"}}).then((function(e){t.commoditys.push({_id:e.data._id,name:t.name,price:t.price,Screen:t.Screen,WorkingSystem:t.WorkingSystem,CPU:t.CPU,DRAM:t.DRAM,HDD:t.HDD,GPU:t.GPU,count:t.count,src:"https://zerozeroone-computerpairing.herokuapp.com/commodity/"+e.data.image,edit:!1}),t.file=null,t.name="",t.price="",t.Screen="",t.WorkingSystem="",t.CPU="",t.DRAM="",t.HDD="",t.GPU="",t.count=""})).catch((function(e){alert(e.response.data.message)}))}},edit:function(e){e.edit=!0,this.name=e.name,this.price=e.price,this.Screen=e.Screen,this.WorkingSystem=e.WorkingSystem,this.CPU=e.CPU,this.DRAM=e.DRAM,this.HDD=e.HDD,this.GPU=e.GPU,this.count=e.count},cancel:function(e){e.edit=!1,this.name="",this.price="",this.Screen="",this.WorkingSystem="",this.CPU="",this.DRAM="",this.HDD="",this.GPU="",this.count=""},update:function(e){var t=this;this.axios.patch("https://zerozeroone-computerpairing.herokuapp.com/commodity/"+e._id,{name:this.name,price:this.price,Screen:this.Screen,WorkingSystem:this.WorkingSystem,CPU:this.CPU,DRAM:this.DRAM,HDD:this.HDD,GPU:this.GPU,count:this.count}).then((function(n){e.edit=!1,e.name=t.name,e.price=t.price,e.Screen=t.Screen,e.WorkingSystem=t.WorkingSystem,e.CPU=t.CPU,e.DRAM=t.DRAM,e.HDD=t.HDD,e.GPU=t.GPU,e.count=t.count,t.name="",t.price="",t.Screen="",t.WorkingSystem="",t.CPU="",t.DRAM="",t.HDD="",t.GPU="",t.count=""})).catch((function(){alert("發生錯誤")}))},del:function(e,t){var n=this;this.axios.delete("https://zerozeroone-computerpairing.herokuapp.com/commodity/"+e._id).then((function(e){n.commoditys.splice(t,1)})).catch((function(){alert("發生錯誤")}))}},mounted:function(){var e=this;this.axios.get("https://zerozeroone-computerpairing.herokuapp.com/commodity").then((function(t){e.commoditys=t.data.result.map((function(e){return{_id:e._id,name:e.name,price:e.price,Screen:e.Screen,WorkingSystem:e.WorkingSystem,CPU:e.CPU,DRAM:e.DRAM,HDD:e.HDD,GPU:e.GPU,count:e.count,src:"https://zerozeroone-computerpairing.herokuapp.com/commodity/"+e.image,edit:!1}}))})).catch((function(){alert("發生錯誤")}))}}),a=o,c=n("2877"),s=Object(c["a"])(a,i,r,!1,null,null,null);t["default"]=s.exports},"44e7":function(e,t,n){var i=n("861d"),r=n("c6b6"),o=n("b622"),a=o("match");e.exports=function(e){var t;return i(e)&&(void 0!==(t=e[a])?!!t:"RegExp"==r(e))}},"5a34":function(e,t,n){var i=n("44e7");e.exports=function(e){if(i(e))throw TypeError("The method doesn't accept regular expressions");return e}},8418:function(e,t,n){"use strict";var i=n("c04e"),r=n("9bf2"),o=n("5c6c");e.exports=function(e,t,n){var a=i(t);a in e?r.f(e,a,o(0,n)):e[a]=n}},a434:function(e,t,n){"use strict";var i=n("23e7"),r=n("23cb"),o=n("a691"),a=n("50c4"),c=n("7b0b"),s=n("65f0"),l=n("8418"),u=n("1dde"),m=n("ae40"),p=u("splice"),d=m("splice",{ACCESSORS:!0,0:0,1:2}),h=Math.max,f=Math.min,b=9007199254740991,D="Maximum allowed length exceeded";i({target:"Array",proto:!0,forced:!p||!d},{splice:function(e,t){var n,i,u,m,p,d,v=c(this),g=a(v.length),x=r(e,g),k=arguments.length;if(0===k?n=i=0:1===k?(n=0,i=g-x):(n=k-2,i=f(h(o(t),0),g-x)),g+n-i>b)throw TypeError(D);for(u=s(v,i),m=0;m<i;m++)p=x+m,p in v&&l(u,m,v[p]);if(u.length=i,n<i){for(m=x;m<g-i;m++)p=m+i,d=m+n,p in v?v[d]=v[p]:delete v[d];for(m=g;m>g-i+n;m--)delete v[m-1]}else if(n>i)for(m=g-i;m>x;m--)p=m+i-1,d=m+n-1,p in v?v[d]=v[p]:delete v[d];for(m=0;m<n;m++)v[m+x]=arguments[m+2];return v.length=g-i+n,u}})},ab13:function(e,t,n){var i=n("b622"),r=i("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(n){try{return t[r]=!1,"/./"[e](t)}catch(i){}}return!1}},b0c0:function(e,t,n){var i=n("83ab"),r=n("9bf2").f,o=Function.prototype,a=o.toString,c=/^\s*function ([^ (]*)/,s="name";i&&!(s in o)&&r(o,s,{configurable:!0,get:function(){try{return a.call(this).match(c)[1]}catch(e){return""}}})},caad:function(e,t,n){"use strict";var i=n("23e7"),r=n("4d64").includes,o=n("44d2"),a=n("ae40"),c=a("indexOf",{ACCESSORS:!0,1:0});i({target:"Array",proto:!0,forced:!c},{includes:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}}),o("includes")}}]);
//# sourceMappingURL=managegoods.dd8d9619.js.map