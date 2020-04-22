import { GATEWAY } from "gateway/api";
import V1 from "constants/apiConstant";

const PASSENGER_GATEWAY = {
    getPassengers,
    createPassenger,
};

export default PASSENGER_GATEWAY;

function getPassengers() {
    return GATEWAY.authGateway("GET", V1.passengers);
}

function createPassenger(data) {
    const _data = setPassengerBody(data);
    return GATEWAY.authGateway("POST", V1.passengers, _data);
}

function setPassengerBody(data) {
    let _data = data;
    _data.address.latitude = 1;
    _data.address.latitude = 1;
    _data.address.city = 1;
    _data.address.state = 1;

    return JSON.stringify(_data);
}
