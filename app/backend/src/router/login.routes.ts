import { Router, Request, Response } from 'express';
import Validate from '../middleware/ValidationMid';
import LoginController from '../controllers/LoginController';
import LoginService from '../services/LoginService';

const router = Router();

const service = new LoginService();
const controller = new LoginController(service);

router.post('/', Validate.validateUser, (req:Request, res:Response) => controller.Login(req, res));
router.get(
  '/role',
  Validate.validateToken,
  (req:Request, res:Response) => controller.validatingToken(req, res),
);

export default router;
