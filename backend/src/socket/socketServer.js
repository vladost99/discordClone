const authSocket = require("../middleware/authSocket");
const serverStore = require("./store");

const registerSocketServer = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  serverStore.setSocketServerInstance(io);

  io.use((socket, next) => {
    authSocket(socket, next);
  });

  require("./listeners/connection");
};

module.exports = { registerSocketServer };
