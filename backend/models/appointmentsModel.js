const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  userId: { type: String, require: true },
  docId: { type: String, require: true },
  sloteDate: { type: String, require: true },
  slotTime: { type: String, require: true },
  userData: { type: Object, require: true },
  docData: { type: Object, require: true },
  amount: { type: Number, require: true },
  date: { type: Number, require: true },
  canclled: { type: Boolean, default: false },
  payment: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false }
});

module.exports =
  mongoose.model.appointment ||
  mongoose.model("appointment", appointmentSchema);
