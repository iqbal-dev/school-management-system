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
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];

    await collection.deleteMany();
  }
  await mongoose.connection.close();
});
