import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserAction,
  deleteUserAction,
  getAllUserAction,
  updateUserAction,
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
import AddProjectModal from "./AddUserModal";
import EditProjectModal from "./EditUserModal";
import ImageModal from "../../components/Tables/ImageViewModal";
import GenericPagination from "components/Tables/GenericPagination";
import DeleteConfirmationModal from "components/Tables/DeleteConfirmationModal";
import UserHeader from "./UserHeader";
import { getAllRoleAction } from "store/actions/RoleActions";

const UserList = () => {
  const dispatch = useDispatch();
  const { userList, pagination } = useSelector((state) => state.users);
  const { roleList } = useSelector((state) => state.roles);
  useEffect(() => {
    dispatch(getAllUserAction());
    dispatch(getAllRoleAction());
  }, [dispatch]);

  const [imageModal, setImageModal] = useState(false);
  const [selectedUserImage, setSelectedUserImage] = useState(null);
  const [editUserModal, setEdtiUserModal] = useState(false);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [addUserModal, setAddUserModal] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  const toogleAddProjectModal = () => {
    setAddUserModal(!addUserModal);
  };
  const toggleEditProjectModal = () => {
    setEdtiUserModal(!editUserModal);
  };
  const openEditModal = (user) => {
    setSelectedUserForEdit(user);
    toggleEditProjectModal();
  };
  const toggleImageModal = (user) => {
    console.log(user);
    setSelectedUserImage(user);
    setImageModal(!imageModal);
  };
  const toogleImageViewModal = () => {
    setSelectedUserImage(null);
    setImageModal(false);
  };
  const toggleDeleteConfirmationModal = () => {
    setDeleteConfirmationModal(!deleteConfirmationModal);
  };
  const handleDelete = (id) => {
    dispatch(deleteUserAction(id));
    toggleDeleteConfirmationModal();
  };
  const openDeleteConfirmationModal = (user) => {
    setItemToDelete(user);
    toggleDeleteConfirmationModal();
  };
  const renderAddProjectModal = () => (
    <AddProjectModal
      isOpen={addUserModal}
      toggleAddUserModal={toogleAddProjectModal}
      dispatchAddPUser={(formData) => {
        dispatch(createUserAction(formData));
      }}
      roleList={roleList}
    />
  );

  const renderEditProjectModal = () => (
    <EditProjectModal
      isOpen={editUserModal}
      toggleEditUserModal={toggleEditProjectModal}
      selectedUserForEdit={selectedUserForEdit}
      dispatchUpdateUser={(id, formData) =>
        dispatch(updateUserAction(id, formData))
      }
      roleList={roleList}
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
  const renderUsers = () => {
    return (
      <>
        {userList ? (
          <>
            {userList.map((user) => (
              <tr key={user._id}>
                <th scope="row">
                  <Media className="align-items-center">
                    <a
                      className="avatar"
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleImageModal(user);
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
                          src={`${process.env.REACT_APP_IMAGE_URL}${user.profileImage}`}
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
                      <span className="mb-0  text-sm">
                        {user.name + " " + user.surname}
                      </span>
                    </Media>
                  </Media>
                </th>
                <td>{user.email}</td>                          
                <td>{user.phoneNumber}</td>                          
                <td className="text-center">
                  <Badge color="" className="badge-dot mr-4">
                    <i
                      className={`bg-${
                        user.emailVerified ? "success" : "warning"
                      }`}
                    />
                    {/* {user.emailVerified ? "Onaylandı" : "Onaylanmadı"} */}
                  </Badge>
                </td>
                <td className="text-center">
                  <Badge color="" className="badge-dot mr-4">
                    <i
                      className={`bg-${
                        user.phoneVerified ? "success" : "warning"
                      }`}
                    />
                    {/* {user.phoneVerified ? "Onaylandı" : "Onaylanmadı"} */}
                  </Badge>
                </td>
                <td className="text-center">
                  <Badge color="" className="badge-dot mr-4">
                    <i
                      className={`bg-${
                        user.twoFactor ? "success" : "warning"
                      }`}
                    />
                    {/* {user.twoFactor ? "Onaylandı" : "Onaylanmadı"} */}
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
                          openEditModal(user);
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
                          openDeleteConfirmationModal(user);
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
          "Projeler Getirilemedi"
        )}
      </>
    );
  };
  const renderImageModal = () => (
    <ImageModal
      isOpen={imageModal}
      toggle={toogleImageViewModal}
      selectedContent={selectedUserImage}
    />
  );
  const handlePageChange = (page) => {
    dispatch(getAllUserAction(page, pageSize));
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    dispatch(getAllUserAction(1, size));
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
      <UserHeader />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row>
                  <Col xl="10">
                    <h3 className="mb-0">Kullanıcı Listesi</h3>
                  </Col>
                  <Col xl="2">
                    <Button color="success" onClick={toogleAddProjectModal}>
                      Kullanıcı Ekle
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Kullanıcı Resmi</th>
                    <th scope="col">Email</th>
                    <th scope="col">Telefon Numarası</th>
                    <th scope="col">Email Onayı</th>
                    <th scope="col">Telefon Onayı</th>
                    <th scope="col">İki Aşamalı Doğrulama</th>
                    <th scope="col" className="text-center">
                      Aksiyonlar
                    </th>
                  </tr>
                </thead>
                <tbody>{renderUsers()}</tbody>
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
              {renderAddProjectModal()}
              {renderImageModal()}
              {renderEditProjectModal()}
              {renderDeleteConfirmationModal()}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};
export default UserList;
