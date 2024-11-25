import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export const EditConfirmationModal = (props) => {
  const { id } = props;
  const navigate = useNavigate();

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Episodio Editado Correctamente
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          El Episodio ID {id} fue modificado correctamente
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" className="ml-4" onClick={() => navigate("../?userLevel=admin")}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
