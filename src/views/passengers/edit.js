import React, { Component, Fragment } from "react";
import config from "../../app/config";
import {store} from "../../redux/storeConfig/store";
import ContentHeader from "../../components/contentHead/contentHeader";
import {Alert, Button, Card, CardBody, CardTitle, Col, FormGroup, Input, Label, Row} from "reactstrap";
import {CheckSquare, FileText, Info, Mail, X, Map, User, Phone, Home} from "react-feather";
import { useForm } from 'react-hook-form'
import {Field, Formik, Form} from "formik";
import * as Yup from "yup";

const formSchema = Yup.object().shape({
    name: Yup.string().max(50, "Too long, max 50 characters").required("Required"),
    father_name: Yup.string().max(50, "Too long, max 50 characters").required("Required"),
    cnic: Yup.number().required("Required").nullable(),
    gender: Yup.string().max(1, "Something odd happened, can not process further").required("Required"),
    phone: Yup.number().required("Required"),
    email: Yup.string().email().required("Required"),
    full_address: Yup.string().required("Required").max(190, "Address too long"),
    latitude: Yup.number().required("Required").nullable(),
    longitude: Yup.number().required("Required").nullable(),
});

class Create extends Component {

    constructor(props) {
        super(props);
    }
    state = {
        auth: store.getState().authentication.Auth,
        formValues: {
            name: '',
            father_name: '',
            cnic: null,
            gender: 'M',
            phone: null,
            email: '',
            full_address: '',
            latitude: 54.2211,
            longitude: 54.2211
        },
        formData: {
        },
        alert: {
            display: false,
            type: "success",
            message: ""
        }
    };

    componentWillMount() {
        this.getPassenger();
    }

