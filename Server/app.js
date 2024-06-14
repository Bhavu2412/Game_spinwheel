const express = require("express");
const mogoose = require("mongoose");
const Buffer = require("buffer");
const cors = require("cors");
const adminControllers = require("./Controllers/admin");
const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use("/admin", adminControllers);
mogoose.connect("mongodb://127.0.0.1:27017/location");
app.listen(8080, () => {
  console.log("Server Connected' :)");
});
