require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const connection = require("./db/db");
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.router");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
connection();
app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});
app.use("/users", userRoutes);
app.use("/captain", captainRoutes);
module.exports = app;
