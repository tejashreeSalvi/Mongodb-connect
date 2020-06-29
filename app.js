const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRoutes = require("./api/routes/user");
const errorHandler = require('./api/routes/errorHandler');
const mongoose = require('mongoose');

mongoose.connect('CONNECTION_STRING', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
