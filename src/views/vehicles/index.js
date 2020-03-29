import React, { Component, Fragment } from "react";
import CustomTabs from "../../components/tabs/customTabs";
import ContentHeader from "../../components/contentHead/contentHeader";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import axios from "axios";
import config from "../../app/config";

// Table exmple pages
import TableStriped from "../tables/examples/tableStriped";
import {store} from "../../redux/storeConfig/store";

class Index extends Component {

    state = {
        auth: store.getState().authentication.Auth,
        vehicles: []
    };

    componentWillMount() {
        this.getVehicles();
    };

    getVehicles = async () => {
        const param = {
            url: config.base_url + "v1/vehicle",
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
            const { vehicles } = res.data.data;
            this.setState({ vehicles });
        }
        else{
            console.log("operation failed");
        }
    };

    render() {
        const heading = ['Name', 'Type', 'Model', 'Year', 'Registration', 'Action'];

        return (
            <Fragment>
                <ContentHeader>Vehicles List </ContentHeader>

                <Row>
                    <Col sm="12">
                        <Card>
                            <CardBody>
                                {/*<CardTitle>Striped Rows</CardTitle>*/}
                                <CustomTabs
                                    TabContent1={<TableStriped heading={heading} data={this.state.vehicles} misc={{link: "vehicles"}} />}
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
