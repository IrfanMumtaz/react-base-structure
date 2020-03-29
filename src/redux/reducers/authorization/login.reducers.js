import { loginConstants } from '../../constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : { loggedIn: false };

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
}

export default Login;