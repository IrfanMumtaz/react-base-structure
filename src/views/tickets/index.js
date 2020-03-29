import React, { Component, Fragment } from "react";
import CustomTabs from "../../components/tabs/customTabs";
import ContentHeader from "../../components/contentHead/contentHeader";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import axios from "axios";
import config from "../../app/config";

// Table exmple pages
import DataTable from "./table";
import {store} from "../../redux/storeConfig/store";

class Index extends Component {

    state = {
        auth: store.getState().authentication.Auth,
        tickets: []
    };

    componentWillMount() {
        this.getVehicles();
    };

    getVehicles = async () => {
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

        return (
            <Fragment>
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
