const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const leaveRoom = require("./utils/leave-room");
const { CONNREFUSED } = require("dns");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let allUsers = [];

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  // We can write our socket event listeners in here...
  socket.on("join_room", (data) => {
    const { username, room } = data; // Data sent from client when join_room event emitted
    socket.join(room); // Join the user to a socket room

    allUsers.push({ id: socket.id, username, room });
    gameRoomUsers = allUsers.filter((user) => user.room === room);
    premierJoueur = gameRoomUsers[0].username
    io.to(room).emit("gameroom_users", {gameRoomUsers, premierJoueur});
  });

  
  socket.on("leave_room", (data) => {
    const {username, room} = data
    console.log(allUsers)
    console.log(allUsers.find((user) => user.id === socket.id))
    socket.leave(room);
    allUsers = leaveRoom(socket.id, allUsers);
  });

  socket.on("update_stade_C", (stadeSuivant) => {
    io.to(allUsers.find((user) => user.id === socket.id).room).emit("update_stade_S", stadeSuivant);
  });

  socket.on("update_joueur_choisi_C", (reponseJoueur) => {
    io.to(allUsers.find((user) => user.id === socket.id).room).emit("update_joueur_choisi_S", reponseJoueur);
  });

  socket.on("update_question_C", (nouvelleQuestion) => {
    io.to(allUsers.find((user) => user.id === socket.id).room).emit("update_question_S", nouvelleQuestion);
  });

  socket.on("update_tour_joueur_C", (joueurSuivant) => {
    io.to(allUsers.find((user) => user.id === socket.id).room).emit("update_tour_joueur_S", joueurSuivant);
  });

  socket.on("update_affichage_reponse_C", (affichage) => {
    let result = true;
    if (Math.floor(Math.random() * 2) === 0) {
      result = false;
    }
    io.to(allUsers.find((user) => user.id === socket.id).room).emit("update_affichage_reponse_S", { affichage, result });
  });
});

server.listen(4000, () => "Server is running on port 4000");
