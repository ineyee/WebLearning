const userRepository = require("../../repository/user/user.repository");

class UserService {
  async uploadAvatar(userId, avatarUrl) {
    const result = await userRepository.updateAvatarUrl(userId, avatarUrl);
    return result;
  }
}

module.exports = new UserService();