<p align="center">
	<a href="https://github.com/vuejs/vue"><img src="https://img.shields.io/badge/vue-v3.2.13-blue" alt=""></a>
	<a href="https://github.com/axios/axios"><img src="https://img.shields.io/badge/axios-v1.3.4-blue" alt=""></a>
	<a href="https://github.com/vueuse/vueuse"><img src="https://img.shields.io/badge/vueuse-v9.13.0-green" alt=""></a>
	<a href="https://github.com/developit/mitt"><img src="https://img.shields.io/badge/mitt-v3.0.0-blue" alt=""></a>
	<a href="https://github.com/hilongjw/vue-lazyload"><img src="https://img.shields.io/badge/vue--lazyload-v3.0.0--rc.2-orange" alt=""></a>
</p>

## Vue3 Music

项目基于 Vue3 全家桶开发的 QQ 音乐播放器，项目界面模仿 QQ 音乐 Windows 客户端

后端API [Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)

界面适配 PC+iPad；移动端未适配

如果觉得项目不错的话欢迎 star

**注**：部分音乐由于版权问题无法播放

### 安装

```
$ git clone https://github.com/xyyfun/music.git
$ cd vue-music
$ npm install
```

### 运行

```
$ npm run serve
```

### 打包部署

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
- [ ] 深色模式
- [x] 搜索

### 技术栈

- **_Vue3 全家桶_**
- **_vueuse_** 第三方工具库
- **_axios_** 请求工具
- **_mitt_** 组件通信
- **_vue-lazyload_** 图片懒加载
- **_lodash_** 第三方工具库

### 项目预览

首页-推荐

![首页](./image/uTools_1683971342962.png)

音乐馆-精选

![音乐馆-精选](./image/uTools_1683971511192.png)

音乐馆-电台

![音乐馆-有声电台](./image/uTools_1683971528015.png)

音乐馆-排行

![音乐馆-排行](./image/uTools_1683971548011.png)

搜索

![搜索](./image/uTools_1683971032585.png)

播放器

![播放器](./image/uTools_1683970988963.png)

歌单

![歌单](./image/uTools_1683971623161.png)

视频

![视频](./image/uTools_1683972074884 .png)

### 之后的方向

- 适配深色模式
- 根据当前用户网络状况加载对应大小预览图
- 视频小窗
- 回复评论&楼层评论
- 电台播放
- ...

### 鸣谢

感谢[Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)提供接口服务
