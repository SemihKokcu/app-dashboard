import { projectService } from "../../services/ProjectService";
import {PROJECT_ADD_SUCCESS_ACTION,
    PROJECT_ADD_FAILED_ACTION,
    PROJECT_LIST_SUCCESS_ACTION,
    PROJECT_LIST_FAILED_ACTION,
    PROJECT_UPDATE_SUCCESS_ACTION,
    PROJECT_UPDATE_FAILED_ACTION,
    PROJECT_DELETE_SUCCESS_ACTION,
    PROJECT_DELETE_FAILED_ACTION

} 
    from "../types/ProjectTypes";
import swal from "sweetalert";

export function getAllProjectAction(currentPage =1,perPage=10) {
    return (dispatch) => {
        projectService.getAllProjects(currentPage,perPage).then((response)=>{
            console.log(response);
            dispatch(confirmedGetAllProjectsAction(response.data));
        })
        .catch((error)=>{
            console.log(error);
            swal("Başarısız", "projeler Getirilemedi", "error", { button: "Tamam!", });
            dispatch(failedGetAllProjectsAction(error.message));

        })
    }
}

export function updateProjectAction(projectId,project) {
    return (dispatch) => {
        projectService.updateProject(projectId,project).then((response)=>{
            swal("Başarılı", "Proje Güncellendi", "success", { button: "Tamam!", });
            console.log(response);
            dispatch(confirmedUpdateProjectsAction(response.data));
            dispatch(getAllProjectAction())
        })
        .catch((error)=>{
            console.log(error);
            swal("Başarısız", "Veri Getirilemedi", "error", { button: "Tamam!", });
            dispatch(failedUpdateProjectsAction(error.message));
            dispatch(getAllProjectAction())
        })
    }
}

export function deleteProjectAction(projectId) {
    return (dispatch) => {
        projectService.deleteProject(projectId).then((response)=>{
            swal("Başarılı", "Proje Silindi", "success", { button: "Tamam!", });
            console.log(response);
            dispatch(confirmedDeleteProjectsAction({projectId:projectId}));
            dispatch(getAllProjectAction())
        })
        .catch((error)=>{
            console.log(error);
            swal("Başarısız", "Proje Silinemedi", "error", { button: "Tamam!", });
            dispatch(failedDeleteProjectsAction(error.message));
            dispatch(getAllProjectAction())

        })
    }
}
export function createProjectAction(project) {
    return (dispatch) => {
        projectService.createProject(project).then((response)=>{
            swal("Başarılı", "Proje Eklendi", "success", { button: "Tamam!", });
            console.log(response);
            dispatch(confirmedAddProjectsAction(response.data));
            dispatch(getAllProjectAction())
        })
        .catch((error)=>{
            console.log(error);
            swal("Başarısız", "Proje Eklenemedi", "error", { button: "Tamam!", });
            dispatch(failedAddProjectsAction(error.message));
            dispatch(getAllProjectAction())

        })
    }
}

export const confirmedAddProjectsAction = (data)=>{
    return {
        type: PROJECT_ADD_SUCCESS_ACTION,
        payload: data
    }
}

export const failedAddProjectsAction = (data)=>{
    return {
        type: PROJECT_ADD_FAILED_ACTION,
        payload: data
    }
}
export const confirmedGetAllProjectsAction = (data)=>{
    return {
        type: PROJECT_LIST_SUCCESS_ACTION,
        payload: data
    }
}

export const failedGetAllProjectsAction = (data)=>{
    return {
        type: PROJECT_LIST_FAILED_ACTION,
        payload: data
    }
}
export const confirmedUpdateProjectsAction = (data)=>{
    return {
        type: PROJECT_UPDATE_SUCCESS_ACTION,
        payload: data
    }
}

export const failedUpdateProjectsAction = (data)=>{
    return {
        type: PROJECT_UPDATE_FAILED_ACTION,
        payload: data
    }
}

export const confirmedDeleteProjectsAction = (data)=>{
    return {
        type: PROJECT_DELETE_SUCCESS_ACTION,
        payload: data
    }
}

export const failedDeleteProjectsAction = (data)=>{
    return {
        type: PROJECT_DELETE_FAILED_ACTION,
        payload: data
    }
}