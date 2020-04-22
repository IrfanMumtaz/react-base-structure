import { GATEWAY } from "gateway/api";
import V1 from "constants/apiConstant";

const VEHICLE_GATEWAY = {
    getVehicles,
};

export default VEHICLE_GATEWAY;

function getVehicles() {
    return GATEWAY.authGateway("GET", V1.vehicles);
}
