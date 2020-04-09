import React, { Component, Fragment } from "react";
import config from "../../app/config";
import { store } from "../../redux/storeConfig/store";
import ContentHeader from "../../components/contentHead/contentHeader";
import {
    Button,
    Card,
    CardBody,
    Col,
    FormGroup,
    Label,
    Row,
    Form,
    Input,
} from "reactstrap";
import { Phone, Edit, Home } from "react-feather";
import { NavLink } from "react-router-dom";
import Select from "react-select";

class Show extends Component {
    state = {
        auth: store.getState().authentication.Auth,
        formValues: {
            code: "",
            issuance: "",
            expiry: "",
            status: null,
            kin_name: "",
            kin_relation: "",
            kin_contact: "",
            merchant: {
                id: null,
                name: "",
            },
            passenger: {
                id: null,
                name: "",
            },
            pickup: {
                full_address: "",
            },
            dropoff: {
                full_address: "",
            },
        },
        passengers: [],
        vehicles: [],
        passengersData: [],
        vehiclesData: [],
        passengerDefault: {},
        vehicleDefault: [],
        STATUS: new Array("Expired", "Active", "Refunded", "Claimed"),
    };

    componentDidMount() {
        this.getVehicles();
        this.getPassengers();
    }

    getPassengers = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.state.auth.token}`,
            },
        };
        fetch(`${config.base_url}v1/passenger`, requestOptions)
            .then(this.handleResponse)
            .then((response) => {
                if (response.success === true) {
                    const { passengers } = response.data;
                    const passengersData = passengers.map((p) => ({
                        value: p.id,
                        label: `${p.name} (${p.cnic})`,
                    }));
                    this.setState({ passengers, passengersData });
                }
                this.getTicket();
                return response;
            });
    };

    getVehicles = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.state.auth.token}`,
            },
        };
        fetch(`${config.base_url}v1/vehicle`, requestOptions)
            .then(this.handleResponse)
            .then((response) => {
                if (response.success === true) {
                    const { vehicles } = response.data;
                    const vehiclesData = vehicles.map((p) => ({
                        value: p.id,
                        label: `${p.name}`,
                    }));
                    this.setState({ vehicles, vehiclesData });
                }
                return response;
            });
    };

    getTicket() {
        const { id } = this.props.match.params;
        const {
            formValues,
            passengers,
            passengersData,
            vehiclesData,
        } = this.state;
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.state.auth.token}`,
            },
        };
        fetch(`${config.base_url}v1/ticket/${id}`, requestOptions)
            .then(this.handleResponse)
            .then((response) => {
                if (response.success === true) {
                    const passenger = passengers.filter(
                        (p) => p.id === response.data.ticket.passenger.id
                    );
                    const passengerDefault = passengersData.filter(
                        (p) => p.value === response.data.ticket.passenger.id
                    );
                    const vehicleDefault = vehiclesData.filter(
                        (v) => v.value === response.data.ticket.vehicle.id
                    );
                    let formValues = response.data.ticket;
                    formValues.merchant_id = formValues.merchant.id;
                    formValues.passenger_id = formValues.passenger.id;
                    formValues.pickup_add = formValues.pickup.full_address;
                    formValues.dropoff_add = formValues.dropoff.full_address;
                    formValues.name = passenger[0].name;
                    formValues.father_name = passenger[0].father_name;
                    formValues.cnic = passenger[0].cnic;
                    formValues.gender = passenger[0].gender;
                    formValues.phone = passenger[0].primary_contact.phone;
                    formValues.email = passenger[0].primary_contact.email;
                    formValues.full_address = passenger[0].address.full_address;
                    this.setState({
                        formValues,
                        passengerDefault,
                        vehicleDefault,
                    });
                }
                return response;
            });
    }

    handleResponse(response) {
        return response.text().then((text) => {
            return text && JSON.parse(text);
        });
    }

    render() {
        const {
            formValues,
            STATUS,
            passengerDefault,
            vehicleDefault,
            vehiclesData,
            passengersData,
        } = this.state;
        return (
            <Fragment>
                <ContentHeader>Ticket Show </ContentHeader>

                <Row>
                    <Col md="12">
                        <Card>
                            <CardBody>
                                <div className="px-3">
                                    <Form id="form">
                                        <div className="form-body">
                                            <h4 className="form-section">
                                                <Home
                                                    size={20}
                                                    color="#212529"
                                                />{" "}
                                                Ticket Info
                                            </h4>
                                            <Row>
                                                <Col md="4">
                                                    <FormGroup>
                                                        <Label for="name">
                                                            Ticket Code
                                                        </Label>
                                                        <Input
                                                            name="code"
                                                            id="code"
                                                            value={
                                                                formValues.code
                                                            }
                                                            disabled={true}
                                                            className={`form-control`}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="4">
                                                    <FormGroup>
                                                        <Label for="dropoff_add">
                                                            Vehicle
                                                        </Label>
                                                        <Select
                                                            className={`basic-single`}
                                                            classNamePrefix="select"
                                                            value={
                                                                vehicleDefault[0]
                                                            }
                                                            isClearable={true}
                                                            isSearchable={true}
                                                            disabled={true}
                                                            name="vehicle_id"
                                                            id="vehicle_id"
                                                            options={
                                                                vehiclesData
                                                            }
                                                            isDisabled={true}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="4">
                                                    <FormGroup>
                                                        <Label for="passenger_id">
                                                            Passenger
                                                        </Label>
                                                        <Select
                                                            className={`basic-single`}
                                                            classNamePrefix="select"
                                                            value={
                                                                passengerDefault[0]
                                                            }
                                                            isClearable={true}
                                                            isSearchable={true}
                                                            onChange={
                                                                this
                                                                    .handlePassengerSelect
                                                            }
                                                            isDisabled={true}
                                                            name="passenger_id"
                                                            id="passenger_id"
                                                            options={
                                                                passengersData
                                                            }
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                            <h4 className="form-section">
                                                <Phone
                                                    size={20}
                                                    color="#212529"
                                                />{" "}
                                                Passenger Info
                                            </h4>

                                            <Row>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="name">
                                                            Passenger Name
                                                        </Label>
                                                        <Input
                                                            name="name"
                                                            id="name"
                                                            value={
                                                                formValues.name
                                                            }
                                                            disabled={true}
                                                            className={`form-control`}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="father_name">
                                                            Passenger Father
                                                            Name
                                                        </Label>
                                                        <Input
                                                            name="father_name"
                                                            id="father_name"
                                                            value={
                                                                formValues.father_name
                                                            }
                                                            disabled={true}
                                                            className={`form-control `}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="cnic">
                                                            CNIC
                                                        </Label>
                                                        <Input
                                                            id="cnic"
                                                            name="cnic"
                                                            value={
                                                                formValues.cnic
                                                            }
                                                            disabled={true}
                                                            className={`form-control `}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="model">
                                                            Gender
                                                        </Label>
                                                        <select
                                                            id="gender"
                                                            name="gender"
                                                            disabled={true}
                                                            className={`form-control`}
                                                        >
                                                            <option
                                                                value=""
                                                                defaultValue=""
                                                                disabled=""
                                                            >
                                                                Select Gender
                                                            </option>
                                                            <option
                                                                value="M"
                                                                selected={
                                                                    formValues.gender ===
                                                                    "M"
                                                                }
                                                            >
                                                                Male
                                                            </option>
                                                            <option
                                                                value="F"
                                                                selected={
                                                                    formValues.gender ===
                                                                    "F"
                                                                }
                                                            >
                                                                Female
                                                            </option>
                                                        </select>
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="phone">
                                                            Primary Phone
                                                        </Label>
                                                        <Input
                                                            name="phone"
                                                            id="phone"
                                                            value={
                                                                formValues.phone
                                                            }
                                                            disabled={true}
                                                            className={`form-control`}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="email">
                                                            Primary Email
                                                        </Label>
                                                        <Input
                                                            name="email"
                                                            id="email"
                                                            value={
                                                                formValues.email
                                                            }
                                                            disabled={true}
                                                            className={`form-control`}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md="12">
                                                    <FormGroup>
                                                        <Label for="full_address">
                                                            Address
                                                        </Label>
                                                        <Input
                                                            name="full_address"
                                                            id="full_address"
                                                            value={
                                                                formValues.full_address
                                                            }
                                                            disabled={true}
                                                            className={`form-control`}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <h4 className="form-section">
                                                <Home
                                                    size={20}
                                                    color="#212529"
                                                />{" "}
                                                Ticket Info
                                            </h4>

                                            <Row>
                                                <Col md="4">
                                                    <FormGroup>
                                                        <Label for="issuance">
                                                            Issuance
                                                        </Label>
                                                        <Input
                                                            id="issuance"
                                                            type="date"
                                                            value={
                                                                formValues.issuance
                                                            }
                                                            name="issuance"
                                                            className={`form-control`}
                                                            disabled={true}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="4">
                                                    <FormGroup>
                                                        <Label for="expiry">
                                                            Expiry
                                                        </Label>
                                                        <Input
                                                            name="expiry"
                                                            type="date"
                                                            value={
                                                                formValues.expiry
                                                            }
                                                            id="expiry"
                                                            className={`form-control`}
                                                            disabled={true}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="4">
                                                    <FormGroup>
                                                        <Label for="status">
                                                            Status
                                                        </Label>
                                                        <select
                                                            id="status"
                                                            name="status"
                                                            className={`form-control`}
                                                            disabled={true}
                                                        >
                                                            <option
                                                                value="-1"
                                                                defaultValue=""
                                                                disabled=""
                                                            >
                                                                Select Status
                                                            </option>
                                                            {STATUS.map(
                                                                (st, index) => (
                                                                    <option
                                                                        value={
                                                                            index
                                                                        }
                                                                        key={
                                                                            index
                                                                        }
                                                                        selected={
                                                                            index ===
                                                                            formValues.status
                                                                        }
                                                                    >{`${st}`}</option>
                                                                )
                                                            )}
                                                        </select>
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md="4">
                                                    <FormGroup>
                                                        <Label for="kin_name">
                                                            Kin Name
                                                        </Label>
                                                        <Input
                                                            id="kin_name"
                                                            value={
                                                                formValues.kin_name
                                                            }
                                                            name="kin_name"
                                                            className={`form-control`}
                                                            disabled={true}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="4">
                                                    <FormGroup>
                                                        <Label for="kin_relation">
                                                            Kin Relation
                                                        </Label>
                                                        <Input
                                                            name="kin_relation"
                                                            value={
                                                                formValues.kin_relation
                                                            }
                                                            id="kin_relation"
                                                            className={`form-control`}
                                                            disabled={true}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="4">
                                                    <FormGroup>
                                                        <Label for="kin_contact">
                                                            Kin Contact
                                                        </Label>
                                                        <Input
                                                            name="kin_contact"
                                                            value={
                                                                formValues.kin_contact
                                                            }
                                                            id="kin_contact"
                                                            className={`form-control`}
                                                            disabled={true}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="pickup_add">
                                                            Pickup
                                                        </Label>
                                                        <Input
                                                            id="pickup_add"
                                                            value={
                                                                formValues.pickup_add
                                                            }
                                                            name="pickup_add"
                                                            className={`form-control`}
                                                            disabled={true}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label for="dropoff_add">
                                                            Dropoff
                                                        </Label>
                                                        <Input
                                                            name="dropoff_add"
                                                            value={
                                                                formValues.dropoff_add
                                                            }
                                                            id="dropoff_add"
                                                            className={`form-control `}
                                                            disabled={true}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </div>

                                        <div className="form-actions">
                                            <NavLink
                                                to={`/tickets/edit/${formValues.id}`}
                                                className="item"
                                                activeclassname="active"
                                            >
                                                <Button
                                                    color="warning"
                                                    className="mr-1"
                                                >
                                                    <Edit
                                                        size={16}
                                                        color="#FFF"
                                                    />{" "}
                                                    Edit
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
