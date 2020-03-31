(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{842:function(e,a,t){"use strict";t.r(a);var n=t(98),s=t.n(n),r=t(99),i=t(20),o=t(21),c=t(23),l=t(22),u=t(24),m=t(0),p=t.n(m),d=t(95),h=t(25),f=t(94),v=t(96),g=t(97),E=t(107),b=t(109),y=t(279),S=b.object().shape({name:b.string().required("Required").max(50,"Role name is too long.")}),k=function(e){function a(){var e;return Object(i.a)(this,a),(e=Object(c.a)(this,Object(l.a)(a).call(this))).getPermissions=Object(r.a)(s.a.mark(function a(){var t;return s.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:e.state.permissions,t={method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(e.state.auth.token)}},fetch("".concat(d.a.base_url,"v1/acl/permission"),t).then(e.handleResponse).then(function(a){if(!0===a.success){a.message;var t=a.data.permissions,n=[];t.map(function(e){return n.push({value:e.id,label:e.name})}),e.setState({permissions:n})}return a});case 3:case"end":return a.stop()}},a)})),e.getRole=Object(r.a)(s.a.mark(function a(){var t,n;return s.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:t=e.props.match.params.id,e.state.formValues,n={method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(e.state.auth.token)}},fetch("".concat(d.a.base_url,"v1/acl/role/").concat(t),n).then(e.handleResponse).then(function(a){if(!0===a.success){a.message;var t=a.data.role;e.setState({formValues:t});var n=[];t.permissions.map(function(e){var a={value:e.id,label:e.name};n.push(a)}),e.setState({multivalues:n})}else{var s={type:"danger",message:a.error.message,display:!0};e.setState({alert:s})}return a});case 4:case"end":return a.stop()}},a)})),e.updateRole=Object(r.a)(s.a.mark(function a(){var t,n,r,i,o;return s.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:t=e.props.match.params.id,n=e.state,r=n.formValues,i=n.multivalues,r.permissions=[],i.map(function(e){r.permissions.push(e.value)}),o={method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(e.state.auth.token)},body:JSON.stringify(r)},fetch("".concat(d.a.base_url,"v1/acl/role/").concat(t),o).then(e.handleResponse).then(function(a){if(!0===a.success){var t={type:"success",message:a.message,display:!0};e.setState({alert:t})}else{var n={type:"danger",message:a.error.message,display:!0};e.setState({alert:n})}return a});case 6:case"end":return a.stop()}},a)})),e.handleSubmit=function(a){e.updateRole()},e.handleMultiChange=function(a){e.setState({multivalues:a})},e.handleResetForm=function(){document.getElementById("vehicleForm").reset()},e.state={auth:h.a.getState().authentication.Auth,formValues:{name:"",permissions:[]},multivalues:[],permissions:[],alert:{display:!1,type:"success",message:""}},e}return Object(u.a)(a,e),Object(o.a)(a,[{key:"componentWillMount",value:function(){this.getRole(),this.getPermissions()}},{key:"handleResponse",value:function(e){return e.text().then(function(e){return e&&JSON.parse(e)})}},{key:"findPermission",value:function(e){var a=this.state.formValues;return!!a.permissions.find(function(a){return a.id===e})&&(a.addPermission.indexOf(-1===e)&&a.addPermission.push(e),!0)}},{key:"render",value:function(){var e=this,a=this.state,t=a.permissions;a.formValues;return p.a.createElement(m.Fragment,null,p.a.createElement(f.a,null,"Vehicles Update "),p.a.createElement(v.x,null,p.a.createElement(v.f,{md:"12"},p.a.createElement(v.d,null,p.a.createElement(v.e,null,p.a.createElement("div",{className:"px-3"},p.a.createElement(E.c,{initialValues:this.state.formValues,enableReinitialize:!0,validationSchema:S,onSubmit:function(a,t){var n=t.setSubmitting;n(!0),e.setState({formValues:a}),e.handleSubmit(),n(!1)}},function(a){var n=a.values,s=(a.isSubmitting,a.errors),r=a.touched;a.handleChange;return p.a.createElement(E.b,{id:"vehicleForm"},p.a.createElement("div",{className:"form-body"},p.a.createElement("h4",{className:"form-section"},p.a.createElement(g.Map,{size:20,color:"#212529"})," Role Info"),p.a.createElement(v.x,null,p.a.createElement(v.f,{md:"12"},p.a.createElement(v.m,null,p.a.createElement(v.o,{for:"name"},"Role Name"),p.a.createElement(E.a,{name:"name",id:"name",value:n.name,className:"form-control ".concat(s.name&&r.name&&"is-invalid")}),s.name&&r.name?p.a.createElement("div",{className:"invalid-feedback"},s.name):null))),p.a.createElement(v.x,null,p.a.createElement(v.f,{md:"12"},p.a.createElement(y.a,{options:t,value:e.state.multivalues,onChange:e.handleMultiChange,isMulti:!0})))),p.a.createElement("div",{className:"form-actions"},p.a.createElement(v.c,{color:"primary",type:"submit"},p.a.createElement(g.CheckSquare,{size:16,color:"#FFF"})," Save"),e.state.alert.display&&p.a.createElement(v.a,{color:e.state.alert.type},e.state.alert.message)))})))))))}}]),a}(m.Component);a.default=k},94:function(e,a,t){"use strict";var n=t(0),s=t.n(n);a.a=function(e){var a=e.className;return s.a.createElement("div",{className:"content-header".concat(void 0===a?"":" ".concat(a))},e.children)}},95:function(e,a,t){"use strict";a.a={base_url:"https://ticket-management.herokuapp.com/"}}}]);