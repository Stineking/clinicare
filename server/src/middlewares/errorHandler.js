import responseHandler from "../utils/responseHandler.js";
const { errorResponse } = responseHandler;

//error handler for dev enviroment
const sendErrorDev = (err, res) => {
  const errResponse = {
    status: err.status || "error",
    message: err.message,
    stack: err.stack,
    error: {
      name: err.name,
      statusCode: err.statusCode,
      isOperational: err.isOperational,
    },
  };
  console.error("ERROR", err);
  res.status(err.statusCode || 500).json(errResponse);
};

//send error for prod enviroment
const sendErrorProd = (err, res) => {
  //If operational is set to true, then we send a msg to client
  if (err.isOperational) {
    const errResponse = {
      status: err.status || "error",
      message: err.message,
    };
    return res.status(err.statusCode || 500).json(errResponse);
  }
  //programming errors or unknown errors: don't leak errors to client
  console.error("ERROR", err);
  return res.status(err.statusCode).json({
    status: "error",
    message: "Something went wrong",
  });
};

//Handle JWT ERRORS.
const handleJWTError = () => {
  return errorResponse("Invalid Token, Please login again", 401);
};
const handleJWTExpiredError = () => {
  return errorResponse("Your token has expired! Please login again", 401);
};

//Main error handler middleware
export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err, message: err.message, name: err.name };
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError;
    sendErrorProd(error, res);
  }
};

//Catch 404 error routes
export const catchNotFound = (req, res) => {
  errorResponse(`Cant find ${req.originalUrl} on this server!`, 404);
};
