(this.webpackJsonpd10=this.webpackJsonpd10||[]).push([[0],{13:function(e,t,s){},14:function(e,t,s){},16:function(e,t,s){"use strict";s.r(t);var n=s(1),a=s.n(n),c=s(5),i=s.n(c),l=(s(13),s(6)),r=s(2),o=s(3),d=s(8),u=s(7),h=(s(14),function e(t,s){var n=Math.ceil(10*Math.random());if(n<8)return s?e(t,!1):0;var a=1;return n>=t&&(a+=e(t,!1)),a}),b=function(e,t,s){for(var n=0,a=0;a<e;a++)n+=h(t,s);return n},j=function e(t,s){if(t<8)throw new Error("again must be larger than or equal to 8");if(s){var n=10-t+1,a=3-n;return 7*e(t,!1)/10+(1+e(t,!1))*n/10+1*a/10}return t>=11?.3:3/(t-1)},v=function(e,t,s){return j(t,s)*e},p=function(e,t){return t&&(e*=2),1-Math.pow(.7,e)},m=function(){function e(t,s){Object(r.a)(this,e),this.key=t,this.initialValue=JSON.stringify(s)}return Object(o.a)(e,[{key:"getInitial",value:function(){return JSON.parse(this.initialValue)}},{key:"get",value:function(){var e=window.localStorage.getItem(this.key);if(null===e||void 0===e)return this.getInitial();try{return JSON.parse(e)}catch(t){return this.getInitial()}}},{key:"set",value:function(e){var t=JSON.stringify(e);return window.localStorage.setItem(this.key,t)}}]),e}(),w=s(0),f=v(4,10),g=p(4),x=!0,O=!0,y=new m("storagev3",{dices:4,again:10,rote:!1,expected:f,chance:g,rollEnabled:x,willpowerEnabled:O,successes:0,willpowerSuccesses:0,presets:[]}),N=function(e){Object(d.a)(s,e);var t=Object(u.a)(s);function s(){var e;Object(r.a)(this,s);for(var n=arguments.length,a=new Array(n),c=0;c<n;c++)a[c]=arguments[c];return(e=t.call.apply(t,[this].concat(a))).state=y.get(),e.edit=function(t){e.setState(t,e.saveState)},e.editPreset=function(t){var s=e.state.presets.map((function(e){return e.id===t.id?Object.assign({},e,t):e}));e.edit({presets:s})},e.addPreset=function(t){var s=e.state.presets,n=[].concat(Object(l.a)(s),[t]);e.edit({presets:n})},e.removePreset=function(t){var s=e.state.presets.filter((function(e){return e.id!==t.id}));e.edit({presets:s})},e.saveState=function(){y.set(e.state)},e.handleDicesChanged=function(t){var s=e.state,n=s.again,a=s.rote,c=t.target.value,i=v(c,n,a),l=p(c,a);e.edit({dices:c,expected:i,chance:l,rollEnabled:x,willpowerEnabled:O,successes:0,willpowerSuccesses:0})},e.handleAgainChanged=function(t){var s=e.state,n=s.dices,a=s.rote,c=t.target.value,i=v(n,c,a),l=p(n,a);e.edit({again:c,expected:i,chance:l,rollEnabled:x,willpowerEnabled:O,successes:0,willpowerSuccesses:0})},e.handleRoteChanged=function(t){var s=e.state,n=s.again,a=s.dices,c=t.target.checked,i=v(a,n,c),l=p(a,c);e.edit({rote:c,expected:i,chance:l,rollEnabled:x,willpowerEnabled:O,successes:0,willpowerSuccesses:0})},e.handleClear=function(){e.edit({rollEnabled:x,willpowerEnabled:O,successes:0,willpowerSuccesses:0})},e.handleRoll=function(){var t=e.state,s=t.dices,n=t.again,a=t.rote,c=t.successes+b(s,n,a);e.edit({rollEnabled:!1,successes:c})},e.handleWillpower=function(){var t=e.state,s=t.again,n=t.rote,a=t.successes,c=b(3,s,n),i=a+c;e.edit({willpowerEnabled:!1,successes:i,willpowerSuccesses:c})},e.handlePresetAdd=function(){var t=e.state,s=t.dices,n=t.again,a=t.rote,c=Date.now(),i="".concat(s," A").concat(n);a&&(i+=" R");var l={id:c,name:i,dices:s,again:n,rote:a,edit:!1};e.addPreset(l)},e.handlePresetEdit=function(t){var s=t.id;e.editPreset({id:s,edit:!0})},e.handlePresetLoad=function(t){var s=t.dices,n=t.again,a=t.rote,c=v(s,n,a),i=p(s,a);e.edit({dices:s,again:n,rote:a,expected:c,chance:i,rollEnabled:x,willpowerEnabled:O,successes:0,willpowerSuccesses:0})},e}return Object(o.a)(s,[{key:"render",value:function(){var e=this,t=this.state,s=t.dices,n=t.again,a=t.rote,c=t.expected,i=t.chance,l=t.rollEnabled,r=t.willpowerEnabled,o=t.successes,d=t.willpowerSuccesses,u=t.presets,h=Math.round(100*i)+"%",b=""+Math.round(100*c)/100,j="The chance to get at least 1 success is ".concat(h," when rolling ").concat(s," dices."),v="The average amount of successes is ".concat(b," when rolling ").concat(s," dices with ").concat(n,"-again.");return Object(w.jsx)("div",{className:"App",children:Object(w.jsxs)("div",{className:"holder",children:[Object(w.jsxs)("div",{className:"map",children:[Object(w.jsxs)("div",{className:"entry",children:[Object(w.jsx)("div",{className:"key",title:"The amount of dices to be rolled.",children:"Dices:"}),Object(w.jsx)("div",{className:"value",children:Object(w.jsx)("input",{className:"input",type:"number",min:"1",value:s,onChange:this.handleDicesChanged})})]}),Object(w.jsxs)("div",{className:"entry",children:[Object(w.jsx)("div",{className:"key",title:"Roll one more dice if the dice shows this value and above.",children:"Again:"}),Object(w.jsx)("div",{className:"value",children:Object(w.jsx)("input",{className:"input",type:"number",min:"8",max:"11",value:n,onChange:this.handleAgainChanged})})]}),Object(w.jsxs)("div",{className:"entry",children:[Object(w.jsx)("div",{className:"key",title:"Reroll all failed dice on the initial roll while not rerolling the results of that reroll, or the results of any 8, 9, or 10-again rerolls.",children:"Rote:"}),Object(w.jsx)("div",{className:"value",children:Object(w.jsx)("input",{className:"input checkbox",type:"checkbox",checked:a,onChange:this.handleRoteChanged})})]})]}),Object(w.jsxs)("div",{className:"stats",children:[Object(w.jsxs)("div",{className:"entry",title:j,children:[Object(w.jsx)("div",{className:"key",children:"Chance:"}),Object(w.jsx)("div",{className:"value",children:h})]}),Object(w.jsxs)("div",{className:"entry",title:v,children:[Object(w.jsx)("div",{className:"key",children:"Expected:"}),Object(w.jsx)("div",{className:"value",children:b})]})]}),Object(w.jsxs)("div",{className:"buttons",children:[Object(w.jsx)("button",{className:"button",type:"button",onClick:this.handleClear,children:"Clear"}),Object(w.jsx)("button",{className:"button",type:"button",onClick:this.handleRoll,disabled:l?"":"disabled",children:"Roll"}),Object(w.jsx)("button",{className:"button",type:"button",onClick:this.handleWillpower,disabled:r?"":"disabled",children:"Willpower"})]}),Object(w.jsx)("div",{className:"successes",children:l&&r?"?":o}),Object(w.jsx)("div",{className:"willpowerSuccesses",children:r?Object(w.jsx)(w.Fragment,{children:"\xa0"}):Object(w.jsxs)(w.Fragment,{children:[d," from Willpower"]})}),Object(w.jsxs)("div",{className:"presets",children:[u.map((function(t){if(t.edit){var s=function(){""!==t.name?e.editPreset({id:t.id,edit:!1}):e.removePreset({id:t.id})};return Object(w.jsx)("input",{className:"preset",type:"text",value:t.name,onChange:function(s){e.editPreset({id:t.id,name:s.target.value})},onKeyDown:function(e){"Escape"!==e.key&&"Enter"!==e.key||s()},onBlur:s,autoFocus:!0},t.id)}return Object(w.jsx)("button",{className:"preset",type:"button",onClick:function(){e.handlePresetLoad(t)},onContextMenu:function(s){s.preventDefault(),e.handlePresetEdit(t)},children:t.name},t.id)})),Object(w.jsx)("button",{className:"preset",type:"button",onClick:this.handlePresetAdd,children:"+"})]})]})})}}]),s}(a.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(Object(w.jsx)(a.a.StrictMode,{children:Object(w.jsx)(N,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[16,1,2]]]);
//# sourceMappingURL=main.2bed4cba.chunk.js.map