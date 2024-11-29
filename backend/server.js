const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDb = require("./config/mongodb");
const cloudinary = require("./config/cloudinary");
const adminRoutes = require("./routes/adminRoutes");
const server = express();

// app config

const port = process.env.PORT || 4000;
connectDb();
cloudinary();

// middlewares

server.use(express.json());
server.use(cors());

// api

server.use("/api/admin", adminRoutes);

// listen

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
