const momentRepository = require("../../repository/moment/moment.repository");

class MomentService {
  async createMoment(params, userId) {
    const result = await momentRepository.createMoment(params, userId);
    return result;
  }

  async getMomentList(pageSize = 0, pageIndex = 10) {
    const result = await momentRepository.getMomentList(pageSize, pageIndex);
    return result;
  }
}

module.exports = new MomentService();
