const connectionPool = require("../../database.js");

class LabelRepository {
  async createLabel(name) {
    const statement = `
      INSERT INTO
      t_label
      (name)
      VALUES
      (?);
    `;

    const [result] = await connectionPool.execute(statement, [name]);

    return result;
  }
}

module.exports = new LabelRepository();
