(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{846:function(e,a,n){"use strict";n.r(a);var t=n(98),l=n.n(t),r=n(99),i=n(20),c=n(21),m=n(23),o=n(22),s=n(24),d=n(0),u=n.n(d),f=n(95),E=n(25),h=n(94),p=n(96),v=n(97),g=(n(113),n(107)),b=n(109),_=b.object().shape({name:b.string().max(50,"Too long, max 50 characters").required("Required"),father_name:b.string().max(50,"Too long, max 50 characters").required("Required"),cnic:b.number().required("Required").nullable(),gender:b.string().max(1,"Something odd happened, can not process further").required("Required"),dob:b.date().required("Required"),religion:b.string().max(50,"Too long, max 50 characters").required("Required"),nationality:b.string().max(50,"Too long, max 50 characters").required("Required"),joining:b.date().required("Required"),phone:b.number().required("Required"),email:b.string().email().required("Required"),s_phone:b.number().nullable(),s_email:b.string().email().nullable(),full_address:b.string().required("Required").max(190,"Address too long"),latitude:b.number().required("Required").nullable(),longitude:b.number().required("Required").nullable()}),y=function(e){function a(){var e,n;Object(i.a)(this,a);for(var t=arguments.length,c=new Array(t),s=0;s<t;s++)c[s]=arguments[s];return(n=Object(m.a)(this,(e=Object(o.a)(a)).call.apply(e,[this].concat(c)))).state={auth:E.a.getState().authentication.Auth,formValues:{name:"",father_name:"",cnic:null,gender:"M",religion:"",nationality:"",dob:"",joining:"",phone:null,email:"",s_phone:null,s_email:null,full_address:"",latitude:54.2211,longitude:54.2211},formData:{},alert:{display:!1,type:"success",message:""}},n.createMerchant=Object(r.a)(l.a.mark(function e(){var a,t;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:(a=n.state.formValues).contact={phone:a.phone,email:a.email,s_phone:a.s_phone,s_email:a.s_email},a.address={full:a.full_address,latitude:a.latitude,longitude:a.longitude,city:1,state:1},t={method:"Post",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(n.state.auth.token)},body:JSON.stringify(a)},fetch("".concat(f.a.base_url,"v1/merchant"),t).then(n.handleResponse).then(function(e){if(!0===e.success){var a={type:"success",message:e.message,display:!0};n.setState({alert:a})}else{var t={type:"danger",message:e.error.message,display:!0};n.setState({alert:t})}return e});case 5:case"end":return e.stop()}},e)})),n.handleSubmit=function(e){n.createMerchant()},n.handleChange=function(e){var a=n.state.formValues;a[e.target.name]=e.target.value,n.setState({formValues:a})},n.handleResetForm=function(){document.getElementById("merchantForm").reset()},n}return Object(s.a)(a,e),Object(c.a)(a,[{key:"handleResponse",value:function(e){return e.text().then(function(e){return e&&JSON.parse(e)})}},{key:"render",value:function(){var e=this;this.state.formData;return u.a.createElement(d.Fragment,null,u.a.createElement(h.a,null,"Merchant Add "),u.a.createElement(p.x,null,u.a.createElement(p.f,{md:"12"},u.a.createElement(p.d,null,u.a.createElement(p.e,null,u.a.createElement("div",{className:"px-3"},u.a.createElement(g.c,{initialValues:this.state.formValues,validationSchema:_,onSubmit:function(a,n){var t=n.setSubmitting,l=n.resetForm;console.log(a),t(!0),e.setState({formValues:a}),e.handleSubmit(),t(!1),l()}},function(a){var n=a.values,t=a.isSubmitting,l=a.errors,r=a.touched,i=a.handleChange;return u.a.createElement(g.b,{id:"merchantForm"},u.a.createElement("div",{className:"form-body"},u.a.createElement("h4",{className:"form-section"},u.a.createElement(v.User,{size:20,color:"#212529"})," Merchant Info"),u.a.createElement(p.x,null,u.a.createElement(p.f,{md:"6"},u.a.createElement(p.m,null,u.a.createElement(p.o,{for:"name"},"Merchant Name"),u.a.createElement(g.a,{name:"name",id:"name",className:"form-control ".concat(l.name&&r.name&&"is-invalid")}),l.name&&r.name?u.a.createElement("div",{className:"invalid-feedback"},l.name):null)),u.a.createElement(p.f,{md:"6"},u.a.createElement(p.m,null,u.a.createElement(p.o,{for:"father_name"},"Merchant Father Name"),u.a.createElement(g.a,{name:"father_name",id:"father_name",className:"form-control ".concat(l.father_name&&r.father_name&&"is-invalid")}),l.father_name&&r.father_name?u.a.createElement("div",{className:"invalid-feedback"},l.father_name):null))),u.a.createElement(p.x,null,u.a.createElement(p.f,{md:"6"},u.a.createElement(p.m,null,u.a.createElement(p.o,{for:"cnic"},"CNIC"),u.a.createElement(g.a,{id:"cnic",name:"cnic",className:"form-control ".concat(l.cnic&&r.cnic&&"is-invalid")}),l.cnic&&r.cnic?u.a.createElement("div",{className:"invalid-feedback"},l.cnic):null)),u.a.createElement(p.f,{md:"6"},u.a.createElement(p.m,null,u.a.createElement(p.o,{for:"model"},"Gender"),u.a.createElement("select",{onChange:i,id:"type",name:"type",className:"form-control ".concat(l.type&&r.type&&"is-invalid")},u.a.createElement("option",{value:"",defaultValue:"",disabled:""},"Select Gender"),u.a.createElement("option",{value:"M",selected:"M"===n.gender},"Male"),u.a.createElement("option",{value:"F",selected:"F"===n.gender},"Female")),l.model&&r.model?u.a.createElement("div",{className:"invalid-feedback"},l.model):null))),u.a.createElement(p.x,null,u.a.createElement(p.f,{md:"6"},u.a.createElement(p.m,null,u.a.createElement(p.o,{for:"religion"},"Religion"),u.a.createElement(g.a,{name:"religion",id:"religion",className:"form-control ".concat(l.religion&&r.religion&&"is-invalid")}),l.religion&&r.religion?u.a.createElement("div",{className:"invalid-feedback"},l.religion):null)),u.a.createElement(p.f,{md:"6"},u.a.createElement(p.m,null,u.a.createElement(p.o,{for:"nationality"},"Nationality"),u.a.createElement(g.a,{name:"nationality",id:"nationality",className:"form-control ".concat(l.nationality&&r.nationality&&"is-invalid")}),l.nationality&&r.nationality?u.a.createElement("div",{className:"invalid-feedback"},l.nationality):null))),u.a.createElement(p.x,null,u.a.createElement(p.f,{md:"6"},u.a.createElement(p.m,null,u.a.createElement(p.o,{for:"dob"},"Date of Birth"),u.a.createElement(g.a,{type:"date",name:"dob",id:"dob",className:"form-control ".concat(l.dob&&r.dob&&"is-invalid")}),l.dob&&r.dob?u.a.createElement("div",{className:"invalid-feedback"},l.dob):null)),u.a.createElement(p.f,{md:"6"},u.a.createElement(p.m,null,u.a.createElement(p.o,{for:"joining"},"Date of Joining"),u.a.createElement(g.a,{type:"date",name:"joining",id:"joining",className:"form-control ".concat(l.joining&&r.joining&&"is-invalid")}),l.joining&&r.joining?u.a.createElement("div",{className:"invalid-feedback"},l.joining):null))),u.a.createElement("h4",{className:"form-section"},u.a.createElement(v.Phone,{size:20,color:"#212529"})," Contact Info"),u.a.createElement(p.x,null,u.a.createElement(p.f,{md:"6"},u.a.createElement(p.m,null,u.a.createElement(p.o,{for:"phone"},"Primary Phone"),u.a.createElement(g.a,{name:"phone",id:"phone",className:"form-control ".concat(l.phone&&r.phone&&"is-invalid")}),l.phone&&r.phone?u.a.createElement("div",{className:"invalid-feedback"},l.phone):null)),u.a.createElement(p.f,{md:"6"},u.a.createElement(p.m,null,u.a.createElement(p.o,{for:"email"},"Primary Email"),u.a.createElement(g.a,{name:"email",id:"email",className:"form-control ".concat(l.email&&r.email&&"is-invalid")}),l.email&&r.email?u.a.createElement("div",{className:"invalid-feedback"},l.email):null))),u.a.createElement(p.x,null,u.a.createElement(p.f,{md:"6"},u.a.createElement(p.m,null,u.a.createElement(p.o,{for:"s_phone"},"Secondary Phone"),u.a.createElement(g.a,{name:"s_phone",id:"s_phone",className:"form-control ".concat(l.s_phone&&r.s_phone&&"is-invalid")}),l.s_phone&&r.s_phone?u.a.createElement("div",{className:"invalid-feedback"},l.s_phone):null)),u.a.createElement(p.f,{md:"6"},u.a.createElement(p.m,null,u.a.createElement(p.o,{for:"s_email"},"Secondary Email"),u.a.createElement(g.a,{name:"s_email",id:"s_email",className:"form-control ".concat(l.s_email&&r.s_email&&"is-invalid")}),l.s_email&&r.s_email?u.a.createElement("div",{className:"invalid-feedback"},l.s_email):null))),u.a.createElement("h4",{className:"form-section"},u.a.createElement(v.Home,{size:20,color:"#212529"})," Address Info"),u.a.createElement(p.x,null,u.a.createElement(p.f,{md:"12"},u.a.createElement(p.m,null,u.a.createElement(p.o,{for:"full_address"},"Address"),u.a.createElement(g.a,{name:"full_address",id:"full_address",className:"form-control ".concat(l.full_address&&r.full_address&&"is-invalid")}),l.full_address&&r.full_address?u.a.createElement("div",{className:"invalid-feedback"},l.full_address):null)))),u.a.createElement("div",{className:"form-actions"},u.a.createElement(p.c,{color:"warning",className:"mr-1",onClick:e.handleResetForm},u.a.createElement(v.X,{size:16,color:"#FFF"})," Cancel"),u.a.createElement(p.c,{color:"primary",type:"submit",disabled:t},u.a.createElement(v.CheckSquare,{size:16,color:"#FFF"})," Save")),e.state.alert.display&&u.a.createElement(p.a,{color:e.state.alert.type},e.state.alert.message))})))))))}}]),a}(d.Component);a.default=y},94:function(e,a,n){"use strict";var t=n(0),l=n.n(t);a.a=function(e){var a=e.className;return l.a.createElement("div",{className:"content-header".concat(void 0===a?"":" ".concat(a))},e.children)}},95:function(e,a,n){"use strict";a.a={base_url:"https://ticket-management.herokuapp.com/"}}}]);