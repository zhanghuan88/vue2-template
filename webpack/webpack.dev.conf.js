const { merge } = require("webpack-merge");
const { readEnv, getConditionalLoader } = require("./utils");
const config = readEnv("./.env.development");
const ESLintPlugin = require("eslint-webpack-plugin");
const { DefinePlugin } = require("webpack");
const webpackCommonConfig = require("./webpack.common.conf.js");

//读取环境变量
module.exports = merge(webpackCommonConfig, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  // devtool:false,
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader",
          {
            loader: "sass-resources-loader",
            options: {
              resources: ["./src/styles/resources/*.scss"],
            },
          },
          getConditionalLoader(),
        ],
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      BASE_URL: JSON.stringify("/"),
      "process.env": config,
    }),
    new ESLintPlugin({
      extensions: ["js", "json", "vue"],
      files: "src",
    }),
  ],
  devServer: {
    port: "auto",
    compress: true,
    host: "0.0.0.0",
    historyApiFallback: true, //history路由错误问题
    client: {
      logging: "warn",
      overlay: {
        errors: false,
        warnings: false,
      },
    },
    proxy: {
      "/api": {
        //本地服务接口地址
        target: "https://console-mock.apipost.cn/app/mock/project/d4a075b7-3c3a-433a-beb2-5049f0c08126", //开发环境
        changeOrigin: true,
      },
    },
  },
  stats: "errors-warnings",
});
