import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
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
} from "reactstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GenericTable = ({ data, pagination, tableHeaderList }) => {
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Fetch data or perform any other initialization logic here
  }, []);

  const toggleModal = (item) => {
    setSelectedItem(item);
    setModal(!modal);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModal(false);
  };

  const renderTableHeader = () => {
    return (
      <thead className="thead-light">
        <tr>
          {tableHeaderList.map((header, index) => (
            <th key={index} scope="col">
              {header}
            </th>
          ))}
          <th scope="col" className="text-center">
            Actions
          </th>
        </tr>
      </thead>
    );
  };

  const renderTableBody = () => {
    return data.map((item) => (
      <tr key={item._id}>
        {tableHeaderList.map((header, index) => (
          <td key={index}>
            {header === "Product" ? (
              <Media className="align-items-center">
                <a
                  className="avatar rounded-pill"
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleModal(item);
                  }}
                >
                  <img
                    alt="..."
                    src={`http://localhost:8000/images/${item.imageUrls[0]}`}
                  />
                </a>
                <Media>
                  <span className="mb-0 text-sm">{item.name}</span>
                </Media>
              </Media>
            ) : (
              item[header.toLowerCase()]
            )}
          </td>
        ))}
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
                View
              </DropdownItem>
              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                Edit
              </DropdownItem>
              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                Delete
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
        <ModalHeader toggle={closeModal}>
          {selectedItem?.name} Images
        </ModalHeader>
        <ModalBody>
          <Slider {...sliderSettings}>
            {selectedItem?.imageUrls.map((imageUrl, index) => (
              <div key={index}>
                <img
                  src={`http://localhost:8000/images/${imageUrl}`}
                  alt={`Product ${index + 1}`}
                  className="img-fluid mb-2"
                />
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
                // Fetch data for the selected page
                // Implement dispatch or API call here
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
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
                // Fetch data for the selected page
                // Implement dispatch or API call here
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
        <PaginationItem disabled={isPreviousDisabled}>
          <PaginationLink
            href="#pablo"
            onClick={(e) => {
              e.preventDefault();
              if (!isPreviousDisabled) {
                // Fetch data for the first page
                // Implement dispatch or API call here
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
                // Fetch data for the previous page
                // Implement dispatch or API call here
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
                // Fetch data for the next page
                // Implement dispatch or API call here
              }
            }}
          >
            <i className="fas fa-angle-right" />
            <span className="sr-only">Next</span>
          </PaginationLink>
        </PaginationItem>

        <PaginationItem disabled={isNextDisabled}>
          <PaginationLink
            href="#pablo"
            onClick={(e) => {
              e.preventDefault();
              if (!isNextDisabled) {
                // Fetch data for the last page
                // Implement dispatch or API call here
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
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Product List</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                {renderTableHeader()}
                <tbody>{renderTableBody()}</tbody>
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

GenericTable.propTypes = {
  data: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  tableHeaderList: PropTypes.array.isRequired,
};

export default GenericTable;
