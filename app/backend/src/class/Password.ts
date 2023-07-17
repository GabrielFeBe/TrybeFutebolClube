import Unauthorized from '../Error/Unauthorize';

export default class Password {
  private _password;
  constructor(password: string) {
    if (password.length < 6 || typeof password !== 'string') {
      throw new Unauthorized('Invalid email or password');
    }
    this._password = password;
  }

  getPassword() {
    return this._password;
  }
}
