import React, { Component, Fragment } from "react";
import CustomTabs from "components/tabs/customTabs";
import ContentHeader from "components/contentHead/contentHeader";
import { Card, CardBody, Row, Col } from "reactstrap";
import Filter from "./filter";
import VEHICLE_GATEWAY from "gateway/service/vehicle";
import PASSENGER_GATEWAY from "gateway/service/passenger";
import TICKET_GATEWAY from "gateway/service/ticket";
import MERCHANT_GATEWAY from "gateway/service/merchant";

// Table exmple pages
import DataTable from "./table";
import { store } from "redux/storeConfig/store";

class Index extends Component {
    state = {
        auth: store.getState().authentication.Auth,
        tickets: [],
        ticketsData: [],
        passengers: [],
        merchants: [],
        vehicles: [],
        filter: {
            passengers: [],
            vehicles: [],
            STATUS: [
                { value: 0, label: "Expired", type: "status" },
                { value: 1, label: "Active", type: "status" },
                { value: 2, label: "Refunded", type: "status" },
                { value: 3, label: "Claimed", type: "status" },
            ],
        },
        postFilter: {
            passengers: [],
            merchants: [],
            vehicles: [],
            status: [],
            issuance: null,
            expiry: null,
        },
    };

    componentDidMount() {
        this.getPassengers();
        this.getTickets();
        this.getVehicles();
        this.getMerchants();
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

    getPassengers = async () => {
        const response = await PASSENGER_GATEWAY.getPassengers();
        if (response.success) {
            const { passengers } = response.data;
            const passengersData = this.setFormatMultiSelect(passengers);
            const { filter } = this.state;
            this.setState({ passengers });
            this.setState({
                filter: { ...filter, passengers: passengersData },
            });
        }
    };

    getMerchants = async () => {
        const response = await MERCHANT_GATEWAY.getMerchants();
        if (response.success) {
            const { merchants } = response.data;
            const merchantsData = this.setFormatMultiSelect(merchants);
            const { filter } = this.state;
            this.setState({ merchants });
            this.setState({
                filter: { ...filter, merchants: merchantsData },
            });
        }
    };

    getVehicles = async () => {
        const response = await VEHICLE_GATEWAY.getVehicles();
        if (response.success) {
            const { vehicles } = response.data;
            const vehiclesData = this.setFormatMultiSelect(vehicles);
            const { filter } = this.state;
            this.setState({ vehicles });
            this.setState({
                filter: { ...filter, vehicles: vehiclesData },
            });
        }
    };

    getTickets = async () => {
        const response = await TICKET_GATEWAY.getTickets();
        if (response.success) {
            const { tickets } = response.data;
            this.setState({ tickets, ticketsData: tickets });
        }
    };

    filterMultiSelect = (options, e) => {
        let { postFilter } = this.state;
        if (options.length > 0) {
            const keys = options.map((value) => value.value);
            postFilter[options[0].type] = keys;
            this.setState({
                postFilter,
            });
            this.filter();
        } else {
            const key = e.name.replace("f_", "");
            postFilter[key] = [];
            this.setState({
                postFilter,
            });
            this.filter();
        }
    };

    filterInputField = (e) => {
        const { postFilter } = this.state;
        const key = e.target.name.replace("f_", "");
        postFilter[key] = e.target.value;
        this.setState({
            postFilter,
        });
        this.filter();
        console.log(this.state.postFilter);
    };

    filter() {
        let { postFilter, ticketsData } = this.state;

        if (postFilter.passengers.length > 0) {
            ticketsData = ticketsData.filter(
                (ticket) =>
                    postFilter.passengers.indexOf(ticket.passenger.id) !== -1
            );
        }

        if (postFilter.merchants.length > 0) {
            ticketsData = ticketsData.filter(
                (ticket) =>
                    postFilter.merchants.indexOf(ticket.merchant.id) !== -1
            );
        }

        if (postFilter.vehicles.length > 0) {
            ticketsData = ticketsData.filter(
                (ticket) =>
                    postFilter.vehicles.indexOf(ticket.vehicle.id) !== -1
            );
        }

        if (postFilter.status.length > 0) {
            ticketsData = ticketsData.filter(
                (ticket) => postFilter.status.indexOf(ticket.status) !== -1
            );
        }

        if (postFilter.issuance) {
            ticketsData = ticketsData.filter(
                (ticket) => postFilter.issuance === ticket.issuance
            );
        }

        if (postFilter.expiry) {
            ticketsData = ticketsData.filter(
                (ticket) => postFilter.expiry === ticket.expiry
            );
        }

        this.setState({ tickets: ticketsData });
    }

    render() {
        const heading = [
            "Code",
            "Passenger Name",
            "Merchant Name",
            "Departure",
            "Arrival",
            "Status",
            "Action",
        ];
        const { filter } = this.state;
        return (
            <Fragment>
                <Filter
                    filter={filter}
                    filterMultiSelect={this.filterMultiSelect}
                    filterInputField={this.filterInputField}
                />
                <ContentHeader>Ticket List </ContentHeader>

                <Row>
                    <Col sm="12">
                        <Card>
                            <CardBody>
                                <CustomTabs
                                    TabContent1={
                                        <DataTable
                                            heading={heading}
                                            data={this.state.tickets}
                                            misc={{ link: "tickets" }}
                                        />
                                    }
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default Index;
