(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{18:function(e,t,n){e.exports=n(41)},40:function(e,t,n){},41:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(16),u=n.n(c),o=n(6),l=n(17),m=n(2),i=n(4),s=n.n(i),f="https://oussama-phonebook.herokuapp.com/api/persons",d=function(e){var t=e.searchValue;return r.a.createElement("div",null,r.a.createElement("h2",null,"search result"),0===t.length?r.a.createElement("p",null," ",r.a.createElement("i",null," no contact under this name ")):t.map((function(e){return r.a.createElement("p",{key:e.name},e.name," : ",e.number)})))},b=function(e){return r.a.createElement("form",{onSubmit:e.personsAdder},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:e.newName,onChange:e.nameAdder})," ",r.a.createElement("br",null),r.a.createElement("br",null),"number: ",r.a.createElement("input",{value:e.newNumber,onChange:e.numberAdder}),r.a.createElement("br",null),r.a.createElement("br",null)),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},h=function(e){var t=e.persons,n=e.nameRemover;return r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,"all Numbers"),t.map((function(e){return r.a.createElement("p",{key:e.name},e.name," : ",e.number," ",r.a.createElement("button",{onClick:function(){n(e)}},"delete"))})))},p=(n(40),function(e){var t=e.notification;return e.errMsg?r.a.createElement("h1",{className:"err"},t):0===t.length?r.a.createElement(r.a.Fragment,null):r.a.createElement("h1",{className:"notification"},t)}),E=function(){var e=Object(a.useState)([]),t=Object(m.a)(e,2),n=t[0],c=t[1],u=Object(a.useState)(""),i=Object(m.a)(u,2),E=i[0],v=i[1],g=Object(a.useState)(""),O=Object(m.a)(g,2),j=O[0],w=O[1],k=Object(a.useState)(""),y=Object(m.a)(k,2),S=y[0],N=y[1],A=Object(a.useState)([]),x=Object(m.a)(A,2),C=x[0],M=x[1],R=Object(a.useState)(""),F=Object(m.a)(R,2),J=F[0],T=F[1],V=Object(a.useState)(!1),B=Object(m.a)(V,2),D=B[0],I=B[1];Object(a.useEffect)((function(){s.a.get(f).then((function(e){return e.data})).then((function(e){return c(e)}))}),[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement("span",null,"filter shown with "),r.a.createElement("input",{placeholder:"type a name here",onChange:function(e){N(e.target.value);var t=new RegExp(S,"gmi"),a=n.filter((function(e){return e.name.match(t)}));""===e.target.value?M([]):M(a)}}),r.a.createElement(p,{notification:J,errMsg:D}),r.a.createElement("h3",null,"add a new"),r.a.createElement(b,{personsAdder:function(e){e.preventDefault();var t,a,r={name:E,number:j},u=n.filter((function(e){return e.name===r.name}));if(u.length>0)(t=u,a=j,s.a.put("".concat(f,"/").concat(t[0].id),{name:t[0].name,number:a}).then((function(e){return e.data}))).then((function(e){var t=n,a=t.indexOf(u[0]);t[a]=Object(l.a)({},e),c(Object(o.a)(t))})).then((function(){window.confirm("you want to update ".concat(u[0].name))})).then((function(){return T("".concat(u[0].name," was updated"))})).catch((function(){I(!0),T("you can't update ".concat(u[0].name," because it doesn't exist anymore"))})),v(""),w(""),setTimeout((function(){T(""),I(!1)}),5e3);else{c(n.concat(r)),function(e){s.a.post(f,e)}(r),v(""),w("");T("".concat(r.name," was added")),setTimeout((function(){T("")}),5e3)}},newName:E,newNumber:j,nameAdder:function(e){v(e.target.value)},numberAdder:function(e){w(e.target.value)}}),0===S.length?r.a.createElement(h,{persons:n,nameRemover:function(e){var t;if(!0===window.confirm("do you really want to delete ".concat(e.name," from your phonebook"))){var a=n.filter((function(t){return t!==e}));t=e,s.a.delete("".concat(f,"/").concat(t.id)),c(Object(o.a)(a))}}}):r.a.createElement(d,{searchValue:C}))};u.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(E,null)),document.getElementById("root"))}},[[18,1,2]]]);
//# sourceMappingURL=main.fff71913.chunk.js.map