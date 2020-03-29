import React, { Component, Fragment } from "react";
import config from "../../app/config";
import {store} from "../../redux/storeConfig/store";
import ContentHeader from "../../components/contentHead/contentHeader";
import {Alert, Button, Card, CardBody, CardTitle, Col, FormGroup, Input, Label, Row, Form} from "reactstrap";
import {CheckSquare, FileText, Info, Mail, X, Map, User, Phone, Home} from "react-feather";
import { useForm } from 'react-hook-form'
import {Field, Formik} from "formik";
import * as Yup from "yup";
import {NavLink} from "react-router-dom";

class Show extends Component {

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
            religion: '',
            nationality: '',
            dob: '',
            joining: '',
            phone: null,
            email: '',
            s_phone: null,
            s_email: null,
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
        this.getMerchant();
    }

    getMerchant = async () => {
        const { id } = this.props.match.params;
        const { formValues } = this.state;
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.state.auth.token}`
            }
        };
        fetch(`${config.base_url}v1/merchant/${id}`, requestOptions)
            .then(this.handleResponse)
            .then(response => {
                if(response.success === true){
                    let formValues = response.data.merchant;
                    formValues.phone = formValues.primary_contact.phone;
                    formValues.email = formValues.primary_contact.email;
                    formValues.s_phone = (formValues.secondary_contacts[0]) ? formValues.secondary_contacts[0].s_phone : null;
                    formValues.s_email = (formValues.secondary_contacts[0]) ? formValues.secondary_contacts[0].s_email : null;
                    formValues.full_address = formValues.address.full_address;
                    formValues.latitude = 54.2211;
                    formValues.longitude = 54.2211;
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
        const {formData, formValues} = this.state;
        return (
            <Fragment>
                <ContentHeader>Merchant Detail </ContentHeader>

                <Row>
                    <Col md="12">
                        <Card>
                            <CardBody>
                                <div className="px-3">
                                    <Form id="merchantForm">
                                        <div className="form-body">
                                            <h4 className="form-section"><User size={20} color="#212529" /> Merchant Info</h4>
                                            <Row>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="name">Merchant Name</Label>
                                                        <Input name="name" id="name" value={formValues.name} className={`form-control`} disabled={true}/>
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="father_name">Merchant Father Name</Label>
                                                        <Input name="father_name" id="father_name" value={formValues.father_name} className={`form-control`} disabled={true}/>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="cnic">CNIC</Label>
                                                        <Input id="cnic"   name="cnic" value={formValues.cnic} className={`form-control`} disabled={true} />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="model">Gender</Label>
                                                        <select id="type" name="type" className={`form-control`} disabled={true}>
                                                            <option value="" defaultValue="" disabled="">Select Gender</option>
                                                            <option value="M" selected={formValues.gender === 'M'}>Male</option>
                                                            <option value="F" selected={formValues.gender === 'F'}>Female</option>
                                                        </select>
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="religion">Religion</Label>
                                                        <Input name="religion" id="religion" value={formValues.religion} className={`form-control`} disabled={true} />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="nationality">Nationality</Label>
                                                        <Input name="nationality" id="nationality" value={formValues.nationality} className={`form-control`} disabled={true} />
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="dob">Date of Birth</Label>
                                                        <Input type="date" name="dob" id="dob" value={formValues.dob} className={`form-control`} disabled={true} />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="joining">Date of Joining</Label>
                                                        <Input type="date" name="joining" id="joining" value={formValues.joining} className={`form-control`} disabled={true} />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <h4 className="form-section"><Phone size={20} color="#212529" /> Contact Info</h4>
                                            <Row>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="phone">Primary Phone</Label>
                                                        <Input name="phone" id="phone" value={formValues.phone} className={`form-control`} disabled={true} />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="email">Primary Email</Label>
                                                        <Input name="email" id="email" value={formValues.email} className={`form-control`} disabled={true} />
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="s_phone">Secondary Phone</Label>
                                                        <Input name="s_phone" id="s_phone" value={formValues.s_phone} className={`form-control `} disabled={true} />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="s_email">Secondary Email</Label>
                                                        <Input name="s_email" id="s_email" value={formValues.s_email} className={`form-control`} disabled={true} />
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                            <h4 className="form-section"><Home size={20} color="#212529" /> Address Info</h4>

                                            <Row>
                                                <Col md="12">
                                                    <FormGroup>
                                                        <Label for="full_address">Address</Label>
                                                        <Input name="full_address" id="full_address" value={formValues.full_address} className={`form-control `} disabled={true} />
                                                    </FormGroup>
                                                </Col>
                                            </Row>



                                        </div>

                                        <div className="form-actions">
                                            <NavLink to={`/merchants/edit/${formValues.id}`} className="item" activeclassname="active">
                                                <Button color="warning">
                                                    <CheckSquare size={16} color="#FFF" /> Edit
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
