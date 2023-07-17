import { NextFunction, Request, Response } from 'express';
import ValidateMidFunctions from './VamidationMidFunc';

class Validate {
  static validateUser(req: Request, res: Response, next: NextFunction) {
    const post = req.body;
    const requiredKeys = ['password', 'email'];

    ValidateMidFunctions.notFoundKey(requiredKeys, post);

    next();
  }
}

export default Validate;
