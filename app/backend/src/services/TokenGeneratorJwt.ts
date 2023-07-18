import * as jwt from 'jsonwebtoken';
import Unauthorized from '../Error/Unauthorize';
import { TokenGenerator, userDefault, JwtPayload } from '../Interfaces/IJwt';

const jwtSecret = process.env.JWT_SECRET || 'jwt_secret';

export default class TokenGeneratorJwt implements TokenGenerator {
  private jwt = jwt;
  static jwtExpiration = (60 * 60 * 24 * 7);
  generate(user: userDefault): string {
    const token = this.jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      jwtSecret,

      { expiresIn: TokenGeneratorJwt.jwtExpiration },
    );
    return token;
  }

  async verifyToken(token: string) {
    try {
      const data = this.jwt.verify(token, jwtSecret) as JwtPayload;
      return data;
    } catch (err) {
      throw new Unauthorized('Token must be a valid token');
    }
  }
}
