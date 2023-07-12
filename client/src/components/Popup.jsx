import { useNavigate } from "react-router-dom";

function Popup({ socket, afficherPopup }) {
  const navigate = useNavigate();

  const leaveRoom = () => {
    socket.emit("leave_room");

    navigate("/", { replace: true });
  };

  return (
    <div
      className={
        (afficherPopup ? "flex" : "hidden") +
        " max-w-xl mt-24 rounded-2xl bg-white p-4"
      }
    >
      <h2 className="font-semibold flex-100 text-center text-4xl p-2">
        Es tu sur de vouloir déjà nous quitter ?
      </h2>
      <button
        className="bg-white border-solid border-black border p-1 rounded hover:scale-150"
        onClick={leaveRoom}
      >
        Oui
      </button>
      <button className="bg-white border-solid border-black border p-1 rounded hover:scale-150">
        Non
      </button>
    </div>
  );
}

export default Popup;
