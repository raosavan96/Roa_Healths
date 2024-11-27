const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => console.log("DB Connected"));
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
