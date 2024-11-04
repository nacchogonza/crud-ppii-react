import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export const DeleteModal = (props) => {
  const { episode } = props;


  const handleDelete = () => {
    axios
      .delete(`http://localhost:3000/api/data/${episode.id}`)
      .then((response) => {
        props.onHide();
      });
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Eliminar Episodio
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>¿Desea eliminar el episodio ID {episode.id} ({episode.title}) de la Base de Datos?</p>
        <p>Esta acción es irreversible</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleDelete}>Si</Button>
        <Button variant="danger" className="ml-4" onClick={props.onHide}>No</Button>
      </Modal.Footer>
    </Modal>
  );
};
