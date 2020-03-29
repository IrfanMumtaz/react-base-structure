// import external modules
import { combineReducers } from "redux";
import Login from "./login.reducers"
import Auth from "./auth.reducers"

const authReducer = combineReducers({
    Login,
    Auth
});

export default authReducer;