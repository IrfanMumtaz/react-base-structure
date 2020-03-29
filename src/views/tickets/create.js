import React, { Component, Fragment } from "react";
import config from "../../app/config";
import {store} from "../../redux/storeConfig/store";
import ContentHeader from "../../components/contentHead/contentHeader";
import {Alert, Button, Card, CardBody, CardTitle, Col, FormGroup, Input, Label, Row} from "reactstrap";
import {CheckSquare, FileText, Info, Mail, X, Home} from "react-feather";
import { useForm } from 'react-hook-form'
import {Field, Formik, Form} from "formik";
import * as Yup from "yup";

const formSchema = Yup.object().shape({
    code: Yup.string().max(50, "Too long, max 50 characters").required("Required"),
    passenger_id: Yup.number().required("Required"),
    issuance: Yup.date().required("Required"),
    expiry: Yup.date().required("Required"),
    status: Yup.number().max(3).min(0).required("Required"),
    kin_name: Yup.string().max(50, "Too long, max 50 characters").required("Required"),
    kin_relation: Yup.string().max(50, "Too long, max 50 characters").required("Required"),
    kin_contact: Yup.string().max(50, "Too long, max 50 characters").required("Required"),
    pickup_add: Yup.string().max(190, "Pickup address too long.").required("Required"),
    dropoff_add: Yup.string().max(190, "Dropoff address too long.").required("Required"),
});

class Create extends Component {

    state = {
        auth: store.getState().authentication.Auth,
        login: store.getState().authentication.Login,
        formValues: {
            code: '',
            issuance: '',
            expiry: '',
            status: null,
            kin_name: '',
            kin_relation: '',
            kin_contact: '',
            merchant_id: null,
            passenger_id: null,
            pickup_add: '',
            dropoff_add: '',
            merchant:{
                id: null,
                name: ''
            },
            passenger:{
                id: null,
                name: ''
            },
            pickup: {
                full_address: ''
            },
            dropoff: {
                full_address: ''
            }
        },
        passengers: [],
        STATUS: new Array("Expired", 'Active', "Refunded", "Claimed"),
        alert: {
            display: false,
            type: "success",
            message: ""
        }
    };

    componentWillMount() {
        this.getPassengers();
        let { formValues } = this.state;
        formValues.code = this.generateCode();
        this.setState({formValues});
    }

    generateCode(){
        return `TKT-${this.state.login.user.id}${new Date().getTime()}`;
    }

