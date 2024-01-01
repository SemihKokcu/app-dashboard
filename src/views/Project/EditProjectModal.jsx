import React, { useEffect } from "react";
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
import { useFormik } from "formik";
import * as Yup from "yup";

const EditProjectModal = ({
  isOpen,
  toggleEditProjectModal,
  categoryList,
  selectedProjectForEdit,
  dispatchUpdateProject,
}) => {

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
  useEffect(() => {
    formik.setValues({
      name: selectedProjectForEdit?.name,
      descp: selectedProjectForEdit?.descp,
      author: selectedProjectForEdit?.author,
      status: selectedProjectForEdit?.status,
    });
  }, [selectedProjectForEdit]);

  const handleUpdateImageChange = (e) => {
    const files = Array.from(e.target.files);
    formik.setFieldValue("images", files);
  };
  const validationSchemaForEdit = Yup.object().shape({
    name: Yup.string().required("Proje adı zorunlu."),
    descp: Yup.string().required("Açıklama zorunlu"),
    author: Yup.string().required("Proje sahibi zorunlu."),
    status: Yup.string().required("Proje Durumu."),
  });

  const formik = useFormik({
    initialValues: {
      name: selectedProjectForEdit ? selectedProjectForEdit?.name : "",
      descp: selectedProjectForEdit ? selectedProjectForEdit?.descp : "",
      author: selectedProjectForEdit ? selectedProjectForEdit?.author : null,
      status: selectedProjectForEdit ? selectedProjectForEdit?.status : null,
      images: [],
    },
    validationSchema: validationSchemaForEdit,
    onSubmit: (values) => {
      console.log("Updated values:", values);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("descp", values.descp);
      formData.append("author", values.author);
      formData.append("status", values.status);
      values.images?.map((image) => {
        formData.append("images", image);
      });
      dispatchUpdateProject(selectedProjectForEdit._id, formData);
      formik.resetForm();
      toggleEditProjectModal();
    },
  });

  return (
    <Modal isOpen={isOpen} toggle={toggleEditProjectModal} size="lg">
      <ModalHeader toggle={toggleEditProjectModal}>Proje Düzenle</ModalHeader>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <ModalBody style={{ maxHeight: "500px", overflowY: "auto" }}>
          {/* Form inputs */}
          <FormGroup>
            <label htmlFor="name">Proje Adı</label>
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
            <label htmlFor="descp">Açıklama</label>
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
              onChange={handleUpdateImageChange}
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
          <Button color="secondary" onClick={toggleEditProjectModal}>
            Kapat
          </Button>
          <Button color="primary" type="submit">
            Projeü Güncelle
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default EditProjectModal;
