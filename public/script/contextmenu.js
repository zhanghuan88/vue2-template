(function(e,t){"object"===typeof exports&&"object"===typeof module?module.exports=t(require("vue")):"function"===typeof define&&define.amd?define([],t):"object"===typeof exports?exports["contextmenu"]=t(require("vue")):e["contextmenu"]=t(e["Vue"])})("undefined"!==typeof self?self:this,(function(e){return function(e){var t={};function n(i){if(t[i])return t[i].exports;var s=t[i]={i:i,l:!1,exports:{}};return e[i].call(s.exports,s,s.exports,n),s.l=!0,s.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(i,s,function(t){return e[t]}.bind(null,s));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s="8886")}({"19dd":function(e,t,n){var i=n("4210");t=i(!1),t.push([e.i,".contextmenu-submenu-fade-enter-active,.contextmenu-submenu-fade-leave-active{-webkit-transition:opacity .1s;transition:opacity .1s}.contextmenu-submenu-fade-enter,.contextmenu-submenu-fade-leave-to{opacity:0}",""]),e.exports=t},"2b35":function(e,t,n){var i=n("4210");t=i(!1),t.push([e.i,".Contextmenu_menu_cYpEk,.Contextmenu_menu_item_1DQNs,.Contextmenu_menu_item__clickable_29d8g,.Contextmenu_menu_item__unclickable_2nbwq{box-sizing:border-box}",""]),t.locals={menu:"Contextmenu_menu_cYpEk",menu_item:"Contextmenu_menu_item_1DQNs",menu_item__clickable:"Contextmenu_menu_item__clickable_29d8g",menu_item__unclickable:"Contextmenu_menu_item__unclickable_2nbwq"},e.exports=t},"2d58":function(e,t,n){var i=n("903b");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var s=n("3cc6").default;s("7bb56876",i,!0,{sourceMap:!1,shadowMode:!1})},"3cc6":function(e,t,n){"use strict";function i(e,t){for(var n=[],i={},s=0;s<t.length;s++){var o=t[s],a=o[0],u=o[1],r=o[2],c=o[3],l={id:e+":"+s,css:u,media:r,sourceMap:c};i[a]?i[a].parts.push(l):n.push(i[a]={id:a,parts:[l]})}return n}n.r(t),n.d(t,"default",(function(){return h}));var s="undefined"!==typeof document;if("undefined"!==typeof DEBUG&&DEBUG&&!s)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var o={},a=s&&(document.head||document.getElementsByTagName("head")[0]),u=null,r=0,c=!1,l=function(){},m=null,d="data-vue-ssr-id",f="undefined"!==typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function h(e,t,n,s){c=n,m=s||{};var a=i(e,t);return p(a),function(t){for(var n=[],s=0;s<a.length;s++){var u=a[s],r=o[u.id];r.refs--,n.push(r)}t?(a=i(e,t),p(a)):a=[];for(s=0;s<n.length;s++){r=n[s];if(0===r.refs){for(var c=0;c<r.parts.length;c++)r.parts[c]();delete o[r.id]}}}}function p(e){for(var t=0;t<e.length;t++){var n=e[t],i=o[n.id];if(i){i.refs++;for(var s=0;s<i.parts.length;s++)i.parts[s](n.parts[s]);for(;s<n.parts.length;s++)i.parts.push(_(n.parts[s]));i.parts.length>n.parts.length&&(i.parts.length=n.parts.length)}else{var a=[];for(s=0;s<n.parts.length;s++)a.push(_(n.parts[s]));o[n.id]={id:n.id,refs:1,parts:a}}}}function v(){var e=document.createElement("style");return e.type="text/css",a.appendChild(e),e}function _(e){var t,n,i=document.querySelector("style["+d+'~="'+e.id+'"]');if(i){if(c)return l;i.parentNode.removeChild(i)}if(f){var s=r++;i=u||(u=v()),t=y.bind(null,i,s,!1),n=y.bind(null,i,s,!0)}else i=v(),t=x.bind(null,i),n=function(){i.parentNode.removeChild(i)};return t(e),function(i){if(i){if(i.css===e.css&&i.media===e.media&&i.sourceMap===e.sourceMap)return;t(e=i)}else n()}}var b=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}();function y(e,t,n,i){var s=n?"":i.css;if(e.styleSheet)e.styleSheet.cssText=b(t,s);else{var o=document.createTextNode(s),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(o,a[t]):e.appendChild(o)}}function x(e,t){var n=t.css,i=t.media,s=t.sourceMap;if(i&&e.setAttribute("media",i),m.ssrId&&e.setAttribute(d,t.id),s&&(n+="\n/*# sourceURL="+s.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(s))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{while(e.firstChild)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}},4210:function(e,t,n){"use strict";function i(e,t){var n=e[1]||"",i=e[3];if(!i)return n;if(t&&"function"===typeof btoa){var o=s(i),a=i.sources.map((function(e){return"/*# sourceURL=".concat(i.sourceRoot).concat(e," */")}));return[n].concat(a).concat([o]).join("\n")}return[n].join("\n")}function s(e){var t=btoa(unescape(encodeURIComponent(JSON.stringify(e)))),n="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(t);return"/*# ".concat(n," */")}e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=i(t,e);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n){"string"===typeof e&&(e=[[null,e,""]]);for(var i=0;i<e.length;i++){var s=[].concat(e[i]);n&&(s[2]?s[2]="".concat(n," and ").concat(s[2]):s[2]=n),t.push(s)}},t}},"562f":function(e,t,n){var i=n("2b35");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var s=n("3cc6").default;s("21a64ddc",i,!0,{sourceMap:!1,shadowMode:!1})},6187:function(e,t,n){"use strict";var i=n("562f"),s=n.n(i);t["default"]=s.a},8886:function(e,t,n){"use strict";var i;(n.r(t),"undefined"!==typeof window)&&(n("e31d"),(i=window.document.currentScript)&&(i=i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))&&(n.p=i[1]));var s=n("8bbf"),o=n.n(s),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div")},u=[];function r(e){let t=[];for(let n of document.getElementsByClassName(e)||[])t.push(n);return t}const c=3,l=-8,m="left",d="right",f="contextmenu-submenu";var h={data(){return{items:[],position:{x:0,y:0},style:{zIndex:2,minWidth:150},mainMenuInstance:null,customClass:null,mouseListening:!1}},mounted(){const e=o.a.component(f);this.mainMenuInstance=new e,this.mainMenuInstance.items=this.items,this.mainMenuInstance.commonClass={menu:this.$style.menu,menuItem:this.$style.menu_item,clickableMenuItem:this.$style.menu_item__clickable,unclickableMenuItem:this.$style.menu_item__unclickable},this.mainMenuInstance.position={x:this.position.x,y:this.position.y,width:0,height:0},this.mainMenuInstance.style.minWidth=this.style.minWidth,this.mainMenuInstance.style.zIndex=this.style.zIndex,this.mainMenuInstance.customClass=this.customClass,this.mainMenuInstance.$mount(),document.body.appendChild(this.mainMenuInstance.$el),this.addListener()},destroyed(){this.removeListener(),this.mainMenuInstance&&this.mainMenuInstance.close()},methods:{mousewheelListener(){this.$destroy()},mouseDownListener(e){let t=e.target;const n=r(this.$style.menu);while(!n.find(e=>e===t)&&t.parentElement)t=t.parentElement;n.find(e=>e===t)||this.$destroy()},mouseClickListener(e){let t=e.target;const n=r(this.$style.menu),i=r(this.$style.menu_item),s=r(this.$style.menu_item__unclickable);while(!n.find(e=>e===t)&&!i.find(e=>e===t)&&t.parentElement)t=t.parentElement;if(i.find(e=>e===t)){if(0!==e.button||s.find(e=>e===t))return;this.$destroy()}else n.find(e=>e===t)||this.$destroy()},addListener(){this.mouseListening||(document.addEventListener("click",this.mouseClickListener),document.addEventListener("mousedown",this.mouseDownListener),document.addEventListener("mousewheel",this.mousewheelListener),this.mouseListening=!0)},removeListener(){this.mouseListening&&(document.removeEventListener("click",this.mouseClickListener),document.removeEventListener("mousedown",this.mouseDownListener),document.removeEventListener("mousewheel",this.mousewheelListener),this.mouseListening=!1)}}},p=h,v=n("6187");function _(e,t,n,i,s,o,a,u){var r,c="function"===typeof e?e.options:e;if(t&&(c.render=t,c.staticRenderFns=n,c._compiled=!0),i&&(c.functional=!0),o&&(c._scopeId="data-v-"+o),a?(r=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"===typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),s&&s.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(a)},c._ssrRegister=r):s&&(r=u?function(){s.call(this,this.$root.$options.shadowRoot)}:s),r)if(c.functional){c._injectStyles=r;var l=c.render;c.render=function(e,t){return r.call(t),l(e,t)}}else{var m=c.beforeCreate;c.beforeCreate=m?[].concat(m,r):[r]}return{exports:e,options:c}}function b(e){this["$style"]=v["default"].locals||v["default"]}var y=_(p,a,u,!1,b,null,null),x=y.exports,g=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:"contextmenu-submenu-fade"}},[e.visible?n("div",{ref:"menu",class:[e.commonClass.menu,"menu",e.customClass],style:{left:e.style.left+"px",top:e.style.top+"px",minWidth:e.style.minWidth+"px",zIndex:e.style.zIndex},on:{contextmenu:function(e){return e.preventDefault()}}},[n("div",{staticClass:"menu_body"},[e._l(e.items,(function(t,i){return[t.hidden?e._e():[t.disabled?n("div",{key:i,class:[e.commonClass.menuItem,e.commonClass.unclickableMenuItem,"menu_item","menu_item__disabled",t.divided?"menu_item__divided":null]},[e.hasIcon?n("div",{staticClass:"menu_item_icon"},[t.icon?n("i",{class:t.icon}):e._e()]):e._e(),n("span",{staticClass:"menu_item_label"},[e._v(e._s(t.label))]),n("div",{staticClass:"menu_item_expand_icon"})]):t.children?n("div",{key:i,class:[e.commonClass.menuItem,e.commonClass.unclickableMenuItem,"menu_item","menu_item__available",e.activeSubmenu.index===i?"menu_item_expand":null,t.divided?"menu_item__divided":null],on:{mouseenter:function(n){return e.enterItem(n,t,i)}}},[e.hasIcon?n("div",{staticClass:"menu_item_icon"},[t.icon?n("i",{class:t.icon}):e._e()]):e._e(),n("span",{staticClass:"menu_item_label"},[e._v(e._s(t.label))]),n("div",{staticClass:"menu_item_expand_icon"},[e._v("▶")])]):n("div",{key:i,class:[e.commonClass.menuItem,e.commonClass.clickableMenuItem,"menu_item","menu_item__available",t.divided?"menu_item__divided":null],on:{mouseenter:function(n){return e.enterItem(n,t,i)},click:function(n){return e.itemClick(t)}}},[e.hasIcon?n("div",{staticClass:"menu_item_icon"},[t.icon?n("i",{class:t.icon}):e._e()]):e._e(),n("span",{staticClass:"menu_item_label"},[e._v(e._s(t.label))]),n("div",{staticClass:"menu_item_expand_icon"})])]]}))],2)]):e._e()])},C=[],w={name:f,data(){return{commonClass:{menu:null,menuItem:null,clickableMenuItem:null,unclickableMenuItem:null},activeSubmenu:{index:null,instance:null},items:[],position:{x:0,y:0,width:0,height:0},style:{left:0,top:0,zIndex:2,minWidth:150},customClass:null,visible:!1,hasIcon:!1,openTrend:d}},mounted(){this.visible=!0;for(let e of this.items)if(e.icon){this.hasIcon=!0;break}this.$nextTick(()=>{const e=document.documentElement.clientWidth,t=document.documentElement.clientHeight,n=this.$refs.menu,i=n.offsetWidth,s=n.offsetHeight;(this.openTrend===m?this.leftOpen:this.rightOpen)(e,t,i),this.style.top=this.position.y,this.position.y+s>t&&(0===this.position.height?this.style.top=this.position.y-s:this.style.top=t-s)})},methods:{leftOpen(e,t,n){this.style.left=this.position.x-n,this.openTrend=m,this.style.left<0&&(this.openTrend=d,0===this.position.width?this.style.left=0:this.style.left=this.position.x+this.position.width)},rightOpen(e,t,n){this.style.left=this.position.x+this.position.width,this.openTrend=d,this.style.left+n>e&&(this.openTrend=m,0===this.position.width?this.style.left=e-n:this.style.left=this.position.x-n)},enterItem(e,t,n){if(!this.visible)return;if(this.activeSubmenu.instance){if(this.activeSubmenu.index===n)return;this.activeSubmenu.instance.close(),this.activeSubmenu.instance=null,this.activeSubmenu.index=null}if(!t.children)return;const i=e.target.getBoundingClientRect(),s=o.a.component(f);this.activeSubmenu.index=n,this.activeSubmenu.instance=new s,this.activeSubmenu.instance.items=t.children,this.activeSubmenu.instance.openTrend=this.openTrend,this.activeSubmenu.instance.commonClass=this.commonClass,this.activeSubmenu.instance.position={x:i.x+c,y:i.y+l,width:i.width-2*c,height:i.width},this.activeSubmenu.instance.style.minWidth="number"===typeof t.minWidth?t.minWidth:this.style.minWidth,this.activeSubmenu.instance.style.zIndex=this.style.zIndex,this.activeSubmenu.instance.customClass="string"===typeof t.customClass?t.customClass:this.customClass,this.activeSubmenu.instance.$mount(),document.body.appendChild(this.activeSubmenu.instance.$el)},itemClick(e){if(this.visible)return!e||e.disabled||e.hidden||"function"!==typeof e.onClick?void 0:e.onClick()},close(){this.visible=!1,this.activeSubmenu.instance&&this.activeSubmenu.instance.close(),this.$nextTick(()=>{this.$destroy()})}}},I=w,k=(n("cb42"),n("d66e"),_(I,g,C,!1,null,"57402592",null)),S=k.exports;const M=o.a.extend(x);function $(e){let t=null;const n=function(e){let i=new M;i.items=e.items,i.position.x=e.x||0,i.position.y=e.y||0,e.event&&(i.position.x=e.event.clientX,i.position.y=e.event.clientY),i.customClass=e.customClass,e.minWidth&&(i.style.minWidth=e.minWidth),e.zIndex&&(i.style.zIndex=e.zIndex),n.destroy(),t=i,i.$mount()};n.destroy=function(){t&&(t.$destroy(),t=null)},e.prototype.$contextmenu=n}o.a.component(f,S),window&&window.Vue&&$(window.Vue);var L={install:$},E=L;t["default"]=E},"8bbf":function(t,n){t.exports=e},"903b":function(e,t,n){var i=n("4210");t=i(!1),t.push([e.i,".menu[data-v-57402592]{position:fixed;box-shadow:0 2px 4px rgba(0,0,0,.12),0 0 6px rgba(0,0,0,.04);background:#fff;border-radius:4px;padding:8px 0}.menu_body[data-v-57402592]{display:block}.menu_item[data-v-57402592]{list-style:none;line-height:32px;padding:0 16px;margin:0;font-size:13px;outline:0;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-transition:.2s;transition:.2s;border-bottom:1px solid transparent}.menu_item__divided[data-v-57402592]{border-bottom-color:#ebeef5}.menu_item .menu_item_icon[data-v-57402592]{margin-right:8px;width:13px}.menu_item .menu_item_label[data-v-57402592]{-webkit-box-flex:1;flex:1}.menu_item .menu_item_expand_icon[data-v-57402592]{margin-left:16px;font-size:6px;width:10px}.menu_item__available[data-v-57402592]{color:#606266;cursor:pointer}.menu_item__available[data-v-57402592]:hover{background:#ecf5ff;color:#409eff}.menu_item__disabled[data-v-57402592]{color:#c0c4cc;cursor:not-allowed}.menu_item_expand[data-v-57402592]{background:#ecf5ff;color:#409eff}",""]),e.exports=t},c172:function(e,t,n){var i=n("19dd");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var s=n("3cc6").default;s("5838a5ca",i,!0,{sourceMap:!1,shadowMode:!1})},cb42:function(e,t,n){"use strict";var i=n("2d58"),s=n.n(i);s.a},d66e:function(e,t,n){"use strict";var i=n("c172"),s=n.n(i);s.a},e31d:function(e,t){(function(e){var t="currentScript",n=e.getElementsByTagName("script");t in e||Object.defineProperty(e,t,{get:function(){try{throw new Error}catch(i){var e,t=(/.*at [^\(]*\((.*):.+:.+\)$/gi.exec(i.stack)||[!1])[1];for(e in n)if(n[e].src==t||"interactive"==n[e].readyState)return n[e];return null}}})})(document)}})}));
