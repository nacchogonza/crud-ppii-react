import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
/* import Modal from "react-bootstrap/Modal"; */

/* import "./App.css"; */
import "bootstrap/dist/css/bootstrap.min.css";
import { EpisodeModal } from "./components/EpisodeModal";
import { DeleteModal } from "./components/DeleteModal";
import { useNavigate, useParams } from "react-router-dom";
import { EditConfirmationModal } from "./components/EditConfirmationModal";

export const EditView = () => {
  const [episodes, setEpisodes] = useState([]);
  const [episodeToModify, setEpisodeToModify] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const params = useParams();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log(data);
    if (data.titulo === "" && data.descripcion === "" && data.director === "")
      return;

    const episode = {
      ...episodeToModify,
      title: data.titulo,
      description: data.descripcion,
      directed_by: data.director,
    };
    console.log(episode); 
    axios
      .put(`http://localhost:3000/api/data/${params.id}`, {
        ...episode,
      })
      .then((response) => {
        setModalShow(true);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios.get("http://localhost:3000/api/data").then((response) => {
        /* setEpisodes(response); */
        const directorsTemp = [
          ...new Set(response?.data.map((record) => record.directed_by)),
        ];
        setDirectors(directorsTemp);
        const episode = response?.data.find(
          (episode) => episode.id === params.id
        );
        if (episode) {
          setEpisodeToModify(episode);
          setValue("titulo", episode.title);
          setValue("descripcion", episode.description);
          setValue("director", episode.directed_by);
        }
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
   
  }, [episodes]);

  return (
    <main className="flex justify-center p-20 bg-gray-600">
      <div className="bg-white w-3/5 p-10 rounded-lg flex flex-col text-center align-middle">
        <h1>CRUD The Simpsons Episodes</h1>
        <h3>Editar Capitulo ID {params.id}</h3>
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
                {...register("titulo", { required: true })}
              />
              {errors?.titulo?.type === "required" && (
                <Form.Text className="text-muted">
                  El Título del capítulo es requerido para la búsqueda
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción del Capítulo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Descripción del capítulo"
                {...register("descripcion", { required: true })}
              />
              {errors?.descripcion?.type === "required" && (
                <Form.Text className="text-muted">
                  La Descripcion del capítulo es requerido para la búsqueda
                </Form.Text>
              )}
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
                Guardar
              </Button>
            </div>
          </Form>
        </div>
        <EditConfirmationModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          id={episodeToModify.id}
        />
      </div>
    </main>
  );
};
