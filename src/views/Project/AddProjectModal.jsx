import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AddProjectModal = ({ isOpen, toggleAddProjectModal,dispatchAddProject ,categoryList}) => {
  
  const statusList = [
    {
      _id: 1,
      name:"Tamamlandı"
    },
    {
      _id: 2,
      name:"Devam Ediyor"
    }
  ];
  const initialValues = {
    name: "",
    descp: "",
    author: null,
    status: null,
    images: [],
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Proje adı zorunlu."),
    descp: Yup.string().required("Açıklama zorunlu"),
    author: Yup.string().required("Proje Sahibi zorunlu."),
    status: Yup.string().required("Durumu zorunlu."),
    images: Yup.array().required("Proje resmi zorunlu."),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (!values.images || values.images.length === 0) {
        formik.setFieldError("images", "Proje resmi zorunlu.");
        return;
      }
      console.log(values);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("descp", values.descp);
      formData.append("author", values.author);
      formData.append("status", values.status);
       // eslint-disable-next-line
      values.images.map((image) => {
        formData.append("images", image);
      });
      dispatchAddProject(formData);
      formik.resetForm();
      toggleAddProjectModal();
    },
  });
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    formik.setFieldValue("images", files);
  };
  return (
    <>
      <Modal isOpen={isOpen} toggle={toggleAddProjectModal} size="lg">
        <ModalHeader toggle={toggleAddProjectModal}>Proje Ekle</ModalHeader>
        <Form onSubmit={formik.handleSubmit}>
          <ModalBody style={{ maxHeight: "500px", overflowY: "auto" }}>
            <FormGroup>
              <label htmlFor="descp">Proje Adı</label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.errors.name && formik.touched.name && (
                <div className="text-danger">{formik.errors.name}</div>
              )}
            </FormGroup>
            <FormGroup>
              <label htmlFor="name">Açıklama</label>
              <Input
                type="text"
                id="descp"
                name="descp"
                value={formik.values.descp}
                onChange={formik.handleChange}
              />
              {formik.errors.descp && formik.touched.descp && (
                <div className="text-danger">{formik.errors.descp}</div>
              )}
            </FormGroup>

            <FormGroup>
              <label htmlFor="author">Proje Sahibi</label>
              <Input
                type="text"
                id="author"
                name="author"
                value={formik.values.author}
                onChange={formik.handleChange}
              />
              {formik.errors.author && formik.touched.author && (
                <div className="text-danger">{formik.errors.author}</div>
              )}
            </FormGroup>
            <FormGroup>
              <label htmlFor="status">Durumu</label>
              <Input
                type="select"
                id="status"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
              >
                <option value="" label="Seçiniz" />
                {statusList.map((status) => (
                  <option key={status._id} value={status.name}>
                    {status.name}
                  </option>
                ))}
              </Input>
              {formik.errors.status && formik.touched.status && (
                <div className="text-danger">{formik.errors.status}</div>
              )}
            </FormGroup>
            <FormGroup>
            <label htmlFor="images">Proje Resmi</label>
            <Input
              type="file"
              id="images"
              name="images"
              onChange={handleImageChange}
              multiple
            />
            {formik.errors.images &&
              formik.touched.images && (
                <div className="text-danger">
                  {formik.errors.images}
                </div>
              )}
          </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleAddProjectModal}>
              Kapat
            </Button>
            <Button color="primary" type="submit">
              Proje Ekle
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

export default AddProjectModal;
