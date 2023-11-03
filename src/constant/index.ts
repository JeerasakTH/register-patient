import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 8080;
export const DB = process.env.DB!;
