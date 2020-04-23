import React, { Component } from "react";
import { CheckSquare, Home, Phone } from "react-feather";
import { Field, Formik, Form, getIn, ErrorMessage } from "formik";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Alert, Button, Col, FormGroup, Label, Row } from "reactstrap";
import ticketSchema from "schemas/ticketSchema";
import { GoogleComponent } from "react-google-location";
import config from "app/config";
import TICKET_GATEWAY from "gateway/service/ticket";
import { NavLink } from "react-router-dom";

class TicketForm extends Component {
    state = {
        rawData: {
            _vehicle: [],
            _passenger: [],
            passenger: {
                name: null,
                father_name: null,
                cnic: null,
                gender: "M",
                contact: {
                    phone: null,
                    email: null,
                },
                address: {
                    full_address: null,
                    city: 1,
                },
            },
            ticket: {
                booking_type: "unschedule",
                quantity: 1,
                vehicle_id: null,
                passenger_id: null,
                origin: null,
                destination: null,
                departureTime: new Date(),
                arrivalTime: new Date(),
                status: 1,
                kin_name: null,
                kin_contact: null,
            },
        },
        _default: {
            STATUS: ["Expired", "Active", "Refunded", "Claimed"],
            passengerCreate: false,
        },
        place: null,
    };

    componentDidUpdate() {
        if (this.props.id && this.state._default.passengerCreate === false) {
            this.getTicket();
        }
    }

    getTicket = async () => {
        const { id } = this.props;
        const { rawData, _default } = this.state;
        const response = await TICKET_GATEWAY.getTicket(id);
        if (response.success) {
            const { ticket } = response.data;
            rawData.passenger = this.setTicketPassenger(ticket.passenger);
            rawData.ticket = this.setTicketData(ticket);
            rawData._vehicle = this.setDefaultVehicle(ticket.vehicle);
            rawData._passenger = this.setDefaultPassenger(ticket.passenger);
            this.setState({ rawData });
            this.setState({
                _default: {
                    ..._default,
                    passengerCreate: true,
                },
            });
        }
    };

    setTicketPassenger(data) {
        let _data = { ...data };
        console.log(_data);
        _data.contact = data.primary_contact;
        delete _data.primary_contact;
        delete _data.secondary_contacts;
        delete _data.date_of_birth;
        delete _data.religion;
        delete _data.nationality;
        delete _data.image;
        delete _data.id;

        return _data;
    }

    setTicketData(data) {
        let _data = { ...data };
        _data.booking_type = "unschedule";
        _data.quantity = data.quantity;
        _data.vehicle_id = data.vehicle.id;
        _data.passenger_id = data.passenger.id;
        _data.origin = data.origin;
        _data.destination = data.destination;
        _data.departureTime = new Date(data.departure_time);
        _data.arrivalTime = new Date(data.arrival_time);
        _data.status = data.status;
        _data.kin_name = data.kin_name;
        _data.kin_contact = data.kin_contact;

        delete _data.passenger;
        delete _data.vehicle;
        delete _data.merchant;
        return _data;
    }

    setDefaultVehicle(data) {
        let _data = [];
        _data.push({
            value: data.id,
            label: data.name,
        });

        return _data;
    }

    setDefaultPassenger(data) {
        let _data = [];
        _data.push({
            value: data.id,
            label: data.name,
        });

        return _data;
    }

    setFormatMultiSelect = (data) => {
        if (data === undefined || data.length < 1) return [];

        let _data = [];
        data.map((d) =>
            _data.push({
                value: d.id,
                label: d.name,
            })
        );

        return _data;
    };

    handleResetForm = () => {
        document.getElementById("form").reset();
    };

    handleChange = (e) => {
        const { rawData } = this.state;
        const category = e.target.getAttribute("category");
        const name = e.target.name;
        const value = e.target.value;

        rawData[category][name] = value;
        this.setState({ rawData });
        console.log(this.state.rawData);
    };

