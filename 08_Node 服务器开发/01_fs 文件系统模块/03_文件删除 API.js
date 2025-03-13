const fs = require("fs");

// 删除文件
async function deleteFile() {
  try {
    await fs.promises.rm("./test_delete.txt");
    console.log("删除成功");
  } catch (err) {
    console.log("删除失败", err);
  }
}
deleteFile();