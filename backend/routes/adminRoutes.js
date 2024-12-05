const routes = require("express").Router();
const {
  addDoctor,
  adminLogin,
  allDoctors,
  userAppoinments,
  deleteAppointments,
  getAllPatients,
  actionPatient
} = require("../controller/adminController");
const { changeAvailablity } = require("../controller/doctorController");
const authAdmin = require("../middlewares/authAdmin");
const upload = require("../middlewares/multer");

routes.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
routes.post("/admin-login", adminLogin);
routes.post("/all-doctors-admin", authAdmin, allDoctors);
routes.post("/availability-changed", changeAvailablity);
routes.get("/user-appointments", userAppoinments);
routes.get("/get-all-patients", authAdmin, getAllPatients);

routes.post("/delete-apointment", authAdmin, deleteAppointments);
routes.post("/action-patient", authAdmin, actionPatient);

module.exports = routes;
