import { productService } from "../../services/ProductService";
import {PRODUCT_ADD_SUCCESS_ACTION,
    PRODUCT_ADD_FAILED_ACTION,
    PRODUCT_LIST_SUCCESS_ACTION,
    PRODUCT_LIST_FAILED_ACTION,
    PRODUCT_UPDATE_SUCCESS_ACTION,
    PRODUCT_UPDATE_FAILED_ACTION,
    PRODUCT_DELETE_SUCCESS_ACTION,
    PRODUCT_DELETE_FAILED_ACTION

} 
    from "../types/ProductTypes";
import swal from "sweetalert";

export function getAllProductAction(page=1,limit=5) {
    return (dispatch) => {
        productService.getAllProductPaginated(page,limit).then((response)=>{
            console.log(response);
            dispatch(confirmedGetAllProductsAction(response.data));
            
        })
        .catch((error)=>{
            console.log(error);
            swal("Başarısız", "ürünler Getirilemedi", "error", { button: "Tamam!", });
            dispatch(failedGetAllProductsAction(error.message));

        })
    }
}

export function updateProductAction(productId,product) {
    return (dispatch) => {
        productService.updateProduct(productId,product).then((response)=>{
            swal("Başarılı", "Ürün Güncellendi", "success", { button: "Tamam!", });
            console.log(response);
            dispatch(confirmedUpdateProductsAction(response.data));
            dispatch(getAllProductAction());
        })
        .catch((error)=>{
            console.log(error);
            swal("Başarısız", "Veri Getirilemedi", "error", { button: "Tamam!", });
            dispatch(failedUpdateProductsAction(error.message));

        })
    }
}

export function deleteProductAction(productId) {
    return (dispatch) => {
        productService.deleteProduct(productId).then((response)=>{
            swal("Başarılı", "Ürün Silindi", "success", { button: "Tamam!", });
            console.log(response);
            dispatch(confirmedDeleteProductsAction());
            dispatch(getAllProductAction());
        })
        .catch((error)=>{
            console.log(error);
            swal("Başarısız", "Ürün Silinemedi", "error", { button: "Tamam!", });
            dispatch(failedDeleteProductsAction(error.message));
            dispatch(getAllProductAction());

        })
    }
}
export function createProductAction(product) {
    return (dispatch) => {
        productService.createProduct(product).then((response)=>{
            swal("Başarılı", "Ürün Eklendi", "success", { button: "Tamam!", });
            console.log(response);
            dispatch(confirmedAddProductsAction(response.data));
            dispatch(getAllProductAction());
        })
        .catch((error)=>{
            console.log(error);
            swal("Başarısız", "Ürün Eklenemedi", "error", { button: "Tamam!", });
            dispatch(failedAddProductsAction(error.message));

        })
    }
}

export const confirmedAddProductsAction = (data)=>{
    return {
        type: PRODUCT_ADD_SUCCESS_ACTION,
        payload: data
    }
}

export const failedAddProductsAction = (data)=>{
    return {
        type: PRODUCT_ADD_FAILED_ACTION,
        payload: data
    }
}
export const confirmedGetAllProductsAction = (data)=>{
    return {
        type: PRODUCT_LIST_SUCCESS_ACTION,
        payload: data
    }
}

export const failedGetAllProductsAction = (data)=>{
    return {
        type: PRODUCT_LIST_FAILED_ACTION,
        payload: data
    }
}
export const confirmedUpdateProductsAction = (data)=>{
    return {
        type: PRODUCT_UPDATE_SUCCESS_ACTION,
        payload: data
    }
}

export const failedUpdateProductsAction = (data)=>{
    return {
        type: PRODUCT_UPDATE_FAILED_ACTION,
        payload: data
    }
}

export const confirmedDeleteProductsAction = (data)=>{
    return {
        type: PRODUCT_DELETE_SUCCESS_ACTION,
        payload: data
    }
}

export const failedDeleteProductsAction = (data)=>{
    return {
        type: PRODUCT_DELETE_FAILED_ACTION,
        payload: data
    }
}