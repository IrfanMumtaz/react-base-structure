import React, { Component, Fragment } from "react";
import config from "app/config";
import ContentHeader from "components/contentHead/contentHeader";
import { Card, CardBody, Col, Row } from "reactstrap";
import TicketForm from "./form";
import VEHICLE_GATEWAY from "gateway/service/vehicle";
import PASSENGER_GATEWAY from "gateway/service/passenger";
import TICKET_GATEWAY from "gateway/service/ticket";

class Create extends Component {
    state = {
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

    handleSubmit = async (data) => {
        const response = await TICKET_GATEWAY.createTicket(data);
        if (response) {
            const alert = {
                type: "success",
                message: "Role has been successfully created!",
                display: true,
            };
            this.setState({ alert });
        } else {
            const alert = {
                type: "danger",
                message: "Oops something went wrong!",
                display: true,
            };
            this.setState({ alert });
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
                                        onHandleSubmit={this.handleSubmit}
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
