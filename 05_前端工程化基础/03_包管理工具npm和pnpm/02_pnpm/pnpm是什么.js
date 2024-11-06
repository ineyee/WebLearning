/*
  包管理工具pnpm
  
  pnpm的英文全称是Performant Node Package Manager，翻译过来是高性能的npm（安装包时速度更快、更节省电脑磁盘空间）
*/

/*
  1、npm的痛点

  npm registry公开仓库存储着：axois、dayjs等库的压缩包
  我们电脑磁盘上的npm缓存仓库存储着：axois、dayjs等库的压缩包
  我们项目的node_modules文件夹存储着：axois、dayjs等库解压后的源码

  我们已经知道当我们执行“npm install xxx”时，npm会先去电脑磁盘上的npm缓存仓库查找有没有某个包，有的话就解压，并放到我们项目的node_modules文件夹里；没有的话还会去npm registry公开仓库里下载这个库，然后解压，放到电脑磁盘上的npm缓存仓库里，并放到我们项目的node_modules文件夹里

  可见
  * 痛点一：我们每次执行“npm install xxx”时，都不可避免地会经历“解压”这个操作，安装包时的速度会慢一些
  * 痛点二：我们电脑磁盘上虽然有个npm缓存仓库，但这个缓存仓库的作用仅仅是避免每次安装包时都得从npm registry公开仓库下载这个耗时操作。其实我们每创建一个项目，项目node_modules文件夹里的库都是从缓存仓库里解压了一份放进来，也就是说如果100个项目里都用了axios这个库，那这100个项目的node_modules文件夹里都会有自己的一份axios库，它们是相互独立的，而不是共用一份axios库，这样项目一多我们电脑的磁盘空间将会消耗地非常快
*/

/*
  2、pnpm的原理
  （1）硬链接和软链接
  比如我们电脑磁盘上存储着一个文件
  那硬链接就是直接指向这个文件的链接，我们可以通过硬链接直接访问这个文件，我们可以创建多个硬链接指向同一个文件
  而软链接则是指向硬链接的链接，软链接不直接指向文件，而是指向文件的硬链接，我们通过软链接访问文件最终都是转换成对应的硬链接来访问文件

  （2）原理
  npm registry公开仓库存储着：axois、dayjs等库的压缩包
  我们电脑磁盘上的pnpm缓存仓库存储着：axois、dayjs等库的源码
  我们项目的node_modules文件夹存储着：axois、dayjs等库的软链接 + 硬链接、指向pnpm缓存仓库里的源码文件

  当我们执行“pnpm add xxx”时，pnpm会先去电脑磁盘上的pnpm缓存仓库查找有没有某个包的源码文件，有的话就直接创建一个硬链接指向该包的源码文件，并在我们项目的node_modules文件夹里创建一个软链接指向这个硬链接；没有的话还会去npm registry公开仓库里下载这个库，然后解压，放到电脑磁盘上的pnpm缓存仓库里，并在我们项目的node_modules文件夹里创建一个软链接指向这个硬链接

  可见
  * 解决npm痛点一：我们电脑磁盘上的pnpm缓存仓库存储的就是库的源码，每次安装时不需要解压，所以“安装包时速度更快”
  * 解决npm痛点二：如果100个项目里都用了axios这个库，那这100个项目的node_modules文件夹里其实都不会直接存储axios库的源码，而仅仅是创建了一个软链接 + 硬链接来指向pnpm缓存仓库里的那份axios库，这100个项目共用的是同一份axios库，所以“更节省电脑磁盘空间”
*/

/*
  3、pnpm和npm常用命令对照
  npm install          ==>    pnpm install
  npm install <pkg>    ==>    pnpm add <pkg>
  npm update           ==>    pnpm update
  npm run <cmd>        ==>    pnpm <cmd>
*/