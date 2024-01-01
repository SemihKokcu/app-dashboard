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

const ProductList = () => {
  const dispatch = useDispatch();
  const { productList, pagination } = useSelector((state) => state.products);
  const { categoryList } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getAllProductAction());
    dispatch(getAllCategoriesAction());
  }, [dispatch]);

  const [addProductModal, setAddProductModal] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editProductModal, setEditProductModal] = useState(false);
  const [selectedProductForEdit, setSelectedProductForEdit] = useState(null);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [productToDeleteId, setProductToDeleteId] = useState(null);
  const toggleEditProductModal = () => {
    setEditProductModal(!editProductModal);
  };

  const openEditModal = (product) => {
    console.log(product);
    setSelectedProductForEdit(product);
    toggleEditProductModal();
  
    // Set the initial values for categoryId and isActive
    formikForUpdate.setValues({
      name: product.name,
      descp: product.descp,
      price: product.price,
      stock: product.stock,
      categoryId: product.categoryId._id,  // Set categoryId to the selected product's categoryId
      isActive: product.isActive,    // Set isActive to the selected product's isActive
    });
  };
  
  const toggleAddProductModal = () => {
    setAddProductModal(!addProductModal);
  };

  const toggleImageModal = (product) => {
    setSelectedProduct(product);
    setImageModal(!imageModal);
  };
  const closeModal = () => {
    setSelectedProduct(null);
    setAddProductModal(false);
    setImageModal(false);
  };
  const closeEditModal = () => {
    setSelectedProduct(null);
    setEditProductModal(false);
  };
  const toggleDeleteConfirmationModal = () => {
    setDeleteConfirmationModal(!deleteConfirmationModal);
  };
  
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

  const validationSchemaForEdit = Yup.object().shape({
    name: Yup.string().required("Ürün adı zorunlu."),
    descp: Yup.string().required("Açıklama zorunlu"),
    price: Yup.number().required("Fiyat zorunlu."),
    stock: Yup.number().required("Stok zorunlu."),
    isActive: Yup.boolean(),
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
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    formik.setFieldValue("images", files);
  };
  const handleUpdateImageChange = (e) => {
    const files = Array.from(e.target.files);

    formikForUpdate.setFieldValue("images", files);
  };
  const handleDelete = (id) => {
    console.log("Deleting product...", productToDeleteId);
    dispatch(deleteProductAction(id));
    toggleDeleteConfirmationModal();
  };
  const renderAddProductForm = () => (
    <Modal isOpen={addProductModal} toggle={closeModal} size="lg">
      <ModalHeader toggle={closeModal}>Ürün Ekle</ModalHeader>
      <Form onSubmit={formik.handleSubmit}>
        <ModalBody style={{ maxHeight: "500px", overflowY: "auto" }}>
          {/* Form inputs */}

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

          {/* Other form fields */}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={closeModal}>
            Kapat
          </Button>
          <Button color="primary" type="submit">
            Ürün Ekle
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
 
  const formikForUpdate = useFormik({
    initialValues: {
      name: selectedProductForEdit ? selectedProductForEdit.name : "",
      descp: selectedProductForEdit ? selectedProductForEdit.descp : "",
      price: selectedProductForEdit ? selectedProductForEdit.price : null,
      stock: selectedProductForEdit ? selectedProductForEdit.stock : null,
      categoryId: selectedProductForEdit ? selectedProductForEdit.categoryId._id : "",
      isActive: selectedProductForEdit ? selectedProductForEdit.isActive : false,
      images:[]
    },
    validationSchemaForEdit,
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

      dispatch(updateProductAction(selectedProductForEdit._id,formData));
      formik.resetForm();
      closeEditModal()

    },
  });


  const renderEditProductModal = () => (
    <Modal isOpen={editProductModal} toggle={toggleEditProductModal} size="lg">
    <ModalHeader toggle={toggleEditProductModal}>Ürün Düzenle</ModalHeader>
    <Form onSubmit={(e) => {
      e.preventDefault();
      formikForUpdate.handleSubmit();
    }}>
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
            {formikForUpdate.errors.categoryId && formikForUpdate.touched.categoryId && (
              <div className="text-danger">{formikForUpdate.errors.categoryId}</div>
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
            {formikForUpdate.errors.images && formikForUpdate.touched.images && (
              <div className="text-danger">{formikForUpdate.errors.images}</div>
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
            {formikForUpdate.errors.isActive && formikForUpdate.touched.isActive && (
              <div className="text-danger">{formikForUpdate.errors.isActive}</div>
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
  const renderDeleteConfirmationModal = (product) => (
    <Modal isOpen={deleteConfirmationModal} toggle={toggleDeleteConfirmationModal} size="sm">
      <ModalHeader toggle={toggleDeleteConfirmationModal}>Ürünü Sil</ModalHeader>
      <ModalBody>
        <p>Emin misiniz?</p>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggleDeleteConfirmationModal}>
          İptal
        </Button>
        <Button color="danger" onClick={() => handleDelete(product._id)}>
          Sil
        </Button>
      </ModalFooter>
    </Modal>
  );
  
  const renderProducts = () => {
    return (
      <>
        {productList ? (
          <>
            {productList.map((product) => (
              <tr key={product._id}>
                <th scope="row">
                  <Media className="align-items-center">
                    <a
                      className="avatar"
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleImageModal(product);
                      }}
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          overflow: "hidden",
                          borderRadius: "30%",
                        }}
                      >
                        <img
                          alt="..."
                          src={`${process.env.REACT_APP_IMAGE_URL}${product.imageUrls[0]}`}
                          className="img-fluid"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </a>

                    <Media className="mx-2">
                      <span className="mb-0  text-sm">{product.name}</span>
                    </Media>
                  </Media>
                </th>
                <td>{product.stock} Adet</td>
                <td>{product.price}₺</td>
                <td>{product.categoryId.name}</td>
                <td>
                  <Badge color="" className="badge-dot mr-4">
                    <i
                      className={`bg-${
                        product.isActive ? "success" : "warning"
                      }`}
                    />
                    {product.isActive ? "active" : "inactive"}
                  </Badge>
                </td>
                <td className="text-center">
                  <UncontrolledDropdown>
                    <DropdownToggle
                      className="btn-icon-only text-light"
                      href="#pablo"
                      role="button"
                      size="sm"
                      color=""
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fas fa-ellipsis-v" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                      <DropdownItem
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault()
                          openEditModal(product)
                        }}
                      >
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-yellow" />
                          Edit
                        </Badge>
                      </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleDeleteConfirmationModal();
                        }}
                      >
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-danger" />
                          Delete
                        </Badge>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
               
      {renderDeleteConfirmationModal(product)}
              </tr>
            ))}
          </>
        ) : (
          ""
        )}
      </>
    );
  };

  const renderImageModal = () => {
    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <Modal isOpen={imageModal} toggle={closeModal} size="lg">
        <ModalHeader toggle={closeModal}>
          {selectedProduct?.name} Images
        </ModalHeader>
        <ModalBody>
          <Slider {...sliderSettings}>
            {selectedProduct?.imageUrls.map((imageUrl, index) => (
              <div key={index}>
                <img
                  src={`${process.env.REACT_APP_IMAGE_URL}${imageUrl}`}
                  alt={`Product ${index + 1}`}
                  className="img-fluid mb-2"
                />
              </div>
            ))}
          </Slider>
          <p className="mt-5">{selectedProduct?.descp}</p>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-secondary" onClick={closeModal}>
            Close
          </button>
        </ModalFooter>
      </Modal>
    );
  };

  const renderPagination = () => {
    const pages = [];
    const totalPages = pagination?.totalPages;
    const currentPage = pagination?.currentPage;

    const isPreviousDisabled = currentPage === 1;
    const isNextDisabled = currentPage === totalPages;

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PaginationItem key={i} className={i === currentPage ? "active" : ""}>
            <PaginationLink
              href="#pablo"
              onClick={(e) => {
                e.preventDefault();
                // Fetch products for the selected page
                dispatch(getAllProductAction(i));
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // If there are more than 3 pages, show the current page and the next two pages
      const endPage = Math.min(currentPage + 2, totalPages);
      for (let i = currentPage; i <= endPage; i++) {
        pages.push(
          <PaginationItem key={i} className={i === currentPage ? "active" : ""}>
            <PaginationLink
              href="#pablo"
              onClick={(e) => {
                e.preventDefault();
                // Fetch products for the selected page
                dispatch(getAllProductAction(i));
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return (
      <>
        {/* Go to First Page Button */}
        <PaginationItem disabled={isPreviousDisabled}>
          <PaginationLink
            href="#pablo"
            onClick={(e) => {
              e.preventDefault();
              if (!isPreviousDisabled) {
                // Fetch products for the first page
                dispatch(getAllProductAction(1));
              }
            }}
          >
            <i className="fas fa-angle-double-left" />
            <span className="sr-only">First</span>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem disabled={isPreviousDisabled}>
          <PaginationLink
            href="#pablo"
            onClick={(e) => {
              e.preventDefault();
              if (!isPreviousDisabled) {
                // Fetch products for the previous page
                dispatch(getAllProductAction(currentPage - 1));
              }
            }}
          >
            <i className="fas fa-angle-left" />
            <span className="sr-only">Previous</span>
          </PaginationLink>
        </PaginationItem>

        {pages}

        <PaginationItem disabled={isNextDisabled}>
          <PaginationLink
            href="#pablo"
            onClick={(e) => {
              e.preventDefault();
              if (!isNextDisabled) {
                // Fetch products for the next page
                dispatch(getAllProductAction(currentPage + 1));
              }
            }}
          >
            <i className="fas fa-angle-right" />
            <span className="sr-only">Next</span>
          </PaginationLink>
        </PaginationItem>

        {/* Go to Last Page Button */}
        <PaginationItem disabled={isNextDisabled}>
          <PaginationLink
            href="#pablo"
            onClick={(e) => {
              e.preventDefault();
              if (!isNextDisabled) {
                // Fetch products for the last page
                dispatch(getAllProductAction(totalPages));
              }
            }}
          >
            <i className="fas fa-angle-double-right" />
            <span className="sr-only">Last</span>
          </PaginationLink>
        </PaginationItem>
      </>
    );
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row>
                  <Col xl="10">
                    <h3 className="mb-0">Ürün Listesi</h3>
                  </Col>
                  <Col xl="2">
                    <Button color="success" onClick={toggleAddProductModal}>
                      Ürün Ekle
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Ürün Resmi</th>
                    <th scope="col">Stok</th>
                    <th scope="col">Fiyat</th>
                    <th scope="col">Kategori</th>
                    <th scope="col">Durum</th>
                    <th scope="col" className="text-center">
                      Aksiyonlar
                    </th>
                  </tr>
                </thead>
                <tbody>{renderProducts()}</tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    {renderPagination()}
                    {renderImageModal()}
      {renderAddProductForm()}
      {renderEditProductModal()}
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
     
    </>
  );
};

export default ProductList;
