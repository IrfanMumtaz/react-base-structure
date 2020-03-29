import {authConstants} from "../../constants/auth.constants";

export const authAction = {
    auth,
    token
};

function auth(user) {
    return {
        type: authConstants.AUTH,
        payload: user
    };
}

function token(token) {
    return {
        type: authConstants.TOKEN,
        payload: token
    };
}