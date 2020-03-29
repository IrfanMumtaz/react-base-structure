import React, { Component, Fragment } from "react";
import CustomTabs from "../../components/tabs/customTabs";
import ContentHeader from "../../components/contentHead/contentHeader";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import config from "../../app/config";

// Table exmple pages
import MerchantTable from "./merchantTable";
import {store} from "../../redux/storeConfig/store";

class Index extends Component {

    state = {
        auth: store.getState().authentication.Auth,
        merchants: []
    };

    componentWillMount() {
        this.getMerchants();
    };

    getMerchants = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.state.auth.token}`
            }
        };
        fetch(`${config.base_url}v1/merchant`, requestOptions)
            .then(this.handleResponse)
            .then(response => {
                if(response.success === true){
                    const merchants = response.data.merchants;
                    this.setState({merchants });
                }
                return response;
            });
    };

    handleResponse(response) {
        return response.text().then(text => {
            return text && JSON.parse(text);
        });
    }

    render() {
        const heading = ['Merchant Code', 'Name', 'CNIC', 'Phone', 'Address', 'Status', 'Action'];

        return (
            <Fragment>
                <ContentHeader>Merchant List </ContentHeader>

                <Row>
                    <Col sm="12">
                        <Card>
                            <CardBody>
                                {/*<CardTitle>Striped Rows</CardTitle>*/}
                                <CustomTabs
                                    TabContent1={<MerchantTable heading={heading} data={this.state.merchants} misc={{link: "merchants"}} />}
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
