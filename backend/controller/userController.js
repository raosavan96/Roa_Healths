const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body.signUpData;

    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Missing Details .."
      });
    }
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Enter a valid email"
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Enter a strong password"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashPassword
    };

    const userDataSave = new userModel(userData);
    const user = await userDataSave.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

    res.status(201).json({
      token: token,
      success: true,
      error: false,
      message: "Create account successfully.."
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

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body.loginData;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist.."
      });
    }

    const isMatchPass = await bcrypt.compare(password, user.password);

    if (isMatchPass) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: 60 * 60 * 1
      });

      res.status(201).json({
        token: token,
        success: true,
        error: false,
        message: "Login successfully.."
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid enter details.."
      });
    }
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

exports.getUserProfile = async (req, res) => {
  try {
    const { userId } = req.body;

    const userInfo = await userModel.findById(userId).select("-password");
    res.status(201).json({
      userInfo: userInfo,
      success: true,
      error: false,
      message: "User Profile Info.."
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

exports.userUpdateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender, image } = req.body;

    console.log(req.body);

    if (!name || !phone || !address || !dob || !gender || !image) {
      return res.json({
        success: false,
        message: "Missing Details..."
      });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
      image
    });

    res.status(201).json({
      userInfo: "",
      success: true,
      error: false,
      message: "Profile updated.."
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
