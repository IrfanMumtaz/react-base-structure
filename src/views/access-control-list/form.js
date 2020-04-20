import React, { Component } from "react";
import { Alert, Button, Col, FormGroup, Label, Row } from "reactstrap";
import { CheckSquare, Map } from "react-feather";
import { Field, Form, Formik } from "formik";
import Select from "react-select";
import aclSchema from "schemas/acl";

class AclForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rawData: {
                name: "",
                permissions: [],
            },
        };
    }

    handleMultiChange = (option, e) => {
        const { rawData } = this.state;
        rawData[e.name] = option;
        this.setState({ rawData });
    };

    handleInputChange = (e) => {
        const { rawData } = this.state;
        rawData[e.target.name] = e.target.value;
        this.setState({ rawData });
    };

    handleResetForm = () => {
        document.getElementById("roleForm").reset();
    };

    submitForm = () => {
        const { rawData } = this.state;
        this.props.onHandleSubmit(rawData);
    };

    render() {
        const { permissions, alert } = this.props.data;
        return (
            <React.Fragment>
                <Formik
                    initialValues={this.state.rawData}
                    enableReinitialize={true}
                    validationSchema={aclSchema}
                    onSubmit={(data, { setSubmitting }) => {
                        setSubmitting(true);
                        this.submitForm();
                        setSubmitting(false);
                    }}
                >
                    {({ values, isSubmitting, errors, touched }) => (
                        <Form id="roleForm">
                            <div className="form-body">
                                <h4 className="form-section">
                                    <Map size={20} color="#212529" /> Role Info
                                </h4>
                                <Row>
                                    <Col md="12">
                                        <FormGroup>
                                            <Label for="name">
                                                Role Name *
                                            </Label>
                                            <Field
                                                name="name"
                                                value={values.name}
                                                onChange={
                                                    this.handleInputChange
                                                }
                                                id="name"
                                                className={`form-control ${errors.name &&
                                                    touched.name &&
                                                    "is-invalid"}`}
                                            />
                                            {errors.name && touched.name ? (
                                                <div className="invalid-feedback">
                                                    {errors.name}
                                                </div>
                                            ) : null}
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md="12">
                                        <Label for="permissions">
                                            Permissions
                                        </Label>
                                        <Select
                                            options={permissions}
                                            value={
                                                this.state.rawData.permissions
                                            }
                                            onChange={this.handleMultiChange}
                                            isMulti={true}
                                            id="permissions"
                                            name="permissions"
                                        />
                                    </Col>
                                </Row>
                            </div>

                            <div className="form-actions">
                                <Button color="primary" type="submit">
                                    <CheckSquare size={16} color="#FFF" /> Save
                                </Button>
                                {alert.display && (
                                    <Alert color={alert.type}>
                                        {alert.message}
                                    </Alert>
                                )}
                            </div>
                        </Form>
                    )}
                </Formik>
            </React.Fragment>
        );
    }
}

export default AclForm;
