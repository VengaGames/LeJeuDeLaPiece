import { useState, useEffect, useRef } from "react";

function Piece({ tourJoueur, socket, username, joueurChoisi, question }) {
  const [affichageReponse, updateAffichageReponse] = useState(false);
  let resultat = useRef();

  useEffect(() => {
    socket.on("update_affichage_reponse_S", (data) => {
      const { affichage, result } = data;
      updateAffichageReponse(affichage);
      resultat.current = result;
    });
  }, [socket, updateAffichageReponse]);

  const stadeSuivant = "ChoixJoueur";
  let affichage;
  let reponse;
  if (resultat.current) {
    reponse = (
      <p className="flex-100 text-xl p-3">
        Pile ! La question était : {question}
      </p>
    );
  } else {
    reponse = (
      <p className="flex-100 text-xl p-3">
        Face ! On ne connaitra jamais la réponse.
      </p>
    );
  }

  let boutonTourSuivant = (
    <button
      className="bg-white border-solid border-black border p-1 rounded hover:scale-150"
      onClick={() => {
        affichage = false;
        let nouvelleQuestion = "";
        let joueurSuivant = joueurChoisi;
        socket.emit("update_affichage_reponse_C", affichage);
        socket.emit("update_tour_joueur_C", joueurSuivant);
        socket.emit("update_question_C", nouvelleQuestion);
        socket.emit("update_stade_C", stadeSuivant);
      }}
    >
      Tour Suivant
    </button>
  );

  let tourSuivant = (
    <div>
      {reponse}
      {boutonTourSuivant}
    </div>
  );

  return (
    <div>
      {username === joueurChoisi ? (
        <div className="flex flex-wrap gap-2">
          <h2 className="font-semibold flex-100 text-center text-4xl p-2">
            {joueurChoisi} à toi de jouer !
          </h2>
          <p className="flex-100 text-xl p-3">
            Tu as été choisi par {tourJoueur}
          </p>
          {!affichageReponse ? (
            <button
              type="button"
              className="bg-white border-solid border-black border p-1 rounded hover:scale-150 m-auto"
              onClick={() => {
                affichage = true;
                socket.emit("update_affichage_reponse_C", affichage);
              }}
            >
              Lancer la pièce
            </button>
          ) : null}
          {affichageReponse ? tourSuivant : null}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          <h2 className="font-semibold flex-100 text-center text-4xl p-2">
            {joueurChoisi} a été choisi par {tourJoueur} !
          </h2>
          {!affichageReponse ? (
            <p className="flex-100 text-xl p-3">
              Il doit maintenant lancer la pièce !
            </p>
          ) : (
            reponse
          )}
        </div>
      )}
    </div>
  );
}

export default Piece;
