import { GATEWAY } from "gateway/api";
import V1 from "constants/apiConstant";

const MERCHANT_GATEWAY = {
    getMerchants,
    createMerchant,
};

export default MERCHANT_GATEWAY;

function getMerchants() {
    return GATEWAY.authGateway("GET", V1.merchants);
}

function createMerchant(data) {
    const _data = setMerchantBody(data);
    return GATEWAY.authGateway("POST", V1.merchants, _data);
}

function setMerchantBody(data) {
    let _data = { ...data };
    _data.address.latitude = 1;
    _data.address.longitude = 1;
    _data.address.city = 1;
    _data.address.state = 1;

    return JSON.stringify(_data);
}
