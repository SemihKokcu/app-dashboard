import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProjectAction,
  createProjectAction,
  deleteProjectAction,
  updateProjectAction,
} from "../../store/actions/ProjectActions";
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
import AddProjectModal from "./AddProjectModal";
import EditProjectModal from "./EditProjectModal";
import ImageModal from "../../components/Tables/ImageViewModal";
import GenericPagination from "components/Tables/GenericPagination";
import DeleteConfirmationModal from "components/Tables/DeleteConfirmationModal";
import ProjectHeader from "./ProjectHeader";

const ProjectList = () => {
  const dispatch = useDispatch();
  const { projectList, pagination } = useSelector((state) => state.project);
  useEffect(() => {
    dispatch(getAllProjectAction());
  }, [dispatch]);

  const [imageModal, setImageModal] = useState(false);
  const [selectedProjectImage, setSelectedProjectImage] = useState(null);
  const [editProjectModal, setEditProjectModal] = useState(false);
  const [selectedProjectForEdit, setSelectedProjectForEdit] = useState(null);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [addProjectModal, setAddProjectModal] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  const toogleAddProjectModal = () => {
    setAddProjectModal(!addProjectModal);
  };
  const toggleEditProjectModal = () => {
    setEditProjectModal(!editProjectModal);
  };
  const openEditModal = (project) => {
    setSelectedProjectForEdit(project);
    toggleEditProjectModal();
  };
  const toggleImageModal = (project) => {
    console.log(project);
    setSelectedProjectImage(project);
    setImageModal(!imageModal);
  };
  const toogleImageViewModal = () => {
    setSelectedProjectImage(null);
    setImageModal(false);
  };
  const toggleDeleteConfirmationModal = () => {
    setDeleteConfirmationModal(!deleteConfirmationModal);
  };
  const handleDelete = (id) => {
    dispatch(deleteProjectAction(id));
    toggleDeleteConfirmationModal();
  };
  const openDeleteConfirmationModal = (project) => {
    setItemToDelete(project);
    toggleDeleteConfirmationModal();
  };
  const renderAddProjectModal = () => (
    <AddProjectModal
      isOpen={addProjectModal}
      toggleAddProjectModal={toogleAddProjectModal}
      dispatchAddProject={(formData) => {
        dispatch(createProjectAction(formData));
      }}
    />
  );

  const renderEditProjectModal = () => (
    <EditProjectModal
      isOpen={editProjectModal}
      toggleEditProjectModal={toggleEditProjectModal}
      selectedProjectForEdit={selectedProjectForEdit}
      dispatchUpdateProject={(id, formData) =>
        dispatch(updateProjectAction(id, formData))
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
  const renderProjects = () => {
    return (
      <>
        {projectList ? (
          <>
            {projectList.map((project) => (
              <tr key={project._id}>
                <th scope="row">
                  <Media className="align-items-center">
                    <a
                      className="avatar"
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleImageModal(project);
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
                          src={`${process.env.REACT_APP_IMAGE_URL}${project.imageUrls[0]}`}
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
                      <span className="mb-0  text-sm">{project.name}</span>
                    </Media>
                  </Media>
                </th>
                <td>{project.author}</td>
                <td>{project.status}</td>
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
                          openEditModal(project);
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
                          openDeleteConfirmationModal(project);
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
      selectedContent={selectedProjectImage}
    />
  );
  const handlePageChange = (page) => {
    dispatch(getAllProjectAction(page, pageSize));
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    dispatch(getAllProjectAction(1, size));
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
      <ProjectHeader />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row>
                  <Col xl="10">
                    <h3 className="mb-0">Proje Listesi</h3>
                  </Col>
                  <Col xl="2">
                    <Button color="success" onClick={toogleAddProjectModal}>
                      Proje Ekle
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Proje Resmi</th>
                    <th scope="col">Yapılan Kişi</th>
                    <th scope="col">Durumu</th>
                    <th scope="col" className="text-center">
                      Aksiyonlar
                    </th>
                  </tr>
                </thead>
                <tbody>{renderProjects()}</tbody>
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
export default ProjectList;
