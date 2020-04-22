import { GATEWAY } from "gateway/api";
import PASSENGER_GATEWAY from "gateway/service/passenger";
import V1 from "constants/apiConstant";
import { store } from "redux/storeConfig/store";

const TICKET_GATEWAY = {
    getTickets,
    createTicket,
};

export default TICKET_GATEWAY;

function getTickets() {
    return GATEWAY.authGateway("GET", V1.tickets);
}

function createTicket(data) {
    let { ticket, passenger } = data;
    if (!ticket.passenger_id) {
        passenger = PASSENGER_GATEWAY.createPassenger(passenger);
    }
    const passenger_id = !ticket.passenger_id
        ? passenger.data.id
        : ticket.passenger_id;
    const _data = setTicketBody(ticket, passenger_id);
    return GATEWAY.authGateway("POST", V1.tickets, _data);
}

function setTicketBody(data) {
    let _data = data;
    _data.code = generateCode();
    _data.pickup = {
        full: data.origin,
        latitude: 1,
        longitude: 1,
    };

    _data.dropoff = {
        full: data.destination,
        latitude: 1,
        longitude: 1,
    };

    return JSON.stringify(_data);
}

function generateCode() {
    const login = store.getState().authentication.Login;
    return `TKT-${login.user.id}${new Date().getTime()}`;
}
