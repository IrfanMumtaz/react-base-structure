import React, { Component } from "react";
import {
    Row,
    Col,
    Input,
    Form,
    FormGroup,
    Button,
    Card,
    CardBody,
    Alert,
} from "reactstrap";
import { store } from "redux/storeConfig/store";
import { Redirect } from "react-router-dom";
import LOGIN_GATEWAY from "gateway/service/login";
import loading from "assets/img/loading.gif";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputEmail: "",
            inputPass: "",
            submitted: false,
            alert: {
                display: false,
                type: "success",
                message: "",
            },
        };
    }

    isLoggedIn() {
        const { Login } = store.getState().authentication;
        return Login.loggedIn;
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = async () => {
        this.setState({ submitted: true });
        const { inputEmail, inputPass } = this.state;
        if (inputEmail && inputPass) {
            const response = await LOGIN_GATEWAY.userLogin({
                inputEmail,
                inputPass,
            });

            if (response.success) {
                localStorage.setItem(
                    "access_token",
                    btoa(response.data.authentication.access_token)
                );
                localStorage.setItem(
                    "user",
                    btoa(JSON.stringify(response.data.authentication.user))
                );
                localStorage.setItem(
                    "acl",
                    btoa(
                        JSON.stringify(response.data.authentication.permissions)
                    )
                );
                window.location.reload();
            } else {
                const alert = {
                    type: "danger",
                    message: response.error.message,
                    display: true,
                };
                this.setState({ alert });
                this.setState({ submitted: false });
            }
        }
    };

    handleResponse(response) {
        return response.text().then((text) => {
            return text && JSON.parse(text);
        });
    }

    handleResetForm = () => {
        this.setState({
            inputEmail: "",
            inputPass: "",
        });
        document.getElementById("loginForm").reset();
    };

    render() {
        if (this.isLoggedIn() === true) {
            return <Redirect to="/" />;
        }
        return (
            <div className="container">
                <Row className="full-height-vh">
                    <Col
                        xs="12"
                        className="d-flex align-items-center justify-content-center"
                    >
                        <Card className="gradient-indigo-purple text-center width-400">
                            <CardBody>
                                <h2 className="white py-4">Login</h2>
                                <Form className="pt-2" id={"loginForm"}>
                                    <FormGroup>
                                        <Col md="12">
                                            <Input
                                                type="email"
                                                className="form-control"
                                                name="inputEmail"
                                                id="inputEmail"
                                                placeholder="Email"
                                                required
                                                onChange={this.handleChange}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup>
                                        <Col md="12">
                                            <Input
                                                type="password"
                                                className="form-control"
                                                name="inputPass"
                                                id="inputPass"
                                                placeholder="Password"
                                                required
                                                onChange={this.handleChange}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup>
                                        <Col md="12">
                                            <Button
                                                type="button"
                                                color="danger"
                                                onClick={this.handleSubmit}
                                                block
                                                className="btn-pink btn-raised"
                                                disabled={this.state.submitted}
                                            >
                                                {this.state.submitted && (
                                                    <img
                                                        style={{
                                                            maxHeight: 20,
                                                            position:
                                                                "relative",
                                                        }}
                                                        src={loading}
                                                        alt="Loading..."
                                                    />
                                                )}
                                                {this.state.submitted ===
                                                    false && "Submit"}
                                            </Button>
                                            <Button
                                                type="button"
                                                color="secondary"
                                                block
                                                className="btn-raised"
                                                onClick={this.handleResetForm}
                                            >
                                                Cancel
                                            </Button>

                                            {this.state.alert.display && (
                                                <Alert
                                                    color={
                                                        this.state.alert.type
                                                    }
                                                >
                                                    {this.state.alert.message}
                                                </Alert>
                                            )}
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Login;
