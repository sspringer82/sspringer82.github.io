(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{49:function(e,t,n){e.exports=n(77)},54:function(e,t,n){},56:function(e,t,n){},57:function(e,t,n){},66:function(e,t,n){},67:function(e,t,n){},77:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(11),i=n.n(o),c=(n(54),n(33)),s=n.n(c),l=n(38),u=n(47),d=(n(56),n(39)),m=function e(t,n,a,r){Object(d.a)(this,e),this.title=t,this.user=n,this.done=a,this.id=r,this.short=void 0,this.description=void 0,this.created=void 0,this.created=Date.now()},f=n(97),v=n(43),h=n.n(v),w=n(44),E=n.n(w),p=(n(57),n(40)),g=n.n(p),k=n(96);function b(e){var t=e.task,n=g()(t.created).format("MMMM Do YYYY, h:mm:ss a");return r.a.createElement(f.a,{className:"item"},r.a.createElement("div",null,r.a.createElement("div",{className:"title"},t.title),r.a.createElement(k.a,{mdDown:!0},r.a.createElement("div",{className:"infoRow"},r.a.createElement("div",null,t.user),r.a.createElement("div",null,n)))),r.a.createElement("div",{className:"status"},t.done?r.a.createElement(h.a,null):r.a.createElement(E.a,null)))}n(66);function y(e){var t=e.tasks;return r.a.createElement("div",{className:"list"},t.map(function(e){return r.a.createElement(b,{key:e.id,task:e})}))}var N=n(94),j=n(95);n(67);function A(e){var t=e.tasks;return r.a.createElement(f.a,{className:"sideBar"},r.a.createElement("h1",null,"Hi Basti"),r.a.createElement("div",null,"Great to have you here"),r.a.createElement("h2",null,"your stats:"),r.a.createElement("div",null,"count: ",t.length),r.a.createElement("div",null,"done: ",t.filter(function(e){return e.done}).length))}var B=n(46),W=n.n(B),x=n(28),O=r.a.createContext(new x.a("Tasks")),S=new x.a("Tasks");S.version(1).stores({tasks:"id++,title"}),S.table("tasks").put(new m("Get up","Basti",!0,1)),S.table("tasks").put(new m("Eat","Basti",!0,2)),S.table("tasks").put(new m("Sleep","Basti",!1,3));var C=function(){var e=Object(a.useState)([]),t=Object(u.a)(e,2),n=t[0],o=t[1];return Object(a.useEffect)(function(){!function(){var e=Object(l.a)(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=o,e.next=3,S.table("tasks").toArray();case 3:e.t1=e.sent,(0,e.t0)(e.t1);case 5:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}()()},[]),r.a.createElement(O.Provider,{value:S},r.a.createElement(N.a,{container:!0,spacing:2},r.a.createElement(N.a,{item:!0,lg:2}),r.a.createElement(N.a,{item:!0,lg:6,xs:12},r.a.createElement(y,{tasks:n})),r.a.createElement(N.a,{item:!0,lg:2},r.a.createElement(k.a,{mdDown:!0},r.a.createElement(A,{tasks:n}))),r.a.createElement(N.a,{item:!0,lg:2})),r.a.createElement(j.a,{color:"primary","aria-label":"Add",className:"fab"},r.a.createElement(W.a,null)))},D=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function M(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}i.a.render(r.a.createElement(C,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("","/service-worker.js");D?(function(e,t){fetch(e).then(function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):M(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):M(t,e)})}}()}},[[49,1,2]]]);
//# sourceMappingURL=main.0921563a.chunk.js.map