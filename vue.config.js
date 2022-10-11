module.exports = {
  // 关闭 eslint
  lintOnSave: false,
  pages: {
    index: {
      entry: "src/main.js",
    },
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
        // pathRewrite: {
        //   '^/api': ''
        // },
        // ws: true,
        // changeOringin: true,
      },
    },
  },
};
