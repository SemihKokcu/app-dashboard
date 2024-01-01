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

const EditProductModal = ({
  isOpen,
  toggleEditProductModal,
  categoryList,
  selectedProductForEdit,
  dispatchUpdateProduct,
}) => {
  useEffect(() => {
    formikForUpdate.setValues({
      name: selectedProductForEdit?.name,
      descp: selectedProductForEdit?.descp,
      price: selectedProductForEdit?.price,
      stock: selectedProductForEdit?.stock,
      categoryId: selectedProductForEdit?.categoryId._id,
      isActive: selectedProductForEdit?.isActive,
    });
  }, [selectedProductForEdit]);

  const handleUpdateImageChange = (e) => {
    const files = Array.from(e.target.files);
    formikForUpdate.setFieldValue("images", files);
  };
  const validationSchemaForEdit = Yup.object().shape({
    name: Yup.string().required("Ürün adı zorunlu."),
    descp: Yup.string().required("Açıklama zorunlu"),
    price: Yup.number().required("Fiyat zorunlu."),
    stock: Yup.number().required("Stok zorunlu."),
    isActive: Yup.boolean(),
    categoryId: Yup.string().required("Kategori zorunlu."),
  });

  const formikForUpdate = useFormik({
    initialValues: {
      name: selectedProductForEdit ? selectedProductForEdit?.name : "",
      descp: selectedProductForEdit ? selectedProductForEdit?.descp : "",
      price: selectedProductForEdit ? selectedProductForEdit?.price : null,
      stock: selectedProductForEdit ? selectedProductForEdit?.stock : null,
      categoryId: selectedProductForEdit
        ? selectedProductForEdit?.categoryId._id
        : "",
      isActive: selectedProductForEdit
        ? selectedProductForEdit?.isActive
        : false,
      images: [],
    },
    validationSchema: validationSchemaForEdit,
    onSubmit: (values) => {
      console.log("Updated values:", values);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("descp", values.descp);
      formData.append("price", values.price);
      formData.append("stock", values.stock);
      formData.append("isActive", values.isActive);
      formData.append("categoryId", values.categoryId);
      values.images?.map((image) => {
        formData.append("images", image);
      });

      dispatchUpdateProduct(selectedProductForEdit._id, formData);
      formikForUpdate.resetForm();
      toggleEditProductModal();
    },
  });

  return (
    <Modal isOpen={isOpen} toggle={toggleEditProductModal} size="lg">
      <ModalHeader toggle={toggleEditProductModal}>Ürün Düzenle</ModalHeader>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          formikForUpdate.handleSubmit();
        }}
      >
        <ModalBody style={{ maxHeight: "500px", overflowY: "auto" }}>
          {/* Form inputs */}
          <FormGroup>
            <label htmlFor="name">Ürün Adı</label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formikForUpdate.values.name}
              onChange={formikForUpdate.handleChange}
            />
            {formikForUpdate.errors.name && formikForUpdate.touched.name && (
              <div className="text-danger">{formikForUpdate.errors.name}</div>
            )}
          </FormGroup>

          <FormGroup>
            <label htmlFor="descp">Açıklama</label>
            <Input
              type="text"
              id="descp"
              name="descp"
              value={formikForUpdate.values.descp}
              onChange={formikForUpdate.handleChange}
            />
            {formikForUpdate.errors.descp && formikForUpdate.touched.descp && (
              <div className="text-danger">{formikForUpdate.errors.descp}</div>
            )}
          </FormGroup>

          <FormGroup>
            <label htmlFor="price">Fiyat</label>
            <Input
              type="number"
              id="price"
              name="price"
              value={formikForUpdate.values.price}
              onChange={formikForUpdate.handleChange}
            />
            {formikForUpdate.errors.price && formikForUpdate.touched.price && (
              <div className="text-danger">{formikForUpdate.errors.price}</div>
            )}
          </FormGroup>
          <FormGroup>
            <label htmlFor="price">Stok</label>
            <Input
              type="number"
              id="stock"
              name="stock"
              value={formikForUpdate.values.stock}
              onChange={formikForUpdate.handleChange}
            />
            {formikForUpdate.errors.stock && formikForUpdate.touched.stock && (
              <div className="text-danger">{formikForUpdate.errors.stock}</div>
            )}
          </FormGroup>
          <FormGroup>
            <label htmlFor="categoryId">Kategori</label>
            <Input
              type="select"
              id="categoryId"
              name="categoryId"
              value={formikForUpdate.values.categoryId}
              onChange={formikForUpdate.handleChange}
            >
              <option value="" label="Seçiniz" />
              {categoryList.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </Input>
            {formikForUpdate.errors.categoryId &&
              formikForUpdate.touched.categoryId && (
                <div className="text-danger">
                  {formikForUpdate.errors.categoryId}
                </div>
              )}
          </FormGroup>

          <FormGroup>
            <label htmlFor="images">Ürün Resmi</label>
            <Input
              type="file"
              id="images"
              name="images"
              onChange={handleUpdateImageChange}
              multiple
            />
            {formikForUpdate.errors.images &&
              formikForUpdate.touched.images && (
                <div className="text-danger">
                  {formikForUpdate.errors.images}
                </div>
              )}
          </FormGroup>
          <FormGroup>
            <label htmlFor="stock">Ürün aktif mi? </label>
            <Input
              className="mx-3"
              type="checkbox"
              id="isActive"
              name="isActive"
              value={formikForUpdate.values.isActive}
              onChange={formikForUpdate.handleChange}
              checked={formikForUpdate.values.isActive}
            />
            {formikForUpdate.errors.isActive &&
              formikForUpdate.touched.isActive && (
                <div className="text-danger">
                  {formikForUpdate.errors.isActive}
                </div>
              )}
          </FormGroup>
          {/* Add other form fields with validation as needed */}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleEditProductModal}>
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

export default EditProductModal;
