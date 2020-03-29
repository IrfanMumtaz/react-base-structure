import React, {Component, Suspense, lazy} from "react";
import { BrowserRouter, Switch, PrivateRoute } from "react-router-dom";
import Spinner from "../components/spinner/spinner";

// import internal(own) modules
import MainLayoutRoutes from "../layouts/routes/mainRoutes";
import FullPageLayout from "../layouts/routes/fullpageRoutes";
import {store} from "../redux/storeConfig/store";

const LazyLogin = lazy(() => import("../views/pages/login"));
const LazyLogoutView = lazy(() => import("../views/pages/logout"));
const LazyAnalyticsDashboard = lazy(() => import("../views/dashboard/ticketInsurance"));
const LazyEmail = lazy(() => import("../views/email/email"));

/*ACL Views*/
const LazyACLList = lazy(() => import("../views/access-control-list/index"));
const LazyACLCreate = lazy(() => import("../views/access-control-list/create"));
const LazyACLShow = lazy(() => import("../views/access-control-list/show"));
const LazyACLEdit = lazy(() => import("../views/access-control-list/edit"));

/*Vehicle Views*/
const LazyVehicleList = lazy(() => import("../views/vehicles/index"));
const LazyVehicleCreate = lazy(() => import("../views/vehicles/create"));
const LazyVehicleShow = lazy(() => import("../views/vehicles/show"));
const LazyVehicleEdit = lazy(() => import("../views/vehicles/edit"));

/*Merchant Views*/
const LazyMerchantList = lazy(() => import("../views/merchants/index"));
const LazyMerchantCreate = lazy(() => import("../views/merchants/create"));
const LazyMerchantShow = lazy(() => import("../views/merchants/show"));
const LazyMerchantEdit = lazy(() => import("../views/merchants/edit"));

/*Passenger Views*/
const LazyPassengerList = lazy(() => import("../views/passengers/index"));
const LazyPassengerCreate = lazy(() => import("../views/passengers/create"));
const LazyPassengerShow = lazy(() => import("../views/passengers/show"));
const LazyPassengerEdit = lazy(() => import("../views/passengers/edit"));

/*Booth Views*/
const LazyBoothList = lazy(() => import("../views/booths/index"));
const LazyBoothCreate = lazy(() => import("../views/booths/create"));
const LazyBoothShow = lazy(() => import("../views/booths/show"));
const LazyBoothEdit = lazy(() => import("../views/booths/edit"));

/*Ticket Views*/
const LazyTicketList = lazy(() => import("../views/tickets/index"));
const LazyTicketCreate = lazy(() => import("../views/tickets/create"));
const LazyTicketShow = lazy(() => import("../views/tickets/show"));
const LazyTicketEdit = lazy(() => import("../views/tickets/edit"));
class Route extends Component {

