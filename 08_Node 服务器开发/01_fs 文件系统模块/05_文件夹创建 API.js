const fs = require("fs");

// 创建文件夹
async function mkdir() {
  try {
    await fs.promises.mkdir("./my_dir");
    console.log("创建成功");
  } catch (err) {
    console.log("创建失败", err);
  }
}
mkdir();
