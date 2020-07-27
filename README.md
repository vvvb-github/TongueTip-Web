# 舌尖
## 开发日志
### 7.15
- 新建项目并搭建项目结构
### 7.16
- 以页面为单位分工进入UI设计阶段
### 7.17
- 进一步完善页面UI设计
### 7.18
- 完成页面UI设计，并完善页面内部功能逻辑
### 7.19
- 完成页面设计及功能，进行项目整合
## 项目结构
    -- src
        - assets
            图片、音乐、视频素材
        - components
            Component.vue，各页面需要的各组件封装
        - js
            Page.js，Page页面需要的各业务请求逻辑
        - pages
            Page.vue，Page页面模板
        - router
            index.js，路由表
        - store
            index.js，Vuex
        App.vue 根组件，进行路由、Vuex等全局注册
        main.js 入口
        JS.js 全局数据与业务对象
## 运行前请安装
- npm install vue-router
- npm install vuex
- npm install element-ui
- npm install vuex-persistedstate