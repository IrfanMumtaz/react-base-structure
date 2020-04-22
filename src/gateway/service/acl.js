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
    return GATEWAY.authGateway("GET", V1.permissions);
}

function getRoles() {
    return GATEWAY.authGateway("GET", V1.roles);
}

function getRole() {}

function createRole(data) {
    const _data = setRoleBody(data);
    return GATEWAY.authGateway("POST", V1.roles, _data);
}

function updateRole() {}

function deleteRole() {}

function setRoleBody(data) {
    let _data = {};
    _data.name = data.name;
    _data.permissions = setPermissionField(data.permissions);

    return JSON.stringify(_data);
}

function setPermissionField(permissions) {
    let _permissions = [];
    permissions.map((val) => _permissions.push(val.value));

    return _permissions;
}
