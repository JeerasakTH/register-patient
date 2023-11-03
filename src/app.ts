import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import { PORT, DB } from "./constant/index";
import patientRoutes from "./routes/patient";
import AppError from "./utils/appError";
import { errorHandler } from "./utils/errorHandler";

const app = express();
app.use(express.json());

const connect = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(DB).then(() => console.log("Connected to MongoDB"));
  } catch (err) {
    throw err;
  }
};

mongoose.connection.on("disconnect", () =>
  console.log("mongoDB disconnected!")
);

mongoose.connection.on("connect", () => console.log("mongoDB connected!"));

app.use("/api/patient", patientRoutes);
app.use(errorHandler);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  connect();
  console.log(`Listening on port ${PORT}`);
});
