## 一、打包
* cd到项目根目录
* 执行“npm run build”命令即可，webpack就会给我们把项目打包在根目录下的dist文件夹里了，当然我们可以把dist改成我们项目的名字（手动修改或者webpack打包配置修改都行）

## 二、部署

#### 1、购买云服务器（这里以阿里云为例）

###### 1.1 注册阿里云账号
在阿里云官网注册即可，https://aliyun.com/

###### 1.2 购买云服务器
* 阿里云首页
* 控制台
* 搜索云服务器ECS，点进去
* 创建实例（一个实例对应一个服务器）
  * 基础配置
    * 付费模式：长期使用选包年包月，学习练习选按量付费
    * 地域及可用区：阿里的服务器放在很多不同的地方，我们要选择离用户近的那个地方以便用户访问起来更快
    * 实例规格：服务器的核数和内存要多少，按自己的需求选择相应性能的规格
    * 镜像操作系统：服务器一般安装的都是Linux操作系统，公司里我们一般选择的是Linux操作系统的CentOS版本
    * 存储：服务器的硬盘要多大，按自己的需求选择相应的存储容量
  * 网络和安全组：按照默认的来就行，不过安全组要添加上80端口，因为后面nginx默认监听的就是80端口
  * 密钥对或密码：选择密码，就是root这个用户的密码，将来我们可以通过这个账号和密码来访问服务器
  
#### 2、给服务器安装nginx

###### 2.1 先把我们的电脑连接到服务器
* 阿里云的实例（即服务器）详情页面里有个“远程连接”，点击它即可连接上服务器

###### 2.2 在阿里云给我们打开的终端里给服务器安装nginx
* 执行“dnf install nginx”命令安装nginx

###### 2.3 启动nginx
* 执行“systemctl start nginx”命令来启动nginx
* 然后我们可以执行”systemctl status nginx“命令来查看nginx的运行状态是否成功启动
* 此外我们还可以执行”systemctl enable nginx“命令来让服务器重启时自动启动nginx，免得每次重启系统还得我们主动执行命令来启动nginx

###### 2.4 配置nginx
* 找到etc文件夹下的nginx文件夹，找到nginx.config文件，打开它
* 把文件里的“user nginx;”改成“user root;”让nginx具备root权限，到时候nginx访问我们的服务器就是root权限访问了
* 找到下面的server，可见nginx默认监听的是80端口，当nginx监听到80端口有访问时会把root对应的页面给返回来——即“/usr/share/nginx/html”这个页面，我们当然不是给用户返回这个页面，所以要把它注释掉，然后去location那里配置我们想返回给用户的界面即可
* 记得cmd + s保存更改
* 修改了nginx的配置后，需要重启一下nginx，执行“systemctl restart nginx”命令来重启nginx
```
默认配置

server {
    listen       80 default_server;
    listen       [::]:80 default_server;
    server_name  _;
    root         /usr/share/nginx/html;

    # Load configuration files for the default server block.
    include /etc/nginx/default.d/*.conf;

    location / {
    }

    error_page 404 /404.html;
        location = /40x.html {
    }

    error_page 500 502 503 504 /50x.html;
        location = /50x.html {
    }
}
```

```
修改后的配置

server {
    listen       80 default_server;
    listen       [::]:80 default_server;
    server_name  _;
    # root         /usr/share/nginx/html;

    # Load configuration files for the default server block.
    include /etc/nginx/default.d/*.conf;

    location / {
      root /root/my_project/fun-trip/;
      index index.html;
    }

    error_page 404 /404.html;
        location = /40x.html {
    }

    error_page 500 502 503 504 /50x.html;
        location = /50x.html {
    }
}
```


#### 3、把我们的项目部署到服务器

###### 3.1 手动部署
* VSCode里安装”Remote -SSH“插件（也可以直接在阿里云的那个连接远程里做，那个里面也能打开文件夹）
* 左侧侧边栏选中该插件
* SSH右侧选择新建远程
* 在弹窗里输入“ssh root@服务器的公网IP”，回车来新建远程
* 选择“/User/xxx/.ssh/config”配置文件
* 左侧SSH下就有我们的远程服务器了
* 选中远程服务器，右键连接，输入root用户的密码即可发起连接
* 连接成功后，我们去选中窗口的文件夹那一栏，发现里面会提示“已连接到远程”
* 然后我们选择“打开文件夹”来打开远程服务器上的文件夹，默认会帮我们打开远程服务器的root文件夹，这样远程服务器的root文件夹就展示在VSCode里了
* 我们可以在root文件夹下创建一个文件夹“my_project”，将来我们的项目就都放在这个文件夹下
* 把我们打包好的项目文件夹直接拖进“my_project”文件夹里就可以了
* 去你的浏览器里访问一下你的项目吧：http://47.96.144.164
