import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductAction } from "store/actions/ProductAcitons";
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
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const ProductList = () => {
  const dispatch = useDispatch();
  const { productList, pagination } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProductAction());
  }, [dispatch]);

  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const toggleModal = (product) => {
    setSelectedProduct(product);
    setModal(!modal);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModal(false);
  };

  const renderProducts = () => {
    return productList.map((product) => (
      <tr key={product._id}>
        <th scope="row">
          <Media className="align-items-center">
            <a
              className="avatar rounded-pill"
              href="#pablo"
              onClick={(e) => {
                e.preventDefault();
                toggleModal(product);
              }}
            >
              <img alt="..." src={"http://localhost:8000/images/" + product.imageUrls[0]} />
            </a>
            <Media>
              <span className="mb-0 text-sm">{product.name}</span>
            </Media>
          </Media>
        </th>
        <td>${product.price} USD</td>
        <td>
          <Badge color="" className="badge-dot mr-4">
            <i className={`bg-${product.isActive ? "success" : "warning"}`} />
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
              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                <Badge color="" className="badge-dot mr-4">
                  <i
                    className="bg-blue"
                  />
                  View
                </Badge>
              </DropdownItem>
              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
              <Badge color="" className="badge-dot mr-4">
                  <i
                    className="bg-yellow"
                  />
                  Edit
                </Badge>
              </DropdownItem>
              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
              <Badge color="" className="badge-dot mr-4">
                  <i
                    className="bg-danger"
                  />
                  Delete
                </Badge>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </td>
      </tr>
    ));
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
        <Modal isOpen={modal} toggle={closeModal} size="lg">
          <ModalHeader toggle={closeModal}>{selectedProduct?.name} Images</ModalHeader>
          <ModalBody>
            {/* Use Slider component for the image slider */}
            <Slider {...sliderSettings}>
              {selectedProduct?.imageUrls.map((imageUrl, index) => (
                <div key={index}>
                  <img src={"http://localhost:8000/images/" + imageUrl} alt={`Product ${index + 1}`} className="img-fluid mb-2" />
                </div>
              ))}
            </Slider>
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
        const totalPages = pagination.totalPages;
        const currentPage = pagination.currentPage;
      
        const isPreviousDisabled = currentPage === 1;
        const isNextDisabled = currentPage === totalPages;
      
        if (totalPages <= 3) {
          for (let i = 1; i <= totalPages; i++) {
            pages.push(
              <PaginationItem
                key={i}
                className={i === currentPage ? "active" : ""}
              >
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
              <PaginationItem
                key={i}
                className={i === currentPage ? "active" : ""}
              >
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
                <h3 className="mb-0">Product List</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col">Status</th>
                    <th scope="col" className="text-center">Actions</th>
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
            </Card>
          </div>
        </Row>
      </Container>
      {renderImageModal()}
    </>
  );
};

export default ProductList;
