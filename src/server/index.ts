import express from "express";
import morgan from "morgan";
import cors from "cors";
import { pingController } from "./controllers/ping/pingController.js";
import {
  generalError,
  notFoundError,
} from "./middlewares/errors/errorsMiddlewares.js";
import pixelsRouter from "./routers/pixels/pixelsRouter.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));

app.use(express.json());

app.get("/", pingController);
app.use("/pixels", pixelsRouter);

app.use(notFoundError);
app.use(generalError);

export default app;
