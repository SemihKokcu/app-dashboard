import { toast } from "react-toastify";
import { categoryService } from "../../services/CategoryService";
import {
    CATEGORY_ADD_SUCCESS_ACTION,
    CATEGORY_ADD_FAILED_ACTION,
    CATEGORY_LIST_SUCCESS_ACTION,
    CATEGORY_LIST_FAILED_ACTION,
    CATEGORY_UPDATE_SUCCESS_ACTION,
    CATEGORY_UPDATE_FAILED_ACTION,
    CATEGORY_DELETE_FAILED_ACTION,
    CATEGORY_DELETE_SUCCESS_ACTION
} 
    from "../types/CategoryTypes";
import swal from "sweetalert";

export function getAllCategoriesAction() {
    return (dispatch) => {
        categoryService.getAllCategories().then((response)=>{
            console.log(response);
            dispatch(confirmedGetAllCategorysAction(response.data));
        })
        .catch((error)=>{
            console.log(error);
            swal("Başarısız", "Veri Getirilemedi", "error", { button: "Tamam!", });
            dispatch(failedGetAllCategorysAction(error.message));

        })
    }
}
export function createCategoryAction(name) {
    return (dispatch) => {
        categoryService.createCategory(name).then((response)=>{
            console.log(response);
            toast.success("Kategori eklendi")
            dispatch(confirmedCreateCategoryAction(response.data));
        })
        .catch((error)=>{
            console.log(error);
            swal("Başarısız", "Veri Getirilemedi", "error", { button: "Tamam!", });
            dispatch(failedCreateCategoryAction(error.message));

        })
    }
}
export function updateCategoryAction(categoryId,category) {
    return (dispatch) => {
        categoryService.updateCategory(categoryId,{name:category}).then((response)=>{
            swal("Başarılı", "Kategori Güncellendi", "success", { button: "Tamam!", });
            console.log(response);
            dispatch(confirmedUpdateCategorysAction(response.data));
            dispatch(getAllCategoriesAction())
        })
        .catch((error)=>{
            console.log(error);
            swal("Başarısız", "Veri Getirilemedi", "error", { button: "Tamam!", });
            dispatch(failedUpdateCategorysAction(error.message));
            dispatch(getAllCategoriesAction())

        })
    }
}
 export function deleteCategoryAction(categoryId) {
    return (dispatch) => {
        categoryService.deleteCategory(categoryId).then((response)=>{
            swal("Başarılı", "Kategori silindi", "success", { button: "Tamam!", });
            console.log(response);
            dispatch(confirmedDeleteCategorysAction({categoryId:categoryId}));
            dispatch(getAllCategoriesAction())

        })
        .catch((error)=>{
            console.log(error);
            swal("Başarısız", "Veri Getirilemedi", "error", { button: "Tamam!", });
            dispatch(failedDeleteCategorysAction(error.message));
            dispatch(getAllCategoriesAction())

        })
    }
}

const confirmedCreateCategoryAction = (data)=>{
    return {
        type: CATEGORY_ADD_SUCCESS_ACTION,
        payload: data
    }
}

 const failedCreateCategoryAction = (data)=>{
    return {
        type: CATEGORY_ADD_FAILED_ACTION,
        payload: data
    }
}
 const confirmedGetAllCategorysAction = (data)=>{
    return {
        type: CATEGORY_LIST_SUCCESS_ACTION,
        payload: data
    }
}

 const failedGetAllCategorysAction = (data)=>{
    return {
        type: CATEGORY_LIST_FAILED_ACTION,
        payload: data
    }
}
 const confirmedUpdateCategorysAction = (data)=>{
    return {
        type: CATEGORY_UPDATE_SUCCESS_ACTION,
        payload: data
    }
}

 const failedUpdateCategorysAction = (data)=>{
    return {
        type: CATEGORY_UPDATE_FAILED_ACTION,
        payload: data
    }
}

 const confirmedDeleteCategorysAction = (data)=>{
    return {
        type: CATEGORY_DELETE_SUCCESS_ACTION,
        payload: data
    }
}

 const failedDeleteCategorysAction = (data)=>{
    return {
        type: CATEGORY_DELETE_FAILED_ACTION,
        payload: data
    }
}