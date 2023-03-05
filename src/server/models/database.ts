import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
mongoose.connect(`${process.env.MONOGODB_URI}`);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  console.log("Connected");
});

//require("./Category");
//require("./Recipe");
