import "../../../loadEnvironment.js";
import { type NextFunction, type Request, type Response } from "express";
import createDebug from "debug";
import chalk from "chalk";
import CustomError from "../../CustomError/CustomError.js";

const debug = createDebug("pixelart-api:server:middlewares:errors");

export const notFoundError = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  const error = new CustomError("Endpoint not found", 404);

  next(error);
};

export const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  debug(chalk.red(error.message));

  const errorMessage = error.publicMessage ?? "General pete";
  const errorStatusCode = error.statusCode ?? 500;

  res.status(errorStatusCode).json({ message: errorMessage });
};
