const express = require("express");
const http = require("http");
const socketServer = require("./socket/socketServer");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connectDB");
const errorMiddleware = require("./middleware/errorMiddleware");
require("dotenv").config();

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URI,
    credentials: true,
  })
);

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/friends", require("./routes/friendsRoutes"));
app.use(errorMiddleware);

const server = http.createServer(app);

connectDB().then(() => {
  socketServer.registerSocketServer(server);
  server.listen(PORT, () => {
    console.log(`Server listen on PORT - ${PORT}`);
  });
});
