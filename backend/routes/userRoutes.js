const {
  registerUser,
  loginUser,
  getUserProfile,
  userUpdateProfile,
  bookApointment
} = require("../controller/userController");
const authUser = require("../middlewares/authUser");
const upload = require("../middlewares/multer");

const userRoutes = require("express").Router();

userRoutes.post("/register-user", registerUser);
userRoutes.post("/login-user", loginUser);
userRoutes.get("/get-profile", authUser, getUserProfile);
userRoutes.post(
  "/user-update-profile",
  upload.single("image"),
  authUser,
  userUpdateProfile
);
userRoutes.post("/appointment-book", authUser, bookApointment);

module.exports = userRoutes;
