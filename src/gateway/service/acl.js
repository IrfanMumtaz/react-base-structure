import { GATEWAY } from "gateway/api";
import V1 from "constants/apiConstant";

export const ACL_GATEWAY = {
    getPermissions,
    getRoles,
    getRole,
    createRole,
    updateRole,
    deleteRole,
};

function getPermissions() {
    return GATEWAY.authGateway("GET", V1.getPermissions);
}

function getRoles() {
    return GATEWAY.authGateway("GET", V1.getRoles);
}

function getRole() {}

function createRole() {}

function updateRole() {}

function deleteRole() {}
