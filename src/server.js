import express from "express";
import cors from "cors";
import morgan from "morgan";
import lichessRouter from "./resources/lichess/lichess.router.js";
import { config } from "./config/general.config.js";


const app = express();

app.disable("x-powered-by");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));




app.use("/api/lichess",lichessRouter);



export const start = async () => {
  try {

    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`);
    });
  } catch (e) {
    console.log(e);
  }
};