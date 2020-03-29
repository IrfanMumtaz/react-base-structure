import React, { Component, Fragment } from "react";
import axios from "axios";
import config from "../../app/config";
import {store} from "../../redux/storeConfig/store";
import ContentHeader from "../../components/contentHead/contentHeader";
import {Alert, Button, Card, CardBody, CardTitle, Col, FormGroup, Input, Label, Row} from "reactstrap";
import {CheckSquare, FileText, Info, Mail, X, Map} from "react-feather";
import { useForm } from 'react-hook-form'
import {Field, Formik, Form} from "formik";
import * as Yup from "yup";

const formSchema = Yup.object().shape({
    name: Yup.string()
        .max(50, "Too long, max 50 characters")
        .required("Required"),
    type: Yup.string()
        .max(50, "Too long, max 50 characters").required("Required"),
    make: Yup.string()
        .max(50, "Too long, max 50 characters")
        .required("Required"),
    model: Yup.string()
        .max(50, "Too long, max 50 characters")
        .required("Required"),
    registration: Yup.string()
        .max(50, "Too long, max 50 characters")
        .required("Required"),
    color: Yup.string()
        .max(50, "Too long, max 50 characters").nullable(),
    chassis: Yup.string()
        .max(50, "Too long, max 50 characters").nullable(),
    engine: Yup.string()
        .max(50, "Too long, max 50 characters").nullable(),
    year: Yup.number()
        .nullable().required("Required")
});

class Create extends Component {

    state = {
        auth: store.getState().authentication.Auth,
        formValues: {
            name: '',
            type: '',
            make: '',
            model: '',
            year: null,
            registration: '',
            color: null,
            chassis: null,
            engine: null,
        },
        formData: {
            year: this.getYears(),
        },
        alert: {
            display: false,
            type: "success",
            message: ""
        }
    };

    getYears(){
        const year = [];
        const date = new Date();
        for (let i = date.getFullYear(); i >= 1980; i--){
            year.push(i)
        }

        return year;
    }

    createVehicle = async () => {
        const { formValues } = this.state;
        const requestOptions = {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.state.auth.token}`
            },
            body: JSON.stringify(formValues)
        };
        fetch(`${config.base_url}v1/vehicle`, requestOptions)
            .then(this.handleResponse)
            .then(response => {
                if(response.success === true){
                    const alert = {
                        type: "success",
                        message: response.message,
                        display: true
                    };
                    this.setState({alert});
                    // this.handleResetForm();
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
            const data = text && JSON.parse(text);
            return data;
        });
    }

    handleSubmit = e => {
        this.createVehicle();
    };

    handleChange = e => {
        const { formValues } = this.state;
        formValues[e.target.name] = e.target.value;

        this.setState({formValues})
    };

    handleResetForm = () => {
        document.getElementById("vehicleForm").reset();
    };

    render() {
        const {formData} = this.state;
        return (
            <Fragment>
                <ContentHeader>Vehicles Add </ContentHeader>

                <Row>
                    <Col md="12">
                        <Card>
                            <CardBody>
                                <div className="px-3">
                                    <Formik
                                        initialValues={this.state.formValues}
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
                                            <Form id="vehicleForm">
                                        <div className="form-body">
                                            <h4 className="form-section"><Map size={20} color="#212529" /> Vehicle Info</h4>
                                            <Row>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="name">Vehicle Name</Label>
                                                        <Field name="name" id="name" className={`form-control ${errors.name && touched.name && 'is-invalid'}`}/>
                                                        {errors.name && touched.name ? <div className="invalid-feedback">{errors.name}</div> : null}
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="type">Vehicle Type</Label>
                                                        <select onChange={handleChange} id="type" name="type" className={`form-control ${errors.type && touched.type && 'is-invalid'}`}>
                                                            <option value="0" defaultValue="" disabled="">Select Type</option>
                                                            <option value="Bus">Bus</option>
                                                            <option value="Car">Car</option>
                                                            <option value="Motor Bike">Motor Bike</option>
                                                        </select>
                                                        {errors.type && touched.type ? <div className="invalid-feedback">{errors.type}</div> : null}
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="make">Make</Label>
                                                        <Field id="make"   name="make" className={`form-control ${errors.make && touched.make && 'is-invalid'}`} />
                                                        {errors.make && touched.make ? <div className="invalid-feedback">{errors.make}</div> : null}
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="model">Model</Label>
                                                        <Field name="model" id="model" className={`form-control ${errors.model && touched.model && 'is-invalid'}`} />
                                                        {errors.model && touched.model ? <div className="invalid-feedback">{errors.model}</div> : null}
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="year">Year</Label>
                                                            <select onChange={handleChange} id="year" name="year" className={`form-control ${errors.year && touched.year && 'is-invalid'}`}>
                                                                <option value="0" defaultValue="" disabled="">Select Year</option>
                                                                {
                                                                    formData.year.map((y, i) => (
                                                                        <option key={i} value={y}>{y}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                            {errors.year && touched.year ? <div className="invalid-feedback">{errors.year}</div> : null}
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="registration">Registraion</Label>
                                                        <Field id="registration"   name="registration" className={`form-control ${errors.registration && touched.registration && 'is-invalid'}`}/>
                                                        {errors.registration && touched.registration ? <div className="invalid-feedback">{errors.registration}</div> : null}
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md="4">
                                                    <FormGroup>
                                                        <Label for="color">Color</Label>
                                                        <Field name="color" id="color" value={values.color} className={`form-control ${errors.color && touched.color && 'is-invalid'}`} />
                                                        {errors.color && touched.color ? <div className="invalid-feedback">{errors.color}</div> : null}
                                                    </FormGroup>
                                                </Col>
                                                <Col md="4">
                                                    <FormGroup>
                                                        <Label for="chassis">Chassis</Label>
                                                        <Field name="chassis" id="chassis" value={values.chassis} className={`form-control ${errors.chassis && touched.chassis && 'is-invalid'}`} />
                                                        {errors.chassis && touched.chassis ? <div className="invalid-feedback">{errors.chassis}</div> : null}
                                                    </FormGroup>
                                                </Col>

                                                <Col md="4">
                                                    <FormGroup>
                                                        <Label for="engine">Engine</Label>
                                                        <Field name="engine" id="engine" value={values.engine} className={`form-control ${errors.engine && touched.engine && 'is-invalid'}`} />
                                                        {errors.engine && touched.engine ? <div className="invalid-feedback">{errors.engine}</div> : null}
                                                    </FormGroup>
                                                </Col>
                                            </Row>


                                        </div>

                                        <div className="form-actions">
                                            <Button color="warning" className="mr-1" onClick={this.handleResetForm}>
                                                <X size={16} color="#FFF" /> Cancel
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
