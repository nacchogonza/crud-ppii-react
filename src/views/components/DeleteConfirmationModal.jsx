import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const DeleteConfirmationModal = (props) => {
  const { episode } = props;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Episodio Eliminado
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          El Episodio ID {episode.id} ({episode.title}) fue eliminado de la Base
          de Datos
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" className="ml-4" onClick={props.onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
