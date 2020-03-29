// import external modules
import React, { Component } from "react";
import { connect } from 'react-redux';
import {
   Row,
   Col,
   Input,
   Form,
   FormGroup,
   Button,
   Card,   
   CardBody,
} from "reactstrap";
import { loginAction } from "../../redux/actions";
import { store } from "../../redux/storeConfig/store";
import {Redirect} from "react-router-dom";


class Login extends Component {
   constructor(props) {
      super(props);

      // reset login status
      // this.props.logout();

      this.state = {
         inputEmail: '',
         inputPass: '',
         submitted: false,
      };

   }

   isLoggedIn(){
      const {Login} = store.getState().authentication;
      return Login.loggedIn;
   }

   handleChange = e => {
      this.setState({
         [e.target.name]: e.target.value
      });
   };

   handleSubmit = e => {
      e.preventDefault();
      this.setState({ submitted: true });
      const { inputEmail, inputPass } = this.state;
      if (inputEmail && inputPass) {
         this.props.login(inputEmail, inputPass);
      }
   };

   handleResetForm = () => {
      this.setState({
         inputEmail: '',
         inputPass: ''
      });
      document.getElementById("loginForm").reset();

   }

   render() {
      if (this.isLoggedIn() === true) {
         return <Redirect to='/' />
      }
      return (
         <div className="container">
            <Row className="full-height-vh">
               <Col xs="12" className="d-flex align-items-center justify-content-center">
                  <Card className="gradient-indigo-purple text-center width-400">
                     <CardBody>
                        <h2 className="white py-4">Login</h2>
                        <Form className="pt-2" onSubmit={this.handleSubmit} id={"loginForm"}>
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
                                 <Button type="submit" color="danger" block className="btn-pink btn-raised">
                                    Submit
                                 </Button>
                                 <Button type="button" color="secondary" block className="btn-raised" onClick={this.handleResetForm}>
                                    Cancel
                                 </Button>
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

function mapState(state) {
   const { loggingIn, logout } = state.authentication;
   return { loggingIn, logout };
}

const actionCreators = {
   login: loginAction.login,
   logout: loginAction.logout
};

Login = connect(mapState, actionCreators)(Login);
export default Login;
