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

  async getMomentDetail(momentId) {
    const result = await momentRepository.getMomentDetail(momentId);
    if (result.length <= 0) {
      return {};
    }
    return result[0];
  }

  async updateMoment(momentId, content) {
    const result = await momentRepository.updateMoment(momentId, content);
    return result;
  }

  async getMomentExistState(momentId, userId) {
    const result = await momentRepository.getMomentExistState(momentId, userId);
    return result.length > 0;
  }

  async deleteMoment(momentId) {
    const result = await momentRepository.deleteMoment(momentId);
    return result;
  }

  async batchDeleteMoment(momentIdList) {
    const result = await momentRepository.batchDeleteMoment(momentIdList);
    return result;
  }

  async addLabel(momentId, labelIdList) {
    const result = await momentRepository.addLabel(momentId, labelIdList);
    return result;
  }
}

module.exports = new MomentService();