    getPassenger = async () => {
        const { id } = this.props.match.params;
        const { formValues } = this.state;
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.state.auth.token}`
            }
        };
        fetch(`${config.base_url}v1/passenger/${id}`, requestOptions)
            .then(this.handleResponse)
            .then(response => {
                if(response.success === true){
                    let formValues = response.data.passenger;
                    formValues.phone = formValues.primary_contact.phone;
                    formValues.email = formValues.primary_contact.email;
                    formValues.full_address = formValues.address.full_address;
                    formValues.latitude = 54.2211;
                    formValues.longitude = 54.2211;
                    this.setState({formValues });
                }
                return response;
            });
    };

    updatePassenger = async () => {
        const {id} = this.props.match.params
        let { formValues } = this.state;
        formValues.contact = {
            phone: formValues.phone,
            email: formValues.email,
        };
        formValues.address = {
            full: formValues.full_address,
            latitude: formValues.latitude,
            longitude: formValues.longitude,
            city: 1,
            state: 1
        };
        console.log(formValues)
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.state.auth.token}`
            },
            body: JSON.stringify(formValues)
        };
        fetch(`${config.base_url}v1/passenger/${id}`, requestOptions)
            .then(this.handleResponse)
            .then(response => {
                if(response.success === true){
                    const alert = {
                        type: "success",
                        message: response.message,
                        display: true
                    };
                    this.setState({alert});
                }
                else{
                    const alert = {
                        type: "danger",
                        message: response.error.message,
                        display: true
                    };
                    this.setState({alert});
                }
                return response;
            });
    };

    handleResponse(response) {
        return response.text().then(text => {
            return text && JSON.parse(text);
        });
    }

    handleSubmit = e => {
        this.updatePassenger();
    };

    handleChange = e => {
        const { formValues } = this.state;
        formValues[e.target.name] = e.target.value;

        this.setState({formValues})
    };

    handleResetForm = () => {
        document.getElementById("passengerForm").reset();
    };

    render() {
        const {formData, formValues} = this.state;
        return (
            <Fragment>
                <ContentHeader>Passenger Update </ContentHeader>

                <Row>
                    <Col md="12">
                        <Card>
                            <CardBody>
                                <div className="px-3">
                                    <Formik
                                        enableReinitialize={true}
                                        initialValues={formValues}
                                        validationSchema={formSchema}
                                        onSubmit={(data, {setSubmitting, resetForm}) => {
                                            setSubmitting(true);
                                            this.setState({formValues: data});
                                            this.handleSubmit();
                                            setSubmitting(false);
                                            resetForm();
                                        }}
                                    >
                                        {({ values, isSubmitting, errors, touched, handleChange}) => (
                                            <Form id="passengerForm">
                                                <div className="form-body">
                                                    <h4 className="form-section"><User size={20} color="#212529" /> Passenger Info</h4>
                                                    <Row>
                                                        <Col md="6">
                                                            <FormGroup>
                                                                <Label for="name">Passenger Name</Label>
                                                                <Field name="name" id="name" value={values.name} className={`form-control ${errors.name && touched.name && 'is-invalid'}`}/>
                                                                {errors.name && touched.name ? <div className="invalid-feedback">{errors.name}</div> : null}
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="6">
                                                            <FormGroup>
                                                                <Label for="father_name">Passenger Father Name</Label>
                                                                <Field name="father_name" id="father_name" value={values.father_name} className={`form-control ${errors.father_name && touched.father_name && 'is-invalid'}`}/>
                                                                {errors.father_name && touched.father_name ? <div className="invalid-feedback">{errors.father_name}</div> : null}
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md="6">
                                                            <FormGroup>
                                                                <Label for="cnic">CNIC</Label>
                                                                <Field id="cnic"   name="cnic" value={values.cnic} className={`form-control ${errors.cnic && touched.cnic && 'is-invalid'}`} />
                                                                {errors.cnic && touched.cnic ? <div className="invalid-feedback">{errors.cnic}</div> : null}
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="6">
                                                            <FormGroup>
                                                                <Label for="model">Gender</Label>
                                                                <select onChange={handleChange} id="type" name="type" className={`form-control ${errors.type && touched.type && 'is-invalid'}`}>
                                                                    <option value="" defaultValue="" disabled="">Select Gender</option>
                                                                    <option value="M" selected={values.gender === 'M'}>Male</option>
                                                                    <option value="F" selected={values.gender === 'F'}>Female</option>
                                                                </select>
                                                                {errors.model && touched.model ? <div className="invalid-feedback">{errors.model}</div> : null}
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>


                                                    <h4 className="form-section"><Phone size={20} color="#212529" /> Contact Info</h4>
                                                    <Row>
                                                        <Col md="6">
                                                            <FormGroup>
                                                                <Label for="phone">Primary Phone</Label>
                                                                <Field name="phone" id="phone" value={values.phone} className={`form-control ${errors.phone && touched.phone && 'is-invalid'}`} />
                                                                {errors.phone && touched.phone ? <div className="invalid-feedback">{errors.phone}</div> : null}
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="6">
                                                            <FormGroup>
                                                                <Label for="email">Primary Email</Label>
                                                                <Field name="email" id="email" value={values.email} className={`form-control ${errors.email && touched.email && 'is-invalid'}`} />
                                                                {errors.email && touched.email ? <div className="invalid-feedback">{errors.email}</div> : null}
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>

                                                    <h4 className="form-section"><Home size={20} color="#212529" /> Address Info</h4>

                                                    <Row>
                                                        <Col md="12">
                                                            <FormGroup>
                                                                <Label for="full_address">Address</Label>
                                                                <Field name="full_address" id="full_address" value={values.full_address} className={`form-control ${errors.full_address && touched.full_address && 'is-invalid'}`} />
                                                                {errors.full_address && touched.full_address ? <div className="invalid-feedback">{errors.full_address}</div> : null}
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>



                                                </div>

                                                <div className="form-actions">
                                                    <Button color="primary" type="submit" disabled={isSubmitting}>
                                                        <CheckSquare size={16} color="#FFF" /> Save
                                                    </Button>


                                                </div>
                                                {   this.state.alert.display &&
                                                <Alert color={this.state.alert.type} >
                                                    {this.state.alert.message}
                                                </Alert>
                                                }
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default Create;
