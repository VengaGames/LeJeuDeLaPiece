import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WaitingRoom from "./WaitingRoom";
import FlecheRetour from "./FlecheRetour";
import ChoixJoueur from "./ChoixJoueur";
import ChoixQuestion from "./ChoixQuestion";
import ReponseJoueur from "./ReponseJoueur";
import Piece from "./Piece";
import Modal from "./Modal";

function Game({
  socket,
  username,
  stade,
  tourJoueur,
  updateTourJoueur,
  updateStade,
  joueurChoisi,
  updateJoueurChoisi,
  question,
  updateQuestion,
}) {
  const navigate = useNavigate();

  const [roomUsers, updateRoomJoueurs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    socket.on("gameroom_users", (data) => {
      const { gameRoomUsers, premierJoueur } = data;
      updateRoomJoueurs(gameRoomUsers);
      updateTourJoueur(premierJoueur);
    });
  }, [socket, updateRoomJoueurs, updateTourJoueur]);

  useEffect(() => {
    socket.on("gameroom_users", (data) => {
      const { gameRoomUsers, premierJoueur } = data;
      updateRoomJoueurs(gameRoomUsers);
      updateTourJoueur(premierJoueur);
    });
    socket.on("update_stade_S", (data) => {
      updateStade(data);
    });
    socket.on("update_joueur_choisi_S", (data) => {
      updateJoueurChoisi(data);
    });
    socket.on("update_question_S", (data) => {
      updateQuestion(data);
    });
    socket.on("update_tour_joueur_S", (data) => {
      updateTourJoueur(data);
    });
  }, [
    socket,
    updateStade,
    updateJoueurChoisi,
    updateQuestion,
    updateTourJoueur,
    updateRoomJoueurs,
  ]);

  function switchCase(stade) {
    switch (stade) {
      case "WaitingRoom":
        return (
          <WaitingRoom
            socket={socket}
            roomUsers={roomUsers}
            username={username}
            tourJoueur={tourJoueur}
          />
        );
      case "ChoixJoueur":
        return (
          <ChoixJoueur
            socket={socket}
            roomUsers={roomUsers}
            username={username}
            tourJoueur={tourJoueur}
          />
        );
      case "ChoixQuestion":
        return (
          <ChoixQuestion
            username={username}
            socket={socket}
            tourJoueur={tourJoueur}
            joueurChoisi={joueurChoisi}
          />
        );
      case "ReponseJoueur":
        return (
          <ReponseJoueur
            username={username}
            socket={socket}
            tourJoueur={tourJoueur}
            joueurChoisi={joueurChoisi}
            question={question}
            roomUsers={roomUsers}
          />
        );
      case "Piece":
        return (
          <Piece
            username={username}
            socket={socket}
            tourJoueur={tourJoueur}
            joueurChoisi={joueurChoisi}
            question={question}
          />
        );
      default:
        return (
          <ChoixJoueur
            socket={socket}
            roomUsers={roomUsers}
            username={username}
            tourJoueur={tourJoueur}
          />
        );
    }
  }

  return (
    <div>
      <FlecheRetour setIsOpen={setIsOpen} />
      <Modal isOpen={isOpen}>
        <div className="p-4 bg-white rounded-2xl flex flex-wrap justify-around gap-2">
          <h2 className="font-semibold flex-100 text-center text-4xl p-2">
            Es tu sur de vouloir quitter ?
          </h2>
          <button
            className="bg-white border-solid border-black border p-1 rounded hover:scale-150 "
            type="button"
            onClick={() => {
              socket.emit("leave_room");
              setIsOpen(false);
              navigate("/", { replace: true });
            }}
          >
            Oui
          </button>
          <button
            className="bg-white border-solid border-black border p-1 rounded hover:scale-150"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            Non
          </button>
        </div>
      </Modal>
      <div className="max-w-xl rounded-2xl bg-white p-4">
        {switchCase(stade)}
      </div>
    </div>
  );
}

export default Game;
