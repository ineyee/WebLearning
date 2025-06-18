const momentRepository = require("../../repository/moment/moment.repository");

class MomentService {
  async createMoment(params, userId) {
    const result = await momentRepository.createMoment(params, userId);
    return result;
  }
}

module.exports = new MomentService();
