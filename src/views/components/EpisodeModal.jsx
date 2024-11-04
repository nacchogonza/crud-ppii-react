import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const EpisodeModal = (props) => {
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
          Episodio: {episode.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Descripcion: {episode.description}</p>
        <p>Temporada: {episode.season}</p>
        <p>Dirigido Por: {episode.directed_by}</p>
        <p>Escrito Por: {episode.written_by}</p>
        <p>Visualizaciones: {episode.us_viewers_in_millions}M</p>
        <p>Fecha de Emisión: {episode.original_air_date}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
