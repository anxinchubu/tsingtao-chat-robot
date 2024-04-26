const path = require('path')

module.exports = {
  // 入口： 可以是字符串、数组或对象
  entry: './src/main.ts',
  // 出口：打包后生成的文件信息
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'chatBuble.js'
  },
  module: {
    rules: [
      {
      	// 样式loader,允许将样式也进行打包
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
}
