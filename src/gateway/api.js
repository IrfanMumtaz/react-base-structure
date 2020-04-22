import config from "app/config";
import { store } from "redux/storeConfig/store";

export const GATEWAY = {
    authGateway,
    guestGateway,
};

async function authGateway(METHOD, API, BODY = null) {
    const URL = `${config.base_url}/${API}`;
    const TOKEN = store.getState().authentication.Auth.token;
    const OPTIONS = {
        method: METHOD,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
        },
        body: BODY,
    };
    return await fetch(URL, OPTIONS)
        .then(handleResponse)
        .then((response) => {
            if (response.success !== true) {
                //error handling
            }
            return response;
        });
}

function guestGateway() {}

function handleResponse(response) {
    return response.text().then((text) => {
        return text && JSON.parse(text);
    });
}
