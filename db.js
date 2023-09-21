const mongoose = require("mongoose");

/**
 * This function will generate and return a database connection string from environment variable
 * @returns string
 */
const generateConnectionString = () => {
  const connectionURL = process.env.DB_CONNECTION_URL;
  const name = process.env.DB_NAME;
  return `${connectionURL}/${name}`;
};

/**
 * connect to the mongodb database using mongoose
 */
const connect = async () => {
  const url = generateConnectionString();
  console.log(url);
  const options = { autoIndex: false };

  await mongoose.connect(url, options);
  console.log("Database connected");
};

module.exports = connect;
