// js文件里导入图片文件，也是用import导入即可
import wukong from "../img/wukong.jpeg";

const avatarEle = document.createElement("img");
avatarEle.src = wukong;
document.body.append(avatarEle);