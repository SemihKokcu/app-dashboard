import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const DeleteConfirmationModal = ({
  isOpen,
  toggleDeleteConfirmationModal,
  handleDelete,
  itemName,
}) => {
  return (
    <Modal isOpen={isOpen} toggle={toggleDeleteConfirmationModal} size="sm">
      <ModalHeader toggle={toggleDeleteConfirmationModal}>
        {`Delete ${itemName}`}
      </ModalHeader>
      <ModalBody>
        <p>Are you sure you want to delete {itemName}?</p>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggleDeleteConfirmationModal}>
          Cancel
        </Button>
        <Button color="danger" onClick={handleDelete}>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteConfirmationModal;
