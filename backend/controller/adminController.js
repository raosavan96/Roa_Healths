const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");
const appointmentsModel = require("../models/appointmentsModel");
const userModel = require("../models/userModel");

//Admin login

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d"
      });

      res.status(200).json({
        token,
        success: true,
        error: false,
        message: "Login successful"
      });
    } else {
      res.status(401).json({
        success: false,
        error: true,
        message: "Invalid email or password"
      });
    }
  } catch (error) {
    console.error("Error during admin login:", error);

    if (!res.headersSent) {
      res.status(500).json({
        message: error.message,
        error: true,
        success: false
      });
    }
  }
};

//Admin login

//Doctor adding

exports.addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      education,
      experience,
      about,
      fees,
      image,
      address
    } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Please enter a valid email",
        error: true,
        success: false
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long",
        error: true,
        success: false
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newDoctor = new doctorModel({
      name,
      email,
      password: hashPassword,
      speciality,
      education,
      experience,
      about,
      fees,
      image,
      address: JSON.parse(address),
      date: Date.now()
    });

    // Save to database
    const savedDoctor = await newDoctor.save();

    res.status(201).json({
      data: savedDoctor,
      success: true,
      error: false,
      message: "Doctor added successfully"
    });
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({
        message: error.message,
        error: true,
        success: false
      });
    }
  }
};

//Doctor adding

exports.allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");

    res.status(201).json({
      data: doctors,
      success: true,
      error: false,
      message: "success find all doctors"
    });
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({
        message: error.message,
        error: true,
        success: false
      });
    }
  }
};

exports.userAppoinments = async (req, res) => {
  try {
    const userAppointments = await appointmentsModel.find();
    res.status(201).json({
      userAppoins: userAppointments,
      success: true,
      error: false,
      message: "success find all doctors"
    });
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({
        message: error.message,
        error: true,
        success: false
      });
    }
  }
};

exports.deleteAppointments = async (req, res) => {
  try {
    const { id } = req.body;

    const apointment = await appointmentsModel.findById(id);

    await appointmentsModel.findByIdAndUpdate(id, {
      cancelled: true
    });

    const { docId, slotDate, slotTime } = apointment;

    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.status(201).json({
      success: true,
      error: false,
      message: "Appointment cancel.."
    });
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({
        message: error.message,
        error: true,
        success: false
      });
    }
  }
};

exports.getAllPatients = async (req, res) => {
  try {
    const getPatient = await userModel.find().select("-password");
    res.status(201).json({
      patients: getPatient,
      success: true,
      error: false
    });
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({
        message: error.message,
        error: true,
        success: false
      });
    }
  }
};

exports.actionPatient = async (req, res) => {
  try {
    const { id, active } = req.body;

    await userModel.findByIdAndUpdate(id, {
      status: active
    });

    res.status(201).json({
      success: true,
      error: false,
      message: "Updated Patients.."
    });
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({
        message: error.message,
        error: true,
        success: false
      });
    }
  }
};
