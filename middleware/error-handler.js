const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  let customerError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later",
  };
  if (err.name === "ValidationError") {
    customerError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customerError.statusCode = 400;
  }
  if (err.code && err.code === 11000) {
    customerError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customerError.statusCode = 400;
  }
  if (err.name === "CastError") {
    customerError.msg = `No item found with id : ${err.value}`;
    customerError.statusCode = 404;
  }
  return res.status(customerError.statusCode).json({ msg: customerError.msg });
};

module.exports = errorHandlerMiddleware;
