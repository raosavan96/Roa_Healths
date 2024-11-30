const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/mongodb");
const cloudinary = require("./config/cloudinary");
const adminRoutes = require("./routes/adminRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const userRoutes = require("./routes/userRoutes");
const server = express();

// app config

const port = process.env.PORT || 4000;

cloudinary();

// middlewares

server.use(express.json());
server.use(cors());

// api

server.use("/api/admin", adminRoutes);
server.use("/api/doctor", doctorRoutes);
server.use("/api/user", userRoutes);

// listen

connectDB()
  .then(() => {
    server.listen(port, () => {
      console.log(
        `Server running at http://localhost:${port}/api/admin/add-doctor`
      );
      console.log("Connected to the database");
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });
