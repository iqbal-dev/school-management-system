const mongoose = require("mongoose");

let connectionURL = process.env.DB_CONNECTION_URL;

const connectDB = async () => {
  await mongoose.connect(connectionURL, { dbName: process.env.DB_NAME });
  console.log("Database connected");
};

module.exports = connectDB;
