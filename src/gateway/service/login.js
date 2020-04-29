import { GATEWAY } from "gateway/api";
import V1 from "constants/apiConstant";

const LOGIN_GATEWAY = {
    userLogin,
};
export default LOGIN_GATEWAY;

function userLogin(data) {
    const _data = setLoginBody(data);
    const response = GATEWAY.guestGateway("POST", V1.login, _data);
    console.log(response);
    return response;
}

function setLoginBody(data) {
    let _data = {};
    _data.username = data.inputEmail;
    _data.password = data.inputPass;
    return JSON.stringify(_data);
}
