const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sneharjpt27:Sneha%40123@cluster0.mrxwub9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Error connecting to Database ", err.message);
  }
};

module.exports = connectDB;

// const { MongoClient } = require("mongodb");

// const uri =
//   "mongodb+srv://sneharjpt27:Sneha%40123@cluster0.mrxwub9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// const client = new MongoClient(uri);

// const con = async () => {
//   try {
//     await client.connect();
//     console.log("Connected to MongoDB !!");
//   } catch (err) {
//     console.log("Unable to connect. ", err);
//   }
// };
// module.exports = con;
