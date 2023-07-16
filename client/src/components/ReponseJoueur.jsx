function ReponseJoueur({
  question,
  username,
  socket,
  joueurChoisi,
  tourJoueur,
  roomUsers,
}) {
  let stadeSuivant = "Piece";

  return (
    <div>
      {username === joueurChoisi ? (
        <div className="flex flex-wrap gap-2 justify-center">
          <h2 className="font-semibold flex-100 text-center text-4xl p-2">
            {joueurChoisi} à toi de jouer !
          </h2>
          <p className="flex-100 text-xl p-3 overflow-auto">
            {tourJoueur} t&apos;a posé cette question :
          </p>
          <p className="text-2xl">{question}</p>
          <p className="flex-100 text-xl p-3">Qui veux tu répondre ?</p>
          {roomUsers.map((joueur) =>
            joueur.username !== joueurChoisi &&
            joueur.username !== tourJoueur ? (
              <button
                className="bg-white border-solid border-black border p-1 rounded hover:scale-150"
                key={joueur.id}
                value={joueur.username}
                onClick={(e) => {
                  let reponseJoueur = e.target.value;
                  let joueurSuivant = joueurChoisi;
                  socket.emit("update_stade_C", stadeSuivant);
                  socket.emit("update_tour_joueur_C", joueurSuivant);
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
            C&apos;est à {joueurChoisi} de jouer !
          </h2>
          <p className="flex-100 text-xl p-3">
            Attends qu&apos;il finisse de répondre !
          </p>
        </div>
      )}
    </div>
  );
}

export default ReponseJoueur;
