import React, { Component } from "react";
import { Alert, Button, Col, FormGroup, Label, Row } from "reactstrap";
import { CheckSquare, User, X, Phone, Home } from "react-feather";
import { Field, Formik, Form, getIn, ErrorMessage } from "formik";
import merchantSchema from "schemas/merchantSchema";
import MERCHANT_GATEWAY from "gateway/service/merchant";
import config from "app/config";
import { GoogleComponent } from "react-google-location";

class MerchantForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rawData: {
                name: null,
                father_name: null,
                cnic: null,
                gender: "M",
                religion: null,
                nationality: null,
                dob: null,
                joining: null,
                password: null,
                contact: {
                    phone: null,
                    email: null,
                    s_phone: null,
                    s_email: null,
                },
                address: {
                    full_address: null,
                },
            },
            _default: {
                merchantCreate: false,
            },
        };
    }

    componentDidMount() {
        if (this.props.id && this.state._default.merchantCreate === false) {
            this.getMerchant();
        }
    }

    getMerchant = async () => {
        const { id } = this.props;
        let { rawData, _default } = this.state;
        const response = await MERCHANT_GATEWAY.getMerchant(id);
        if (response.success) {
            const { merchant } = response.data;
            rawData = this.setMerchantaData(merchant);
            this.setState({ rawData });
            this.setState({
                _default: {
                    ..._default,
                    merchantCreate: true,
                },
            });
        }
    };

    setMerchantaData(data) {
        let _data = { ...data };
        _data.contact = data.primary_contact;
        _data.contact.s_phone =
            data.secondary_contacts.length > 0
                ? data.secondary_contacts[0].phone
                : null;
        _data.contact.s_email =
            data.secondary_contacts.length > 0
                ? data.secondary_contacts[0].email
                : null;

        delete _data.primary_contact;
        delete _data.secondary_contacts;
        delete _data.id;

        return _data;
    }

    handleChange = (e) => {
        const { rawData } = this.state;
        const name = e.target.name;
        const value = e.target.value;

        rawData[name] = value;
        this.setState({ rawData });
    };

    googlePlaceSearch = (e, name, category) => {
        const { rawData } = this.state;
        rawData[category][name] = e.place;
        this.setState({
            rawData,
        });
    };

    submitForm = () => {
        const { rawData } = this.state;
        this.props.onHandleSubmit(rawData);
    };

    render() {
        const { alert } = this.props.data;
        const { rawData } = this.state;
        return (
            <Formik
                initialValues={rawData}
                enableReinitialize={true}
                validationSchema={merchantSchema}
                onSubmit={(data, { setSubmitting }) => {
                    setSubmitting(true);
                    this.setState({ rawData: data });
                    this.submitForm();
                    setSubmitting(false);
                }}
            >
                {({ values, isSubmitting, errors, touched, handleChange }) => (
                    <Form id="merchantForm">
                        <div className="form-body">
                            <h4 className="form-section">
                                <User size={20} color="#212529" /> Merchant Info
                            </h4>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="name">
                                            Merchant Name *
                                        </Label>
                                        <Field
                                            name="name"
                                            id="name"
                                            value={values.name}
                                            className={`form-control ${
                                                getIn(errors, "name") &&
                                                getIn(touched, "name")
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="name"
                                            className="danger"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="father_name">
                                            Merchant Father Name *
                                        </Label>
                                        <Field
                                            name="father_name"
                                            id="father_name"
                                            value={values.father_name}
                                            className={`form-control ${
                                                getIn(errors, "father_name") &&
                                                getIn(touched, "father_name")
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="father_name"
                                            className="danger"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="cnic">CNIC *</Label>
                                        <Field
                                            name="cnic"
                                            id="cnic"
                                            maxLength="13"
                                            value={values.cnic}
                                            className={`form-control ${
                                                getIn(errors, "cnic") &&
                                                getIn(touched, "cnic")
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="cnic"
                                            className="danger"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="gender">Gender *</Label>
                                        <select
                                            onChange={this.handleChange}
                                            id="gender"
                                            name="gender"
                                            className={`form-control ${
                                                getIn(errors, "gender") &&
                                                getIn(touched, "gender")
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                        >
                                            <option
                                                value=""
                                                defaultValue=""
                                                disabled
                                            >
                                                Select Gender
                                            </option>
                                            <option
                                                value="M"
                                                selected={values.gender === "M"}
                                            >
                                                Male
                                            </option>
                                            <option
                                                value="F"
                                                selected={values.gender === "F"}
                                            >
                                                Female
                                            </option>
                                        </select>
                                        <ErrorMessage
                                            component="div"
                                            name="gender"
                                            className="danger"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="religion">Religion *</Label>
                                        <Field
                                            name="religion"
                                            id="religion"
                                            value={values.religion}
                                            className={`form-control ${
                                                getIn(errors, "religion") &&
                                                getIn(touched, "religion")
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="religion"
                                            className="danger"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="nationality">
                                            Nationality *
                                        </Label>
                                        <Field
                                            name="nationality"
                                            id="nationality"
                                            value={values.nationality}
                                            className={`form-control ${
                                                getIn(errors, "nationality") &&
                                                getIn(touched, "nationality")
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="nationality"
                                            className="danger"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="4">
                                    <FormGroup>
                                        <Label for="dob">Date of Birth</Label>
                                        <Field
                                            type="date"
                                            name="dob"
                                            id="dob"
                                            className={`form-control ${
                                                getIn(errors, "dob") &&
                                                getIn(touched, "dob")
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="dob"
                                            className="danger"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <Label for="joining">
                                            Date of Joining
                                        </Label>
                                        <Field
                                            type="date"
                                            name="joining"
                                            id="joining"
                                            className={`form-control ${
                                                getIn(errors, "joining") &&
                                                getIn(touched, "joining")
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="joining"
                                            className="danger"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <Label for="password">Password</Label>
                                        <Field
                                            name="password"
                                            id="password"
                                            value={values.password}
                                            className={`form-control ${
                                                getIn(errors, "password") &&
                                                getIn(touched, "password")
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="password"
                                            className="danger"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <h4 className="form-section">
                                <Phone size={20} color="#212529" /> Contact Info
                            </h4>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="phone">Primary Phone</Label>
                                        <Field
                                            name="contact.phone"
                                            id="phone"
                                            maxLength="11"
                                            value={values.contact.phone}
                                            className={`form-control ${
                                                getIn(
                                                    errors,
                                                    "contact.phone"
                                                ) &&
                                                getIn(touched, "contact.phone")
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="contact.phone"
                                            className="danger"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="email">Primary Email</Label>
                                        <Field
                                            name="contact.email"
                                            id="email"
                                            value={values.contact.email}
                                            className={`form-control ${
                                                getIn(
                                                    errors,
                                                    "contact.email"
                                                ) &&
                                                getIn(touched, "contact.email")
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="contact.email"
                                            className="danger"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="s_phone">
                                            Secondary Phone
                                        </Label>
                                        <Field
                                            name="contact.s_phone"
                                            id="s_phone"
                                            maxLength="11"
                                            value={values.contact.s_phone}
                                            className={`form-control ${
                                                getIn(
                                                    errors,
                                                    "contact.s_phone"
                                                ) &&
                                                getIn(
                                                    touched,
                                                    "contact.s_phone"
                                                )
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="contact.s_phone"
                                            className="danger"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="s_email">
                                            Secondary Email
                                        </Label>
                                        <Field
                                            name="contact.s_email"
                                            id="s_email"
                                            value={values.contact.s_email}
                                            className={`form-control ${
                                                getIn(
                                                    errors,
                                                    "contact.s_email"
                                                ) &&
                                                getIn(
                                                    touched,
                                                    "contact.s_email"
                                                )
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="contact.s_email"
                                            className="danger"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <h4 className="form-section">
                                <Home size={20} color="#212529" /> Address Info
                            </h4>

                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="full">Address *</Label>
                                        <GoogleComponent
                                            apiKey={config.google_map_key}
                                            language={"en"}
                                            country={"country:pk"}
                                            placeholder={"Select Address"}
                                            onChange={(e) =>
                                                this.googlePlaceSearch(
                                                    e,
                                                    "full",
                                                    "address"
                                                )
                                            }
                                        />
                                        <p>{rawData.address.full_address}</p>
                                        <ErrorMessage
                                            component="div"
                                            name="address.full_address"
                                            className="danger"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="city">City *</Label>
                                        <select
                                            id="city"
                                            name="address.city"
                                            className={`form-control ${
                                                getIn(errors, "address.city") &&
                                                getIn(touched, "address.city")
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                        >
                                            <option value="-1" disabled>
                                                Select City
                                            </option>
                                            <option value="1">Karachi</option>
                                        </select>
                                        <ErrorMessage
                                            component="div"
                                            name="address.city"
                                            className="danger"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>

                        <div className="form-actions">
                            <Button
                                color="warning"
                                className="mr-1"
                                onClick={this.handleResetForm}
                            >
                                <X size={16} color="#FFF" /> Cancel
                            </Button>
                            <Button color="primary" type="submit">
                                <CheckSquare size={16} color="#FFF" /> Save
                            </Button>
                        </div>
                        {alert.display && (
                            <Alert color={alert.type}>{alert.message}</Alert>
                        )}
                    </Form>
                )}
            </Formik>
        );
    }
}

export default MerchantForm;
