import { ErrorRequestHandler } from "express";
import AppError from "./appError";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    // Handle your custom AppError
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Handle other errors
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};
