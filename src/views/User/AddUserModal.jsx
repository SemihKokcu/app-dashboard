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
  Label,
  Input,
} from "reactstrap";

const AddProjectModal = ({ isOpen, toggleAddUserModal, dispatchAddPUser, roleList }) => {
  const initialValues = {
    email: "",
    password: "",
    name: "",
    surname: "",
    twoFactor: false,
    phoneNumber: "",
    emailVerified: false,
    phoneVerified: false,
    roles: [],
    profileImage: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("E-posta zorunlu.").email("Geçerli bir e-posta adresi giriniz."),
    password: Yup.string().required("Şifre zorunlu."),
    name: Yup.string().required("İsim zorunlu."),
    surname: Yup.string().required("Soyisim zorunlu."),
    phoneNumber: Yup.string().nullable(),
    roles: Yup.array(),
    profileImage: Yup.string().nullable(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("name", values.name);
      formData.append("surname", values.surname);
      formData.append("phoneNumber", values.phoneNumber);
      values.roles.map((role)=>{
        formData.append("roles[]", role);
      })
      formData.append("image", values.profileImage);
      dispatchAddPUser(formData)
      // ...
    },
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    formik.setFieldValue("profileImage", files[0]); // Assuming only one file for profile image
  };

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggleAddUserModal} size="lg">
        <ModalHeader toggle={toggleAddUserModal}>Kullanıcı Ekle</ModalHeader>
        <Form onSubmit={formik.handleSubmit}>
          <ModalBody style={{ maxHeight: "500px", overflowY: "auto" }}>
            <FormGroup>
              <Label for="email">E-posta</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email && (
                <div className="text-danger">{formik.errors.email}</div>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="password">Şifre</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password && formik.touched.password && (
                <div className="text-danger">{formik.errors.password}</div>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="name">İsim</Label>
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
              <Label for="surname">Soyisim</Label>
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
                type="tel"
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
                value={formik.values.roles}
                onChange={formik.handleChange}
                multiple
              >
                {roleList.map((role) => (
                  <option key={role._id} value={role._id}>
                    {role.name}
                  </option>
                ))}
              </Input>
              {formik.errors.roles && formik.touched.roles && (
                <div className="text-danger">{formik.errors.roles}</div>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="profileImage">Profil Resmi</Label>
              <Input
                type="file"
                id="profileImage"
                name="profileImage"
                onChange={handleImageChange}
              />
              {formik.errors.profileImage && formik.touched.profileImage && (
                <div className="text-danger">{formik.errors.profileImage}</div>
              )}
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleAddUserModal}>
              Kapat
            </Button>
            <Button color="primary" type="submit">
              Kullanıcı Ekle
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

export default AddProjectModal;
