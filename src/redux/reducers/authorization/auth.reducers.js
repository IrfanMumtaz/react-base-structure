import { authConstants } from '../../constants';

const user = JSON.parse(localStorage.getItem('user'));
const token = JSON.parse(localStorage.getItem('access_token'));
const initialState = user ? { token, user } : {};
const Auth = (state = initialState, action) => {
    switch (action.type) {
        case authConstants.AUTH:
            return {
                auth: action.user
            };
        case authConstants.TOKEN:
            return {
                token: action.token
            };
        default:
            return state
    }
}

export default Auth;