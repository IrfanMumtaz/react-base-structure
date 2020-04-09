import React, { Component, Fragment } from "react";
import CustomTabs from "../../components/tabs/customTabs";
import ContentHeader from "../../components/contentHead/contentHeader";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import axios from "axios";
import config from "../../app/config";
import Filter from "./filter";

// Table exmple pages
import DataTable from "./table";
import {store} from "../../redux/storeConfig/store";

class Index extends Component {

    state = {
        auth: store.getState().authentication.Auth,
        tickets: [],
        passengers: [],
        vehicles: [],
        filter: {
            passengers: [],
            vehicles: []
        }
    };

    componentDidMount() {
        this.getPassengers();
        this.getTickets();
        this.getVehicles();
    };

    getPassengers = async () => {
        const {filter} = this.state;
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.state.auth.token}`
            }
        };

        fetch(`${config.base_url}v1/passenger`, requestOptions)
            .then(this.handleResponse)
            .then(response => {
                if(response.success === true){
                    const {passengers} = response.data;
                    const passengersData = passengers.map(p => ({"value": p.id, "label": `${p.name} (${p.cnic})`}));
                    this.setState({passengers });
                    this.setState({
                        filter: {...filter, passengers: passengersData}
                    });

                }
                return response;
            });
    };
    handleResponse(response) {
        return response.text().then(text => {
            return text && JSON.parse(text);
        });
    }

    getVehicles = async () => {
        const {filter} = this.state;
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.state.auth.token}`
            }
        };

        fetch(`${config.base_url}v1/vehicle`, requestOptions)
            .then(this.handleResponse)
            .then(response => {
                if(response.success === true){
                    const {vehicles} = response.data;
                    const vehiclesData = vehicles.map(p => ({"value": p.id, "label": `${p.name}`}));
                    this.setState({vehicles });
                    this.setState({
                        filter: {...filter, vehicles: vehiclesData}
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
                "Authorization": `Bearer ${this.state.auth.token}`
            }
        } ;
        const res = await axios.get(
            param.url,
            {headers: param.headers}
        );
        if (res.data.success){
            const { tickets } = res.data.data;
            this.setState({ tickets });
        }
        else{
            console.log("operation failed");
        }
    };

    render() {
        const heading = ['Code', 'Passenger Name', 'Merchant Name', 'Issuance', 'Expiry', 'Status', 'Action'];
        const {filter} = this.state;
        return (
            <Fragment>
                <Filter filter={filter}/>
                <ContentHeader>Ticket List </ContentHeader>

                <Row>
                    <Col sm="12">
                        <Card>
                            <CardBody>
                                {/*<CardTitle>Striped Rows</CardTitle>*/}
                                <CustomTabs
                                    TabContent1={<DataTable heading={heading} data={this.state.tickets} misc={{link: "tickets"}} />}
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
