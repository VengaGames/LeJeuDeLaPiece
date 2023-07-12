import { useNavigate } from "react-router-dom";

function Login({ username, setUsername, room, setRoom, socket }) {
  const navigate = useNavigate();

  const joinRoom = () => {
    if (room !== "" && username !== "") {
      socket.emit("join_room", { username, room });
    }
    navigate("/game", { replace: true });
  };

  return (
    <div className="bg-[#242531] justify-center flex flex-col  rounded-lg items-center shadow-2xl w-3/4 md:w-1/4">
      <h1 className="mt-5 mb-2 text-xl font-semibold text-white">
        Jeu de la Pièce !
      </h1>
      <input
        placeholder="Nom de la room..."
        autoComplete="off"
        className="bg-[#242531] !ring-0 !outline-none rounded-3xl text-white w-60 h-12 shadow-md shadow-[#00FECC] font-semibold "
        required
        type="text"
        name="room"
        id="room"
        maxLength={15}
        onChange={(e) => setRoom(e.target.value)}
      />
      <input
        placeholder="Ton Pseudo..."
        autoComplete="off"
        className="bg-[#242531] !ring-0 !outline-none rounded-3xl text-white w-60 h-12 shadow-md shadow-[#00FECC] mt-6 font-semibold "
        required
        type="text"
        name="name"
        maxLength={15}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div className="flex flex-col items-center">
        <button
          className="bg-[#FDFDFD] rounded-3xl text-center flex flex-row justify-center items-center mt-4 mb-2 w-24 font-semibold"
          onClick={joinRoom}
        >
          Rejoindre
        </button>
      </div>
    </div>
  );
}

export default Login;
