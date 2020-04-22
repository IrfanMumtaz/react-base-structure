import { GATEWAY } from "gateway/api";
import PASSENGER_GATEWAY from "gateway/service/passenger";
import V1 from "constants/apiConstant";

const TICKET_GATEWAY = {
    getTickets,
    createTicket,
};

export default TICKET_GATEWAY;

function getTickets() {
    return GATEWAY.authGateway("GET", V1.tickets);
}

function createTicket(data) {
    const { ticket, passenger } = data;
    if (!ticket.passenger_id) {
        const _passenger = PASSENGER_GATEWAY.createPassenger(passenger);
    }
    // const _data = setRoleBody(data);
    // return GATEWAY.authGateway("POST", V1.roles, _data);
}
