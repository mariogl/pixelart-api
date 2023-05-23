import { Router } from "express";
import {
  getPixels,
  setPixels,
} from "../../controllers/pixels/pixelsControllers.js";

const pixelsRouter = Router();

pixelsRouter.get("/", getPixels);
pixelsRouter.put("/", setPixels);

export default pixelsRouter;
