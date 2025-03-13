const fs = require("fs");

// 读取当前文件夹下第一层的所有文件夹和文件
async function readDir() {
  try {
    const files = await fs.promises.readdir("./test_dir", { withFileTypes: true });
    console.log("读取成功", files);
    /*
      读取成功 [
        Dirent {
          name: 'aaa',
          parentPath: './test_dir',
          path: './test_dir',
          [Symbol(type)]: 2 -> 是个文件夹
        },
        Dirent {
          name: 'bbb',
          parentPath: './test_dir',
          path: './test_dir',
          [Symbol(type)]: 2
        },
        Dirent {
          name: 'ccc',
          parentPath: './test_dir',
          path: './test_dir',
          [Symbol(type)]: 2
        },
        Dirent {
          name: 'ddd.txt',
          parentPath: './test_dir',
          path: './test_dir',
          [Symbol(type)]: 1 -> 是个文件
        }
      ]
    */

    files.forEach((file) => {
      if (file.isDirectory()) {
        console.log("是个文件夹", file.name);
      } else {
        console.log("是个文件", file.name);
      }
    });
    /*
      是个文件夹 aaa
      是个文件夹 bbb
      是个文件夹 ccc
      是个文件 ddd.txt
    */
  } catch (err) {
    console.log("读取失败", err);
  }
}
readDir();

// 读取当前文件夹下所有层的所有文件夹和文件
async function readDirAll() {
  try {
    const files = await fs.promises.readdir("./test_dir", { withFileTypes: true, recursive: true });
    console.log("读取成功", files);
    /*
      读取成功 [
        Dirent {
          name: 'aaa',
          parentPath: './test_dir',
          path: './test_dir',
          [Symbol(type)]: 2 -> 是个文件夹
        },
        Dirent {
          name: 'bbb',
          parentPath: './test_dir',
          path: './test_dir',
          [Symbol(type)]: 2
        },
        Dirent {
          name: 'ccc',
          parentPath: './test_dir',
          path: './test_dir',
          [Symbol(type)]: 2
        },
        Dirent {
          name: 'ddd.txt',
          parentPath: './test_dir',
          path: './test_dir',
          [Symbol(type)]: 1 -> 是个文件
        },
        Dirent {
          name: 'bbb.txt',
          parentPath: 'test_dir/bbb',
          path: 'test_dir/bbb',
          [Symbol(type)]: 1
        },
        Dirent {
          name: 'aaa1.txt',
          parentPath: 'test_dir/aaa',
          path: 'test_dir/aaa',
          [Symbol(type)]: 1
        },
        Dirent {
          name: 'aaa2.txt',
          parentPath: 'test_dir/aaa',
          path: 'test_dir/aaa',
          [Symbol(type)]: 1
        }
      ]
    */

    files.forEach((file) => {
      if (file.isDirectory()) {
        console.log("是个文件夹", file.name);
      } else {
        console.log("是个文件", file.name);
      }
    });
    /*
      是个文件夹 aaa
      是个文件夹 bbb
      是个文件夹 ccc
      是个文件 ddd.txt
      是个文件 bbb.txt
      是个文件 aaa1.txt
      是个文件 aaa2.txt
    */
  } catch (err) {
    console.log("读取失败", err);
  }
}
readDirAll();
