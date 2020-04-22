import React, { Component, Fragment } from "react";
import CustomTabs from "components/tabs/customTabs";
import ContentHeader from "components/contentHead/contentHeader";
import { Card, CardBody, Row, Col } from "reactstrap";
import { ACL_GATEWAY } from "gateway/service/acl";

// Table exmple pages
import RoleTable from "./roleTable";

class Index extends Component {
    state = {
        roles: [],
    };

    componentDidMount() {
        this.getRoles();
    }

    getRoles = async () => {
        const response = await ACL_GATEWAY.getRoles();
        this.setState({ roles: response.roles });
    };

    render() {
        const heading = ["Name", "Permissions", "Action"];

        return (
            <Fragment>
                <ContentHeader>Roles List </ContentHeader>

                <Row>
                    <Col sm="12">
                        <Card>
                            <CardBody>
                                <CustomTabs
                                    TabContent1={
                                        <RoleTable
                                            heading={heading}
                                            data={this.state.roles}
                                            misc={{ link: "acl/roles" }}
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
