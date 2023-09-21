const express = require("express");
const applyMiddleware = require("./middleware");
const routes = require("./routes");
const { handleValidationError } = require("./utils/error");
// express app
const app = express();
applyMiddleware(app);
app.use(routes);

app.get("/health", (req, res) => {
  res.status(200).json({
    health: "OK",
    user: req.user,
  });
});

app.use((error, _req, res, next) => {
  if (error.name === "ValidationError") {
    // Handle validation errors
    const validationErrors = handleValidationError(error);
    const errorMessage = error.message;

    res.status(validationErrors.statusCode).json({
      error: errorMessage,
      code: validationErrors.statusCode,
      data: validationErrors.data,
    });
  } else {
    res.status(error.status || 500).json({
      message: error.message,
      errors: error.errors,
    });
  }
});

module.exports = app;
