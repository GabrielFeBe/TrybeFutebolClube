import Encrypter from '../Interfaces/Encrypter';
import User from '../class/User';
import UserModel from '../database/models/User.model';
import EncrypterBcrypt from './EncrypterBcrypt';
import TokenGeneratorJwt from './TokenGeneratorJwt';
import { TokenGenerator } from '../Interfaces/IJwt';
import Unauthorized from '../Error/Unauthorize';

class LoginService {
  private encrypter: Encrypter;
  private tokenGenerator: TokenGenerator;
  constructor(private loginModel = UserModel) {
    this.encrypter = new EncrypterBcrypt();
    this.tokenGenerator = new TokenGeneratorJwt();
  }

  async longinUser(user: User) {
    const returningValidUser = user.getUser();
    const response = await this.loginModel.findOne({
      where: { email: returningValidUser.email },
    });
    if (!response) throw new Unauthorized('Invalid email or password');

    const isValid = await this.encrypter.compare(returningValidUser.password, response.password);
    if (!isValid) throw new Unauthorized('Invalid email or password');
    const token = this.tokenGenerator.generate(response);
    return token;
  }
}

export default LoginService;
