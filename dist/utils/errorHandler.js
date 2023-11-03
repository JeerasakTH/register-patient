"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const appError_1 = __importDefault(require("./appError"));
const errorHandler = (err, req, res, next) => {
    if (err instanceof appError_1.default) {
        // Handle your custom AppError
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
    else {
        // Handle other errors
        res.status(500).json({
            status: "error",
            message: "Something went wrong",
        });
    }
};
exports.errorHandler = errorHandler;
