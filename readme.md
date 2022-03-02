![visitors](https://visitor-badge.glitch.me/badge?page_id=Hacker233.navigation-uniapp&left_color=green&right_color=red)

# 科技趣玩

## 1. 项目介绍

该项目是使用uniapp开发的，可以适配多端，测试场景主要有在H5和微信小程序两端，故以下介绍均以微信小程序端为主介绍。

小程序主要是以分享为主题，分享各类网站、软件等资源，主要包括四大模块，后续主要围绕这四大模块介绍：

* 推荐模块：推荐热门的网站和资源等
* 网站模块：分享有趣的网站等
* 资源模块：分享各类资源
* 个人中心：包含注册和登录

## 2. 项目整体架构

![](https://pic2.zhimg.com/80/v2-7b552fd0a7168349ced0561ac2966819_720w.jpg)

## 3. 项目功能介绍

小程序主要包含的功能如下：

* 邮箱登录
* 邮箱注册
* 评论
* 点赞
* 头像修改
* 权限控制
* 轮播图
* 查看我的点赞
* 查看我的评论
* 忘记密码
* 签名修改

......

### 3.1 首页推荐

首页推荐主要展示相关推荐内容，推荐内容通过接口获取，用户可在后台动态配置，界面如下：

![](https://pic3.zhimg.com/80/v2-7942464e4b50bfd27e2e6ef36f9141da_720w.jpg)

### 3.2 网站列表

主要展示网站大的分类列表，如影视、书籍等等，本页面还包括轮播图，轮播图和分类列表都是通过接口获取，可在后台配置，界面如下：

![](https://pic2.zhimg.com/80/v2-9f24402107f6eff82fcad5b7e669bf21_720w.jpg)

### 3.3 资源页面

该页面主要用于分享各类资源，资源通过分类区别开来，头部是轮播图，本页面所有内容都可以通过后台配置，页面如下：

![](https://pic4.zhimg.com/80/v2-58c24ca1b9ac57f318c9e890b8cc9f93_720w.jpg)

### 3.4 个人中心

在个人中心可以查看个人的相关信息，以及进行相应的设置，进行签到等等，还可以查看与自己相关的评论和点赞等，页面如下：

![](https://pic2.zhimg.com/80/v2-4d5a9cbb413d9175f4e24b37c5d08a1d_720w.jpg)

### 3.5 网站列表详情

通过首页网站列表可以进入列表详情，页面如下：

![](https://pic4.zhimg.com/80/v2-cdab6c8e7cd9f6554bbcba8035d935c3_720w.jpg)

### 3.6 网站详情

点击对应的网站卡片可进入对应的详情，页面如下：

![](https://pic2.zhimg.com/80/v2-3201099fbb686a45605ffb878d81db09_720w.jpg)

### 3.7 资源详情

主要展示资源的详情，可以参与评论、点赞等等，页面如下：

![](https://pic2.zhimg.com/80/v2-30ad2b51f8c70cda3c310d71078f9381_720w.jpg)![](https://pic4.zhimg.com/80/v2-dcdc848fc5e1487bf66c29a3d1ff452f_720w.jpg)

### 3.8 评论功能

每个注册用户可以在资源等栏目下进行评论，页面如下：

![](https://pic2.zhimg.com/80/v2-006a948c44ceced814c1907a3567ec71_720w.jpg)

### 3.9 注册功能

为了适用性更加广泛，这里没有直接使用微信的用户信息，而是让用户通过邮箱自己注册，页面如下：

![](https://pic3.zhimg.com/80/v2-2df83e1576414b60db5c61af89914c86_720w.jpg)

### 3.10 登录功能

用户通过邮箱进行登录，页面如下

![](https://pic4.zhimg.com/80/v2-18c205039a228338ef805418c4cfcc0f_720w.jpg)

### 3.11 用户评价

用户可以针对小程序进行评价，并且可以查看到所有用户的评价，页面如下：

![](https://pic4.zhimg.com/80/v2-203210aa2297686567d65801494edf5b_720w.jpg)![](https://pic2.zhimg.com/80/v2-e2704271b61127a99fef412f753c8b2d_720w.jpg)

## 4. 项目安装

直接将项目克隆到本地，使用Hbuilder打开即可，需要注意的是需要修改几处地方，具体步骤如下：

### 4.1 克隆项目

```text
git clone https://github.com/Hacker233/navigation-uniapp.git
```

### 4.2 修改接口地址

修改/config/index.js配置文件，将后台地址修改为自己的：

![](https://pic2.zhimg.com/80/v2-3e64b631de1b3819dd21133f9909acdd_720w.jpg)

### 4.3 修改uniapp相关配置

修改manifest文件，根据自己需要配置。

![](https://pic1.zhimg.com/80/v2-8e61c1249e8ceb617adbf60ff6f076ec_720w.jpg)

### 4.4 web管理端安装

小程序配有管理端网站，可以进行一些菜单或者权限上的配置，项目也是开源的。

项目地址：[GitHub - Hacker233/navigation: 网址导航项目，包含前台和后台管理。](https://link.zhihu.com/?target=https%3A//github.com/Hacker233/navigation)

线上体验地址：[小猪导航](https://link.zhihu.com/?target=https%3A//smallpig.site/)

管理员账号登录即可看到对应的管理菜单。

**菜单管理：**

![](https://pic2.zhimg.com/80/v2-3772c50e5f82c08df9f1e2c4101fbad9_720w.jpg)**图标管理：**

![](https://pic1.zhimg.com/80/v2-090be8947ba06483b3194ceed693380c_720w.jpg)等等，还有很多管理菜单。

### 4.5 后台项目安装

后台项目由于有一些服务器相关的信息，所以目前还是私有项目，如果想安装后端项目，可关注公众号【资料分享大师】后，加小编微信后获取即可。

后台项目主要使用的是Nodejs，数据库使用的是MongoDB、数据存储服务使用的minio。

所以，如果想要完成运行后台项目，需要配置好数据库地址以及minio服务地址。

## 5. 完全运行此项目步骤

1. 克隆uniapp项目，修改配置
2. 克隆web管理端项目（非必须）
3. 关注【资料分享大师】获取后台项目（非必须）

其中管理端和后台都是非必须的，接口也可以使用我目前线上的接口，当然也可以自己编写后台和管理端。

## 6. 体验地址

微信公众号： 【资料分享大师】

小程序：【科技趣玩】

web管理端地址：[小猪导航](https://link.zhihu.com/?target=https%3A//smallpig.site/software%3FmenuId%3D1%26menuIcon%3Dpig-shouye)

所有项目GitHub：[https://github.com/Hacker233](https://link.zhihu.com/?target=https%3A//github.com/Hacker233)


## 小程序体验

![小程序二维码](https://camo.githubusercontent.com/742203707568f7199cc426f816d6b83dcd270a87fa6bcdd98113a0e3a61553e0/68747470733a2f2f736d616c6c7069672e736974652f696d672f7172636f64652e33353532356238312e6a7067)

## 官方交流渠道

- 【官方微信交流群】：LHQfighting（备注“加群”）
- 【微信小程序】：科技趣玩
- 【小编知乎ID】：[会飞的猪](https://www.zhihu.com/people/luhongquan)
- 【官方交流QQ群①】：976432879（已满）
- 【官方交流QQ群②】：947841579
- 【bilibili账号】：[小猪课堂](https://space.bilibili.com/493520625?spm_id_from=333.1007.0.0)
