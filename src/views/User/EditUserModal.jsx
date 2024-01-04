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
  Label,
} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

const EditUserModal = ({
  isOpen,
  toggleEditUserModal,
  roleList,
  selectedUserForEdit,
  dispatchUpdateUser,
}) => {
  useEffect(() => {
    formik.setValues({
      name: selectedUserForEdit?.name,
      surname: selectedUserForEdit?.surname,
      twoFactor: selectedUserForEdit?.twoFactor,
      phoneNumber: selectedUserForEdit?.phoneNumber,
      roles: selectedUserForEdit?.roles?.map(role => role._id) || [],
      phoneVerified: selectedUserForEdit?.phoneVerified,
      emailVerified: selectedUserForEdit?.emailVerified,
    });
  }, [selectedUserForEdit]);

   const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    formik.setFieldValue("image", files[0]); // Assuming only one file for profile image
  };
  const validationSchemaForEdit = Yup.object().shape({
    name: Yup.string().required("İsim zorunlu."),
    surname: Yup.string().required("Soyisim zorunlu"),
    twoFactor: Yup.boolean(),
    phoneNumber: Yup.string(),
    phoneVerified: Yup.boolean(),
    emailVerified: Yup.boolean(),
    roles: Yup.array().required("Kategori zorunlu."),
  });

  const formik = useFormik({
    initialValues: {
      name: selectedUserForEdit ? selectedUserForEdit?.name : "",
      surname: selectedUserForEdit ? selectedUserForEdit?.surname : "",
      twoFactor: selectedUserForEdit ? selectedUserForEdit?.twoFactor : false,
      phoneNumber: selectedUserForEdit ? selectedUserForEdit?.phoneNumber : null,
      roles: selectedUserForEdit
        ? selectedUserForEdit?.roles?._id
        : "",
      phoneVerified: selectedUserForEdit
        ? selectedUserForEdit?.phoneVerified
        : false,
        emailVerified: selectedUserForEdit
        ? selectedUserForEdit?.emailVerified
        : false,
      image: null,
    },
    validationSchema: validationSchemaForEdit,
    onSubmit: (values) => {
      console.log("Updated values:", values);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("surname", values.surname);
      formData.append("twoFactor", values.twoFactor);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("phoneVerified", values.phoneVerified);
      formData.append("emailVerified", values.emailVerified);
      values.roles.forEach((role) => {
        formData.append("roles[]", role); // append roles as an array
      });
      formData.append("image",values.image);
     console.log(formData);
      dispatchUpdateUser(selectedUserForEdit._id, formData);
      formik.resetForm();
      toggleEditUserModal();
    },
  });

  return (
    <Modal isOpen={isOpen} toggle={toggleEditUserModal} size="lg">
      <ModalHeader toggle={toggleEditUserModal}>Ürün Düzenle</ModalHeader>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <ModalBody style={{ maxHeight: "500px", overflowY: "auto" }}>
          {/* Form inputs */}
          <FormGroup>
            <Label for="name">Ad</Label>
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
            <Label for="surname">Soyad</Label>
            <Input
              type="text"
              id="surname"
              name="surname"
              value={formik.values.surname}
              onChange={formik.handleChange}
            />
            {formik.errors.surname && formik.touched.surname && (
              <div className="text-danger">{formik.errors.surname}</div>
            )}
          </FormGroup>
          
          <FormGroup>
            <Label for="phoneNumber">Telefon Numarası</Label>
            <Input
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
            />
            {formik.errors.phoneNumber && formik.touched.phoneNumber && (
              <div className="text-danger">{formik.errors.phoneNumber}</div>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="roles">Roller</Label>
            <Input
              type="select"
              id="roles"
              name="roles"
              multiple
              value={formik.values.roles}
              onChange={formik.handleChange}
            >
              {roleList.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </Input>
            {formik.errors.roles &&
              formik.touched.roles && (
                <div className="text-danger">
                  {formik.errors.roles}
                </div>
              )}
          </FormGroup>

          <FormGroup>
            <Label for="image">Profil Resmi</Label>
            <Input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
            />
            {formik.errors.image &&
              formik.touched.image && (
                <div className="text-danger">
                  {formik.errors.image}
                </div>
              )}
          </FormGroup>
          
          <FormGroup>
            <Label for="emailVerified">Email Onayı</Label>
            <Input
              className="mx-3"
              type="checkbox"
              id="emailVerified"
              name="emailVerified"
              value={formik.values.emailVerified}
              onChange={formik.handleChange}
              checked={formik.values.emailVerified}
            />
            {formik.errors.emailVerified &&
              formik.touched.emailVerified && (
                <div className="text-danger">
                  {formik.errors.emailVerified}
                </div>
              )}
          </FormGroup>
          <FormGroup>
            <Label for="phoneVerified">Telefon Onayı</Label>
            <Input
              className="mx-3"
              type="checkbox"
              id="phoneVerified"
              name="phoneVerified"
              value={formik.values.phoneVerified}
              onChange={formik.handleChange}
              checked={formik.values.phoneVerified}
            />
            {formik.errors.phoneVerified &&
              formik.touched.phoneVerified && (
                <div className="text-danger">
                  {formik.errors.phoneVerified}
                </div>
              )}
          </FormGroup>
          <FormGroup>
            <Label for="twoFactor">İki Aşamalı Doğrulama</Label>
            <Input
              className="mx-3"
              type="checkbox"
              id="twoFactor"
              name="twoFactor"
              value={formik.values.twoFactor}
              onChange={formik.handleChange}
              checked={formik.values.twoFactor}
            />
            {formik.errors.twoFactor &&
              formik.touched.twoFactor && (
                <div className="text-danger">
                  {formik.errors.twoFactor}
                </div>
              )}
          </FormGroup>
          {/* Diğer form alanları */}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleEditUserModal}>
            Kapat
          </Button>
          <Button color="primary" type="submit">
            Ürünü Güncelle
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default EditUserModal;