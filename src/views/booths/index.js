import React, { Component, Fragment } from "react";
import CustomTabs from "../../components/tabs/customTabs";
import ContentHeader from "../../components/contentHead/contentHeader";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import axios from "axios";
import config from "../../app/config";

// Table exmple pages
import BoothTable from "./boothTable";
import {store} from "../../redux/storeConfig/store";

class Index extends Component {

    state = {
        auth: store.getState().authentication.Auth,
        booths: []
    };

    componentWillMount() {
        this.getVehicles();
    };

    getVehicles = async () => {
        const param = {
            url: config.base_url + "v1/booth",
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
            const { booths } = res.data.data;
            this.setState({ booths });
        }
        else{
            console.log("operation failed");
        }
    };

    render() {
        const heading = ['Name', 'Type', 'Model', 'Year', 'Registration', 'Action'];

        return (
            <Fragment>
                <ContentHeader>Booth List </ContentHeader>

                <Row>
                    <Col sm="12">
                        <Card>
                            <CardBody>
                                {/*<CardTitle>Striped Rows</CardTitle>*/}
                                <CustomTabs
                                    TabContent1={<BoothTable heading={heading} data={this.state.booths} misc={{link: "Booths"}} />}
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
