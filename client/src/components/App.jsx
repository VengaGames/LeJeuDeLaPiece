import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import Banner from "./Banner";
import Login from "./Login";
import Footer from "./Footer";
import Game from "./Game";

const socket = io.connect("http://localhost:4000");

function App() {
  const [username, setUsername] = useState();
  const [room, setRoom] = useState("");
  const [stade, updateStade] = useState("WaitingRoom");
  const [tourJoueur, updateTourJoueur] = useState("");
  const [joueurChoisi, updateJoueurChoisi] = useState();
  const [question, updateQuestion] = useState();

  return (
    <Router>
      <Banner room={room} />
      <div className="w-full h-full flex flex-col items-center justify-center p-3">
        <Routes>
          <Route
            path="/"
            element={
              <Login
                username={username}
                setUsername={setUsername}
                room={room}
                setRoom={setRoom}
                socket={socket}
              />
            }
          />
          <Route
            path="/game"
            element={
              <Game
                socket={socket}
                room={room}
                username={username}
                tourJoueur={tourJoueur}
                updateTourJoueur={updateTourJoueur}
                stade={stade}
                updateStade={updateStade}
                joueurChoisi={joueurChoisi}
                updateJoueurChoisi={updateJoueurChoisi}
                question={question}
                updateQuestion={updateQuestion}
              />
            }
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
