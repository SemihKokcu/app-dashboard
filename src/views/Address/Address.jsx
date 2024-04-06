import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAddresssPaginatedActionAction,
  createAddressAction,
  deleteAddressAction,
  updateAddressAction,
} from "../../store/actions/AddressActions";
import {
  getAllUserAction,
} from "../../store/actions/UserActions";
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
import AddAddressModal from "./AddAddressModal";
import EditAddressModal from "./EditAddressMdodal";
import GenericPagination from "components/Tables/GenericPagination";
import DeleteConfirmationModal from "components/Tables/DeleteConfirmationModal";
import AddressHeader from "./AddressHeader";

const AddressList = () => {
  const dispatch = useDispatch();
  const { addressList, pagination } = useSelector((state) => state.addresses);
  const { userList } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(getAllAddresssPaginatedActionAction());
    dispatch(get)
  }, [dispatch]);

  const [editAddressModal, setEditAddressModal] = useState(false);
  const [selectedAddressForEdit, setSelectedAddressForEdit] = useState(null);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [addAddressModal, setAddAddressModal] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [pageSize, setPageSize] = useState(10);
  const toogleAddAddressModal = () => {
    setAddAddressModal(!addAddressModal);
  };
  const toggleEditAddressModal = () => {
    setEditAddressModal(!editAddressModal);
  };
  const openEditModal = (address) => {
    setSelectedAddressForEdit(address);
    toggleEditAddressModal();
  };
  const toggleDeleteConfirmationModal = () => {
    setDeleteConfirmationModal(!deleteConfirmationModal);
  };
  const handleDelete = (id) => {
    dispatch(deleteAddressAction(id));
    toggleDeleteConfirmationModal();
  };
  const openDeleteConfirmationModal = (address) => {
    setItemToDelete(address);
    toggleDeleteConfirmationModal();
  };
  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };
  const renderAddAddressModal = () => (
    <AddAddressModal
      isOpen={addAddressModal}
      toggleAddAddressModal={toogleAddAddressModal}
      userList={userList}
      dispatchAddAddress={(formData) => {
        dispatch(createAddressAction(formData));
      }}
    />
  );

  const renderEditAddressModal = () => (
    <EditAddressModal
      isOpen={editAddressModal}
      toggleEditAddressModal={toggleEditAddressModal}
      userList={userList}
      selectedAddressForEdit={selectedAddressForEdit}
      dispatchUpdateAddress={(id, formData) =>
        dispatch(updateAddressAction(id, formData))
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
  const renderAddresss = () => {
    const sortedAddresss = [...addressList];

    sortedAddresss.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.isActive - b.isActive;
      } else {
        return b.isActive - a.isActive;
      }
    });
    return (
      <>
        {sortedAddresss.length > 0 ? (
          <>
            {sortedAddresss.map((address) => (
              <tr key={address._id}>
                <th scope="row">
                  <Media className="align-items-center">
                    <a
                      className="avatar"
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleImageModal(address);
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
                          src={`${process.env.REACT_APP_IMAGE_URL}${address.imageUrls[0]}`}
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
                      <span className="mb-0  text-sm">{address.name}</span>
                    </Media>
                  </Media>
                </th>
                <td>{address.stock} Adet</td>
                <td>{address.price}₺</td>
                <td>{address.categoryId?.name}</td>
                <td>
                  <Badge color="" className="badge-dot mr-4">
                    <i
                      className={`bg-${
                        address.isActive ? "success" : "warning"
                      }`}
                    />
                    {address.isActive ? "active" : "inactive"}
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
                          openEditModal(address);
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
                          openDeleteConfirmationModal(address);
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
  const handlePageChange = (page) => {
    dispatch(getAllAddressAction(page, pageSize));
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    dispatch(getAllAddressAction(1, size));
  };
  const renderPagination = () => (
    <GenericPagination
      totalPages={pagination?.totalPages}
      currentPage={pagination?.currentPage}
      isPreviousDisabled={pagination?.currentPage === 1}
      isNextDisabled={pagination?.currentPage === pagination?.totalPages}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
      pageSizeOptions={[5, 10, 20]}
      pageSize={pageSize}
    />
  );
  return (
    <>
      <AddressHeader />
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
                    <Button color="success" onClick={toogleAddAddressModal}>
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
                    <th
                      scope="col"
                      onClick={handleSort}
                      style={{ cursor: "pointer" }}
                    >
                      Durum
                      {sortOrder === "asc" ? " ▲" : " ▼"}
                    </th>

                    <th scope="col" className="text-center">
                      Aksiyonlar
                    </th>
                  </tr>
                </thead>
                <tbody>{renderAddresss()}</tbody>
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
              {renderAddAddressModal()}
              {renderEditAddressModal()}
              {renderDeleteConfirmationModal()}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};
export default AddressList;