    handleMultiSelect = (option, e) => {
        const { rawData } = this.state;

        if (option) {
            rawData["_" + e.name] = option;
            rawData["ticket"][e.name + "_id"] = option.value;
            this.setState({
                rawData,
            });
        } else {
            rawData["_" + e.name] = [];
            rawData["ticket"][e.name + "_id"] = null;
            this.setState({
                rawData,
            });
        }

        if (e.name === "passenger") this.setPassengerFields(option);
    };

    googlePlaceSearch = (e, name, category) => {
        const { rawData } = this.state;
        rawData[category][name] = e.place;
        this.setState({
            rawData,
        });
    };

    setPassengerFields(data) {
        const { passengers } = this.props.data;
        const { rawData, _default } = this.state;
        if (data) {
            const passenger = passengers.filter((p) => p.id === data.value);

            rawData.passenger.name = passenger[0].name;
            rawData.passenger.father_name = passenger[0].father_name;
            rawData.passenger.cnic = passenger[0].cnic;
            rawData.passenger.gender = passenger[0].gender;
            rawData.passenger.contact.phone =
                passenger[0].primary_contact.phone;
            rawData.passenger.contact.email =
                passenger[0].primary_contact.email;
            rawData.passenger.address.full_address =
                passenger[0].address.full_address;
            _default.passengerCreate = true;

            this.setState({ rawData, _default });
        } else {
            rawData.passenger.name = "";
            rawData.passenger.father_name = "";
            rawData.passenger.cnic = "";
            rawData.passenger.gender = "";
            rawData.passenger.contact.phone = "";
            rawData.passenger.contact.email = "";
            rawData.passenger.address.full_address = "";
            _default.passengerCreate = false;

            this.setState({ rawData, _default });
        }
    }

    handleDateField = (e, type, category) => {
        const { rawData } = this.state;
        rawData[category][type] = e;
        this.setState({
            rawData,
        });
    };

    submitForm = () => {
        const { rawData } = this.state;
        console.log(rawData);
        this.props.onHandleSubmit(rawData);
    };

