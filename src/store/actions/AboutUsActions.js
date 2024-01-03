import { aboutUsService } from "../../services/AboutUs"; // aboutUs servisi ile iletişim kurmak için
import swal from "sweetalert";
// Action türleri
export const CREATE_ABOUT_US = 'CREATE_ABOUT_US';
export const GET_ABOUT_US = 'GET_ABOUT_US';
export const UPDATE_ABOUT_US = 'UPDATE_ABOUT_US';

// Action oluşturucular
export const createAboutUs = (aboutUsData) => async (dispatch) => {
  try {
    const response = await aboutUsService.createAboutUs(aboutUsData);
    dispatch({ type: CREATE_ABOUT_US, payload: response.data });
    swal("Başarılı", "Hakkında Oluşturuldu", "success", { button: "Tamam!", });
  } catch (error) {
    console.log(error);
    swal("Başarısız", "Hakkında Oluşturulamadı", "error", { button: "Tamam!", });
  }
};

export const getAboutUs = () => async (dispatch) => {
  try {
    const response = await aboutUsService.getAboutUs();
    dispatch({ type: GET_ABOUT_US, payload: response.data });
  } catch (error) { 
    console.log(error);
  }
};

export const updateAboutUs = (aboutUsContent,id) => async (dispatch) => {
  try {
    const response = await aboutUsService.updateAboutUs(aboutUsContent,id);
    dispatch({ type: UPDATE_ABOUT_US, payload: response.data });
    swal("Başarılı", "Hakkında Güncellendi", "success", { button: "Tamam!", });
    dispatch(getAboutUs());
  } catch (error) {
    console.log(error);
    swal("Başarısız", "Hakkında Güncellendi", "error", { button: "Tamam!", });
    dispatch(getAboutUs());

    // Hata işleme kodu ekleyebilirsiniz.
  }
};
