import React, { Component, Fragment } from "react";
import ContentHeader from "components/contentHead/contentHeader";
import { Card, CardBody, Col, Row } from "reactstrap";
import MerchantForm from "./form";

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
                                        onlyShow={true}
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
