import { useState, useEffect } from "react";
import FlecheRetour from "./FlecheRetour";
import ChoixJoueur from "./ChoixJoueur";
import ChoixQuestion from "./ChoixQuestion";
import ReponseJoueur from "./ReponseJoueur";
import Piece from "./Piece";
import Popup from "./Popup";

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
  const [roomUsers, updateRoomJoueurs] = useState([]);
  const [afficherPopup, updateAfficherPopup] = useState(false);

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
  ]);

  function switchCase(stade) {
    switch (stade) {
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
      {console.log(roomUsers)}
      <FlecheRetour updateAfficherPopup={updateAfficherPopup} />
      <div className="max-w-xl mt-24 rounded-2xl bg-white p-4">
        {switchCase(stade)}
      </div>
      <Popup socket={socket} afficherPopup={afficherPopup} />
    </div>
  );
}

export default Game;
