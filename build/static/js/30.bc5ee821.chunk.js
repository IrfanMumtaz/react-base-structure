(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{854:function(e,a,t){"use strict";t.r(a);var n=t(98),r=t.n(n),c=t(99),l=t(20),o=t(21),s=t(23),i=t(22),m=t(24),u=t(0),d=t.n(u),h=t(95),f=t(25),p=t(94),v=t(96),E=t(97),b=(t(113),t(107)),g=t(109),y=g.object().shape({name:g.string().max(50,"Too long, max 50 characters").required("Required"),merchant_id:g.number().required("Required"),phone:g.number().required("Required"),full:g.string().max(190,"Address is too long").required("Required")}),k=function(e){function a(e){var t;return Object(l.a)(this,a),(t=Object(s.a)(this,Object(i.a)(a).call(this,e))).state={auth:f.a.getState().authentication.Auth,formValues:{name:"",merchant_id:null,merchant:{id:null},address:{full_address:"",latitude:55.442211,longitude:55.442211},contact:{phone:null},phone:null,full:""},merchants:[],alert:{display:!1,type:"success",message:""}},t.getMerchants=Object(c.a)(r.a.mark(function e(){var a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a={method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(t.state.auth.token)}},fetch("".concat(h.a.base_url,"v1/merchant"),a).then(t.handleResponse).then(function(e){if(!0===e.success){var a=e.data.merchants;t.setState({merchants:a})}return e});case 2:case"end":return e.stop()}},e)})),t.getBooth=Object(c.a)(r.a.mark(function e(){var a,n;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a=t.props.match.params.id,t.state.formValues,n={method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(t.state.auth.token)}},fetch("".concat(h.a.base_url,"v1/booth/").concat(a),n).then(t.handleResponse).then(function(e){if(!0===e.success){var a=e.data.booth;a.merchant_id=a.merchant.id,a.phone=a.contact.phone,a.full=a.address.full_address,t.setState({formValues:a})}return e});case 4:case"end":return e.stop()}},e)})),t.updateBooth=Object(c.a)(r.a.mark(function e(){var a,n,c;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a=t.props.match.params.id,(n=t.state.formValues).contact={phone:n.phone,email:null},n.address={full:n.full,latitude:n.address.latitude,longitude:n.address.longitude},c={method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(t.state.auth.token)},body:JSON.stringify(n)},fetch("".concat(h.a.base_url,"v1/booth/").concat(a),c).then(t.handleResponse).then(function(e){if(!0===e.success){var a={type:"success",message:e.message,display:!0};t.setState({alert:a})}else{var n={type:"danger",message:e.error.message,display:!0};t.setState({alert:n})}return e});case 6:case"end":return e.stop()}},e)})),t.handleSubmit=function(e){t.updateBooth()},t.handleChange=function(e){var a=t.state.formValues;a[e.target.name]=e.target.value,t.setState({formValues:a})},t.handleResetForm=function(){document.getElementById("vehicleForm").reset()},t}return Object(m.a)(a,e),Object(o.a)(a,[{key:"componentWillMount",value:function(){this.getMerchants(),this.getBooth()}},{key:"handleResponse",value:function(e){return e.text().then(function(e){return e&&JSON.parse(e)})}},{key:"render",value:function(){var e=this,a=this.state,t=(a.formData,a.formValues),n=a.merchants;return d.a.createElement(u.Fragment,null,d.a.createElement(p.a,null,"Booth Update "),d.a.createElement(v.x,null,d.a.createElement(v.f,{md:"12"},d.a.createElement(v.d,null,d.a.createElement(v.e,null,d.a.createElement("div",{className:"px-3"},d.a.createElement(b.c,{enableReinitialize:!0,initialValues:t,validationSchema:y,onSubmit:function(a,t){var n=t.setSubmitting,r=t.resetForm;n(!0),e.setState({formValues:a}),e.handleSubmit(),n(!1),r()}},function(a){var r=a.values,c=a.isSubmitting,l=a.errors,o=a.touched,s=a.handleChange;return d.a.createElement(b.b,{id:"vehicleForm"},d.a.createElement("div",{className:"form-body"},d.a.createElement("h4",{className:"form-section"},d.a.createElement(E.Home,{size:20,color:"#212529"})," Booth Info"),d.a.createElement(v.x,null,d.a.createElement(v.f,{md:"6"},d.a.createElement(v.m,null,d.a.createElement(v.o,{for:"name"},"Booth Name"),d.a.createElement(b.a,{name:"name",id:"name",value:r.name,className:"form-control ".concat(l.name&&o.name&&"is-invalid")}),l.name&&o.name?d.a.createElement("div",{className:"invalid-feedback"},l.name):null)),d.a.createElement(v.f,{md:"6"},d.a.createElement(v.m,null,d.a.createElement(v.o,{for:"merchant_id"},"Merchant"),d.a.createElement("select",{onChange:s,id:"merchant_id",name:"merchant_id",className:"form-control ".concat(l.merchant_id&&o.merchant_id&&"is-invalid")},d.a.createElement("option",{value:"0",defaultValue:"",disabled:""},"Select Type"),n.map(function(e){return d.a.createElement("option",{value:e.id,key:e.id,selected:e.id===t.merchant.id},"".concat(e.name," (").concat(e.cnic,")"))})),l.merchant_id&&o.merchant_id?d.a.createElement("div",{className:"invalid-feedback"},l.merchant_id):null))),d.a.createElement(v.x,null,d.a.createElement(v.f,{md:"6"},d.a.createElement(v.m,null,d.a.createElement(v.o,{for:"phone"},"Phone"),d.a.createElement(b.a,{id:"phone",value:r.phone,name:"phone",className:"form-control ".concat(l.phone&&o.phone&&"is-invalid")}),l.phone&&o.phone?d.a.createElement("div",{className:"invalid-feedback"},l.phone):null)),d.a.createElement(v.f,{md:"6"},d.a.createElement(v.m,null,d.a.createElement(v.o,{for:"full"},"Address"),d.a.createElement(b.a,{name:"full",value:r.full,id:"full",className:"form-control ".concat(l.full&&o.full&&"is-invalid")}),l.full&&o.full?d.a.createElement("div",{className:"invalid-feedback"},l.full):null)))),d.a.createElement("div",{className:"form-actions"},d.a.createElement(v.c,{color:"primary",type:"submit",disabled:c},d.a.createElement(E.CheckSquare,{size:16,color:"#FFF"})," Save"),e.state.alert.display&&d.a.createElement(v.a,{color:e.state.alert.type},e.state.alert.message)))})))))))}}]),a}(u.Component);a.default=k},94:function(e,a,t){"use strict";var n=t(0),r=t.n(n);a.a=function(e){var a=e.className;return r.a.createElement("div",{className:"content-header".concat(void 0===a?"":" ".concat(a))},e.children)}},95:function(e,a,t){"use strict";a.a={base_url:"https://ticket-management.herokuapp.com/"}}}]);