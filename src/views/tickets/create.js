import React, { Component, Fragment } from "react";
import config from "app/config";
import { store } from "redux/storeConfig/store";
import ContentHeader from "components/contentHead/contentHeader";
import { Card, CardBody, Col, Row } from "reactstrap";
import TicketForm from "./form";
import VEHICLE_GATEWAY from "gateway/service/vehicle";
import PASSENGER_GATEWAY from "gateway/service/passenger";

class Create extends Component {
    state = {
        auth: store.getState().authentication.Auth,
        login: store.getState().authentication.Login,
        passengers: [],
        vehicles: [],
        alert: {
            display: false,
            type: "success",
            message: "",
        },
    };

    componentDidMount() {
        this.getPassengers();
        this.getVehicles();
    }

    generateCode() {
        return `TKT-${this.state.login.user.id}${new Date().getTime()}`;
    }

    getPassengers = async () => {
        const response = await PASSENGER_GATEWAY.getPassengers();
        this.setState({ passengers: response.passengers });
    };

    getVehicles = async () => {
        const response = await VEHICLE_GATEWAY.getVehicles();
        this.setState({ vehicles: response.vehicles });
    };

    createTicket = async () => {
        let { formValues } = this.state;
        if (!formValues.passenger_id) {
            formValues.contact = {
                phone: formValues.phone,
                email: formValues.email,
            };
            formValues.address = {
                full: formValues.full_address,
                latitude: formValues.latitude,
                longitude: formValues.longitude,
                city: 1,
                state: 1,
            };
            const requestOptions = {
                method: "Post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.state.auth.token}`,
                },
                body: JSON.stringify(formValues),
            };
            fetch(`${config.base_url}v1/passenger`, requestOptions)
                .then(this.handleResponse)
                .then((response) => {
                    if (response.success === true) {
                        this.setState({
                            formValues: {
                                ...formValues,
                                passenger_id: response.data.passenger.id,
                            },
                        });
                    } else {
                        const alert = {
                            type: "danger",
                            message: response.error.message,
                            display: true,
                        };
                        this.setState({ alert });
                    }
                    this.postCreatePassenger();
                    return response;
                });
        } else {
            this.postCreatePassenger();
        }
    };

    postCreatePassenger = async () => {
        let { formValues } = this.state;
        formValues.pickup = {
            full: formValues.origin,
            latitude: 54.2211,
            longitude: 54.2211,
        };

        formValues.dropoff = {
            full: formValues.destination,
            latitude: 54.2211,
            longitude: 54.2211,
        };

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.state.auth.token}`,
            },
            body: JSON.stringify(formValues),
        };
        fetch(`${config.base_url}v1/ticket`, requestOptions)
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
    };

    handleResponse(response) {
        return response.text().then((text) => {
            return text && JSON.parse(text);
        });
    }

    handleSubmit = (e) => {
        this.createTicket();
    };

    handlePassengerSelect = (option) => {
        const { formValues, passengers } = this.state;
        if (option) {
            const passenger = passengers.filter((p) => p.id === option.value);
            console.log(passenger);
            this.setState({
                formValues: {
                    ...formValues,
                    passenger_id: option.value,
                    name: passenger[0].name,
                    father_name: passenger[0].father_name,
                    cnic: passenger[0].cnic,
                    gender: passenger[0].gender,
                    phone: passenger[0].primary_contact.phone,
                    email: passenger[0].primary_contact.email,
                    full_address: passenger[0].address.full_address,
                },
            });

            this.setState({
                passengerCreate: true,
            });
        } else {
            this.setState({
                formValues: {
                    ...formValues,
                    passenger_id: null,
                    name: "",
                    father_name: "",
                    cnic: "",
                    gender: "",
                    phone: "",
                    email: "",
                    full: "",
                },
            });

            this.setState({
                passengerCreate: false,
            });
        }
    };

    handleVehicleSelect = (option) => {
        const { formValues, vehicles } = this.state;
        if (option) {
            this.setState({
                formValues: {
                    ...formValues,
                    vehicle_id: option.value,
                },
            });
        } else {
            this.setState({
                formValues: {
                    ...formValues,
                    passenger_id: null,
                },
            });
        }
    };

    render() {
        const { vehicles, passengers, alert } = this.state;
        return (
            <Fragment>
                <ContentHeader>Ticket Create </ContentHeader>

                <Row>
                    <Col md="12">
                        <Card>
                            <CardBody>
                                <div className="px-3">
                                    <TicketForm
                                        data={{
                                            vehicles,
                                            passengers,
                                            alert,
                                        }}
                                    />
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
