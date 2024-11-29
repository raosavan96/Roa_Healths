const routes = require("express").Router();
const { addDoctor, adminLogin } = require("../controller/adminController");
const authAdmin = require("../middlewares/authAdmin");
const upload = require("../middlewares/multer");

routes.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
routes.post("/admin-login", adminLogin);

module.exports = routes;
