import React, { Component, Fragment } from "react";
import config from "../../app/config";
import {store} from "../../redux/storeConfig/store";
import ContentHeader from "../../components/contentHead/contentHeader";
import {Alert, Button, Card, CardBody, CardTitle, Col, FormGroup, Input, Label, Row} from "reactstrap";
import {CheckSquare, FileText, Info, Mail, X, Home} from "react-feather";
import { useForm } from 'react-hook-form'
import {Field, Formik, Form} from "formik";
import * as Yup from "yup";

const formSchema = Yup.object().shape({
    name: Yup.string().max(50, "Too long, max 50 characters").required("Required"),
    merchant_id: Yup.number().required("Required"),
    phone: Yup.number().required("Required"),
    full: Yup.string().max(190, 'Address is too long').required("Required")
});

class Edit extends Component {

    constructor(props) {
        super(props);
    }
    state = {
        auth: store.getState().authentication.Auth,
        formValues: {
            name: '',
            merchant_id: null,
            merchant: {
                id: null
            },
            address: {
                full_address: '',
                latitude: 55.442211,
                longitude: 55.442211
            },
            contact: {
                phone: null
            },
            phone: null,
            full: ''
        },
        merchants: [],
        alert: {
            display: false,
            type: "success",
            message: ""
        }
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
                    let formValues = response.data.booth;
                    formValues.merchant_id = formValues.merchant.id;
                    formValues.phone = formValues.contact.phone;
                    formValues.full = formValues.address.full_address;
                    this.setState({formValues });
                }
                return response;
            });
    };

    updateBooth = async () => {
        const { id } = this.props.match.params;
        let { formValues } = this.state;
        formValues.contact = {
            phone: formValues.phone,
            email: null
        };
        formValues.address = {
            full: formValues.full,
            latitude: formValues.address.latitude,
            longitude: formValues.address.longitude,
        };


        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.state.auth.token}`
            },
            body: JSON.stringify(formValues)
        };
        fetch(`${config.base_url}v1/booth/${id}`, requestOptions)
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
    };

    handleResponse(response) {
        return response.text().then(text => {
            return text && JSON.parse(text);
        });
    }

    handleSubmit = e => {
        this.updateBooth();
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
        const {formData, formValues, merchants} = this.state;
        return (
            <Fragment>
                <ContentHeader>Booth Update </ContentHeader>

                <Row>
                    <Col md="12">
                        <Card>
                            <CardBody>
                                <div className="px-3">
                                    <Formik
                                        enableReinitialize={true}
                                        initialValues={formValues}
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
                                            <h4 className="form-section"><Home size={20} color="#212529" /> Booth Info</h4>
                                            <Row>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="name">Booth Name</Label>
                                                        <Field name="name" id="name" value={values.name} className={`form-control ${errors.name && touched.name && 'is-invalid'}`}/>
                                                        {errors.name && touched.name ? <div className="invalid-feedback">{errors.name}</div> : null}
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="merchant_id">Merchant</Label>
                                                        <select onChange={handleChange} id="merchant_id" name="merchant_id" className={`form-control ${errors.merchant_id && touched.merchant_id && 'is-invalid'}`}>
                                                            <option value="0" defaultValue="" disabled="">Select Type</option>
                                                            {
                                                                merchants.map((merchant) => (
                                                                    <option value={merchant.id} key={merchant.id} selected={merchant.id === formValues.merchant.id}>{`${merchant.name} (${merchant.cnic})`}</option>
                                                                ))
                                                            }
                                                        </select>
                                                        {errors.merchant_id && touched.merchant_id ? <div className="invalid-feedback">{errors.merchant_id}</div> : null}
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="phone">Phone</Label>
                                                        <Field id="phone" value={values.phone}  name="phone" className={`form-control ${errors.phone && touched.phone && 'is-invalid'}`} />
                                                        {errors.phone && touched.phone ? <div className="invalid-feedback">{errors.phone}</div> : null}
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="full">Address</Label>
                                                        <Field name="full" value={values.full} id="full" className={`form-control ${errors.full && touched.full && 'is-invalid'}`} />
                                                        {errors.full && touched.full ? <div className="invalid-feedback">{errors.full}</div> : null}
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                        </div>

                                        <div className="form-actions">
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

export default Edit;
