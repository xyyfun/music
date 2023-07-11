<p align="center">
	<a href="https://github.com/vuejs/vue"><img src="https://img.shields.io/badge/vue-v3.2.13-blue" alt=""></a>
	<a href="https://github.com/axios/axios"><img src="https://img.shields.io/badge/axios-v1.3.4-blue" alt=""></a>
	<a href="https://github.com/vueuse/vueuse"><img src="https://img.shields.io/badge/vueuse-v9.13.0-green" alt=""></a>
	<a href="https://github.com/developit/mitt"><img src="https://img.shields.io/badge/mitt-v3.0.0-blue" alt=""></a>
	<a href="https://github.com/hilongjw/vue-lazyload"><img src="https://img.shields.io/badge/vue--lazyload-v3.0.0--rc.2-orange" alt=""></a>
</p>

## Vue3 Music

### 项目简介

项目基于 Vue3 全家桶开发的 QQ 音乐播放器，项目界面模仿 QQ 音乐 Windows 客户端。

后端 API [Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)

界面适配 PC+iPad；移动端未适配

如果觉得项目不错的话欢迎 star

项目线上地址[http://47.102.197.149](http://47.102.197.149)

**注**：

- 部分音乐由于版权问题无法播放
- 频繁关/取关注歌手或用户会导致风控，解决方法是登录 PC 端网易云扫码验证解决
- 雷达（电台）无法播放，请求接口提示无版权，有小伙伴有解决办法的欢迎 lssues 或 pull request
- 评论区回复接口返回的数据太复杂，等有时间再做
- 视频小窗目前只支持拖动位置，暂不支持暂停/播放/修改进度
- **项目有任何问题或 bug 欢迎提出 lssues**

### 快速导航

- [Vue3 Music](#Vue3Music)
  - [项目简介](#项目简介)
  - [快速上手](#快速上手)
  - [进度](#进度)
  - [技术栈](#技术栈)
  - [项目预览](#项目预览)
  - [如何贡献](#如何贡献)
  - [之后的方向](#之后的方向)
  - [鸣谢](#鸣谢)

### 快速上手

安装

```
$ git clone https://github.com/xyyfun/music.git
$ cd vue-music
$ npm install
```

运行

```
$ npm run serve
```

打包部署

```
$ npm run build
```

### 进度

- [x] 推荐页
- [x] 音乐馆

  - [x] 精选
  - [x] 有声电台
  - [x] 排行
  - [x] 歌手
  - [x] 分类歌单
  - [x] 数字专辑

- [x] 视频
  - [x] 视频/MV 播放
- [ ] 雷达
- [x] 我喜欢
- [ ] 本地下载
- [x] 最近播放
- [ ] 试听列表
- [x] 用户歌单
- [x] 登录
- [x] 用户

  - [x] 用户喜欢
  - [x] 用户歌单

- [x] 歌词播放器
- [x] 歌单详情
- [x] 歌单/专辑/电台评论
- [x] 播放列表
- [x] 歌手详情
- [x] 深色模式
- [x] 搜索
- [x] 通知
  - [x] 私信
  - [x] 评论
  - [x] @我
  - [x] 通知

### 技术栈

- **_Vue3 全家桶_**
- **_vueuse_** 第三方工具库
- **_axios_** 请求工具
- **_mitt_** 组件通信
- **_vue-lazyload_** 图片懒加载
- **_lodash_** 第三方工具库

### 项目预览


|   浅色  |   深色  |
|:------:|:------:|
|![image](https://s1.ax1x.com/2023/07/11/pCfkkwV.png)|![image](https://s1.ax1x.com/2023/07/11/pCfkAoT.png)|
|![image](https://s1.ax1x.com/2023/07/11/pCfk1w6.png)|![image](https://s1.ax1x.com/2023/07/11/pCfklex.png)|
|![image](https://s1.ax1x.com/2023/07/11/pCfk400.png)|![image](https://s1.ax1x.com/2023/07/11/pCfkhmq.png)|
|![image](https://s1.ax1x.com/2023/07/11/pCfkOXR.png)|![image](https://s1.ax1x.com/2023/07/11/pCfkLc9.png)|
|![image](https://s1.ax1x.com/2023/07/11/pCfA1js.png)|![image](https://s1.ax1x.com/2023/07/11/pCfAlcj.png)|
|![image](https://s1.ax1x.com/2023/07/11/pCfAJH0.png)|![image](https://s1.ax1x.com/2023/07/11/pCfAtEV.png)|
|![image](https://s1.ax1x.com/2023/07/11/pCfAw34.png)|![image](https://s1.ax1x.com/2023/07/11/pCfAdCF.png)|
|![image](https://s1.ax1x.com/2023/07/11/pCfECV0.png)|![image](https://s1.ax1x.com/2023/07/11/pCfEpbq.png)|
|![image](https://s1.ax1x.com/2023/07/12/pCfVdX9.png)|![image](https://s1.ax1x.com/2023/07/12/pCfVa6J.png)|

### 如何贡献

非常欢迎您的加入！[提一个 lssue](https://github.com/xyyfun/music/issues)或提交一个[pull request](https://github.com/xyyfun/music/pulls)

### 之后的方向

- 适配深色模式（已完成）
- 根据当前用户网络状况加载对应大小预览图
- 视频小窗（已完成）
- 回复评论&楼层评论
- 电台播放
- ...

### 鸣谢

感谢[Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)提供接口服务
