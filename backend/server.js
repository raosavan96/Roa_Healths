const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");
require("dotenv").config();
const connectDb = require("./config/mongodb");
const cloudinary = require("./config/cloudinary");
const server = express();

// app config

const port = process.env.PORT || 5000;
connectDb();
cloudinary();

// middlewares

server.use(express.json());
server.use(cors());

// api

server.use("/api/", routes);

// listen

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
