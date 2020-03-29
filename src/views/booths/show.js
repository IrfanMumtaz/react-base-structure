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
            name: '',
            merchant_id: null,
            merchant:{
                id: null
            },
            contact: {
                phone: null
            },
            address: {
                full_address: ''
            }
        },
        merchants: []
    };

    componentWillMount() {
        this.getMerchants();
        this.getBooth();
    }

    getMerchants = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.state.auth.token}`
            }
        };
        fetch(`${config.base_url}v1/merchant`, requestOptions)
            .then(this.handleResponse)
            .then(response => {
                if(response.success === true){
                    const merchants = response.data.merchants;
                    this.setState({merchants });
                }
                return response;
            });
    };

    getBooth = async () => {
        const { id } = this.props.match.params;
        const { formValues } = this.state;
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.state.auth.token}`
            }
        };
        fetch(`${config.base_url}v1/booth/${id}`, requestOptions)
            .then(this.handleResponse)
            .then(response => {
                if(response.success === true){
                    const formValues = response.data.booth;
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
        const {formValues, merchants} = this.state;
        return (
            <Fragment>
                <ContentHeader>Booth Show </ContentHeader>

                <Row>
                    <Col md="12">
                        <Card>
                            <CardBody>
                                <div className="px-3">
                                    <Form id="vehicleForm">
                                        <div className="form-body">
                                            <h4 className="form-section"><Map size={20} color="#212529" /> Booth Info</h4>
                                            <Row>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="booth_name">Booth Name</Label>
                                                        <Input name="booth_name" value={formValues.name} disabled={true} id="booth_name" className={`form-control`}/>
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="merchant_id">Booth Merchant</Label>
                                                        <select id="merchant_id" name="merchant_id" className={`form-control`} disabled={true}>
                                                            <option value="0" defaultValue="" disabled="">Select Type</option>
                                                            {
                                                                merchants.map((merchant) => (
                                                                    <option value={merchant.id} key={merchant.id} selected={merchant.id === formValues.merchant.id}>{merchant.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            {console.log(formValues)}

                                            <Row>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="make">Phone</Label>
                                                        <Input id="make" value={formValues.contact.phone} disabled={true} name="make" className={`form-control`} />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="full_address">Address</Label>
                                                        <Input name="full_address" value={formValues.address.full_address} disabled={true} id="model" className={`form-control`} />
                                                    </FormGroup>
                                                </Col>
                                            </Row>


                                        </div>

                                        <div className="form-actions">
                                            <NavLink to={`/booths/edit/${formValues.id}`} className="item" activeclassname="active">
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
