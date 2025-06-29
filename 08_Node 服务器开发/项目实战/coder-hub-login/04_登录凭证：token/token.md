## 一、token 是什么

首先说一下 cookie 和 session 存在的问题，详见下面。而 token 可以解决它们的问题：
* 在移动互联网的背景下，token 统一了各个客户端的实现方案、大家都按一套来，后端的实现也是统一一套
* 在分布式系统和服务器集群的背景下，我们只需要让所有的用户系统用非对称加密里的同一个私钥来生成 token，其它系统和服务器都用非对称加密里对应的公钥来验证 token 就可以了

token 也是用来辨别用户身份的一套实现方案

## 二、token 是怎么工作的

* 服务端生成私钥和公钥存储在项目里
```
cd desktop

# 生成私钥（PEM 格式）
openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out private_key.pem

# 从私钥导出公钥
openssl rsa -pubout -in private_key.pem -out public_key.pem
```
* 客户端走登录接口
* 服务端判断到登录接口走成功后，服务端用非对称加密里的私钥生成一个 token 并返回给客户端
* 客户端手动持久化 token
* 后续客户端走其它接口时，手动把 token 携带到 header 里传递给服务端
* 服务端可以在这些接口里读取到 header 里的 token，用非对称加密里的公钥验证 token 来确定用户身份，没登录过或 token 过期（token 库全部会自己判断）就返回登录凭证无效，否则就返回相应的数据
* 客户端收到登录凭证无效就跳转登录界面让用户重新登录，收到正常数据就正常使用

## 三、cookie 和 session 存在的问题

#### 1、移动互联网的发展

早期开发中用 cookie 和 session 比较多，因为客户端————尤指浏览器————什么都不需要做、全部都是自动的，设置、验证 cookie 和 session 都是服务端完成的，所以非常方便

但是随着移动互联网的发展，手机端 App 也需要访问服务器，但是手机端却不能像浏览器那样自动处理 cookie 和 session，程序员需要手动存储 cookie 和 session，请求其它接口时也得手动携带 cookie 和 session，而这两个操作并不是那么方便，所以 cookie 和 session 就逐渐被淘汰了

#### 2、分布式系统和服务器集群的发展

为了解决高并发问题，出现了分布式系统和服务器集群，我们以淘宝为例简单说下这两个概念：

* 刚开始淘宝项目可能是个单机系统，这个单机系统里包含用户模块、商品模块、订单模块、支付模块等，这些模块是作为一个系统一起运行的、一损俱损；后来为了应对高并发，淘宝项目拆分成了各个子系统，比如用户系统、商品系统、订单系统、支付系统等，这多个系统之间并行独立运行、可以降低访问延迟、提高吞吐量，同时单个系统的运行故障并不会导致整个系统不可用，比如用户系统崩溃了不能注册新用户了，但是其它系统正常，那已注册用户还是可以继续浏览商品下订单支付的
* 公司小的时候，可能只有一台服务器，我们可以把项目部署这一台服务器上，所有用户都访问这一台服务器；但是随着用户的暴涨，为了应对高并发，我们会把同一个项目部署在多台服务器上，这多台服务器就称之为服务器集群，然后再搞个代理服务器，用户在访问的时候，都是先访问到代理服务器，代理服务器会根据服务器的空闲状态自动转发至负载小的服务器上

* 那么在分布式系统里，用户是在用户系统里做了登录操作、存储了 cookie 和 session，在其它商品系统、订单系统、支付系统里是不太好验证 cookie 和 session 的
* 那么在服务器集群里，用户是在服务器 1 上做了登录操作、存储了 cookie 和 session，然后在访问商品系统时被分配到了服务器 2，这时也是不太好验证 cookie 和 session 的、

所以 cookie 和 session 就逐渐被淘汰了