    render(){
        const { Login } = store.getState().authentication;
        return(
        <BrowserRouter basename="/">
            <Switch>
                <FullPageLayout
                        exact
                        path="/login"
                        render={matchprops => (
                            <Suspense fallback={<Spinner />}>
                                <LazyLogin {...matchprops} />
                            </Suspense>
                        )}
                    />

                <MainLayoutRoutes
                    exact
                    path="/logout"
                    render={matchprops => (
                        <Suspense fallback={<Spinner/>}>
                            <LazyLogoutView {...matchprops} />
                        </Suspense>
                    )}
                />

                <MainLayoutRoutes
                    exact
                    path="/"
                    render={matchprops => (
                        <Suspense fallback={<Spinner/>}>
                            <LazyAnalyticsDashboard {...matchprops} />
                        </Suspense>
                    )}
                />
                <MainLayoutRoutes
                    exact
                    path="/dashboard"
                    render={matchprops => (
                        <Suspense fallback={<Spinner/>}>
                            <LazyAnalyticsDashboard {...matchprops} />
                        </Suspense>
                    )}
                />
                <MainLayoutRoutes
                    exact
                    path="/email"
                    render={matchprops => (
                        <Suspense fallback={<Spinner />}>
                            <LazyEmail {...matchprops} />
                        </Suspense>
                    )}
                />

                {/*ACL*/}
                <MainLayoutRoutes
                    exact
                    path="/acl/roles"
                    render={matchprops => (
                        <Suspense fallback={<Spinner />}>
                            <LazyACLList {...matchprops} />
                        </Suspense>
                    )}
                />
                <MainLayoutRoutes
                    exact
                    path="/acl/roles/create"
                    render={matchprops => (
                        <Suspense fallback={<Spinner />}>
                            <LazyACLCreate {...matchprops} />
                        </Suspense>
                    )}
                />
                <MainLayoutRoutes
                    exact
                    path="/acl/roles/show/:id"
                    render={matchprops => (
                        <Suspense fallback={<Spinner />}>
                            <LazyACLShow {...matchprops} />
                        </Suspense>
                    )}
                />
                <MainLayoutRoutes
                    exact
                    path="/acl/roles/edit/:id"
                    render={matchprops => (
                        <Suspense fallback={<Spinner />}>
                            <LazyACLEdit {...matchprops} />
                        </Suspense>
                    )}
                />

                {/*Vehicles*/}
                <MainLayoutRoutes
                    exact
                    path="/vehicles"
                    render={matchprops => (
                        <Suspense fallback={<Spinner />}>
                            <LazyVehicleList {...matchprops} />
                        </Suspense>
                    )}
                />
                <MainLayoutRoutes
                    exact
                    path="/vehicles/create"
                    render={matchprops => (
                        <Suspense fallback={<Spinner />}>
                            <LazyVehicleCreate {...matchprops} />
                        </Suspense>
                    )}
                />
                <MainLayoutRoutes
                    exact
                    path="/vehicles/show/:id"
                    render={matchprops => (
                        <Suspense fallback={<Spinner />}>
                            <LazyVehicleShow {...matchprops} />
                        </Suspense>
                    )}
                />
                <MainLayoutRoutes
                    exact
                    path="/vehicles/edit/:id"
                    render={matchprops => (
                        <Suspense fallback={<Spinner />}>
                            <LazyVehicleEdit {...matchprops} />
                        </Suspense>
                    )}
                />

                {/*Merchants*/}
                <MainLayoutRoutes
                    exact
                    path="/merchants"
                    render={matchprops => (
                        <Suspense fallback={<Spinner />}>
                            <LazyMerchantList {...matchprops} />
                        </Suspense>
                    )}
                />
                <MainLayoutRoutes
                    exact
                    path="/merchants/create"
                    render={matchprops => (
                        <Suspense fallback={<Spinner />}>
                            <LazyMerchantCreate {...matchprops} />
                        </Suspense>
                    )}
                />
                <MainLayoutRoutes
                    exact
                    path="/merchants/show/:id"
                    render={matchprops => (
                        <Suspense fallback={<Spinner />}>
                            <LazyMerchantShow {...matchprops} />
                        </Suspense>
                    )}
                />
                <MainLayoutRoutes
                    exact
                    path="/merchants/edit/:id"
                    render={matchprops => (
                        <Suspense fallback={<Spinner />}>
                            <LazyMerchantEdit {...matchprops} />
                        </Suspense>
                    )}
                />

                {/*Passengers*/}
                <MainLayoutRoutes
                    exact
                    path="/passengers"
                    render={matchprops => (
                        <Suspense fallback={<Spinner />}>
                            <LazyPassengerList {...matchprops} />
                        </Suspense>
                    )}
                />
                <MainLayoutRoutes
                    exact
                    path="/passengers/create"
                    render={matchprops => (
                        <Suspense fallback={<Spinner />}>
                            <LazyPassengerCreate {...matchprops} />
                        </Suspense>
                    )}
                />
                <MainLayoutRoutes
                    exact
                    path="/passengers/show/:id"
                    render={matchprops => (
                        <Suspense fallback={<Spinner />}>
                            <LazyPassengerShow {...matchprops} />
                        </Suspense>
                    )}
                />
                <MainLayoutRoutes
                    exact
                    path="/passengers/edit/:id"
                    render={matchprops => (
                        <Suspense fallback={<Spinner />}>
                            <LazyPassengerEdit {...matchprops} />
                        </Suspense>
                    )}
                />

                {/*Booths*/}
                <MainLayoutRoutes
                    exact
                    path="/booths"
                    render={matchprops => (
                        <Suspense fallback={<Spinner />}>
                            <LazyBoothList {...matchprops} />
                        </Suspense>
                    )}
                />
                <MainLayoutRoutes
                    exact
                    path="/booths/create"
                    render={matchprops => (
                        <Suspense fallback={<Spinner />}>
                            <LazyBoothCreate {...matchprops} />
                        </Suspense>
                    )}
                />
                <MainLayoutRoutes
                    exact
                    path="/booths/show/:id"
                    render={matchprops => (
                        <Suspense fallback={<Spinner />}>
                            <LazyBoothShow {...matchprops} />
                        </Suspense>
                    )}
                />
                <MainLayoutRoutes
                    exact
                    path="/booths/edit/:id"
                    render={matchprops => (
                        <Suspense fallback={<Spinner />}>
                            <LazyBoothEdit {...matchprops} />
                        </Suspense>
                    )}
                />

                {/*Tickets*/}
                <MainLayoutRoutes
                    exact
                    path="/tickets"
                    render={matchprops => (
                        <Suspense fallback={<Spinner />}>
                            <LazyTicketList {...matchprops} />
                        </Suspense>
                    )}
                />
                <MainLayoutRoutes
                    exact
                    path="/tickets/create"
                    render={matchprops => (
                        <Suspense fallback={<Spinner />}>
                            <LazyTicketCreate {...matchprops} />
                        </Suspense>
                    )}
                />
                <MainLayoutRoutes
                    exact
                    path="/tickets/show/:id"
                    render={matchprops => (
                        <Suspense fallback={<Spinner />}>
                            <LazyTicketShow {...matchprops} />
                        </Suspense>
                    )}
                />
                <MainLayoutRoutes
                    exact
                    path="/tickets/edit/:id"
                    render={matchprops => (
                        <Suspense fallback={<Spinner />}>
                            <LazyTicketEdit {...matchprops} />
                        </Suspense>
                    )}
                />


            </Switch>
        </BrowserRouter>
        )
    }


}

export default Route;