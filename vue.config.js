
// vue.config.js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://172.21.33.44:7861', // 目标服务器地址
        changeOrigin: true, // 改变源地址，意味着API请求会带上目标服务器的域名
        pathRewrite: {
          '^/api': '' // 重写路径，去除/api部分
        }
      }
    }
  }
};






//  import { defineConfig } from 'vite';

// export default defineConfig({
//     server: {
//       proxy: {
//         // 字符串简写写法：http://localhost:5173/foo -> http://localhost:4567/foo
//         // '/api': 'http://localhost:3001',
//         // '/api': 'http://172.21.33.44:7861',
//         // target: 'http://172.21.33.44:7861',
//         // "/proxy_url":{           // /proxy_url 这个用来和根路径 baseURL 进行匹配
//         //   target: 'http://172.21.33.44:7861',  // 这个是填写跨域的请求域名+端口号，也就是要请求的URL(不包含URL路径)
//         //   changeOrigin: true,  // 是否允许跨域请求，在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
//         //   pathRewrite: {   // 路径重写
//         //       '^/proxy_url': '/' // 替换target中的请求地址，原请求为 http://127.0.0.1:8000/kuayu 实际请求为 http://127.0.0.1:8000/proxy_url/kuayu  
//         //   }
//         // }
//         '/api': {
//           target: `http://172.21.33.44:7861`, // 目标服务器地址
//           changeOrigin: true, // 是否改变源地址
//           // rewrite: (path) => path.replace(/^\/api/, '') // 重写路径
//           pathRewrite: {   // 路径重写
//             '^/api': '/' // 替换target中的请求地址，原请求为 http://127.0.0.1:8000/kuayu 实际请求为 http://127.0.0.1:8000/proxy_url/kuayu  
//           }

//         }
//       },
//     },
//   })