    render() {
        const { rawData, _default } = this.state;
        const { vehicles, passengers, alert } = this.props.data;
        return (
            <Formik
                initialValues={rawData}
                enableReinitialize={true}
                validationSchema={ticketSchema}
                onSubmit={(data, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    const { rawData } = this.state;
                    data.ticket.origin = rawData.ticket.origin;
                    data.ticket.destination = rawData.ticket.destination;
                    this.setState({ rawData: data });
                    this.submitForm();
                    setSubmitting(false);
                    resetForm();
                }}
            >
                {({ values, isSubmitting, errors, touched }) => (
                    <Form id="form">
                        <div className="form-body">
                            <h4 className="form-section">
                                <Home size={20} color="#212529" /> Ticket Info
                            </h4>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="name">Booking Type *</Label>
                                        <select
                                            onChange={this.handleChange}
                                            id="booking_type"
                                            name="ticket.booking_type"
                                            className={`form-control ${
                                                getIn(
                                                    errors,
                                                    "ticket.booking_type"
                                                ) &&
                                                getIn(
                                                    touched,
                                                    "ticket.booking_type"
                                                )
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                        >
                                            <option value="" disabled>
                                                Select Type
                                            </option>
                                            <option value="schedule" disabled>
                                                Schedule
                                            </option>
                                            <option value="unschedule" selected>
                                                Unschdule
                                            </option>
                                        </select>
                                        <ErrorMessage
                                            component="div"
                                            name="ticket.booking_type"
                                            className="danger"
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md="6">
                                    <FormGroup>
                                        <Label for="quantity">Quantity *</Label>
                                        <Field
                                            name="ticket.quantity"
                                            id="quantity"
                                            category="ticket"
                                            value={values.ticket.quantity}
                                            className={`form-control ${
                                                getIn(
                                                    errors,
                                                    "ticket.quantity"
                                                ) &&
                                                getIn(
                                                    touched,
                                                    "ticket.quantity"
                                                )
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="ticket.quantity"
                                            className="danger"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="vehicle">Vehicle</Label>
                                        <Field
                                            name="ticket.vehicle_id"
                                            id="vehicle_id"
                                            category="ticket"
                                            value={values.ticket.vehicle_id}
                                            type="hidden"
                                        />
                                        <Select
                                            className={`basic-single ${
                                                getIn(
                                                    errors,
                                                    "ticket.vehicle_id"
                                                ) &&
                                                getIn(
                                                    touched,
                                                    "ticket.vehicle_id"
                                                )
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                            classNamePrefix="select"
                                            isClearable={true}
                                            isSearchable={true}
                                            onChange={this.handleMultiSelect}
                                            name="vehicle"
                                            id="vehicle"
                                            category="ticket"
                                            options={this.setFormatMultiSelect(
                                                vehicles
                                            )}
                                            value={rawData._vehicle}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="ticket.vehicle_id"
                                            className="danger"
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md="6">
                                    <FormGroup>
                                        <Label for="passenger">Passenger</Label>
                                        <Select
                                            className={`basic-single ${
                                                getIn(
                                                    errors,
                                                    "ticket.passenger_id"
                                                ) &&
                                                getIn(
                                                    touched,
                                                    "ticket.passenger_id"
                                                )
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                            classNamePrefix="select"
                                            isClearable={true}
                                            isSearchable={true}
                                            onChange={this.handleMultiSelect}
                                            name="passenger"
                                            id="passenger"
                                            options={this.setFormatMultiSelect(
                                                passengers
                                            )}
                                            value={rawData._passenger}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="ticket.passenger_id"
                                            className="danger"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <h4 className="form-section">
                                <Phone size={20} color="#212529" /> Passenger
                                Info
                            </h4>

                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="name">
                                            Passenger Name *
                                        </Label>
                                        <Field
                                            name="passenger.name"
                                            id="name"
                                            category="passenger"
                                            value={values.passenger.name}
                                            disabled={_default.passengerCreate}
                                            className={`form-control ${
                                                getIn(
                                                    errors,
                                                    "passenger.name"
                                                ) &&
                                                getIn(touched, "passenger.name")
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="passenger.name"
                                            className="danger"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="father_name">
                                            Passenger Father Name *
                                        </Label>
                                        <Field
                                            name="passenger.father_name"
                                            id="father_name"
                                            category="passenger"
                                            value={values.passenger.father_name}
                                            disabled={_default.passengerCreate}
                                            className={`form-control ${
                                                getIn(
                                                    errors,
                                                    "passenger.father_name"
                                                ) &&
                                                getIn(
                                                    touched,
                                                    "passenger.father_name"
                                                )
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="passenger.father_name"
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
                                            name="passenger.cnic"
                                            id="cnic"
                                            category="passenger"
                                            value={values.passenger.cnic}
                                            disabled={_default.passengerCreate}
                                            className={`form-control ${
                                                getIn(
                                                    errors,
                                                    "passenger.cnic"
                                                ) &&
                                                getIn(touched, "passenger.cnic")
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="passenger.cnic"
                                            className="danger"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="modgenderel">
                                            Gender *
                                        </Label>
                                        <select
                                            onChange={this.handleChange}
                                            id="gender"
                                            name="passenger.gender"
                                            category="passenger"
                                            disabled={_default.passengerCreate}
                                            className={`form-control ${
                                                errors.type &&
                                                touched.type &&
                                                "is-invalid"
                                            }`}
                                        >
                                            <option value="" disabled>
                                                Select Gender
                                            </option>
                                            <option value="M" selected>
                                                Male
                                            </option>
                                            <option value="F">Female</option>
                                        </select>
                                        {errors.gender && touched.gender ? (
                                            <div className="invalid-feedback">
                                                {errors.gender}
                                            </div>
                                        ) : null}
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="phone">
                                            Primary Phone *
                                        </Label>
                                        <Field
                                            name="passenger.contact.phone"
                                            id="phone"
                                            category="passenger"
                                            value={
                                                values.passenger.contact.phone
                                            }
                                            disabled={_default.passengerCreate}
                                            className={`form-control ${
                                                getIn(
                                                    errors,
                                                    "passenger.contact.phone"
                                                ) &&
                                                getIn(
                                                    touched,
                                                    "passenger.contact.phone"
                                                )
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="passenger.contact.phone"
                                            className="danger"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="email">
                                            Primary Email *
                                        </Label>
                                        <Field
                                            name="passenger.contact.email"
                                            id="email"
                                            category="passenger"
                                            value={
                                                values.passenger.contact.email
                                            }
                                            disabled={_default.passengerCreate}
                                            className={`form-control ${
                                                getIn(
                                                    errors,
                                                    "passenger.contact.email"
                                                ) &&
                                                getIn(
                                                    touched,
                                                    "passenger.contact.email"
                                                )
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="passenger.contact.email"
                                            className="danger"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="full_address">
                                            Address *
                                        </Label>
                                        <Field
                                            name="passenger.address.full_address"
                                            id="full_address"
                                            value={
                                                values.passenger.address
                                                    .full_address
                                            }
                                            disabled={_default.passengerCreate}
                                            className={`form-control ${
                                                getIn(
                                                    errors,
                                                    "passenger.address.full_address"
                                                ) &&
                                                getIn(
                                                    touched,
                                                    "passenger.address.full_address"
                                                )
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="passenger.address.full_address"
                                            className="danger"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="city">City *</Label>
                                        <select
                                            disabled={_default.passengerCreate}
                                            id="city"
                                            name="passenger.address.city"
                                            className={`form-control ${
                                                getIn(
                                                    errors,
                                                    "passenger.address.city"
                                                ) &&
                                                getIn(
                                                    touched,
                                                    "passenger.address.city"
                                                )
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
                                            name="ticket.status"
                                            className="danger"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <h4 className="form-section">
                                <Home size={20} color="#212529" /> Ticket Info
                            </h4>

                            <Row>
                                <Col md="4">
                                    <FormGroup>
                                        <Label for="departueTime">
                                            Departure Date & Time *
                                        </Label>
                                        <br />
                                        <DatePicker
                                            selected={
                                                values.ticket.departureTime
                                            }
                                            onChange={(e) =>
                                                this.handleDateField(
                                                    e,
                                                    "departureTime",
                                                    "ticket"
                                                )
                                            }
                                            name="ticket.departueTime"
                                            id="departueTime"
                                            timeInputLabel="Time:pk"
                                            dateFormat="yyyy-MM-dd h:mm aa"
                                            showTimeInput
                                            className={`form-control ${
                                                getIn(
                                                    errors,
                                                    "ticket.departuerTime"
                                                ) &&
                                                getIn(
                                                    touched,
                                                    "ticket.departuerTime"
                                                )
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="ticket.departureTime"
                                            className="danger"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <Label for="arrivalTime">
                                            Arrival Date & Time *
                                        </Label>
                                        <br />
                                        <DatePicker
                                            selected={values.ticket.arrivalTime}
                                            onChange={(e) =>
                                                this.handleDateField(
                                                    e,
                                                    "departureTime",
                                                    "ticket"
                                                )
                                            }
                                            name="ticket.arrivalTime"
                                            id="arrivalTime"
                                            timeInputLabel="Time:pakistan"
                                            dateFormat="yyyy-MM-dd h:mm aa"
                                            showTimeInput
                                            className={`form-control ${
                                                getIn(
                                                    errors,
                                                    "ticket.arrivalTime"
                                                ) &&
                                                getIn(
                                                    touched,
                                                    "ticket.arrivalTime"
                                                )
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="ticket.arrivalTIme"
                                            className="danger"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <Label for="status">Status *</Label>
                                        <select
                                            onChange={this.handleChange}
                                            id="status"
                                            name="status"
                                            className={`form-control ${
                                                getIn(
                                                    errors,
                                                    "ticket.status"
                                                ) &&
                                                getIn(touched, "ticket.status")
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                        >
                                            <option value="-1" disabled>
                                                Select Status
                                            </option>
                                            {_default.STATUS.map(
                                                (st, index) => (
                                                    <option
                                                        value={index}
                                                        key={index}
                                                        selected={index === 1}
                                                    >{`${st}`}</option>
                                                )
                                            )}
                                        </select>
                                        <ErrorMessage
                                            component="div"
                                            name="ticket.status"
                                            className="danger"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="kin_name">Kin Name *</Label>
                                        <Field
                                            id="kin_name"
                                            name="ticket.kin_name"
                                            className={`form-control  ${
                                                getIn(
                                                    errors,
                                                    "ticket.kin_name"
                                                ) &&
                                                getIn(
                                                    touched,
                                                    "ticket.kin_name"
                                                )
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="ticket.kin_name"
                                            className="danger"
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md="6">
                                    <FormGroup>
                                        <Label for="kin_contact">
                                            Kin Contact *
                                        </Label>
                                        <Field
                                            id="kin_contact"
                                            name="ticket.kin_contact"
                                            className={`form-control  ${
                                                getIn(
                                                    errors,
                                                    "ticket.kin_contact"
                                                ) &&
                                                getIn(
                                                    touched,
                                                    "ticket.kin_contact"
                                                )
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="ticket.kin_contact"
                                            className="danger"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="origin">Origin *</Label>
                                        <Field
                                            name="ticket.origin"
                                            value={rawData.ticket.origin}
                                            type="hidden"
                                        />
                                        <GoogleComponent
                                            apiKey={config.google_map_key}
                                            language={"en"}
                                            country={"country:pk"}
                                            placeholder={"Select Origin"}
                                            onChange={(e) =>
                                                this.googlePlaceSearch(
                                                    e,
                                                    "origin",
                                                    "ticket"
                                                )
                                            }
                                        />
                                        <p>{rawData.ticket.origin}</p>
                                        {/* <Field
                                            id="origin"
                                            name="ticket.origin"
                                            className={`form-control  ${
                                                getIn(
                                                    errors,
                                                    "ticket.origin"
                                                ) &&
                                                getIn(touched, "ticket.origin")
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                        /> */}
                                        <ErrorMessage
                                            component="div"
                                            name="ticket.origin"
                                            className="danger"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="destination">
                                            Destination *
                                        </Label>
                                        <Field
                                            name="ticket.destination"
                                            value={rawData.ticket.destination}
                                            type="hidden"
                                        />
                                        <GoogleComponent
                                            apiKey={config.google_map_key}
                                            language={"en"}
                                            country={"country:pk"}
                                            placeholder={"Select Destination"}
                                            onChange={(e) =>
                                                this.googlePlaceSearch(
                                                    e,
                                                    "destination",
                                                    "ticket"
                                                )
                                            }
                                        />
                                        <p>{rawData.ticket.destination}</p>
                                        {/* <Field
                                            id="destination"
                                            name="ticket.destination"
                                            className={`form-control  ${
                                                getIn(
                                                    errors,
                                                    "ticket.destination"
                                                ) &&
                                                getIn(
                                                    touched,
                                                    "ticket.destination"
                                                )
                                                    ? "is-invalid"
                                                    : null
                                            }`}
                                        /> */}
                                        <ErrorMessage
                                            component="div"
                                            name="ticket.destination"
                                            className="danger"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                        <div className="form-actions">
                            {this.props.onlyShow && (
                                <NavLink
                                    to={`/tickets/edit/${rawData.ticket.id}`}
                                    className="item"
                                    activeclassname="active"
                                >
                                    <Button color="warning">
                                        <CheckSquare size={16} color="#FFF" />{" "}
                                        Edit
                                    </Button>
                                </NavLink>
                            )}
                            {this.props.onlyShow === false && (
                                <div>
                                    <Button
                                        color="warning"
                                        className="mr-1"
                                        type="submit"
                                    >
                                        <CheckSquare size={16} color="#FFF" />{" "}
                                        Cancel
                                    </Button>

                                    <Button
                                        color="primary"
                                        type="submit"
                                        disabled={false}
                                    >
                                        <CheckSquare size={16} color="#FFF" />{" "}
                                        Save
                                    </Button>
                                </div>
                            )}
                            {alert.display && (
                                <Alert color={alert.type}>
                                    {alert.message}
                                </Alert>
                            )}
                        </div>
                    </Form>
                )}
            </Formik>
        );
    }
}

export default TicketForm;
