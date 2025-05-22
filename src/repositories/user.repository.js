export default class UserRepository {
  constructor(userDAO) {
    this.userDAO = userDAO;
  }

  async findByEmail(email) {
    return this.userDAO.findByEmail(email);
  }

  async createUser(userData) {
    return this.userDAO.createUser(userData);
  }
}