// import external modules
import React, { Component, Fragment } from "react";
import { Row, Col } from "reactstrap";
import ContentHeader from "components/contentHead/contentHeader";
import ContentSubHeader from "components/contentHead/contentSubHeader";
import MinimalStatisticsBG from "components/cards/minimalStatisticsBGCard";
import * as Icon from "react-feather";
import VEHICLE_GATEWAY from "gateway/service/vehicle";
import PASSENGER_GATEWAY from "gateway/service/passenger";
import TICKET_GATEWAY from "gateway/service/ticket";
import MERCHANT_GATEWAY from "gateway/service/merchant";

class TicketInsurance extends Component {
    state = {
        tickets: [],
        passengers: [],
        merchants: [],
        vehicles: [],
    };

    componentDidMount() {
        this.getPassengers();
        this.getTickets();
        this.getVehicles();
        this.getMerchants();
    }

    getPassengers = async () => {
        const response = await PASSENGER_GATEWAY.getPassengers();
        if (response.success) {
            const { passengers } = response.data;
            this.setState({ passengers });
        }
    };

    getMerchants = async () => {
        const response = await MERCHANT_GATEWAY.getMerchants();
        if (response.success) {
            const { merchants } = response.data;
            this.setState({ merchants });
        }
    };

    getVehicles = async () => {
        const response = await VEHICLE_GATEWAY.getVehicles();
        if (response.success) {
            const { vehicles } = response.data;
            this.setState({ vehicles });
        }
    };

    getTickets = async () => {
        const response = await TICKET_GATEWAY.getTickets();
        if (response.success) {
            const { tickets } = response.data;
            this.setState({ tickets });
        }
    };

    render() {
        const { passengers, tickets, vehicles, merchants } = this.state;
        return (
            <Fragment>
                <ContentHeader>Dashboard</ContentHeader>
                <ContentSubHeader></ContentSubHeader>
                <Row className="row-eq-height">
                    <Col sm="12" md="6">
                        <MinimalStatisticsBG
                            cardBgColor="gradient-blackberry"
                            statistics={tickets.length}
                            text="Tickets"
                            iconSide="right"
                        >
                            <Icon.FileText
                                size={56}
                                strokeWidth="1.3"
                                color="#fff"
                            />
                        </MinimalStatisticsBG>
                    </Col>
                    <Col sm="12" md="6">
                        <MinimalStatisticsBG
                            cardBgColor="gradient-ibiza-sunset"
                            statistics={merchants.length}
                            text="Merchants"
                            iconSide="right"
                        >
                            <Icon.User
                                size={56}
                                strokeWidth="1.3"
                                color="#fff"
                            />
                        </MinimalStatisticsBG>
                    </Col>
                    <Col sm="12" md="6">
                        <MinimalStatisticsBG
                            cardBgColor="gradient-green-teal"
                            statistics={passengers.length}
                            text="Passengers"
                            iconSide="right"
                        >
                            <Icon.Users
                                size={56}
                                strokeWidth="1.3"
                                color="#fff"
                            />
                        </MinimalStatisticsBG>
                    </Col>
                    <Col sm="12" md="6">
                        <MinimalStatisticsBG
                            cardBgColor="gradient-pomegranate"
                            statistics={vehicles.length}
                            text="Vehicles"
                            iconSide="right"
                        >
                            <Icon.Truck
                                size={56}
                                strokeWidth="1.3"
                                color="#fff"
                            />
                        </MinimalStatisticsBG>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default TicketInsurance;
