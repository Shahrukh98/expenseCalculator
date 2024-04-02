const { hashPassword, comparePasswords, generateAccessToken } = require("./auth");

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser(username, email, password) {
    const hashedPass = await hashPassword(password);
    return this.userRepository.createUser(username, email, hashedPass);
  }
  
  async loginUser(email, password){
    try {  
      const user = await this.userRepository.getUserByEmail(email);
      console.log(password, user?.password)
      const isPasswordCorrect = await comparePasswords(password, user?.password);

      if(!isPasswordCorrect){
        throw new Error("Invalid Credentials!");
      }
      const token = generateAccessToken(user);

      return {...user, token: token};
    } catch (error) {
      throw error; 
    }
  }

  async getUserById(id) {
    return this.userRepository.getUserById(id);
  }

  async getUserByEmail(email) {
    return this.userRepository.getUserByEmail(email);
  }

  async getAllUsers() {
    return this.userRepository.getAllUsers();
  }
}

module.exports = UserService;
