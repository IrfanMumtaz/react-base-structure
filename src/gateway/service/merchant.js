import { GATEWAY } from "gateway/api";
import V1 from "constants/apiConstant";

const MERCHANT_GATEWAY = {
    getMerchants,
    getMerchant,
    createMerchant,
    updateMerchant,
};

export default MERCHANT_GATEWAY;

function getMerchants() {
    return GATEWAY.authGateway("GET", V1.merchants);
}

function getMerchant(id) {
    const path = `${V1.merchants}/${id}`;
    return GATEWAY.authGateway("GET", path);
}

function createMerchant(data) {
    const _data = setMerchantBody(data);
    return GATEWAY.authGateway("POST", V1.merchants, _data);
}

function updateMerchant(data, id) {
    const path = `${V1.merchants}/${id}`;
    const _data = setMerchantBody(data);
    return GATEWAY.authGateway("PUT", path, _data);
}

function setMerchantBody(data) {
    let _data = { ...data };
    _data.address.latitude = 1;
    _data.address.longitude = 1;
    _data.address.city = 1;
    _data.address.state = 1;

    return JSON.stringify(_data);
}
