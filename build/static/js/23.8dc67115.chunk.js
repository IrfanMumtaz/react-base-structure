(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{105:function(t,e,n){var r=function(){return this||"object"===typeof self&&self}()||Function("return this")(),a=r.regeneratorRuntime&&Object.getOwnPropertyNames(r).indexOf("regeneratorRuntime")>=0,o=a&&r.regeneratorRuntime;if(r.regeneratorRuntime=void 0,t.exports=n(106),a)r.regeneratorRuntime=o;else try{delete r.regeneratorRuntime}catch(i){r.regeneratorRuntime=void 0}},106:function(t,e){!function(e){"use strict";var n,r=Object.prototype,a=r.hasOwnProperty,o="function"===typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",c=o.asyncIterator||"@@asyncIterator",u=o.toStringTag||"@@toStringTag",s="object"===typeof t,l=e.regeneratorRuntime;if(l)s&&(t.exports=l);else{(l=e.regeneratorRuntime=s?t.exports:{}).wrap=b;var h="suspendedStart",f="suspendedYield",p="executing",m="completed",d={},v={};v[i]=function(){return this};var y=Object.getPrototypeOf,g=y&&y(y(R([])));g&&g!==r&&a.call(g,i)&&(v=g);var E=O.prototype=x.prototype=Object.create(v);j.prototype=E.constructor=O,O.constructor=j,O[u]=j.displayName="GeneratorFunction",l.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===j||"GeneratorFunction"===(e.displayName||e.name))},l.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,O):(t.__proto__=O,u in t||(t[u]="GeneratorFunction")),t.prototype=Object.create(E),t},l.awrap=function(t){return{__await:t}},L(k.prototype),k.prototype[c]=function(){return this},l.AsyncIterator=k,l.async=function(t,e,n,r){var a=new k(b(t,e,n,r));return l.isGeneratorFunction(e)?a:a.next().then(function(t){return t.done?t.value:a.next()})},L(E),E[u]="Generator",E[i]=function(){return this},E.toString=function(){return"[object Generator]"},l.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},l.values=R,P.prototype={constructor:P,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=n,this.done=!1,this.delegate=null,this.method="next",this.arg=n,this.tryEntries.forEach(T),!t)for(var e in this)"t"===e.charAt(0)&&a.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=n)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(r,a){return c.type="throw",c.arg=t,e.next=r,a&&(e.method="next",e.arg=n),!!a}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],c=i.completion;if("root"===i.tryLoc)return r("end");if(i.tryLoc<=this.prev){var u=a.call(i,"catchLoc"),s=a.call(i,"finallyLoc");if(u&&s){if(this.prev<i.catchLoc)return r(i.catchLoc,!0);if(this.prev<i.finallyLoc)return r(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return r(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return r(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&a.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var o=r;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,d):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),T(n),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var a=r.arg;T(n)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:R(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=n),d}}}function b(t,e,n,r){var a=e&&e.prototype instanceof x?e:x,o=Object.create(a.prototype),i=new P(r||[]);return o._invoke=function(t,e,n){var r=h;return function(a,o){if(r===p)throw new Error("Generator is already running");if(r===m){if("throw"===a)throw o;return S()}for(n.method=a,n.arg=o;;){var i=n.delegate;if(i){var c=N(i,n);if(c){if(c===d)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===h)throw r=m,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=p;var u=w(t,e,n);if("normal"===u.type){if(r=n.done?m:f,u.arg===d)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(r=m,n.method="throw",n.arg=u.arg)}}}(t,n,i),o}function w(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(r){return{type:"throw",arg:r}}}function x(){}function j(){}function O(){}function L(t){["next","throw","return"].forEach(function(e){t[e]=function(t){return this._invoke(e,t)}})}function k(t){var e;this._invoke=function(n,r){function o(){return new Promise(function(e,o){!function e(n,r,o,i){var c=w(t[n],t,r);if("throw"!==c.type){var u=c.arg,s=u.value;return s&&"object"===typeof s&&a.call(s,"__await")?Promise.resolve(s.__await).then(function(t){e("next",t,o,i)},function(t){e("throw",t,o,i)}):Promise.resolve(s).then(function(t){u.value=t,o(u)},function(t){return e("throw",t,o,i)})}i(c.arg)}(n,r,e,o)})}return e=e?e.then(o,o):o()}}function N(t,e){var r=t.iterator[e.method];if(r===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=n,N(t,e),"throw"===e.method))return d;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var a=w(r,t.iterator,e.arg);if("throw"===a.type)return e.method="throw",e.arg=a.arg,e.delegate=null,d;var o=a.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=n),e.delegate=null,d):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,d)}function _(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function T(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function P(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(_,this),this.reset(!0)}function R(t){if(t){var e=t[i];if(e)return e.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var r=-1,o=function e(){for(;++r<t.length;)if(a.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=n,e.done=!0,e};return o.next=o}}return{next:S}}function S(){return{value:n,done:!0}}}(function(){return this||"object"===typeof self&&self}()||Function("return this")())},115:function(t,e,n){"use strict";n.d(e,"a",function(){return f});var r=n(20),a=n(21),o=n(23),i=n(22),c=n(24),u=n(29),s=n(0),l=n.n(s),h=(n(97),n(96)),f=(n(14),function(t){function e(t){var n;return Object(r.a)(this,e),(n=Object(o.a)(this,Object(i.a)(e).call(this,t))).toggle=n.toggle.bind(Object(u.a)(Object(u.a)(n))),n.state={activeTab:"1"},n}return Object(c.a)(e,t),Object(a.a)(e,[{key:"toggle",value:function(t){this.state.activeTab!==t&&this.setState({activeTab:t})}},{key:"render",value:function(){return l.a.createElement("div",{className:"nav-tabs-vc"},l.a.createElement(h.y,{activeTab:this.state.activeTab,className:"px-0"},l.a.createElement(h.z,{tabId:"1"},l.a.createElement(h.x,null,l.a.createElement(h.f,{sm:"12"},this.props.TabContent1))),l.a.createElement(h.z,{tabId:"2"},l.a.createElement(h.x,null,l.a.createElement(h.f,{sm:"12"},this.props.TabContent2)))))}}]),e}(l.a.Component))},866:function(t,e,n){"use strict";n.r(e);var r=n(98),a=n.n(r),o=n(99),i=n(20),c=n(21),u=n(23),s=n(22),l=n(24),h=n(0),f=n.n(h),p=n(115),m=n(94),d=n(96),v=n(95),y=n(97),g=n(837),E=function(t){function e(){return Object(i.a)(this,e),Object(u.a)(this,Object(s.a)(e).apply(this,arguments))}return Object(l.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){var t=this.props,e=t.heading,n=t.data,r=t.misc;return f.a.createElement(d.A,{striped:!0},f.a.createElement("thead",null,f.a.createElement("tr",null,e.map(function(t){return f.a.createElement("th",{key:Math.random()},t)}))),f.a.createElement("tbody",null,n.map(function(t){return f.a.createElement("tr",{key:t.id},f.a.createElement("td",null,t.name),f.a.createElement("td",null,t.cnic),f.a.createElement("td",null,t.primary_contact.phone),f.a.createElement("td",null,t.address.full_address),f.a.createElement("td",null,1===t.status?"Active":2===t.status?"Block":"Pending"),f.a.createElement("td",null,f.a.createElement(g.a,{to:"/".concat(r.link,"/show/").concat(t.id),className:"mr-1"},f.a.createElement(y.Eye,{className:"mr-1"})),f.a.createElement(g.a,{to:"/".concat(r.link,"/edit/").concat(t.id),className:"mr-1"},f.a.createElement(y.Edit,{className:"mr-1"})),f.a.createElement(g.a,{to:"/".concat(r.link,"/delete/").concat(t.id),className:"mr-1"},f.a.createElement(y.Trash,{className:"mr-1"}))))})))}}]),e}(f.a.Component),b=n(25),w=function(t){function e(){var t,n;Object(i.a)(this,e);for(var r=arguments.length,c=new Array(r),l=0;l<r;l++)c[l]=arguments[l];return(n=Object(u.a)(this,(t=Object(s.a)(e)).call.apply(t,[this].concat(c)))).state={auth:b.a.getState().authentication.Auth,passengers:[]},n.getMerchants=Object(o.a)(a.a.mark(function t(){var e;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e={method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(n.state.auth.token)}},fetch("".concat(v.a.base_url,"v1/passenger"),e).then(n.handleResponse).then(function(t){if(!0===t.success){var e=t.data.passengers;console.log(e),n.setState({passengers:e})}return t});case 2:case"end":return t.stop()}},t)})),n}return Object(l.a)(e,t),Object(c.a)(e,[{key:"componentWillMount",value:function(){this.getMerchants()}},{key:"handleResponse",value:function(t){return t.text().then(function(t){return t&&JSON.parse(t)})}},{key:"render",value:function(){return f.a.createElement(h.Fragment,null,f.a.createElement(m.a,null,"Passenger List "),f.a.createElement(d.x,null,f.a.createElement(d.f,{sm:"12"},f.a.createElement(d.d,null,f.a.createElement(d.e,null,f.a.createElement(p.a,{TabContent1:f.a.createElement(E,{heading:["Name","CNIC","Phone","Address","Status","Action"],data:this.state.passengers,misc:{link:"passengers"}})}))))))}}]),e}(h.Component);e.default=w},94:function(t,e,n){"use strict";var r=n(0),a=n.n(r);e.a=function(t){var e=t.className;return a.a.createElement("div",{className:"content-header".concat(void 0===e?"":" ".concat(e))},t.children)}},95:function(t,e,n){"use strict";e.a={base_url:"http://api.ticketmanagement.local/"}},98:function(t,e,n){t.exports=n(105)},99:function(t,e,n){"use strict";function r(t,e,n,r,a,o,i){try{var c=t[o](i),u=c.value}catch(s){return void n(s)}c.done?e(u):Promise.resolve(u).then(r,a)}function a(t){return function(){var e=this,n=arguments;return new Promise(function(a,o){var i=t.apply(e,n);function c(t){r(i,a,o,c,u,"next",t)}function u(t){r(i,a,o,c,u,"throw",t)}c(void 0)})}}n.d(e,"a",function(){return a})}}]);
//# sourceMappingURL=23.8dc67115.chunk.js.map