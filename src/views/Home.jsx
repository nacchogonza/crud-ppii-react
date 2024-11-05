import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import Accordion from "react-bootstrap/Accordion";
import { EpisodeModal } from "./components/EpisodeModal";

import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export const HomeView = () => {
  const navigate = useNavigate();
  const [episodes, setEpisodes] = useState([]);
  const [episodeToShow, setEpisodeToShow] = useState({});
  const [modalShow, setModalShow] = React.useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/api/data").then((response) => {
      setEpisodes(response?.data || []);
    });
  }, []);

  let season = 0;

  const renderEpisodesBySeason = () => {
    season++;
    return (
      <>
        <Accordion>
          <Accordion.Header>Temporada {season}</Accordion.Header>
          <Accordion.Body>
            <div className="flex flex-col gap-4">
              {episodes.map((filtered) => {
                if (filtered.season === `\t${season}`)
                  return (
                    <Card key={`card-episode-${filtered.id}`}>
                      <Card.Body>
                        <Card.Title>Título: {filtered.title}</Card.Title>
                        <Card.Text>
                          Descripción: {filtered.description}
                        </Card.Text>
                        <Card.Text>Director: {filtered.directed_by}</Card.Text>
                        <Button
                          variant="primary"
                          onClick={() => {
                            setEpisodeToShow(filtered);
                            setModalShow(true);
                          }}
                        >
                          Ver Más
                        </Button>
                      </Card.Body>
                    </Card>
                  );
              })}
            </div>
          </Accordion.Body>
        </Accordion>
      </>
    );
  };

  return (
    <main className="flex justify-center p-20 bg-gray-600">
      <div className="bg-white w-3/5 p-10 rounded-lg flex flex-col text-center align-middle">
        <h1>CRUD The Simpsons Episodes</h1>
        <h3>Capítulos por Temporada</h3>

        <div className="flex flex-col gap-4 mt-10">
          {renderEpisodesBySeason()}
          {renderEpisodesBySeason()}
          {renderEpisodesBySeason()}
          {renderEpisodesBySeason()}
          {renderEpisodesBySeason()}
          {renderEpisodesBySeason()}
          {renderEpisodesBySeason()}
          {renderEpisodesBySeason()}
          {renderEpisodesBySeason()}
          {renderEpisodesBySeason()}
          {renderEpisodesBySeason()}
          {renderEpisodesBySeason()}
          {renderEpisodesBySeason()}
          {renderEpisodesBySeason()}
          {renderEpisodesBySeason()}
          {renderEpisodesBySeason()}
          {renderEpisodesBySeason()}
          {renderEpisodesBySeason()}
          {renderEpisodesBySeason()}
          {renderEpisodesBySeason()}
          {renderEpisodesBySeason()}
          {renderEpisodesBySeason()}
          {renderEpisodesBySeason()}
          {renderEpisodesBySeason()}
          {renderEpisodesBySeason()}
          {renderEpisodesBySeason()}
          {renderEpisodesBySeason()}
          {renderEpisodesBySeason()}
          {renderEpisodesBySeason()}
          {renderEpisodesBySeason()}
          {renderEpisodesBySeason()}
          {renderEpisodesBySeason()}
          {renderEpisodesBySeason()}
          {renderEpisodesBySeason()}
        </div>

        <div className="flex justify-center">
          <Button
            variant="primary"
            type="submit"
            className="w-1/3 mt-6 relative items-center"
            onClick={() => navigate("../")}
          >
            Volver
          </Button>
        </div>
        <EpisodeModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          episode={episodeToShow}
        />
      </div>
    </main>
  );
};
