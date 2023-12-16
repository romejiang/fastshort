## ShortTV

### TODO
* 先实现前端需要的一些接口，让能跑起来。
* 整合api接口

* 支付
* 分享
* 返回随机短视频
* 个人信息，头像，钱包，支付记录
* 接入真实的评论
* web 添加评论,完善评论接入后台

* google 支付

### DEV


### 需要正式版的才能测试
* OAuth Apple 
* OAuth facebook 认证，需要正式版才能测试，需要有应用市场的一些信息才行
* google 统计，需要打包正式版才能有数据


### DONE
* 检查jwt 的token失效时间，然后让客户端在登录
* APP的 剧集播放页，带选集数的。
* 首页轮播图高度，根据屏幕宽高比，动态计算
* OAuth google 认证，后台数据保存逻辑
* 然后复制一份剧集播放页，带选集数的。
* 优化 short 播放页的参数名称，换成我的服务器api
* 整理一份h5的播放页 ，这样可以尽快上一个演示版
* admin 添加 推荐字段
* admin 编辑介绍，改非textarea
* app 轮播图添加标题
* app 收藏页面，改成后台获取
* APP 端实现 stroe，记录登陆状态
* 登陆，注册，用户名，密码方式。
* 首页的一些信息，分类，分类的信息，首页推荐。
* 管理端和api端
  

### PASS

## 导出 mongo docker

```shell
docker run \
--rm \
-v $PWD/backup:/backup \
--network=mongodb-express_default \
mongo \
bash -c "mongodump --out /backup --host single-mongo -d $1"
```


## 导入宝塔 mongo

```shell
mongorestore -d shorttv --drop mongodb://shorttv:L5RM2Sr42YECNMyP@localhost:27017/shorttv ./shorttv

```


ShortTV 是全球最好的短剧APP全平台解决方案，支持IOS，Android，微信小程序，H5，抖音小程序

APP 演示地址，账号可以自行注册
http://h5.ai2app.xyz


管理后台地址
http://admin.ai2app.xyz

超级管理员账号
romejiang/1qazxsw2