var cors = require('cors');
const http = require("http");

// Création du serveur express
const express = require("express");
const app = express();
app.use(cors());

let broadcaster;
const port = 4000 || process.env.port; // Port du serveur 4000 ou un autre port disponible si celui-ci est déjà occupé
const server = http.createServer(app); // Crée le serveur http pour l'utilisé avec socket.io

const io = require("socket.io")(server, {
    cors: {
      origin: "*"
    }
  });

//set static folder
app.use(express.static(__dirname + "/public"));

app.get('/', function (req, res) {
    res.status(200).json({"message":"ok"})
})
 

io.sockets.on("error", event => console.log(event));

io.sockets.on("connection", socket => {
    console.log("connected")
    socket.on("broadcaster", () => {
        broadcaster = socket.id;
        socket.broadcast.emit("broadcaster");
    });
    socket.on("watcher", () => {
        socket.to(broadcaster).emit("watcher", socket.id);
    });
    socket.on("offer", (id, message) => {
        socket.to(id).emit("offer", socket.id, message);
    });
    socket.on("answer", (id, message) => {
        socket.to(id).emit("answer", socket.id, message);
    });
    socket.on("candidate", (id, message) => {
        socket.to(id).emit("candidate", socket.id, message);
    });
    socket.on("disconnect", () => {
        socket.to(broadcaster).emit("disconnectPeer", socket.id);
    });
});

server.listen(port, () => console.log(`Server is running on port ${port}`));