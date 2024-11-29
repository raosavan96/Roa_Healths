const routes = require("express").Router();
const {
  addDoctor,
  adminLogin,
  allDoctors
} = require("../controller/adminController");
const { changeAvailablity } = require("../controller/doctorController");
const authAdmin = require("../middlewares/authAdmin");
const upload = require("../middlewares/multer");

routes.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
routes.post("/admin-login", adminLogin);
routes.post("/all-doctors-admin", authAdmin, allDoctors);
routes.post("/availability-changed", changeAvailablity);

module.exports = routes;
