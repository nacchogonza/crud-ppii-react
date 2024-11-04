import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
/* import Modal from "react-bootstrap/Modal"; */

/* import "./App.css"; */
import "bootstrap/dist/css/bootstrap.min.css";

export const SearchView = () => {
  const [episodes, setEpisodes] = useState([]);
  const [filterEpisodes, setFilterEpisodes] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .get("http://localhost:3000/api/data/search", {
        params: {
          title: data.titulo,
          director: data.director,
        },
      })
      .then((response) => {
        setFilterEpisodes(response?.data || []);
      });
  };

  useEffect(() => {
    axios.get("http://localhost:3000/api/data").then((response) => {
      setEpisodes(response?.data || []);
    });
  }, []);

  useEffect(() => {
    const directorsTemp = [
      ...new Set(episodes.map((record) => record.directed_by)),
    ];
    setDirectors(directorsTemp);
  }, [episodes]);

  return (
    <main className="flex justify-center p-20 bg-gray-600">
      <div className="bg-white w-2/5 p-10 rounded-lg flex flex-col text-center align-middle">
        <h1>CRUD The Simpsons Episodes</h1>
        <h3>Buscar Capitulo</h3>
        <div className="flex justify-center my-8">
          <Form
            className="flex flex-col w-2/3 justify-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Form.Group className="mb-3">
              <Form.Label>Título del Capítulo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Título del capítulo"
                {...register("titulo")}
              />
              {errors?.titulo?.type === "required" && (
                <Form.Text className="text-muted">
                  El Título del capítulo es requerido para la búsqueda
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Temporada</Form.Label>
              <Form.Control
                type="number"
                placeholder="Temporada"
                {...register("temporada")}
              />
            </Form.Group>

            <Form.Label>Director</Form.Label>
            <Form.Select {...register("director")}>
              <option value="">Seleccione Director</option>
              {directors.map((director) => (
                <option value={director}>{director}</option>
              ))}
            </Form.Select>
            <div className="flex justify-center">
              <Button
                variant="primary"
                type="submit"
                className="w-1/3 mt-6 relative items-center"
              >
                Buscar
              </Button>
            </div>
          </Form>
        </div>

        {/* <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        /> */}

        <div className="flex flex-col gap-4 mt-10">
          <h4>Resultados</h4>
          {filterEpisodes.map((filtered) => (
            <Card>
              <Card.Body>
                <Card.Title>{filtered.title}</Card.Title>
                <Card.Text>{filtered.description}</Card.Text>
                <Card.Text>Temporada: {filtered.season}</Card.Text>
                <Card.Text>Director: {filtered.directed_by}</Card.Text>
                <Card.Text>
                  Viewers: {filtered.us_viewers_in_millions}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
              {/* <div>{filtered.title}</div> */}
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
};
