const { doctorList } = require("../controller/doctorController");

const doctorRoutes = require("express").Router();

doctorRoutes.get("/list", doctorList);

module.exports = doctorRoutes;
