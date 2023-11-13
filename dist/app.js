"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("./constant/index");
const patient_1 = __importDefault(require("./routes/patient"));
const appError_1 = __importDefault(require("./utils/appError"));
const errorHandler_1 = require("./utils/errorHandler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        mongoose_1.default.set("strictQuery", false);
        yield mongoose_1.default.connect(index_1.DB).then(() => console.log("Connected to MongoDB"));
    }
    catch (err) {
        throw err;
    }
});
mongoose_1.default.connection.on("disconnect", () => console.log("mongoDB disconnected!"));
mongoose_1.default.connection.on("connect", () => console.log("mongoDB connected!"));
app.use("/api/patient", patient_1.default);
app.use(errorHandler_1.errorHandler);
app.all("*", (req, res, next) => {
    next(new appError_1.default(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.listen(index_1.PORT, () => {
    connect();
    console.log(`Listening on port ${index_1.PORT}`);
});
module.exports = app;
