import React, { Component, Fragment } from "react";
import ContentHeader from "components/contentHead/contentHeader";
import { Card, CardBody, Col, Row } from "reactstrap";
import "react-select/dist/react-select";
import { ACL_GATEWAY } from "gateway/service/acl";
import AclForm from "./form";

class Create extends Component {
    constructor() {
        super();

        this.state = {
            permissions: [],
            alert: {
                display: false,
                type: "success",
                message: "",
            },
        };
    }

    componentDidMount() {
        this.getPermissions();
    }

    getPermissions = async () => {
        const response = await ACL_GATEWAY.getPermissions();
        console.log(response);
        const permissions = this.setFormatMultiSelect(response.permissions);
        this.setState({ permissions });
    };

    setFormatMultiSelect(data) {
        let _data = [];
        data.map((d) =>
            _data.push({
                value: d.id,
                label: d.name,
            })
        );

        return _data;
    }

    /* createRole = async () => {
        let { _default, multivalues } = this.state;
        _default.permissions = [];
        multivalues.map((val) => {
            _default.permissions.push(val.value);
        });
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.state.auth.token}`,
            },
            body: JSON.stringify(_default),
        };
        fetch(`${config.base_url}v1/acl/role`, requestOptions)
            .then(this.handleResponse)
            .then((response) => {
                if (response.success === true) {
                    const alert = {
                        type: "success",
                        message: response.message,
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
                return response;
            });
    }; */

    handleSubmit = async (data) => {
        const response = await ACL_GATEWAY.createRole(data);
        if (response) {
            const alert = {
                type: "success",
                message: "Role has been successfully created!",
                display: true,
            };
            this.setState({ alert });
        } else {
            const alert = {
                type: "danger",
                message: "Oops something went wrong!",
                display: true,
            };
            this.setState({ alert });
        }
    };

    findPermission(id) {
        let { _default } = this.state;
        let obj = _default.permissions.find((p) => p.id === id);
        if (obj) {
            if (_default.addPermission.indexOf(id === -1)) {
                _default.addPermission.push(id);
            }
            return true;
        }
        return false;
    }

    render() {
        const { permissions, formValues, alert } = this.state;
        return (
            <Fragment>
                <ContentHeader>Create Role </ContentHeader>

                <Row>
                    <Col md="12">
                        <Card>
                            <CardBody>
                                <div className="px-3">
                                    <AclForm
                                        data={{
                                            permissions,
                                            formValues,
                                            alert,
                                        }}
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
