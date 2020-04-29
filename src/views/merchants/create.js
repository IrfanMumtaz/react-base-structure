import React, { Component, Fragment } from "react";
import ContentHeader from "components/contentHead/contentHeader";
import { Card, CardBody, Col, Row } from "reactstrap";
import MerchantForm from "./form";
import MERCHANT_GATEWAY from "gateway/service/merchant";

class Create extends Component {
    state = {
        alert: {
            display: false,
            type: "success",
            message: "",
        },
    };

    handleSubmit = async (data) => {
        const response = await MERCHANT_GATEWAY.createMerchant(data);
        if (response.success) {
            const alert = {
                type: "success",
                message: "Merchant has been successfully created!",
                display: true,
            };
            this.setState({ alert });
            window.location.href =
                "/merchants/edit/" + response.data.merchant.id;
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
        const { alert } = this.state;
        return (
            <Fragment>
                <ContentHeader>Merchant Add </ContentHeader>

                <Row>
                    <Col md="12">
                        <Card>
                            <CardBody>
                                <div className="px-3">
                                    <MerchantForm
                                        data={{ alert }}
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
