import { type Request, type Response } from "express";
import { generalError, notFoundError } from "./errorsMiddlewares";
import CustomError from "../../CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a generalError middleware", () => {
  const req = {};
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  describe("When it receives a 404 'Endpoint not found' error and a response", () => {
    const errorMessage = "Endpoint not found";
    const statusCode = 404;
    const error = new CustomError(errorMessage, statusCode);

    test("Then it should call the response's method status with 404", () => {
      generalError(error, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });

    test("Then it should call the response's json with a 'Endpoint not found' message", () => {
      generalError(error, req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe("When it receives an error without status code and a response", () => {
    const error = new Error("Everything has petated");

    test("Then it should call the response's method status with 500", () => {
      const expectedStatusCode = 500;

      generalError(error as CustomError, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's method json with a message 'General pete'", () => {
      const expectedErrorMessage = "General pete";

      generalError(error as CustomError, req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ message: expectedErrorMessage });
    });
  });
});

describe("Given a notFoundError middleware", () => {
  describe("When it receives a next function", () => {
    test("Then it should call the received next function with a 404 'Endpoint not found' error", () => {
      const req = {};
      const res = {};
      const next = jest.fn();

      const expectedError = new CustomError("Endpoint not found", 404);

      notFoundError(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
