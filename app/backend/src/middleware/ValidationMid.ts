import { NextFunction, Request, Response } from 'express';
import TokenGeneratorJwt from '../services/TokenGeneratorJwt';
import Unauthorized from '../Error/Unauthorize';
import ValidateMidFunctions from './VamidationMidFunc';

class Validate {
  static tokenGenerator = new TokenGeneratorJwt();

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
    const data = Validate.tokenGenerator.verifyToken(token);
    req.headers.authorization = data.role;

    next();
  }
}

export default Validate;
