// js文件里导入图片文件，也是用import导入即可
// 在JS中，导入图片等静态资源时不能使用花括号{}，因为图片文件默认是以默认导出（即export default）的形式提供的，而不是命名导出、命名导出才能使用或括号导入
import wukong from "../img/wukong.jpeg";

const avatarEle = document.createElement("img");
avatarEle.src = wukong;
document.body.append(avatarEle);