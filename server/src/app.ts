// import path from "path";
import express, { Express } from "express";
import morgan from "morgan";
import helmet from "helmet";
import "dotenv-safe/config";
import mongoose from "mongoose";
import cors from "cors";
import urlRoutes from "./routes";

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());
app.enable("trust proxy");

app.use(helmet());
app.use(morgan("common"));
app.use(express.json());
app.use(urlRoutes);

const uri: string = process.env.MONGODB_URI!;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    throw error;
  });
