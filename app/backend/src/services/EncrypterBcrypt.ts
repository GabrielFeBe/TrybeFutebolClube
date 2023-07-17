import * as bcrypt from 'bcryptjs';
import Encrypter from '../Interfaces/Encrypter';

class EncrypterBcrypt implements Encrypter {
  private bcrypt = bcrypt;
  static saltRounds = 10;

  async encrypt(password: string): Promise<string> {
    const hash = this.bcrypt.hash(password, EncrypterBcrypt.saltRounds);
    return hash;
  }

  async compare(password: string, hash: string): Promise<boolean> {
    const isValid = this.bcrypt.compare(password, hash);
    return isValid;
  }
}

export default EncrypterBcrypt;
