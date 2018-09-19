This project was bootstrapped with [create-react-app-typescript(v2.16.0)](https://github.com/wmonk/create-react-app-typescript).

## 1. 基于 create-react-app-typescript 的修改

### 1.1 使用`npm run eject`

显示配置文件及依赖，便于配置

### 1.2 修复在`yarn start`模式下，新建`.ts`，`.tsx`文件并保存时，fork-ts-checker-webpack-plugin 报错的问题：

https://github.com/shenzekun/react-typescript-demo/issues/1

- 在`tsconfig.json`中添加以下代码

```
"include": [
  "src/**/*",
]
```

- 修改`webpack.config.dev.js`的`ForkTsCheckerWebpackPlugin`选项如下

```
new ForkTsCheckerWebpackPlugin({
      async: false,
      // watch: paths.appSrc,
      watch: false,
      tsconfig: paths.appTsConfig,
      tslint: paths.appTsLint,
})
```

### 1.3 使用 css-modules

修改`webpack.config.dev.js`以及`webpack.config.prod.js`中`css-loader`的选项如下

```
{
  test: /\.css$/,
  use: [
    {
      loader: 'css-loader',
      options: {
        modules: true,
        localIdentName: '[path][name]__[local]--[hash:base64:5]'
      }
    }
  ]
}
```

使用`include`和`exclude`参数，对于 pages 和 components 目录下的 css 文件启用 css-modules,其他不启用

并且在`declaration.d.ts`中添加声明，否非 ts 无法识别`.css`文件为模块

```
declare module '*.css';
```

### 1.4 修改`tsconfig.json`

```
{
   "allowSyntheticDefaultImports": true,
   // 使用Decorators
   "experimentalDecorators": true
}
```

## 2. 依赖

```
// 路由
yarn add react-router-dom
yarn add @types/react-router-dom

// A simple javascript utility for conditionally joining classNames together
yarn add classnames
yarn add @types/classnames
```

## 3. 要点

- body 设置`overflow-y: scroll;`,默认显示滚动条。
