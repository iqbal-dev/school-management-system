// mongoose.js
const mongoose = require("mongoose");

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect("mongodb://127.0.0.1:27017/schoolManagementSystem", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
};
beforeAll(async () => {
  await connectToDatabase();
}, 50000);

afterAll(async () => {
  // Close the Mongoose connection after all tests
  await mongoose.connection.close();
});
