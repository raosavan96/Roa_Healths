const doctorModel = require("../models/doctorModel");

exports.changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);

    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available
    });

    res.status(201).json({
      data: "",
      success: true,
      error: false,
      message: "Doctor Abailablity Changed.."
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

exports.doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);

    res.status(201).json({
      doctors: doctors,
      success: true,
      error: false,
      message: "Doctor Abailablity Changed.."
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
