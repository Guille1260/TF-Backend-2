export default class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async findByEmail(email) {
    return this.userRepository.findByEmail(email);
  }

  async createUser(userData) {
    return this.userRepository.createUser(userData);
  }
}