import { roleService } from "../../services/RolesService";
import {ROLE_ADD_SUCCESS_ACTION,
    ROLE_ADD_FAILED_ACTION,
    ROLE_LIST_SUCCESS_ACTION,
    ROLE_LIST_FAILED_ACTION,
    ROLE_UPDATE_SUCCESS_ACTION,
    ROLE_UPDATE_FAILED_ACTION,
    ROLE_DELETE_SUCCESS_ACTION,
    ROLE_DELETE_FAILED_ACTION

} 
    from "../types/RoleTypes";
import swal from "sweetalert";

export function getAllRoleAction() {
    return (dispatch) => {
        roleService.getAllRoles().then((response)=>{
            console.log(response);
            dispatch(confirmedGetAllRolesAction(response.data));
        })
        .catch((error)=>{
            console.log(error);
            swal("Başarısız", "kullanıcılar Getirilemedi", "error", { button: "Tamam!", });
            dispatch(failedGetAllRolesAction(error.message));

        })
    }
}

export function updateRoleAction(userId,user) {
    return (dispatch) => {
        roleService.updateRole(userId,user).then((response)=>{
            swal("Başarılı", "Role Güncellendi", "success", { button: "Tamam!", });
            console.log(response);
            dispatch(confirmedUpdateRolesAction(response.data));
            dispatch(getAllRoleAction())
        })
        .catch((error)=>{
            console.log(error);
            swal("Başarısız", "Veri Getirilemedi", "error", { button: "Tamam!", });
            dispatch(failedUpdateRolesAction(error.message));
            dispatch(getAllRoleAction())
        })
    }
}

export function deleteRoleAction(userId) {
    return (dispatch) => {
        roleService.deleteRole(userId).then((response)=>{
            swal("Başarılı", "Role Silindi", "success", { button: "Tamam!", });
            console.log(response);
            dispatch(confirmedDeleteRolesAction({userId:userId}));
            dispatch(getAllRoleAction())
        })
        .catch((error)=>{
            console.log(error);
            swal("Başarısız", "Role Silinemedi", "error", { button: "Tamam!", });
            dispatch(failedDeleteRolesAction(error.message));
            dispatch(getAllRoleAction())

        })
    }
}
export function createRoleAction(user) {
    return (dispatch) => {
        roleService.createRole(user).then((response)=>{
            swal("Başarılı", "Role Eklendi", "success", { button: "Tamam!", });
            console.log(response);
            dispatch(confirmedAddRolesAction(response.data));
            dispatch(getAllRoleAction())
        })
        .catch((error)=>{
            console.log(error);
            swal("Başarısız", "Role Eklenemedi", "error", { button: "Tamam!", });
            dispatch(failedAddRolesAction(error.message));
            dispatch(getAllRoleAction())

        })
    }
}

export const confirmedAddRolesAction = (data)=>{
    return {
        type: ROLE_ADD_SUCCESS_ACTION,
        payload: data
    }
}

export const failedAddRolesAction = (data)=>{
    return {
        type: ROLE_ADD_FAILED_ACTION,
        payload: data
    }
}
export const confirmedGetAllRolesAction = (data)=>{
    return {
        type: ROLE_LIST_SUCCESS_ACTION,
        payload: data
    }
}

export const failedGetAllRolesAction = (data)=>{
    return {
        type: ROLE_LIST_FAILED_ACTION,
        payload: data
    }
}
export const confirmedUpdateRolesAction = (data)=>{
    return {
        type: ROLE_UPDATE_SUCCESS_ACTION,
        payload: data
    }
}

export const failedUpdateRolesAction = (data)=>{
    return {
        type: ROLE_UPDATE_FAILED_ACTION,
        payload: data
    }
}

export const confirmedDeleteRolesAction = (data)=>{
    return {
        type: ROLE_DELETE_SUCCESS_ACTION,
        payload: data
    }
}

export const failedDeleteRolesAction = (data)=>{
    return {
        type: ROLE_DELETE_FAILED_ACTION,
        payload: data
    }
}