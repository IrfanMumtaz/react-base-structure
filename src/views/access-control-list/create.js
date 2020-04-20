import React, { Component, Fragment } from "react";
import ContentHeader from "components/contentHead/contentHeader";
import {
    Alert,
    Button,
    Card,
    CardBody,
    Col,
    FormGroup,
    Label,
    Row,
} from "reactstrap";
import { CheckSquare, Map } from "react-feather";
import Select from "react-select";
import "react-select/dist/react-select";
import { ACL_GATEWAY } from "gateway/service/acl";
import { Field, Formik, Form } from "formik";
import aclSchema from "schemas/acl";

class Create extends Component {
    constructor() {
        super();

        this.state = {
            formValues: {
                name: "",
                permissions: [],
            },
            multivalues: [],
            permissions: [],
            alert: {
                display: false,
                type: "success",
                message: "",
            },
        };
    }

    componentWillMount() {
        this.getPermissions();
    }

    getPermissions = async () => {
        const response = await ACL_GATEWAY.getPermissions();
        const permissions = this.setFormatMultiSelect(response.permissions);
        this.setState({ permissions });
    };

    setFormatMultiSelect(data) {
        let _data = [];
        data.map((d) =>
            _data.push({
                value: d.id,
                label: d.name,
            })
        );

        return _data;
    }

    /* createRole = async () => {
        let { formValues, multivalues } = this.state;
        formValues.permissions = [];
        multivalues.map((val) => {
            formValues.permissions.push(val.value);
        });
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.state.auth.token}`,
            },
            body: JSON.stringify(formValues),
        };
        fetch(`${config.base_url}v1/acl/role`, requestOptions)
            .then(this.handleResponse)
            .then((response) => {
                if (response.success === true) {
                    const alert = {
                        type: "success",
                        message: response.message,
                        display: true,
                    };
                    this.setState({ alert });
                } else {
                    const alert = {
                        type: "danger",
                        message: response.error.message,
                        display: true,
                    };
                    this.setState({ alert });
                }
                return response;
            });
    }; */

    handleSubmit = (e) => {
        this.createRole();
    };

    handleMultiChange = (option) => {
        this.setState({ multivalues: option });
    };

    handleResetForm = () => {
        document.getElementById("roleForm").reset();
    };

    findPermission(id) {
        let { formValues } = this.state;
        let obj = formValues.permissions.find((p) => p.id === id);
        if (obj) {
            if (formValues.addPermission.indexOf(id === -1)) {
                formValues.addPermission.push(id);
            }
            return true;
        }
        return false;
    }

    render() {
        const { permissions, formValues } = this.state;
        return (
            <Fragment>
                <ContentHeader>Vehicles Update </ContentHeader>

                <Row>
                    <Col md="12">
                        <Card>
                            <CardBody>
                                <div className="px-3">
                                    <Formik
                                        initialValues={this.state.formValues}
                                        enableReinitialize={true}
                                        validationSchema={aclSchema}
                                        onSubmit={(data, { setSubmitting }) => {
                                            setSubmitting(true);
                                            this.setState({ formValues: data });
                                            this.handleSubmit();
                                            setSubmitting(false);
                                        }}
                                    >
                                        {({
                                            values,
                                            isSubmitting,
                                            errors,
                                            touched,
                                            handleChange,
                                        }) => (
                                            <Form id="roleForm">
                                                <div className="form-body">
                                                    <h4 className="form-section">
                                                        <Map
                                                            size={20}
                                                            color="#212529"
                                                        />{" "}
                                                        Role Info
                                                    </h4>
                                                    <Row>
                                                        <Col md="12">
                                                            <FormGroup>
                                                                <Label for="name">
                                                                    Role Name *
                                                                </Label>
                                                                <Field
                                                                    name="name"
                                                                    id="name"
                                                                    className={`form-control ${errors.name &&
                                                                        touched.name &&
                                                                        "is-invalid"}`}
                                                                />
                                                                {errors.name &&
                                                                touched.name ? (
                                                                    <div className="invalid-feedback">
                                                                        {
                                                                            errors.name
                                                                        }
                                                                    </div>
                                                                ) : null}
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col md="12">
                                                            <Label for="name">
                                                                Permissions
                                                            </Label>
                                                            <Select
                                                                options={
                                                                    permissions
                                                                }
                                                                value={
                                                                    this.state
                                                                        .multivalues
                                                                }
                                                                onChange={
                                                                    this
                                                                        .handleMultiChange
                                                                }
                                                                isMulti={true}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </div>

                                                <div className="form-actions">
                                                    <Button
                                                        color="primary"
                                                        type="submit"
                                                    >
                                                        <CheckSquare
                                                            size={16}
                                                            color="#FFF"
                                                        />{" "}
                                                        Save
                                                    </Button>
                                                    {this.state.alert
                                                        .display && (
                                                        <Alert
                                                            color={
                                                                this.state.alert
                                                                    .type
                                                            }
                                                        >
                                                            {
                                                                this.state.alert
                                                                    .message
                                                            }
                                                        </Alert>
                                                    )}
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
