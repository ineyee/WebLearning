const labelRepository = require("../../repository/label/label.repository");

class LabelService {
  async createLabel(name) {
    const result = await labelRepository.createLabel(name);
    return result;
  }
}

module.exports = new LabelService();
