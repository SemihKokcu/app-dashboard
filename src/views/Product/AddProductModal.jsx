import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductAction,
  createProductAction,
  deleteProductAction,
  updateProductAction,
} from "../../store/actions/ProductAcitons";
import { getAllCategoriesAction } from "../../store/actions/CateogryActions";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Col,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const addProductModal = ()=>{
  const { categoryList } = useSelector((state) => state.categories);
  const [addProductModal, setAddProductModal] = useState(false);
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
          values.images.map((image) => {
            formData.append("images", image);
          });
    
          dispatch(createProductAction(formData));
          formik.resetForm();
          closeModal();
        },
      });

      const toggleAddProductModal = () => {
        setAddProductModal(!addProductModal);
      };
    
      const toggleImageModal = (product) => {
        setSelectedProduct(product);
        setImageModal(!imageModal);
      };
      const closeModal = () => {
        setAddProductModal(false);
      };
    return(
        <>

        </>
    )

}

export default addProductModal;