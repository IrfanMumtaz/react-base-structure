import React, { Component, Fragment } from "react";
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
        this.setState({ passengers: response.data.passengers });
    };

    getVehicles = async () => {
        const response = await VEHICLE_GATEWAY.getVehicles();
        this.setState({ vehicles: response.data.vehicles });
    };

    handleSubmit = async (data) => {
        const response = await TICKET_GATEWAY.createTicket(data);
        if (response.success) {
            const alert = {
                type: "success",
                message: "Ticket has been successfully created!",
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
                                        onlyShow={false}
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
