const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const cloudinary = require("cloudinary");
const doctorModel = require("../models/doctorModel");
exports.addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address
    } = req.body;

    // const imageFile = req.file;

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.status(500).json({
        message: "Missing Details",
        error: true,
        success: false
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(500).json({
        message: "Please enter a valid email",
        error: true,
        success: false
      });
    }

    if (password.length < 8) {
      return res.status(500).json({
        message: "Please enter a strong password",
        error: true,
        success: false
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
    //   resource_type: "image"
    // });
    // const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      password: hashPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now()
      //   image: imageUrl,
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.status(200).json({
      data: "",
      success: true,
      error: false,
      message: "add doctor successfully.."
    });
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({
        message: "Internal server error",
        error: true,
        success: false
      });
    }
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET_KEY);
      res.status(200).json({
        token: token,
        success: true,
        error: false,
        message: "success"
      });
    } else {
      res.json({
        success: false,
        error: true,
        message: "Email & Password wrong..."
      });
    }
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({
        message: "Internal server error",
        error: true,
        success: false
      });
    }
  }
};
