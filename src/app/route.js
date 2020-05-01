import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Spinner from "../components/spinner/spinner";

// import internal(own) modules
import MainLayoutRoutes from "../layouts/routes/mainRoutes";
import FullPageLayout from "../layouts/routes/fullpageRoutes";
import { store } from "../redux/storeConfig/store";

const LazyLogin = lazy(() => import("../views/pages/login"));
const LazyLogoutView = lazy(() => import("../views/pages/logout"));
const LazyAnalyticsDashboard = lazy(() =>
    import("../views/dashboard/ticketInsurance")
);
const LazyEmail = lazy(() => import("../views/email/email"));

class Route extends Component {
    render() {
        const { Login } = store.getState().authentication;
        return (
            <BrowserRouter basename="/">
                <Switch>
                    <FullPageLayout
                        exact
                        path="/login"
                        render={(matchprops) => (
                            <Suspense fallback={<Spinner />}>
                                <LazyLogin {...matchprops} />
                            </Suspense>
                        )}
                    />

                    <MainLayoutRoutes
                        exact
                        path="/logout"
                        render={(matchprops) => (
                            <Suspense fallback={<Spinner />}>
                                <LazyLogoutView {...matchprops} />
                            </Suspense>
                        )}
                    />

                    <MainLayoutRoutes
                        exact
                        path="/"
                        render={(matchprops) => (
                            <Suspense fallback={<Spinner />}>
                                <LazyAnalyticsDashboard {...matchprops} />
                            </Suspense>
                        )}
                    />
                    <MainLayoutRoutes
                        exact
                        path="/dashboard"
                        render={(matchprops) => (
                            <Suspense fallback={<Spinner />}>
                                <LazyAnalyticsDashboard {...matchprops} />
                            </Suspense>
                        )}
                    />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Route;
