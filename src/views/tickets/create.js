import React, { Component, Fragment } from "react";
import config from "../../app/config";
import {store} from "../../redux/storeConfig/store";
import ContentHeader from "../../components/contentHead/contentHeader";
import {Alert, Button, Card, CardBody, CardTitle, Col, FormGroup, Input, Label, Row} from "reactstrap";
import {CheckSquare, FileText, Info, Mail, X, Home, Phone} from "react-feather";
import { useForm } from 'react-hook-form'
import {Field, Formik, Form} from "formik";
import * as Yup from "yup";
import Select from 'react-select';
import "react-select/dist/react-select";

const formSchema = Yup.object().shape({
    code: Yup.string().max(50, "Too long, max 50 characters").required("Required"),
    passenger_id: Yup.number().nullable(),
    vehicle_id: Yup.number().required("Required").nullable(),
    issuance: Yup.date().required("Required"),
    expiry: Yup.date().required("Required"),
    status: Yup.number().max(3).min(0).required("Required"),
    kin_name: Yup.string().max(50, "Too long, max 50 characters").required("Required"),
    kin_relation: Yup.string().max(50, "Too long, max 50 characters").required("Required"),
    kin_contact: Yup.string().max(50, "Too long, max 50 characters").required("Required"),
    pickup_add: Yup.string().max(190, "Pickup address too long.").required("Required"),
    dropoff_add: Yup.string().max(190, "Dropoff address too long.").required("Required"),
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

    state = {
        auth: store.getState().authentication.Auth,
        login: store.getState().authentication.Login,
        formValues: {
            code: '',
            issuance: '',
            expiry: '',
            status: 1,
            kin_name: '',
            kin_relation: '',
            kin_contact: '',
            merchant_id: null,
            passenger_id: null,
            vehicle_id: null,
            pickup_add: '',
            dropoff_add: '',
            name: '',
            father_name: '',
            cnic: null,
            gender: 'M',
            phone: null,
            email: '',
            s_phone: null,
            s_email: null,
            full_address: '',
            latitude: 54.2211,
            longitude: 54.2211,
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
        vehicles: [],
        passengersData: [],
        vehiclesData: [],
        STATUS: new Array("Expired", 'Active', "Refunded", "Claimed"),
        passengerCreate: false,
        alert: {
            display: false,
            type: "success",
            message: ""
        }
    };

    componentDidMount() {
        this.getPassengers();
        this.getVehicles();
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
                    const passengersData = passengers.map(p => ({"value": p.id, "label": `${p.name} (${p.cnic})`}));
                    this.setState({passengers, passengersData });
                }
                return response;
            });
    };

    getVehicles = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.state.auth.token}`
            }
        };
        fetch(`${config.base_url}v1/vehicle`, requestOptions)
            .then(this.handleResponse)
            .then(response => {
                if(response.success === true){
                    const {vehicles} = response.data;
                    const vehiclesData = vehicles.map(p => ({"value": p.id, "label": `${p.name}`}));
                    this.setState({vehicles, vehiclesData });
                }
                return response;
            });
    };

    createTicket = async () => {
        let { formValues } = this.state;
        if(!formValues.passenger_id){
            formValues.contact = {
                phone: formValues.phone,
                email: formValues.email
            };
            formValues.address = {
                full: formValues.full_address,
                latitude: formValues.latitude,
                longitude: formValues.longitude,
                city: 1,
                state: 1
            };
            const requestOptions = {
                method: 'Post',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${this.state.auth.token}`
                },
                body: JSON.stringify(formValues)
            };
            fetch(`${config.base_url}v1/passenger`, requestOptions)
                .then(this.handleResponse)
                .then(response => {
                    if(response.success === true){
                        this.setState({formValues: {...formValues, passenger_id: response.data.passenger.id}})
                    }
                    else{
                        const alert = {
                            type: "danger",
                            message: response.error.message,
                            display: true
                        };
                        this.setState({alert});
                    }
                    this.postCreatePassenger();
                    return response;
                });
        }
        else{
            this.postCreatePassenger();
        }

    };

    postCreatePassenger = async() => {
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
    }

    handleResponse(response) {
        return response.text().then(text => {
            return text && JSON.parse(text);
        });
    }

    handleSubmit = e => {
        this.createTicket();
    };

    handlePassengerSelect = option => {
        const { formValues, passengers } = this.state;
        if(option){


            const passenger = passengers.filter(p => p.id === option.value);
            console.log(passenger);
            this.setState({formValues: {
                    ...formValues,
                    passenger_id: option.value,
                    name: passenger[0].name,
                    father_name: passenger[0].father_name,
                    cnic: passenger[0].cnic,
                    gender: passenger[0].gender,
                    phone: passenger[0].primary_contact.phone,
                    email: passenger[0].primary_contact.email,
                    full_address: passenger[0].address.full_address,
                }});

            this.setState({
                passengerCreate: true
            });
        }
        else{
            this.setState({formValues: {
                    ...formValues,
                    passenger_id: null,
                    name: '',
                    father_name: '',
                    cnic: '',
                    gender: '',
                    phone: '',
                    email: '',
                    full: ''
                }});

            this.setState({
                passengerCreate: false
            });
        }
    };

    handleVehicleSelect = option => {
        const { formValues, vehicles } = this.state;
        if(option){
            this.setState({formValues: {
                    ...formValues,
                    vehicle_id: option.value
                }});
        }
        else{
            this.setState({formValues: {
                    ...formValues,
                    passenger_id: null
                }});
        }
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
        const {STATUS, formValues, passengers, passengersData, passengerCreate, vehiclesData} = this.state;
        return (
            <Fragment>

                <ContentHeader>Ticket Create </ContentHeader>

                <Row>
                    <Col md="12">
                        <Card>
                            <CardBody>
                                <div className="px-3">
                                    <Formik
                                        initialValues={formValues}
                                        enableReinitialize={true}
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
                                                        <Col md="4">
                                                            <FormGroup>
                                                                <Label for="name">Ticket Code</Label>
                                                                <Field name="code" id="code" value={values.code} disabled={true} className={`form-control ${errors.name && touched.name && 'is-invalid'}`}/>
                                                                {errors.code && touched.code ? <div className="invalid-feedback">{errors.code}</div> : null}
                                                            </FormGroup>
                                                        </Col>


                                                        <Col md="4">
                                                            <FormGroup>
                                                                <Label for="dropoff_add">Vehicle</Label>
                                                                <Select
                                                                    className={`basic-single ${errors.vehicle_id && touched.vehicle_id && 'is-invalid'}`}
                                                                    classNamePrefix="select"
                                                                    defaultValue={null}
                                                                    isClearable={true}
                                                                    isSearchable={true}
                                                                    onChange={this.handleVehicleSelect}
                                                                    name="vehicle_id"
                                                                    id="vehicle_id"
                                                                    options={vehiclesData}
                                                                />
                                                                {errors.vehicle_id && touched.vehicle_id ? <div className="invalid-feedback">{errors.vehicle_id}</div> : null}
                                                            </FormGroup>
                                                        </Col>

                                                        <Col md="4">
                                                            <FormGroup>
                                                                <Label for="passenger_id">Passenger</Label>
                                                                <Select
                                                                    className={`basic-single ${errors.passenger_id && touched.passenger_id && 'is-invalid'}`}
                                                                    classNamePrefix="select"
                                                                    defaultValue={null}
                                                                    isDisabled={false}
                                                                    isLoading={false}
                                                                    isClearable={true}
                                                                    isRtl={false}
                                                                    isSearchable={true}
                                                                    onChange={this.handlePassengerSelect}
                                                                    name="passenger_id"
                                                                    id="passenger_id"
                                                                    options={passengersData}
                                                                />
                                                                {errors.passenger_id && touched.passenger_id ? <div className="invalid-feedback">{errors.passenger_id}</div> : null}
                                                            </FormGroup>

                                                        </Col>
                                                    </Row>
                                                    <h4 className="form-section"><Phone size={20} color="#212529" /> Passenger Info</h4>

                                                    <Row>
                                                        <Col md="6">
                                                            <FormGroup>
                                                                <Label for="name">Passenger Name</Label>
                                                                <Field name="name" id="name" value={values.name} disabled={passengerCreate} className={`form-control ${errors.name && touched.name && 'is-invalid'}`}/>
                                                                {errors.name && touched.name ? <div className="invalid-feedback">{errors.name}</div> : null}
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="6">
                                                            <FormGroup>
                                                                <Label for="father_name">Passenger Father Name</Label>
                                                                <Field name="father_name" id="father_name" value={values.father_name} disabled={passengerCreate} className={`form-control ${errors.father_name && touched.father_name && 'is-invalid'}`}/>
                                                                {errors.father_name && touched.father_name ? <div className="invalid-feedback">{errors.father_name}</div> : null}
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md="6">
                                                            <FormGroup>
                                                                <Label for="cnic">CNIC</Label>
                                                                <Field id="cnic"   name="cnic" value={values.cnic} disabled={passengerCreate} className={`form-control ${errors.cnic && touched.cnic && 'is-invalid'}`} />
                                                                {errors.cnic && touched.cnic ? <div className="invalid-feedback">{errors.cnic}</div> : null}
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="6">
                                                            <FormGroup>
                                                                <Label for="model">Gender</Label>
                                                                <select onChange={handleChange} id="gender" name="gender" disabled={passengerCreate} className={`form-control ${errors.type && touched.type && 'is-invalid'}`}>
                                                                    <option value="" defaultValue="" disabled="">Select Gender</option>
                                                                    <option value="M" selected={values.gender === 'M'}>Male</option>
                                                                    <option value="F" selected={values.gender === 'F'}>Female</option>
                                                                </select>
                                                                {errors.model && touched.model ? <div className="invalid-feedback">{errors.model}</div> : null}
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>


                                                    <Row>
                                                        <Col md="6">
                                                            <FormGroup>
                                                                <Label for="phone">Primary Phone</Label>
                                                                <Field name="phone" id="phone" value={values.phone} disabled={passengerCreate} className={`form-control ${errors.phone && touched.phone && 'is-invalid'}`} />
                                                                {errors.phone && touched.phone ? <div className="invalid-feedback">{errors.phone}</div> : null}
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="6">
                                                            <FormGroup>
                                                                <Label for="email">Primary Email</Label>
                                                                <Field name="email" id="email" value={values.email} disabled={passengerCreate} className={`form-control ${errors.email && touched.email && 'is-invalid'}`} />
                                                                {errors.email && touched.email ? <div className="invalid-feedback">{errors.email}</div> : null}
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>


                                                    <Row>
                                                        <Col md="12">
                                                            <FormGroup>
                                                                <Label for="full_address">Address</Label>
                                                                <Field name="full_address" id="full_address" value={values.full_address} disabled={passengerCreate} className={`form-control ${errors.full_address && touched.full_address && 'is-invalid'}`} />
                                                                {errors.full_address && touched.full_address ? <div className="invalid-feedback">{errors.full_address}</div> : null}
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <h4 className="form-section"><Home size={20} color="#212529" /> Ticket Info</h4>

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
