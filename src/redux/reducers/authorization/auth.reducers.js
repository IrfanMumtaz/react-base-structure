import { authConstants } from '../../constants';

let user = localStorage.getItem('user');
if(user) user = JSON.parse((atob(user)));
let token = localStorage.getItem('access_token');
if(token) token = atob(token);
let permissions = localStorage.getItem('acl');
if(permissions) permissions = atob(permissions);

const initialState = user ? { token, user, permissions } : {};
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
        case authConstants.PERMISSIONS:
            return {
                token: action.permissions
            };
        default:
            return state
    }
}

export default Auth;