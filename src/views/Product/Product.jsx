import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductAction,
  createProductAction,
  deleteProductAction,
  updateProductAction,
} from "../../store/actions/ProductAcitons";
import { getAllCategoriesAction } from "../../store/actions/CateogryActions";
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
  Table,
  Container,
  Row,
  Button,
  Col,
} from "reactstrap";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";
import ImageModal from "./ImageViewModal";
import GenericPagination from "components/Tables/GenericPagination";
import DeleteConfirmationModal from "components/Tables/DeleteConfirmationModal";
import ProductHeader from "./ProductHeader";

const ProductList = () => {
  const dispatch = useDispatch();
  const { productList, pagination } = useSelector((state) => state.products);
  const { categoryList } = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(getAllProductAction());
    dispatch(getAllCategoriesAction());
  }, [dispatch]);

  const [imageModal, setImageModal] = useState(false);
  const [selectedProductImage, setSelectedProductImage] = useState(null);
  const [editProductModal, setEditProductModal] = useState(false);
  const [selectedProductForEdit, setSelectedProductForEdit] = useState(null);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [addProductModal, setAddProductModal] = useState(false);

  const toogleAddProductModal = () => {
    setAddProductModal(!addProductModal);
  };
  const toggleEditProductModal = () => {
    setEditProductModal(!editProductModal);
  };
  const openEditModal = (product) => {
    setSelectedProductForEdit(product);
    toggleEditProductModal();
  };
  const toggleImageModal = (product) => {
    setSelectedProductImage(product);
    setImageModal(!imageModal);
  };
  const toogleImageViewModal = () => {
    setSelectedProductImage(null);
    setImageModal(false);
  };
  const toggleDeleteConfirmationModal = () => {
    setDeleteConfirmationModal(!deleteConfirmationModal);
  };
  const handleDelete = (id) => {
    dispatch(deleteProductAction(id));
    toggleDeleteConfirmationModal();
  };
  const openDeleteConfirmationModal = (product) => {
    setItemToDelete(product);
    toggleDeleteConfirmationModal();
  };
  const renderAddProductModal = () => (
    <AddProductModal
      isOpen={addProductModal}
      toggleAddProductModal={toogleAddProductModal}
      categoryList={categoryList}
      dispatchAddProduct={(formData) => {
        dispatch(createProductAction(formData));
      }}
    />
  );

  const renderEditProductModal = () => (
    <EditProductModal
      isOpen={editProductModal}
      toggleEditProductModal={toggleEditProductModal}
      categoryList={categoryList}
      selectedProductForEdit={selectedProductForEdit}
      dispatchUpdateProduct={(id, formData) =>
        dispatch(updateProductAction(id, formData))
      }
    />
  );
  const renderDeleteConfirmationModal = () => (
    <DeleteConfirmationModal
      isOpen={deleteConfirmationModal}
      toggleDeleteConfirmationModal={toggleDeleteConfirmationModal}
      handleDelete={() => handleDelete(itemToDelete?._id)}
      itemName={itemToDelete?.name}
    />
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
                          e.preventDefault();
                          openEditModal(product);
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
                          openDeleteConfirmationModal(product);
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
              </tr>
            ))}
          </>
        ) : (
          "Ürünler Getirilemedi"
        )}
      </>
    );
  };
  const renderImageModal = () => (
    <ImageModal
      isOpen={imageModal}
      toggle={toogleImageViewModal}
      selectedProduct={selectedProductImage}
    />
  );
  const renderPagination = () => (
    <GenericPagination
      totalPages={pagination?.totalPages}
      currentPage={pagination?.currentPage}
      isPreviousDisabled={pagination?.currentPage === 1}
      isNextDisabled={pagination?.currentPage === pagination?.totalPages}
      onPageChange={(page) => dispatch(getAllProductAction(page))}
    />
  );
  return (
    <>
      <ProductHeader />
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
                    <Button color="success" onClick={toogleAddProductModal}>
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
                  </Pagination>
                </nav>
              </CardFooter>
              {renderAddProductModal()}
              {renderImageModal()}
              {renderEditProductModal()}
              {renderDeleteConfirmationModal()}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};
export default ProductList;
