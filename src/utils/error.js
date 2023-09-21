const notFound = (msg = "Resource not found") => {
  const error = new Error(msg);
  error.status = 404;
  return error;
};

const badRequest = (msg = "Bad Request") => {
  const error = new Error(msg);
  error.status = 400;
  return error;
};

const serverError = (msg = "Internal Server Error") => {
  const error = new Error(msg);
  error.status = 500;
  return error;
};

const authenticationError = (msg = "Authentication Failed") => {
  const error = new Error(msg);
  error.status = 401;
  return error;
};

const authorizationError = (msg = "Permission Denied") => {
  const error = new Error(msg);
  error.status = 403;
  return error;
};
const handleValidationError = (error) => {
  const errors = Object.values(error.errors).map((el) => {
    return {
      path: el?.path,
      message: el?.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: "Validation Error",
    data: errors,
  };
};

module.exports = {
  notFound,
  badRequest,
  serverError,
  authenticationError,
  authorizationError,
  handleValidationError,
};
