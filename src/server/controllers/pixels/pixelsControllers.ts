import fs from "fs/promises";
import { type NextFunction, type Request, type Response } from "express";
import { type CanvasPixels } from "../../../types";

export const getPixels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pixels = await fs.readFile("pixels.json", "utf8");

    const pixelsData = JSON.parse(pixels) as { pixels: CanvasPixels };

    res.status(200).json({ pixels: pixelsData.pixels });
  } catch (error) {
    next(error);
  }
};

export const setPixels = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    { pixels: CanvasPixels }
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const pixels = req.body;

    await fs.writeFile("pixels.json", JSON.stringify(pixels), "utf-8");

    res.status(200).json({ message: "Pixels set" });
  } catch (error) {
    next(error);
  }
};
