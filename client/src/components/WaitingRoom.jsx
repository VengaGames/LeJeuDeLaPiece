function WaitingRoom({ socket, roomUsers, username, tourJoueur }) {
  const stadeSuivant = "ChoixJoueur";

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <h2 className="font-semibold flex-100 text-center text-4xl p-2">
          Il faut minimum 4 joueurs pour commencer la partie !
        </h2>
        <ul>
          {roomUsers.map((joueur) => (
            <li key={joueur.id}>{joueur.username}</li>
          ))}
        </ul>
        {username === tourJoueur ? (
          <button
            className="bg-white border-solid border-black border p-1 rounded hover:scale-150"
            type="button"
            onClick={() => socket.emit("update_stade_C", stadeSuivant)}
          >
            Commencer
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default WaitingRoom;
