function ChoixQuestion({ username, socket, tourJoueur, joueurChoisi }) {
  let stadeSuivant = "ReponseJoueur";

  const onSubmit = (e) => {
    e.preventDefault();
    let nouvelleQuestion = e.target.elements.question.value;
    socket.emit("update_question_C", nouvelleQuestion);
    socket.emit("update_stade_C", stadeSuivant);
  };
  return (
    <div>
      {username === tourJoueur ? (
        <div className="flex flex-wrap">
          <h2 className="font-semibold flex-100 text-center text-4xl p-2">
            {tourJoueur} à toi de jouer !
          </h2>
          <p className="flex-100 text-xl p-3">
            Quelle question veux tu poser à {joueurChoisi} ?
          </p>
          <form className="flex-100 p-3 mx-6" onSubmit={onSubmit}>
            <input
              type="text"
              name="question"
              id="question"
              className="border-solid border-black border"
            />
            <button
              type="submit"
              className="bg-white border-solid border-black border p-1 rounded hover:scale-150 m-auto"
            >
              Valider
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          <h2 className="font-semibold flex-100 text-center text-4xl p-2">
            C&apos;est à {tourJoueur} de jouer !
          </h2>
          <p className="flex-100 text-xl p-3">
            Attends qu&apos;il finisse de choisir la question à poser !
          </p>
        </div>
      )}
    </div>
  );
}

export default ChoixQuestion;
