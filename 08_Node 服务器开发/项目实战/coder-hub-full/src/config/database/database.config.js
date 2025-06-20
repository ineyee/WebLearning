class DataBaseConfig {
  // 这个无论是本地数据库还是远程数据库，都可以保持localhost，因为代码上传到服务器后，localhost 就是服务器的 IP 地址了
  static CONNECTION_HOST = "localhost";
  static CONNECTION_PORT = 3306;
  static CONNECTION_USER = "root";
  // static CONNECTION_PASSWORD = "Mysqlyiyi0202!"; // 本地
  static CONNECTION_PASSWORD = "Txyyiyi0202!"; // 远程
  static CONNECTION_DATABASE = "db_coder_hub";
  static CONNECTION_Limit = 10;
}

module.exports = DataBaseConfig;
