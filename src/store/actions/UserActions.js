import { userService } from "../../services/UserService";
import {USER_ADD_SUCCESS_ACTION,
    USER_ADD_FAILED_ACTION,
    USER_LIST_SUCCESS_ACTION,
    USER_LIST_FAILED_ACTION,
    USER_UPDATE_SUCCESS_ACTION,
    USER_UPDATE_FAILED_ACTION,
    USER_DELETE_SUCCESS_ACTION,
    USER_DELETE_FAILED_ACTION,
    USER_LIST_PAGINATED_SUCCESS_ACTION,
    USER_LIST_PAGINATED_FAILED_ACTION

} 
    from "../types/UserTypes";
import swal from "sweetalert";

export function getAllUserPaginatedAction(currentPage =1,perPage=10) {
    return (dispatch) => {
        userService.getAllPaginatedUsers(currentPage,perPage).then((response)=>{
            console.log(response);
            dispatch(confirmedGetAllPaginatedUsersAction(response.data));
        })
        .catch((error)=>{
            console.log(error);
            swal("Başarısız", "kullanıcılar Getirilemedi", "error", { button: "Tamam!", });
            dispatch(failedGetAllPaginatedUsersAction(error.message));

        })
    }
}
export function getAllUserAction() {
    return (dispatch) => {
        userService.getallUsers().then((response)=>{
            console.log(response);
            dispatch(confirmedGetAllUsersAction(response.data));
        })
        .catch((error)=>{
            console.log(error);
            swal("Başarısız", "kullanıcılar Getirilemedi", "error", { button: "Tamam!", });
            dispatch(failedGetAllUsersAction(error.message));

        })
    }
}
export function updateUserAction(userId,user) {
    return (dispatch) => {
        userService.updateUser(userId,user).then((response)=>{
            swal("Başarılı", "User Güncellendi", "success", { button: "Tamam!", });
            console.log(response);
            dispatch(confirmedUpdateUsersAction(response.data));
            dispatch(getAllUserPaginatedAction())
        })
        .catch((error)=>{
            console.log(error);
            swal("Başarısız", "Veri Getirilemedi", "error", { button: "Tamam!", });
            dispatch(failedUpdateUsersAction(error.message));
            dispatch(getAllUserPaginatedAction())
        })
    }
}

export function deleteUserAction(userId) {
    return (dispatch) => {
        userService.deleteUser(userId).then((response)=>{
            swal("Başarılı", "User Silindi", "success", { button: "Tamam!", });
            console.log(response);
            dispatch(confirmedDeleteUsersAction({userId:userId}));
            dispatch(getAllUserPaginatedAction())
        })
        .catch((error)=>{
            console.log(error);
            swal("Başarısız", "User Silinemedi", "error", { button: "Tamam!", });
            dispatch(failedDeleteUsersAction(error.message));
            dispatch(getAllUserPaginatedAction())

        })
    }
}
export function createUserAction(user) {
    return (dispatch) => {
        userService.createUser(user).then((response)=>{
            swal("Başarılı", "User Eklendi", "success", { button: "Tamam!", });
            console.log(response);
            dispatch(confirmedAddUsersAction(response.data));
            dispatch(getAllUserPaginatedAction())
        })
        .catch((error)=>{
            console.log(error);
            swal("Başarısız", "User Eklenemedi", "error", { button: "Tamam!", });
            dispatch(failedAddUsersAction(error.message));
            dispatch(getAllUserPaginatedAction())

        })
    }
}

export const confirmedAddUsersAction = (data)=>{
    return {
        type: USER_ADD_SUCCESS_ACTION,
        payload: data
    }
}

export const failedAddUsersAction = (data)=>{
    return {
        type: USER_ADD_FAILED_ACTION,
        payload: data
    }
}
export const confirmedGetAllUsersAction = (data)=>{
    return {
        type: USER_LIST_SUCCESS_ACTION,
        payload: data
    }
}

export const failedGetAllUsersAction = (data)=>{
    return {
        type: USER_LIST_FAILED_ACTION,
        payload: data
    }
}
export const confirmedGetAllPaginatedUsersAction = (data)=>{
    return {
        type: USER_LIST_PAGINATED_SUCCESS_ACTION,
        payload: data
    }
}

export const failedGetAllPaginatedUsersAction = (data)=>{
    return {
        type: USER_LIST_PAGINATED_FAILED_ACTION,
        payload: data
    }
}
export const confirmedUpdateUsersAction = (data)=>{
    return {
        type: USER_UPDATE_SUCCESS_ACTION,
        payload: data
    }
}

export const failedUpdateUsersAction = (data)=>{
    return {
        type: USER_UPDATE_FAILED_ACTION,
        payload: data
    }
}

export const confirmedDeleteUsersAction = (data)=>{
    return {
        type: USER_DELETE_SUCCESS_ACTION,
        payload: data
    }
}

export const failedDeleteUsersAction = (data)=>{
    return {
        type: USER_DELETE_FAILED_ACTION,
        payload: data
    }
}