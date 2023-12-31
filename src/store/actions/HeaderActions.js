import { headerService } from "../../services/HeaderService";
import {HEADER_ADD_SUCCESS_ACTION,
    HEADER_ADD_FAILED_ACTION,
    HEADER_LIST_SUCCESS_ACTION,
    HEADER_LIST_FAILED_ACTION,
    HEADER_UPDATE_SUCCESS_ACTION,
    HEADER_UPDATE_FAILED_ACTION,
    HEADER_DELETE_SUCCESS_ACTION,
    HEADER_DELETE_FAILED_ACTION

} 
    from "../types/HeaderTypes";
import swal from "sweetalert";

export function getAllHeaderAction(currentPage=1,perPage=5) {
    return (dispatch) => {
        headerService.getAllHeaders(currentPage,perPage).then((response)=>{
            console.log(response);
            dispatch(confirmedGetAllHeadersAction(response.data));
        })
        .catch((error)=>{
            console.log(error);
            swal("Başarısız", "projeler Getirilemedi", "error", { button: "Tamam!", });
            dispatch(failedGetAllHeadersAction(error.message));

        })
    }
}

export function updateHeaderAction(headerId,header) {
    return (dispatch) => {
        headerService.updateHeader(headerId,header).then((response)=>{
            swal("Başarılı", "Başlık  Güncellendi", "success", { button: "Tamam!", });
            console.log(response);

            dispatch(confirmedUpdateHeadersAction(response.data));
            dispatch(getAllHeaderAction());
        })
        .catch((error)=>{
            console.log(error);
            swal("Başarısız", "Veri Getirilemedi", "error", { button: "Tamam!", });
            dispatch(failedUpdateHeadersAction(error.message));

        })
    }
}

export function deleteHeaderAction(headerId) {
    return (dispatch) => {
        headerService.deleteHeader(headerId).then((response)=>{
            swal("Başarılı", "Başlık  Silindi", "success", { button: "Tamam!", });
            console.log(response);
           
            dispatch(confirmedDeleteHeadersAction({headerId:headerId}));
            dispatch(getAllHeaderAction());
        })
        .catch((error)=>{
            console.log(error);
            swal("Başarısız", "Başlık  Silinemedi", "error", { button: "Tamam!", });
            dispatch(failedDeleteHeadersAction(error.message));
            dispatch(getAllHeaderAction());

        })
    }
}
export function createHeaderAction(header) {
    console.log(header);
    return (dispatch) => {
        headerService.createHeader(header).then((response)=>{
            swal("Başarılı", "Başlık  Eklendi", "success", { button: "Tamam!", });
            console.log(response);
            dispatch(confirmedAddHeadersAction(response.data));
            dispatch(getAllHeaderAction());

        })
        .catch((error)=>{
            console.log(error);
            swal("Başarısız", "Lütfen 1 Adet Resim Ekleyiniz", "error", { button: "Tamam!", });
            dispatch(failedAddHeadersAction(error.message));

        })
    }
}

export const confirmedAddHeadersAction = (data)=>{
    return {
        type: HEADER_ADD_SUCCESS_ACTION,
        payload: data
    }
}

export const failedAddHeadersAction = (data)=>{
    return {
        type: HEADER_ADD_FAILED_ACTION,
        payload: data
    }
}
export const confirmedGetAllHeadersAction = (data)=>{
    return {
        type: HEADER_LIST_SUCCESS_ACTION,
        payload: data
    }
}

export const failedGetAllHeadersAction = (data)=>{
    return {
        type: HEADER_LIST_FAILED_ACTION,
        payload: data
    }
}
export const confirmedUpdateHeadersAction = (data)=>{
    return {
        type: HEADER_UPDATE_SUCCESS_ACTION,
        payload: data
    }
}

export const failedUpdateHeadersAction = (data)=>{
    return {
        type: HEADER_UPDATE_FAILED_ACTION,
        payload: data
    }
}

export const confirmedDeleteHeadersAction = (data)=>{
    return {
        type: HEADER_DELETE_SUCCESS_ACTION,
        payload: data
    }
}

export const failedDeleteHeadersAction = (data)=>{
    return {
        type: HEADER_DELETE_FAILED_ACTION,
        payload: data
    }
}