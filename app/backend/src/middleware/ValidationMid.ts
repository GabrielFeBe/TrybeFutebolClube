import { NextFunction, Request, Response } from 'express';
import Unauthorized from '../Error/Unauthorize';
import ValidateMidFunctions from './VamidationMidFunc';

class Validate {
  static validateUser(req: Request, res: Response, next: NextFunction) {
    const post = req.body;
    const requiredKeys = ['password', 'email'];

    ValidateMidFunctions.notFoundKey(requiredKeys, post);

    next();
  }

  static validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) throw new Unauthorized('Token not found');

    const [__, token] = authorization.split(' ');
    console.log(__);
    req.headers.authorization = token;

    next();
  }
}

export default Validate;
