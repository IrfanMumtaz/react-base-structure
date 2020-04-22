import { GATEWAY } from "gateway/api";
import V1 from "constants/apiConstant";

const PASSENGER_GATEWAY = {
    getPassengers,
};

export default PASSENGER_GATEWAY;

function getPassengers() {
    return GATEWAY.authGateway("GET", V1.passengers);
}
