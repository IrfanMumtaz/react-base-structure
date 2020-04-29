import React, { Component, Fragment } from "react";
import CustomTabs from "components/tabs/customTabs";
import ContentHeader from "components/contentHead/contentHeader";
import { Card, CardBody, Row, Col } from "reactstrap";
import MERCHANT_GATEWAY from "gateway/service/merchant";

// Table exmple pages
import MerchantTable from "./merchantTable";
import { store } from "redux/storeConfig/store";

class Index extends Component {
    state = {
        auth: store.getState().authentication.Auth,
        merchants: [],
    };

    componentDidMount() {
        this.getMerchants();
    }

    getMerchants = async () => {
        const response = await MERCHANT_GATEWAY.getMerchants();
        if (response.success) {
            const { merchants } = response.data;
            this.setState({ merchants });
        }
    };

    render() {
        const heading = [
            "Merchant Code",
            "Name",
            "CNIC",
            "Phone",
            "Address",
            "Status",
            "Action",
        ];

        const { merchants, alert } = this.state;
        return (
            <Fragment>
                <ContentHeader>Merchant List </ContentHeader>

                <Row>
                    <Col sm="12">
                        <Card>
                            <CardBody>
                                {/*<CardTitle>Striped Rows</CardTitle>*/}
                                <CustomTabs
                                    TabContent1={
                                        <MerchantTable
                                            heading={heading}
                                            data={{ merchants, alert }}
                                            misc={{ link: "merchants" }}
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
