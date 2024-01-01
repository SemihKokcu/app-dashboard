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

const AddProductModal = ({ isOpen, toggleAddProductModal,dispatchAddProduct ,categoryList}) => {
  
  const initialValues = {
    name: "",
    descp: "",
    price: null,
    stock: null,
    isActive: false,
    images: [],
    categoryId: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Ürün adı zorunlu."),
    descp: Yup.string().required("Açıklama zorunlu"),
    price: Yup.number().required("Fiyat zorunlu."),
    stock: Yup.number().required("Stok zorunlu."),
    isActive: Yup.boolean(),
    images: Yup.array().required("Ürün resmi zorunlu."),
    categoryId: Yup.string().required("Kategori zorunlu."),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (!values.images || values.images.length === 0) {
        formik.setFieldError("images", "Ürün resmi zorunlu.");
        return;
      }
      console.log(values);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("descp", values.descp);
      formData.append("price", values.price);
      formData.append("stock", values.stock);
      formData.append("isActive", values.isActive);
      formData.append("categoryId", values.categoryId);
       // eslint-disable-next-line
      values.images.map((image) => {
        formData.append("images", image);
      });
      dispatchAddProduct(formData);
      formik.resetForm();
      toggleAddProductModal();
    },
  });
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    formik.setFieldValue("images", files);
  };
  return (
    <>
      <Modal isOpen={isOpen} toggle={toggleAddProductModal} size="lg">
        <ModalHeader toggle={toggleAddProductModal}>Ürün Ekle</ModalHeader>
        <Form onSubmit={formik.handleSubmit}>
          <ModalBody style={{ maxHeight: "500px", overflowY: "auto" }}>
            <FormGroup>
              <label htmlFor="descp">Ürün Adı</label>
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
              <label htmlFor="price">Fiyat</label>
              <Input
                type="number"
                id="price"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
              />
              {formik.errors.price && formik.touched.price && (
                <div className="text-danger">{formik.errors.price}</div>
              )}
            </FormGroup>
            <FormGroup>
              <label htmlFor="stock">Stok</label>
              <Input
                type="number"
                id="stock"
                name="stock"
                value={formik.values.stock}
                onChange={formik.handleChange}
              />
              {formik.errors.stock && formik.touched.stock && (
                <div className="text-danger">{formik.errors.stock}</div>
              )}
            </FormGroup>
            <FormGroup>
              <label htmlFor="categoryId">Kategori</label>
              <Input
                type="select"
                id="categoryId"
                name="categoryId"
                value={formik.values.categoryId._id}
                onChange={formik.handleChange}
              >
                <option value="" label="Seçiniz" />
                {categoryList.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Input>
              {formik.errors.categoryId && formik.touched.categoryId && (
                <div className="text-danger">{formik.errors.categoryId}</div>
              )}
            </FormGroup>

            <FormGroup>
              <label htmlFor="images">Ürün Resmi</label>
              <Input
                type="file"
                id="images"
                name="images"
                onChange={handleImageChange}
                multiple
              />
              {formik.errors.images && formik.touched.images && (
                <div className="text-danger">{formik.errors.images}</div>
              )}
            </FormGroup>
            <FormGroup>
              <label htmlFor="stock">Ürün aktif mi? </label>
              <Input
                className="mx-3"
                type="checkbox"
                id="isActive"
                name="isActive"
                value={formik.values.isActive}
                onChange={formik.handleChange}
              />
              {formik.errors.isActive && formik.touched.isActive && (
                <div className="text-danger">{formik.errors.isActive}</div>
              )}
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleAddProductModal}>
              Kapat
            </Button>
            <Button color="primary" type="submit">
              Ürün Ekle
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

export default AddProductModal;
