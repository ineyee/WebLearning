const fs = require("fs");

// 重命名文件
async function renameFile() {
  try {
    await fs.promises.rename("./test_delete.txt", "./renamed_file.txt");
    console.log("重命名成功");
  } catch (err) {
    console.log("重命名失败", err);
  }
}
renameFile();