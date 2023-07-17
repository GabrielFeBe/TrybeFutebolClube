import BadRequest from '../Error/BadRequest';
import ILogin from '../Interfaces/Login';

export default class ValidateMidFunctions {
  static notFoundKey(requiredKeys: string[], post: ILogin) {
    const keys = requiredKeys.find((key) => !(key in post));
    if (keys) {
      throw new BadRequest('All fields must be filled');
    }
    const values = Object.values(post);
    if (values.some((k) => k.length < 1)) {
      throw new BadRequest('All fields must be filled');
    }
  }
}
