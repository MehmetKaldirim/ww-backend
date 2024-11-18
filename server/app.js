//here we will describe all app
const express = require("express");
const authRoutes = require("./routes/auth");
const bodyParser = require("body-parser");
const recordRoutes = require("./routes/record");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/record", recordRoutes);

module.exports = app;
