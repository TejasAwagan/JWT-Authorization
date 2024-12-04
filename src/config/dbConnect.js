const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const connect = mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Database Connected !");
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnect;
