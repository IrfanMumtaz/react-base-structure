// import external modules
import React, { Component, Fragment } from "react";
import ContentHeader from "../../components/contentHead/contentHeader";
import ContentSubHeader from "../../components/contentHead/contentSubHeader";
import {Redirect} from "react-router-dom";

class Logout extends Component {

    componentWillMount() {

        this.logout();
        window.location.href = '/login';
    }

    logout(){
        console.log('logout');
        localStorage.removeItem('user');
        localStorage.removeItem('acl');
        localStorage.removeItem('access_token');
    }
   render() {
      return (
          <Redirect to={{ pathname: '/login'}} />
      );
   }
}

export default Logout;
