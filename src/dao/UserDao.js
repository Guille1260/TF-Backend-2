import User from '../models/User.js';

export default class UserDAO {
  async findByEmail(email) {
    return User.findOne({ email });
  }

  async createUser(userData) {
    const user = new User(userData);
    return user.save();
  }
}