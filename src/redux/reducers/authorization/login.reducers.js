import { loginConstants } from '../../constants';

let user = localStorage.getItem('user');
if(user) user = JSON.parse(atob(user));

const initialState = user ? { loggedIn: true, user, invalid: false } : { loggedIn: false, invalid: false };

const Login = (state = initialState, payload) => {
    switch (payload.type) {
        case loginConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: payload.user
            };
        case loginConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: payload.user
            };
        case loginConstants.LOGIN_FAILURE:
            return {};
        case loginConstants.LOGOUT:
            return {};
        default:
            return state
    }
};

export default Login;