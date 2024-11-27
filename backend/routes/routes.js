const { doctorController } = require("../controller/doctorController");

const routes = require("express").Router();

routes.get("/", doctorController);

module.exports = routes;