    getPassengers = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.state.auth.token}`
            }
        };
        fetch(`${config.base_url}v1/passenger`, requestOptions)
            .then(this.handleResponse)
            .then(response => {
                if(response.success === true){
                    const {passengers} = response.data;
                    this.setState({passengers });
                }
                return response;
            });
    };

    createTicket = async () => {
        const { id } = this.props.match.params;
        let { formValues } = this.state;
        formValues.pickup = {
            full: formValues.pickup_add,
            latitude: 54.2211,
            longitude: 54.2211,
        };

        formValues.dropoff = {
            full: formValues.dropoff_add,
            latitude: 54.2211,
            longitude: 54.2211,
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.state.auth.token}`
            },
            body: JSON.stringify(formValues)
        };
        fetch(`${config.base_url}v1/ticket`, requestOptions)
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
        this.createTicket();
    };

    handleChange = e => {
        const { formValues } = this.state;
        formValues[e.target.name] = e.target.value;

        this.setState({formValues})
    };

    handleResetForm = () => {
        document.getElementById("form").reset();
    };

    render() {
        const {STATUS, formValues, passengers} = this.state;
        return (
            <Fragment>
                <ContentHeader>Ticket Update </ContentHeader>

                <Row>
                    <Col md="12">
                        <Card>
                            <CardBody>
                                <div className="px-3">
                                    <Formik
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
                                            <Form id="form">
                                                <div className="form-body">
                                                    <h4 className="form-section"><Home size={20} color="#212529" /> Ticket Info</h4>
                                                    <Row>
                                                        <Col md="6">
                                                            <FormGroup>
                                                                <Label for="name">Ticket Code</Label>
                                                                <Field name="code" id="code" value={values.code} disabled={true} className={`form-control ${errors.name && touched.name && 'is-invalid'}`}/>
                                                                {errors.code && touched.code ? <div className="invalid-feedback">{errors.code}</div> : null}
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="6">
                                                            <FormGroup>
                                                                <Label for="passenger_id">Passenger</Label>
                                                                <select onChange={handleChange} id="passenger_id" name="passenger_id" className={`form-control ${errors.passenger_id && touched.passenger_id && 'is-invalid'}`}>
                                                                    <option value="0" defaultValue="" disabled="">Select Passenger</option>
                                                                    {
                                                                        passengers.map((passenger) => (
                                                                            <option value={passenger.id} key={passenger.id} >{`${passenger.name} (${passenger.cnic})`}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                                {errors.passenger_id && touched.passenger_id ? <div className="invalid-feedback">{errors.passenger_id}</div> : null}
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col md="4">
                                                            <FormGroup>
                                                                <Label for="issuance">Issuance</Label>
                                                                <Field id="issuance" type="date" name="issuance" className={`form-control ${errors.issuance && touched.issuance && 'is-invalid'}`} />
                                                                {errors.issuance && touched.issuance ? <div className="invalid-feedback">{errors.issuance}</div> : null}
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="4">
                                                            <FormGroup>
                                                                <Label for="expiry">Expiry</Label>
                                                                <Field name="expiry" type="date" id="expiry" className={`form-control ${errors.expiry && touched.expiry && 'is-invalid'}`} />
                                                                {errors.expiry && touched.expiry ? <div className="invalid-feedback">{errors.expiry}</div> : null}
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="4">
                                                            <FormGroup>
                                                                <Label for="status">Status</Label>
                                                                <select onChange={handleChange} id="status" name="status" className={`form-control ${errors.status && touched.status && 'is-invalid'}`}>
                                                                    <option value="-1" defaultValue="" disabled="">Select Status</option>
                                                                    {
                                                                        STATUS.map((st, index) => (
                                                                            <option value={index} key={index} selected={index === 1}>{`${st}`}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                                {errors.passenger_id && touched.passenger_id ? <div className="invalid-feedback">{errors.passenger_id}</div> : null}

                                                            </FormGroup>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col md="4">
                                                            <FormGroup>
                                                                <Label for="kin_name">Kin Name</Label>
                                                                <Field id="kin_name" name="kin_name" className={`form-control  ${errors.kin_name && touched.kin_name && 'is-invalid'}`} />
                                                                {errors.kin_name && touched.kin_name ? <div className="invalid-feedback">{errors.kin_name}</div> : null}
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="4">
                                                            <FormGroup>
                                                                <Label for="kin_relation">Kin Relation</Label>
                                                                <Field name="kin_relation" id="kin_relation" className={`form-control  ${errors.kin_relation && touched.kin_relation && 'is-invalid'}`} />
                                                                {errors.kin_relation && touched.kin_relation ? <div className="invalid-feedback">{errors.kin_relation}</div> : null}
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="4">
                                                            <FormGroup>
                                                                <Label for="kin_contact">Kin Contact</Label>
                                                                <Field name="kin_contact" id="kin_contact" className={`form-control  ${errors.kin_contact && touched.kin_contact && 'is-invalid'}`} />
                                                                {errors.kin_contact && touched.kin_contact ? <div className="invalid-feedback">{errors.kin_contact}</div> : null}
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col md="6">
                                                            <FormGroup>
                                                                <Label for="pickup_add">Pickup</Label>
                                                                <Field id="pickup_add" name="pickup_add" className={`form-control  ${errors.pickup_add && touched.pickup_add && 'is-invalid'}`} />
                                                                {errors.pickup_add && touched.pickup_add ? <div className="invalid-feedback">{errors.pickup_add}</div> : null}
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="6">
                                                            <FormGroup>
                                                                <Label for="dropoff_add">Dropoff</Label>
                                                                <Field name="dropoff_add" id="dropoff_add" className={`form-control  ${errors.dropoff_add && touched.dropoff_add && 'is-invalid'}`} />
                                                                {errors.dropoff_add && touched.dropoff_add ? <div className="invalid-feedback">{errors.dropoff_add}</div> : null}
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>

                                                </div>

                                                <div className="form-actions">
                                                    <Button color="warning" className="mr-1" type="submit">
                                                        <CheckSquare size={16} color="#FFF" /> Cancel
                                                    </Button>

                                                    <Button color="primary" type="submit" disabled={isSubmitting}>
                                                        <CheckSquare size={16} color="#FFF" /> Save
                                                    </Button>
                                                    {   this.state.alert.display &&
                                                    <Alert color={this.state.alert.type} >
                                                        {this.state.alert.message}
                                                    </Alert>
                                                    }
                                                </div>
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
