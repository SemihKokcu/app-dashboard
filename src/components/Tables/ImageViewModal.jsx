import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import Slider from "react-slick";

const ImageModal = ({ isOpen, toggle, selectedContent }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>
        {selectedContent?.name} Images
      </ModalHeader>
      <ModalBody>
        <Slider {...sliderSettings}>
          {selectedContent?.imageUrls.map((imageUrl, index) => (
            <div key={index}>
              <img
                src={`${process.env.REACT_APP_IMAGE_URL}${imageUrl}`}
                alt={`Product ${index + 1}`}
                className="img-fluid mb-2"
              />
            </div>
          ))}
        </Slider>
        <p className="mt-5">{selectedContent?.descp}</p>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ImageModal;
