# oh-my-electron

一个构建Electron程序的模板

# 项目说明

这是一个个人在工作中常用的构建Electron应用的模版，模版包含：

- 前端代码打包工具：Webpack
- 开发语言：TypeScript
- 开发框架：React
- CSS预处理器：SCSS
- ESLint：[XO](https://github.com/xojs/xo)

# 项目特点

1. 结合Webpack + chokidar 实现开发时的窗口和整个应用的热重载
2. 支持使用 bytenode 对源码进行加密（不推荐这么做）
3. 集成了常用的前端开发技术栈
4. 所有配置公开，可随意修改

# 快速上手

## 目录说明

```
bin - 构建脚本目录
  |- afterBuild.js - 开发模式时构建完成自动启动electron。
  |- codeEncryption.js - 加密项目代码脚本

config - 项目配置
  |- webpack - webpack打包配置
      ｜- base.config.js - 打包基础配置
      |- main.config.js - 主进程打包配置
      |- preload.config.js - 预加载脚本打包配置
      |- renderer.config.js - 渲染进程打包配置

src - 项目源码目录
  |- lib - 封装的公共方法目录
  |- main - 主进程代码
  |- preload - 预加载脚本代码
  |- public - 静态资源目录，不会被webpack处理，仅仅是复制到打包后的目录
  |- renderer - 渲染进程代码

types - 自定义的 Typescript 类型目录
```

## 开发注意事项

1. 路径别名

    项目采用`~`符号作为路径别名，`~`表示src目录。

    **e.g.**

    ```TypeScript
    import xxx from '~/renderer/lib/xxx.ts'
    ```

    ```scss
    body {
      background: url('~/renderer/assets/images/bg.png');
    }
    ```

2. 源文件引入

    如果想要引入源文件，比如svg文件，需要加上`?raw`参数。

    **e.g.**

    ```
    import loadingSvg from '~/renderer/assets/images/loading.svg?raw';
    ```

3. css模块化

    只需要将文件以`.module.scss`结尾即可。

    **e.g.**

    ```typescript
    import styles from './index.module.scss';
    ```

## 有关bytenode加密的注意事项

1. 需要在渲染进程设置：

    ```typescript
    nodeIntegration: true,
    contextIsolation: false
    ```

2. 设置 `contextIsolation: false` 意味着不需要preload脚本了，因为renderer进程也可以使用 Node 和 Electron API了，禁用contextIsolation会有安全风险，参考[Security](https://www.electronjs.org/docs/latest/tutorial/security)

3. bytenode不兼容箭头函数，所以需要将构建后代码中的箭头函数全部转译成普通的函数，这也是我选择使用babel处理ts文件的原因，参考：[bytenode](https://github.com/bytenode/bytenode)

4. vm模块的警告

    如果使用了bytenode加密，会得到一个警告

    `The vm module of Node.js is deprecated in the renderer process and will be removed.`

    bytenode依赖vm模块，但是Electron官方计划在后续的版本中移除vm模块，我在bytenode的官方仓库咨询过作者，他表示有一个解决方案，需要先确定有效，但是至今仍然没有更新版本。

    [参考](https://github.com/bytenode/bytenode/issues?q=is%3Aissue+author%3A%40me+is%3Aclosed)

    所以今后有可能会面临bytenode和Electron不兼容的问题。

根据以上几点，我也是不推荐使用bytenode进行源码加密。