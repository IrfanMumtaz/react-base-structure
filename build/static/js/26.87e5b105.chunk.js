(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{851:function(e,a,t){"use strict";t.r(a);var n=t(98),l=t.n(n),r=t(99),c=t(20),s=t(21),m=t(23),i=t(22),o=t(24),d=t(0),u=t.n(d),f=t(95),h=t(25),p=t(94),E=t(96),v=t(97),g=(t(113),t(107)),b=t(109),_=b.object().shape({name:b.string().max(50,"Too long, max 50 characters").required("Required"),father_name:b.string().max(50,"Too long, max 50 characters").required("Required"),cnic:b.number().required("Required").nullable(),gender:b.string().max(1,"Something odd happened, can not process further").required("Required"),phone:b.number().required("Required"),email:b.string().email().required("Required"),full_address:b.string().required("Required").max(190,"Address too long"),latitude:b.number().required("Required").nullable(),longitude:b.number().required("Required").nullable()}),y=function(e){function a(e){var t;return Object(c.a)(this,a),(t=Object(m.a)(this,Object(i.a)(a).call(this,e))).state={auth:h.a.getState().authentication.Auth,formValues:{name:"",father_name:"",cnic:null,gender:"M",phone:null,email:"",full_address:"",latitude:54.2211,longitude:54.2211},formData:{},alert:{display:!1,type:"success",message:""}},t.getPassenger=Object(r.a)(l.a.mark(function e(){var a,n;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a=t.props.match.params.id,t.state.formValues,n={method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(t.state.auth.token)}},fetch("".concat(f.a.base_url,"v1/passenger/").concat(a),n).then(t.handleResponse).then(function(e){if(!0===e.success){var a=e.data.passenger;a.phone=a.primary_contact.phone,a.email=a.primary_contact.email,a.full_address=a.address.full_address,a.latitude=54.2211,a.longitude=54.2211,t.setState({formValues:a})}return e});case 4:case"end":return e.stop()}},e)})),t.updatePassenger=Object(r.a)(l.a.mark(function e(){var a,n,r;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a=t.props.match.params.id,(n=t.state.formValues).contact={phone:n.phone,email:n.email},n.address={full:n.full_address,latitude:n.latitude,longitude:n.longitude,city:1,state:1},console.log(n),r={method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(t.state.auth.token)},body:JSON.stringify(n)},fetch("".concat(f.a.base_url,"v1/passenger/").concat(a),r).then(t.handleResponse).then(function(e){if(!0===e.success){var a={type:"success",message:e.message,display:!0};t.setState({alert:a})}else{var n={type:"danger",message:e.error.message,display:!0};t.setState({alert:n})}return e});case 7:case"end":return e.stop()}},e)})),t.handleSubmit=function(e){t.updatePassenger()},t.handleChange=function(e){var a=t.state.formValues;a[e.target.name]=e.target.value,t.setState({formValues:a})},t.handleResetForm=function(){document.getElementById("passengerForm").reset()},t}return Object(o.a)(a,e),Object(s.a)(a,[{key:"componentWillMount",value:function(){this.getPassenger()}},{key:"handleResponse",value:function(e){return e.text().then(function(e){return e&&JSON.parse(e)})}},{key:"render",value:function(){var e=this,a=this.state,t=(a.formData,a.formValues);return u.a.createElement(d.Fragment,null,u.a.createElement(p.a,null,"Passenger Update "),u.a.createElement(E.x,null,u.a.createElement(E.f,{md:"12"},u.a.createElement(E.d,null,u.a.createElement(E.e,null,u.a.createElement("div",{className:"px-3"},u.a.createElement(g.c,{enableReinitialize:!0,initialValues:t,validationSchema:_,onSubmit:function(a,t){var n=t.setSubmitting,l=t.resetForm;n(!0),e.setState({formValues:a}),e.handleSubmit(),n(!1),l()}},function(a){var t=a.values,n=a.isSubmitting,l=a.errors,r=a.touched,c=a.handleChange;return u.a.createElement(g.b,{id:"passengerForm"},u.a.createElement("div",{className:"form-body"},u.a.createElement("h4",{className:"form-section"},u.a.createElement(v.User,{size:20,color:"#212529"})," Passenger Info"),u.a.createElement(E.x,null,u.a.createElement(E.f,{md:"6"},u.a.createElement(E.m,null,u.a.createElement(E.o,{for:"name"},"Passenger Name"),u.a.createElement(g.a,{name:"name",id:"name",value:t.name,className:"form-control ".concat(l.name&&r.name&&"is-invalid")}),l.name&&r.name?u.a.createElement("div",{className:"invalid-feedback"},l.name):null)),u.a.createElement(E.f,{md:"6"},u.a.createElement(E.m,null,u.a.createElement(E.o,{for:"father_name"},"Passenger Father Name"),u.a.createElement(g.a,{name:"father_name",id:"father_name",value:t.father_name,className:"form-control ".concat(l.father_name&&r.father_name&&"is-invalid")}),l.father_name&&r.father_name?u.a.createElement("div",{className:"invalid-feedback"},l.father_name):null))),u.a.createElement(E.x,null,u.a.createElement(E.f,{md:"6"},u.a.createElement(E.m,null,u.a.createElement(E.o,{for:"cnic"},"CNIC"),u.a.createElement(g.a,{id:"cnic",name:"cnic",value:t.cnic,className:"form-control ".concat(l.cnic&&r.cnic&&"is-invalid")}),l.cnic&&r.cnic?u.a.createElement("div",{className:"invalid-feedback"},l.cnic):null)),u.a.createElement(E.f,{md:"6"},u.a.createElement(E.m,null,u.a.createElement(E.o,{for:"model"},"Gender"),u.a.createElement("select",{onChange:c,id:"type",name:"type",className:"form-control ".concat(l.type&&r.type&&"is-invalid")},u.a.createElement("option",{value:"",defaultValue:"",disabled:""},"Select Gender"),u.a.createElement("option",{value:"M",selected:"M"===t.gender},"Male"),u.a.createElement("option",{value:"F",selected:"F"===t.gender},"Female")),l.model&&r.model?u.a.createElement("div",{className:"invalid-feedback"},l.model):null))),u.a.createElement("h4",{className:"form-section"},u.a.createElement(v.Phone,{size:20,color:"#212529"})," Contact Info"),u.a.createElement(E.x,null,u.a.createElement(E.f,{md:"6"},u.a.createElement(E.m,null,u.a.createElement(E.o,{for:"phone"},"Primary Phone"),u.a.createElement(g.a,{name:"phone",id:"phone",value:t.phone,className:"form-control ".concat(l.phone&&r.phone&&"is-invalid")}),l.phone&&r.phone?u.a.createElement("div",{className:"invalid-feedback"},l.phone):null)),u.a.createElement(E.f,{md:"6"},u.a.createElement(E.m,null,u.a.createElement(E.o,{for:"email"},"Primary Email"),u.a.createElement(g.a,{name:"email",id:"email",value:t.email,className:"form-control ".concat(l.email&&r.email&&"is-invalid")}),l.email&&r.email?u.a.createElement("div",{className:"invalid-feedback"},l.email):null))),u.a.createElement("h4",{className:"form-section"},u.a.createElement(v.Home,{size:20,color:"#212529"})," Address Info"),u.a.createElement(E.x,null,u.a.createElement(E.f,{md:"12"},u.a.createElement(E.m,null,u.a.createElement(E.o,{for:"full_address"},"Address"),u.a.createElement(g.a,{name:"full_address",id:"full_address",value:t.full_address,className:"form-control ".concat(l.full_address&&r.full_address&&"is-invalid")}),l.full_address&&r.full_address?u.a.createElement("div",{className:"invalid-feedback"},l.full_address):null)))),u.a.createElement("div",{className:"form-actions"},u.a.createElement(E.c,{color:"primary",type:"submit",disabled:n},u.a.createElement(v.CheckSquare,{size:16,color:"#FFF"})," Save")),e.state.alert.display&&u.a.createElement(E.a,{color:e.state.alert.type},e.state.alert.message))})))))))}}]),a}(d.Component);a.default=y},94:function(e,a,t){"use strict";var n=t(0),l=t.n(n);a.a=function(e){var a=e.className;return l.a.createElement("div",{className:"content-header".concat(void 0===a?"":" ".concat(a))},e.children)}},95:function(e,a,t){"use strict";a.a={base_url:"https://ticket-management.herokuapp.com/"}}}]);