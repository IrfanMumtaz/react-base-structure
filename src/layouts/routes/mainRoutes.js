// import external modules
import React from "react";
import { Route, Redirect } from "react-router-dom";

// import internal(own) modules
import MainLayout from "../mainLayout";
import {store} from "../../redux/storeConfig/store"

const MainLayoutRoute = ({ render, ...rest }) => {
    const { Login } = store.getState().authentication;
    console.log(Login);
    return (

      <Route
         {...rest}
         render={matchProps => Login.loggedIn ?  (
            <MainLayout>{render(matchProps)}</MainLayout>
         ) : (
             <Redirect to={{ pathname: '/login', state: { from: matchProps.location } }} />
         )
         }
      />
   );
};

export default MainLayoutRoute;
