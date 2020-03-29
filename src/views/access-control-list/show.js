import React, { Component, Fragment } from "react";
import config from "../../app/config";
import {store} from "../../redux/storeConfig/store";
import ContentHeader from "../../components/contentHead/contentHeader";
import {Alert, Button, Card, CardBody, Col, FormGroup, Label, Row, Form, Input} from "reactstrap";
import {CheckSquare, X, Key, Edit} from "react-feather";
import {Field} from "formik";
import {NavLink} from "react-router-dom";


class Show extends Component {

    state = {
        auth: store.getState().authentication.Auth,
        formValues: {
            name: '',
            permissions: []
        }
    };

    componentWillMount() {
        this.getRole();
    }


    getRole = async () => {
        const { id } = this.props.match.params;
        const { formValues } = this.state;
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.state.auth.token}`
            }
        };
        fetch(`${config.base_url}v1/acl/role/${id}`, requestOptions)
            .then(this.handleResponse)
            .then(response => {
                if(response.success === true){
                    const alert = {
                        type: "success",
                        message: response.message,
                        display: true
                    };
                    const formValues = response.data.role;
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
        const {permissions, formValues} = this.state;
        return (
            <Fragment>
                <ContentHeader>Role Detail </ContentHeader>

                <Row>
                    <Col md="12">
                        <Card>
                            <CardBody>
                                <div className="px-3">
                                    <Form id="vehicleForm">
                                        <div className="form-body">
                                            <h4 className="form-section"><Key size={20} color="#212529" /> Role Info</h4>
                                            <Row>
                                                <Col md="12">
                                                    <FormGroup>
                                                        <Label for="name">Role Name</Label>
                                                        <Input name="name" value={formValues.name} disabled={true} id="name" className={`form-control`}/>
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md="12">
                                                    {
                                                        formValues.permissions.map(permission => (
                                                            <span className="badge badge-warning mr-1">{permission.name} </span>
                                                        ))
                                                    }
                                                </Col>
                                            </Row>


                                        </div>

                                        <div className="form-actions">
                                            <NavLink to={`/acl/roles/edit/${formValues.id}`} className="item" activeclassname="active">
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
