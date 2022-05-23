module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage", // 用到什么填充什么，按需
        corejs: 3,
      },
    ],
  ],
};
