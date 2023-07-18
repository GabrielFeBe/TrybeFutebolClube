import { NextFunction, Request, Response } from 'express';
import ErrorExpress from '../Error/ErrorInstance';

export default class ErrorMiddleware {
  static mapCodes:Record<string, number> = {
    unauthorized: 401,
    badRequest: 400,

  };

  static handler(err: Error, req: Request, res: Response, _next: NextFunction) {
    const statusCode = ErrorMiddleware.mapCodes[err.name] ?? 500;
    if (err instanceof ErrorExpress) {
      return res.status(statusCode).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
}
