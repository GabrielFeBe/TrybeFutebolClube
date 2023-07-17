import BadRequest from '../Error/BadRequest';
import ILogin from '../Interfaces/Login';

export default class ValidateMidFunctions {
  static notFoundKey(requiredKeys: string[], post: ILogin) {
    const keys = requiredKeys.find((key) => !(key in post));
    if (keys) {
      throw new BadRequest('All fields must be filled');
    }
  }
}
