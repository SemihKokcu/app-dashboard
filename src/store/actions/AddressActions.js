import { toast } from "react-toastify";
import { addressService } from "../../services/AddressService";
import {
    ADDRESS_ADD_SUCCESS_ACTION,
    ADDRESS_ADD_FAILED_ACTION,
    ADDRESS_LIST_SUCCESS_ACTION,
    ADDRESS_LIST_FAILED_ACTION,
    ADDRESS_UPDATE_SUCCESS_ACTION,
    ADDRESS_UPDATE_FAILED_ACTION,
    ADDRESS_DELETE_FAILED_ACTION,
    ADDRESS_DELETE_SUCCESS_ACTION,
    ADDRESS_LIST_PAGINATED_FAILED_ACTION,
    ADDRESS_LIST_PAGINATED_SUCCESS_ACTION
} 
    from "../types/AddressTypes";
import swal from "sweetalert";

export function getAllAddresssPaginatedAction(currentPage=1,perPage=5) {
    return (dispatch) => {
        addressService.getAllAddresssPaginated(currentPage,perPage).then((response)=>{
            console.log(response);
            dispatch(confirmedGetAllAddressPaginatedAction(response.data));
        })
        .catch((error)=>{
            console.log(error);
            swal("Başarısız", "Veri Getirilemedi", "error", { button: "Tamam!", });
            dispatch(failedGetAllAddressPaginatedAction(error.message));

        })
    }
}
export function getAllAddresssAction(currentPage=1,perPage=5) {
    return (dispatch) => {
        addressService.getAllAddresss().then((response)=>{
            console.log(response);
            dispatch(confirmedGetAllAddresssAction(response.data));
        })
        .catch((error)=>{
            console.log(error);
            swal("Başarısız", "Veri Getirilemedi", "error", { button: "Tamam!", });
            dispatch(failedGetAllAddresssAction(error.message));

        })
    }
}
export function createAddressAction(data) {
    return (dispatch) => {
        addressService.createAddress(data).then((response)=>{
            console.log(response);
            toast.success("Adres eklendi")
            dispatch(confirmedCreateAddressAction(response.data));

        })
        .catch((error)=>{
            console.log(error);
            swal("Başarısız", "Veri Eklenemedi", "error", { button: "Tamam!", });
            dispatch(failedCreateAddressAction(error.message));
 
        })
    }
}
export function updateAddressAction(address,id) {
    return (dispatch) => {
        addressService.updateAddress(address,id).then((response)=>{
            swal("Başarılı", "Adres Güncellendi", "success", { button: "Tamam!", });
            console.log(response);
            dispatch(confirmedUpdateAddresssAction(response.data));
            dispatch(getAllAddresssAction())
        })
        .catch((error)=>{
            console.log(error);
            swal("Başarısız", "Veri Getirilemedi", "error", { button: "Tamam!", });
            dispatch(failedUpdateAddresssAction(error.message));
            dispatch(getAllAddresssAction())

        })
    }
}
 export function deleteAddressAction(addressId) {
    return (dispatch) => {
        addressService.deleteAddress(addressId).then((response)=>{
            swal("Başarılı", "Adres silindi", "success", { button: "Tamam!", });
            console.log(response);
            dispatch(confirmedDeleteAddresssAction({addressId:addressId}));
            dispatch(getAllAddresssAction())
        })
        .catch((error)=>{
            console.log(error);
            swal("Başarısız", "Veri Getirilemedi", "error", { button: "Tamam!", });
            dispatch(failedDeleteAddresssAction(error.message));
            dispatch(getAllAddresssAction())

        })
    }
}

const confirmedCreateAddressAction = (data)=>{
    return {
        type: ADDRESS_ADD_SUCCESS_ACTION,
        payload: data
    }
}

 const failedCreateAddressAction = (data)=>{
    return {
        type: ADDRESS_ADD_FAILED_ACTION,
        payload: data
    }
}
 const confirmedGetAllAddresssAction = (data)=>{
    return {
        type: ADDRESS_LIST_SUCCESS_ACTION,
        payload: data
    }
}

 const failedGetAllAddresssAction = (data)=>{
    return {
        type: ADDRESS_LIST_FAILED_ACTION,
        payload: data
    }
}

const confirmedGetAllAddressPaginatedAction = (data)=>{
    return {
        type: ADDRESS_LIST_PAGINATED_SUCCESS_ACTION,
        payload: data
    }
}

 const failedGetAllAddresPaginatedAction = (data)=>{
    return {
        type: ADDRESS_LIST_PAGINATED_FAILED_ACTION,
        payload: data
    }
}
 const confirmedUpdateAddresssAction = (data)=>{
    return {
        type: ADDRESS_UPDATE_SUCCESS_ACTION,
        payload: data
    }
}

 const failedUpdateAddresssAction = (data)=>{
    return {
        type: ADDRESS_UPDATE_FAILED_ACTION,
        payload: data
    }
}

 const confirmedDeleteAddresssAction = (data)=>{
    return {
        type: ADDRESS_DELETE_SUCCESS_ACTION,
        payload: data
    }
}

 const failedDeleteAddresssAction = (data)=>{
    return {
        type: ADDRESS_DELETE_FAILED_ACTION,
        payload: data
    }
}