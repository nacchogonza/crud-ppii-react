import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export const AddConfirmationModal = (props) => {
  const { titulo, id } = props;
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
          Episodio Agregado Correctamente
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          El Episodio con titulo {titulo} fue creado correctamente con el ID {id}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" className="ml-4" onClick={() => navigate("../?userLevel=admin")}>
          Volver al Inicio
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
