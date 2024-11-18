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
import { useNavigate } from "react-router-dom";

export const AddView = () => {
  const [episodes, setEpisodes] = useState([]);
  const [episodeToAdd, setEpisodeToModify] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log(data);
    if (data.titulo === "" && data.descripcion === "" && data.director === "")
      return;

    const episode = {
      title: data.titulo,
      description: data.descripcion,
      directed_by: data.director,
    };
    axios
      .post(`http://localhost:3000/api/data`, {
        ...episode,
      })
      .then((response) => {
        console.log("Episodio agregado");
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
      });
    };

    fetchData();
  }, []);

  return (
    <main className="flex justify-center p-20 bg-gray-600">
      <div className="bg-white w-3/5 p-10 rounded-lg flex flex-col text-center align-middle">
        <h1>CRUD The Simpsons Episodes</h1>
        <h3>Agregar Capitulo</h3>
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

            <Form.Group className="mb-3">
              <Form.Label>Temporada</Form.Label>
              <Form.Select {...register("temporada")}>
                <option value="">Seleccione Temporada</option>
                <option value="1">Temporada 1</option>
                <option value="2">Temporada 2</option>
                <option value="3">Temporada 3</option>
                <option value="4">Temporada 4</option>
                <option value="5">Temporada 5</option>
                <option value="6">Temporada 6</option>
                <option value="7">Temporada 7</option>
                <option value="8">Temporada 8</option>
                <option value="9">Temporada 9</option>
                <option value="10">Temporada 10</option>
                <option value="11">Temporada 11</option>
                <option value="12">Temporada 12</option>
                <option value="13">Temporada 13</option>
                <option value="14">Temporada 14</option>
                <option value="15">Temporada 15</option>
                <option value="16">Temporada 16</option>
                <option value="17">Temporada 17</option>
                <option value="18">Temporada 18</option>
                <option value="19">Temporada 19</option>
                <option value="20">Temporada 20</option>
                <option value="21">Temporada 21</option>
                <option value="22">Temporada 22</option>
                <option value="23">Temporada 23</option>
                <option value="24">Temporada 24</option>
                <option value="25">Temporada 25</option>
                <option value="26">Temporada 26</option>
                <option value="27">Temporada 27</option>
                <option value="28">Temporada 28</option>
                <option value="29">Temporada 29</option>
                <option value="30">Temporada 30</option>
                <option value="31">Temporada 31</option>
                <option value="32">Temporada 32</option>
                <option value="33">Temporada 33</option>
                <option value="34">Temporada 34</option>
              </Form.Select>
            </Form.Group>

            <Form.Label>Director</Form.Label>
            <Form.Select {...register("director")}>
              <option value="">Seleccione Director</option>
              {directors.map((director) => (
                <option value={director}>{director}</option>
              ))}
            </Form.Select>

            <Form.Group className="mb-3">
              <Form.Label>Escrito Por</Form.Label>
              <Form.Control
                type="text"
                placeholder="Escrito Por"
                {...register("writed_by", { required: true })}
              />
              {errors?.writed_by?.type === "required" && (
                <Form.Text className="text-muted">
                  La Descripcion del capítulo es requerido para la búsqueda
                </Form.Text>
              )}
            </Form.Group>


            <div className="flex justify-center">
              <Button
                variant="primary"
                type="submit"
                className="w-1/3 mt-6 relative items-center"
              >
                Agregar
              </Button>
            </div>
          </Form>
        </div>
        {/* <EpisodeModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          episode={episodeToShow}
        /> */}
      </div>
    </main>
  );
};
