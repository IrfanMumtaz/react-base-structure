import React, { Component, Fragment } from "react";
import ContentHeader from "components/contentHead/contentHeader";
import { Card, CardBody, Col, Row } from "reactstrap";
import MerchantForm from "./form";
import MERCHANT_GATEWAY from "gateway/service/merchant";

class Edit extends Component {
    state = {
        passengers: [],
        vehicles: [],
        alert: {
            display: false,
            type: "success",
            message: "",
        },
    };

    handleSubmit = async (data) => {
        const { id } = this.props.match.params;
        const response = await MERCHANT_GATEWAY.updateMerchant(data, id);
        if (response.success) {
            const alert = {
                type: "success",
                message: "Merchant has been successfully created!",
                display: true,
            };
            this.setState({ alert });
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
        const { id } = this.props.match.params;
        return (
            <Fragment>
                <ContentHeader>Merchant Update </ContentHeader>

                <Row>
                    <Col md="12">
                        <Card>
                            <CardBody>
                                <div className="px-3">
                                    <MerchantForm
                                        data={{
                                            alert,
                                        }}
                                        id={id}
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

export default Edit;
