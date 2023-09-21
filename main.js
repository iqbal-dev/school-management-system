require("dotenv").config();
const connect = require("./db");
const Product = require("./Product");

const main = async () => {
  // database connection
  await connect();

  // main codes
  const product = new Product({
    name: "Microsoft Surface Pro - 2023",
    price: 12000,
    tags: ["microsoft", "laptop"],
    color: "Gray",
  });
  try {
    const allProduct = await Product.find();
    console.log("new product crated with id -", allProduct);
    // await Product.deleteMany({});
    // console.log('Done');
  } catch (e) {
    console.log(e.message);
  }
};

main();
