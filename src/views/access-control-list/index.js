import React, { Component, Fragment } from "react";
import CustomTabs from "../../components/tabs/customTabs";
import ContentHeader from "../../components/contentHead/contentHeader";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import axios from "axios";
import config from "../../app/config";

// Table exmple pages
import RoleTable from "./roleTable";
import {store} from "../../redux/storeConfig/store";

class Index extends Component {

    state = {
        auth: store.getState().authentication.Auth,
        roles: []
    };

    componentWillMount() {
        this.getRoles();
    };

    getRoles = async () => {
        const param = {
            url: config.base_url + "v1/acl/role",
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
            const { roles } = res.data.data;
            this.setState({ roles });
        }
        else{
            console.log("operation failed");
        }
    };

    render() {
        const heading = ['Name', 'Permissions', 'Action'];

        return (
            <Fragment>
                <ContentHeader>Roles List </ContentHeader>

                <Row>
                    <Col sm="12">
                        <Card>
                            <CardBody>
                                {/*<CardTitle>Striped Rows</CardTitle>*/}
                                <CustomTabs
                                    TabContent1={<RoleTable heading={heading} data={this.state.roles} misc={{link: "acl/roles"}} />}
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
