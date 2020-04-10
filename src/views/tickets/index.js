import React, { Component, Fragment } from "react";
import CustomTabs from "../../components/tabs/customTabs";
import ContentHeader from "../../components/contentHead/contentHeader";
import { Card, CardBody, Row, Col } from "reactstrap";
import axios from "axios";
import config from "../../app/config";
import Filter from "./filter";

// Table exmple pages
import DataTable from "./table";
import { store } from "../../redux/storeConfig/store";

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
                        type: "passengers",
                    }));
                    const { filter } = this.state;
                    this.setState({ passengers });
                    this.setState({
                        filter: { ...filter, passengers: passengersData },
                    });
                }
                return response;
            });
    };

    getMerchants = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.state.auth.token}`,
            },
        };

        fetch(`${config.base_url}v1/merchant`, requestOptions)
            .then(this.handleResponse)
            .then((response) => {
                if (response.success === true) {
                    const { merchants } = response.data;
                    const merchantsData = merchants.map((p) => ({
                        value: p.id,
                        label: `${p.name} (${p.cnic})`,
                        type: "merchants",
                    }));
                    const { filter } = this.state;
                    this.setState({ merchants });
                    this.setState({
                        filter: { ...filter, merchants: merchantsData },
                    });
                }
                return response;
            });
    };

    handleResponse(response) {
        return response.text().then((text) => {
            return text && JSON.parse(text);
        });
    }

    getVehicles = () => {
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
                        type: "vehicles",
                    }));
                    const { filter } = this.state;
                    this.setState({ vehicles });
                    this.setState({
                        filter: { ...filter, vehicles: vehiclesData },
                    });
                }
                return response;
            });
    };

    getTickets = async () => {
        const param = {
            url: config.base_url + "v1/ticket",
            headers: {
                "Content-Type": "Application/Json",
                Authorization: `Bearer ${this.state.auth.token}`,
            },
        };
        const res = await axios.get(param.url, { headers: param.headers });
        if (res.data.success) {
            const { tickets } = res.data.data;
            this.setState({ tickets, ticketsData: tickets });
        } else {
            console.log("operation failed");
        }
    };

    filterMultiSelect = (options, e) => {
        console.log(options, e);
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
            "Issuance",
            "Expiry",
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
