import { GATEWAY } from "gateway/api";
import PASSENGER_GATEWAY from "gateway/service/passenger";
import V1 from "constants/apiConstant";
import { store } from "redux/storeConfig/store";

const TICKET_GATEWAY = {
    getTickets,
    getTicket,
    createTicket,
    updateTicket,
};

export default TICKET_GATEWAY;

function getTickets() {
    return GATEWAY.authGateway("GET", V1.tickets);
}

function getTicket(id) {
    const path = `${V1.tickets}/${id}`;
    return GATEWAY.authGateway("GET", path);
}

function createTicket(data) {
    let { ticket, passenger } = data;
    let tickets = [];
    if (!ticket.passenger_id) {
        passenger = PASSENGER_GATEWAY.createPassenger(passenger);
    }
    const passenger_id = !ticket.passenger_id
        ? passenger.data.id
        : ticket.passenger_id;

    for (let i = 0; i < ticket.quantity; i++) {
        ticket.code = generateCode();
        const _data = setTicketBody(ticket, passenger_id);
        tickets.push(GATEWAY.authGateway("POST", V1.tickets, _data));
    }
    return tickets[0];
}

function updateTicket(data, id) {
    let { ticket } = data;
    const path = `${V1.tickets}/${id}`;
    const _data = setTicketBody(ticket, ticket.passenger_id);
    return GATEWAY.authGateway("PUT", path, _data);
}

function setTicketBody(data, passenger_id) {
    console.log(data);
    let _data = data;
    delete _data._vehicle;
    delete _data._passenger;
    _data.passenger_id = passenger_id;
    _data.departure_time = setDateTimeField(data.departureTime);
    _data.arrival_time = setDateTimeField(data.arrivalTime);

    return JSON.stringify(_data);
}

function generateCode() {
    const login = store.getState().authentication.Login;
    return `TKT-${login.user.id}${new Date().getTime()}${Math.round(
        Math.random() * 10
    )}`;
}

function setDateTimeField(d) {
    const _dateTIme = `${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(
        -2
    )}-${("0" + d.getDate()).slice(-2)} ${("0" + d.getHours()).slice(-2)}:${(
        "0" + d.getMinutes()
    ).slice(-2)}:${("0" + d.getSeconds()).slice(-2)}`;

    return _dateTIme;
}
