import {authConstants, loginConstants} from '../../constants';
import { alertActions } from '../';
import { loginService} from "../../services/login.services";
import { history} from "../../helpers/history";

export const loginAction = {
    login,
    logout
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));
        loginService.login(username, password)
            .then(
                response => {
                    const {authentication} = response.data;
                    dispatch(success(authentication.user));
                    window.location.reload();

                },
                error => {
                    console.log(error);
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: loginConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: loginConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: loginConstants.LOGIN_FAILURE, error } }
}

function logout() {
    loginService.logout();
    return { type: loginConstants.LOGOUT };
}