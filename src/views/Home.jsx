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
import { useNavigate, useSearchParams } from "react-router-dom";
import { DeleteConfirmationModal } from "./components/DeleteConfirmationModal";

export const HomeView = () => {
  const [episodes, setEpisodes] = useState([]);
  const [filterEpisodes, setFilterEpisodes] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [episodeToShow, setEpisodeToShow] = useState({});
  const [episodeToDelete, setEpisodeToDelete] = useState({});
  const [modalShow, setModalShow] = React.useState(false);
  const [modalDelete, setModalDelete] = React.useState(false);
  const [modalDeleteConfirmation, setModalDeleteConfirmation] = useState(false);
  const [searched, setSearched] = React.useState(false);

  const [params] = useSearchParams();
  const userLevel = params.get("userLevel") || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    if (data.titulo === "" && data.temporada === "" && data.director === "")
      return;
    axios
      .get("http://localhost:3000/api/data/search", {
        params: {
          title: data.titulo,
          season: data.temporada,
          directed_by: data.director,
        },
      })
      .then((response) => {
        setFilterEpisodes(response?.data || []);
      });
      setSearched(true)
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

  useEffect(() => {
    if (!modalDelete && episodeToDelete) {
      axios.get("http://localhost:3000/api/data").then((response) => {
        setEpisodes(response?.data || []);
        setFilterEpisodes([]);
      });
    }
  }, [modalDelete, episodeToDelete]);

  return (
    <main className="flex justify-center p-20 bg-gray-600 min-h-lvh">
      <div className="bg-white w-3/5 p-10 py-24 rounded-lg flex flex-col text-center align-middle">
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
            <div className="flex justify-center">
              <Button
                variant="primary"
                type="submit"
                className="w-1/3 mt-6 relative items-center"
              >
                Buscar
              </Button>
            </div>

            {userLevel === "admin" && (
              <div className="flex justify-center">
                <Button
                  variant="success"
                  type="submit"
                  className="w-1/3 mt-2 relative items-center"
                  onClick={() => navigate(`../add?userLevel=${userLevel}`)}
                >
                  Agregar Episodio
                </Button>
              </div>
            )}

            <div className="flex justify-center">
              <Button
                variant="secondary"
                type="submit"
                className="w-1/3 mt-2 relative items-center"
                onClick={() =>
                  navigate(`../all-episodes?userLevel=${userLevel}`)
                }
              >
                Ver Todos
              </Button>
            </div>
          </Form>
        </div>
        {searched && (

        <div className="flex flex-col gap-4 mt-10">
          <h4>
            {filterEpisodes.length
              ? "Resultados"
              : "No hay resultados para la bùsqueda"}
          </h4>
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
                <Button
                  variant="primary"
                  onClick={() => {
                    setEpisodeToShow(filtered);
                    setModalShow(true);
                  }}
                >
                  Ver Más
                </Button>

                {userLevel === "admin" && (
                  <Button
                    variant="success"
                    className="ml-4"
                    onClick={() =>
                      navigate(`../edit/${filtered.id}?userLevel=${userLevel}`)
                    }
                  >
                    Editar Episodio
                  </Button>
                )}
                {userLevel === "admin" && (
                  <Button
                    variant="danger"
                    className="ml-4"
                    onClick={() => {
                      setEpisodeToDelete(filtered);
                      setModalDelete(true);
                    }}
                  >
                    Eliminar Episodio
                  </Button>
                )}
              </Card.Body>
            </Card>
          ))}
        </div>
        )}
        <EpisodeModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          episode={episodeToShow}
        />
        <DeleteModal
          show={modalDelete}
          onHide={() => {
            setModalDelete(false);
            setModalDeleteConfirmation(true);
          }}
          episode={episodeToDelete}
        />
        <DeleteConfirmationModal
          show={modalDeleteConfirmation}
          onHide={() => setModalDeleteConfirmation(false)}
          episode={episodeToDelete}
        />
      </div>
    </main>
  );
};
