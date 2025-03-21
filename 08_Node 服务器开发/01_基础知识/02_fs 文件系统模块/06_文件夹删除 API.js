const fs = require("fs");

// 删除文件夹
async function rmdir() {
  try {
    await fs.promises.rmdir("./my_dir");
    console.log("删除成功");
  } catch (err) {
    console.log("删除失败", err);
  }
}
rmdir();