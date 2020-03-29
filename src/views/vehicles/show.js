import React, { Component, Fragment } from "react";
import config from "../../app/config";
import {store} from "../../redux/storeConfig/store";
import ContentHeader from "../../components/contentHead/contentHeader";
import {Alert, Button, Card, CardBody, Col, FormGroup, Label, Row, Form, Input} from "reactstrap";
import {CheckSquare, X, Map, Edit} from "react-feather";
import {Field} from "formik";
import {NavLink} from "react-router-dom";


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

    componentWillMount() {
        this.getVehicle();
    }

    getYears(){
        const year = [];
        const date = new Date();
        for (let i = date.getFullYear(); i >= 1980; i--){
            year.push(i)
        }

        return year;
    }

    getVehicle = async () => {
        const { id } = this.props.match.params;
        const { formValues } = this.state;
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.state.auth.token}`
            }
        };
        fetch(`${config.base_url}v1/vehicle/${id}`, requestOptions)
            .then(this.handleResponse)
            .then(response => {
                if(response.success === true){
                    const alert = {
                        type: "success",
                        message: response.message,
                        display: true
                    };
                    const formValues = response.data.vehicle;
                    this.setState({formValues });
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

    render() {
        const {formData, formValues} = this.state;
        return (
            <Fragment>
                <ContentHeader>Vehicles Detail </ContentHeader>

                <Row>
                    <Col md="12">
                        <Card>
                            <CardBody>
                                <div className="px-3">
                                    <Form id="vehicleForm">
                                        <div className="form-body">
                                            <h4 className="form-section"><Map size={20} color="#212529" /> Vehicle Info</h4>
                                            <Row>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="name">Vehicle Name</Label>
                                                        <Input name="name" value={formValues.name} disabled={true} id="name" className={`form-control`}/>
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="type">Vehicle Type</Label>
                                                        <select id="type" name="type" className={`form-control`} disabled={true}>
                                                            <option value="0" defaultValue="" disabled="">Select Type</option>
                                                            <option value="Car" selected={formValues.type === 'Car'}>Car</option>
                                                            <option value="Bus" selected={formValues.type === 'Bus'}>Bus</option>
                                                            <option value="Motor Bike" selected={formValues.type === 'Motor Bike'}>Motor Bike</option>
                                                        </select>
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="make">Make</Label>
                                                        <Input id="make" value={formValues.make} disabled={true} name="make" className={`form-control`} />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="model">Model</Label>
                                                        <Input name="model" value={formValues.model} disabled={true} id="model" className={`form-control`} />
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="year">Year</Label>
                                                            <select id="year" name="year" className={`form-control`} disabled={true}>
                                                                <option value="0" defaultValue="" disabled="">Select Year</option>
                                                                {
                                                                    formData.year.map((y, i) => (
                                                                        <option key={i} value={y} selected={formValues.year === y} >{y}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="registration">Registraion</Label>
                                                        <Input id="registration" value={formValues.registration} disabled={true} name="registration" className={`form-control`}/>
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md="4">
                                                    <FormGroup>
                                                        <Label for="color">Color</Label>
                                                        <Input name="color" id="color" value={formValues.color} disabled={true} className={`form-control`} />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="4">
                                                    <FormGroup>
                                                        <Label for="chassis">Chassis</Label>
                                                        <Input name="chassis" id="chassis" value={formValues.chassis} disabled={true} className={`form-control`} />
                                                    </FormGroup>
                                                </Col>

                                                <Col md="4">
                                                    <FormGroup>
                                                        <Label for="engine">Engine</Label>
                                                        <Input name="engine" id="engine" value={formValues.engine} disabled={true} className={`form-control`} />
                                                    </FormGroup>
                                                </Col>
                                            </Row>


                                        </div>

                                        <div className="form-actions">
                                            <NavLink to={`/vehicles/edit/${formValues.id}`} className="item" activeclassname="active">
                                                <Button color="warning" className="mr-1">
                                                    <Edit size={16} color="#FFF" /> Edit
                                                </Button>
                                            </NavLink>


                                        </div>
                                    </Form>
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
