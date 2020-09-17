const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const PORT = process.env.PORT || 5000;
const alphabet = "abcdefghijklmnopqrstuvwxyz";


server.listen(PORT, ()=>{
	console.info(`Node HTTP Server opened on Localhost:${PORT}
Socket.IO listening on Port ${PORT} - Ready state confirmed`);
});
app.use(express.static(__dirname + "/client"));