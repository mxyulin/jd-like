module.exports = {
  // *关闭 eslint
  lintOnSave: false,
  // *关闭打包生成 .mp 文件
  productionSourceMap: false,
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
