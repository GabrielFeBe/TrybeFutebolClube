import { Request, Response } from 'express';
import User from '../class/User';
import LoginService from '../services/LoginService';

class LoginController {
  constructor(private Service:LoginService) {

  }

  async Login(req:Request, res : Response) {
    const { email, password } = req.body;
    const userClass = new User(email, password);
    const token = await this.Service.longinUser(userClass);
    return res.status(200).json({ token });
  }
}
export default LoginController;
