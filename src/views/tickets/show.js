import React, { Component, Fragment } from "react";
import config from "../../app/config";
import {store} from "../../redux/storeConfig/store";
import ContentHeader from "../../components/contentHead/contentHeader";
import {Button, Card, CardBody, Col, FormGroup, Label, Row, Form, Input} from "reactstrap";
import {CheckSquare, X, Map, Edit} from "react-feather";
import {NavLink} from "react-router-dom";


class Show extends Component {

    state = {
        auth: store.getState().authentication.Auth,
        formValues: {
            code: '',
            issuance: '',
            expiry: '',
            status: null,
            kin_name: '',
            kin_relation: '',
            kin_contact: '',
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
        STATUS: new Array("Expired", 'Active', "Refunded", "Claimed")
    };

    componentWillMount() {
        this.getTicket();
    }


    getTicket = async () => {
        const { id } = this.props.match.params;
        const { formValues } = this.state;
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.state.auth.token}`
            }
        };
        fetch(`${config.base_url}v1/ticket/${id}`, requestOptions)
            .then(this.handleResponse)
            .then(response => {
                if(response.success === true){
                    const formValues = response.data.ticket;
                    this.setState({formValues });
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
        const {formValues, STATUS} = this.state;
        return (
            <Fragment>
                <ContentHeader>Ticket Show </ContentHeader>

                <Row>
                    <Col md="12">
                        <Card>
                            <CardBody>
                                <div className="px-3">
                                    <Form id="vehicleForm">
                                        <div className="form-body">
                                            <h4 className="form-section"><Map size={20} color="#212529" /> Ticket Info</h4>
                                            <Row>
                                                <Col md="4">
                                                    <FormGroup>
                                                        <Label for="code">Ticket Code</Label>
                                                        <Input name="code" value={formValues.code} disabled={true} id="code" className={`form-control`}/>
                                                    </FormGroup>
                                                </Col>
                                                <Col md="4">
                                                    <FormGroup>
                                                        <Label for="passenger_name">Passenger Name</Label>
                                                        <Input name="passenger_name" value={formValues.passenger.name} disabled={true} id="passenger_name" className={`form-control`}/>
                                                    </FormGroup>
                                                </Col>
                                                <Col md="4">
                                                    <FormGroup>
                                                        <Label for="merchant_name">Merchant Name</Label>
                                                        <Input name="merchant_name" value={formValues.merchant.name} disabled={true} id="merchant_name" className={`form-control`}/>
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md="4">
                                                    <FormGroup>
                                                        <Label for="issuance">Issuance</Label>
                                                        <Input id="issuance" value={formValues.issuance} disabled={true} name="issuance" className={`form-control`} />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="4">
                                                    <FormGroup>
                                                        <Label for="expiry">Expiry</Label>
                                                        <Input name="expiry" value={formValues.expiry} disabled={true} id="expiry" className={`form-control`} />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="4">
                                                    <FormGroup>
                                                        <Label for="status">Status</Label>
                                                        <Input name="status" value={STATUS[formValues.status]} disabled={true} id="status" className={`form-control`} />
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md="4">
                                                    <FormGroup>
                                                        <Label for="kin_name">Kin Name</Label>
                                                        <Input id="kin_name" value={formValues.kin_name} disabled={true} name="kin_name" className={`form-control`} />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="4">
                                                    <FormGroup>
                                                        <Label for="kin_relation">Kin Relation</Label>
                                                        <Input name="kin_relation" value={formValues.kin_relation} disabled={true} id="kin_relation" className={`form-control`} />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="4">
                                                    <FormGroup>
                                                        <Label for="kin_contact">Kin Contact</Label>
                                                        <Input name="kin_contact" value={formValues.kin_contact} disabled={true} id="kin_contact" className={`form-control`} />
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="pickup">Pickup</Label>
                                                        <Input id="pickup" value={formValues.pickup.full_address} disabled={true} name="pickup" className={`form-control`} />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="dropoff">Dropoff</Label>
                                                        <Input name="dropoff" value={formValues.dropoff.full_address} disabled={true} id="dropoff" className={`form-control`} />
                                                    </FormGroup>
                                                </Col>
                                            </Row>


                                        </div>

                                        <div className="form-actions">
                                            <NavLink to={`/tickets/edit/${formValues.id}`} className="item" activeclassname="active">
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

export default Show;
