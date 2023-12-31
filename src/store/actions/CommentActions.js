import { toast } from "react-toastify";
import { commentsService } from "../../services/CommentService";
import {
    COMMENT_ADD_SUCCESS_ACTION,
    COMMENT_ADD_FAILED_ACTION,
    COMMENT_LIST_SUCCESS_ACTION,
    COMMENT_LIST_FAILED_ACTION,
    COMMENT_UPDATE_SUCCESS_ACTION,
    COMMENT_UPDATE_FAILED_ACTION,
    COMMENT_DELETE_FAILED_ACTION,
    COMMENT_DELETE_SUCCESS_ACTION
} 
    from "../types/CommentTypes";
import swal from "sweetalert";

export function getAllCommentsAction(currentPage=1,perPage=5) {
    return (dispatch) => {
        commentsService.getAllComments(currentPage,perPage).then((response)=>{
            console.log(response);
            dispatch(confirmedGetAllCommentsAction(response.data));
        })
        .catch((error)=>{
            console.log(error);
            swal("Başarısız", "Veri Getirilemedi", "error", { button: "Tamam!", });
            dispatch(failedGetAllCommentsAction(error.message));

        })
    }
}
export function createCommentAction(data) {
    return (dispatch) => {
        commentsService.createComment(data).then((response)=>{
            console.log(response);
            toast.success("Yorum eklendi")
            dispatch(confirmedCreateCommentAction(response.data));

        })
        .catch((error)=>{
            console.log(error);
            swal("Başarısız", "Veri Eklenemedi", "error", { button: "Tamam!", });
            dispatch(failedCreateCommentAction(error.message));
 
        })
    }
}
export function updateCommentAction(comment,id) {
    return (dispatch) => {
        commentsService.updateComment(comment,id).then((response)=>{
            swal("Başarılı", "Yorum Güncellendi", "success", { button: "Tamam!", });
            console.log(response);
            dispatch(confirmedUpdateCommentsAction(response.data));
            dispatch(getAllCommentsAction())
        })
        .catch((error)=>{
            console.log(error);
            swal("Başarısız", "Veri Getirilemedi", "error", { button: "Tamam!", });
            dispatch(failedUpdateCommentsAction(error.message));
            dispatch(getAllCommentsAction())

        })
    }
}
 export function deleteCommentAction(commentId) {
    return (dispatch) => {
        commentsService.deleteComment(commentId).then((response)=>{
            swal("Başarılı", "Yorum silindi", "success", { button: "Tamam!", });
            console.log(response);
            dispatch(confirmedDeleteCommentsAction({commentId:commentId}));
            dispatch(getAllCommentsAction())
        })
        .catch((error)=>{
            console.log(error);
            swal("Başarısız", "Veri Getirilemedi", "error", { button: "Tamam!", });
            dispatch(failedDeleteCommentsAction(error.message));
            dispatch(getAllCommentsAction())

        })
    }
}

const confirmedCreateCommentAction = (data)=>{
    return {
        type: COMMENT_ADD_SUCCESS_ACTION,
        payload: data
    }
}

 const failedCreateCommentAction = (data)=>{
    return {
        type: COMMENT_ADD_FAILED_ACTION,
        payload: data
    }
}
 const confirmedGetAllCommentsAction = (data)=>{
    return {
        type: COMMENT_LIST_SUCCESS_ACTION,
        payload: data
    }
}

 const failedGetAllCommentsAction = (data)=>{
    return {
        type: COMMENT_LIST_FAILED_ACTION,
        payload: data
    }
}
 const confirmedUpdateCommentsAction = (data)=>{
    return {
        type: COMMENT_UPDATE_SUCCESS_ACTION,
        payload: data
    }
}

 const failedUpdateCommentsAction = (data)=>{
    return {
        type: COMMENT_UPDATE_FAILED_ACTION,
        payload: data
    }
}

 const confirmedDeleteCommentsAction = (data)=>{
    return {
        type: COMMENT_DELETE_SUCCESS_ACTION,
        payload: data
    }
}

 const failedDeleteCommentsAction = (data)=>{
    return {
        type: COMMENT_DELETE_FAILED_ACTION,
        payload: data
    }
}