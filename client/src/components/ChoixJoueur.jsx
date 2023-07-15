function ChoixJoueur({ socket, roomUsers, username, tourJoueur }) {
  let stadeSuivant = "ChoixQuestion";

  return (
    <div>
      {username === tourJoueur ? (
        <div className="flex flex-wrap gap-2">
          <h2 className="font-semibold flex-100 text-center text-4xl p-2">
            {tourJoueur} à toi de jouer !
          </h2>
          <p className="flex-100 text-xl p-3">
            A quel joueur veux tu poser une question ?
          </p>
          {roomUsers.map((joueur) =>
            joueur.username !== tourJoueur ? (
              <button
                className="bg-white border-solid border-black border p-1 rounded hover:scale-150"
                key={joueur.id}
                value={joueur.username}
                onClick={(e) => {
                  let reponseJoueur = e.target.value;
                  socket.emit("update_stade_C", stadeSuivant);
                  socket.emit("update_joueur_choisi_C", reponseJoueur);
                }}
              >
                {joueur.username}
              </button>
            ) : null
          )}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          <h2 className="font-semibold flex-100 text-center text-4xl p-2">
            C&apos;est à {tourJoueur} de jouer !
          </h2>
          <p className="flex-100 text-xl p-3">
            Attends qu&apos;il choisisse le joueur à qui poser une question !
          </p>
        </div>
      )}
    </div>
  );
}

export default ChoixJoueur;
