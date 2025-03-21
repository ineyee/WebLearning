const fs = require("fs");

// 重命名文件夹
async function renameDir() {
  try {
    await fs.promises.rename("./my_dir", "./renamed_dir");
    console.log("重命名成功");
  } catch (err) {
    console.log("重命名失败", err);
  }
}
renameDir();