import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // base:"./",
  base: process.env.NODE_ENV === 'production' ? './' : '/',

  build: {
    //打包后文件目录
    outDir: "tsingtao-chat-robot",
    lib: {
      entry: "index.js",
			// entry: path.resolve(__dirname, "./index.js"), //指定组件编译入口文件
      name: "tsingtao-chat-robot",
      fileName: "tsingtao-chat-robot",
    },
    //压缩
    minify: false,
    rollupOptions: {
      //忽略打包vue文件
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
        // dir: "dist",
      },
    },
   
  },
  plugins: [
    vue(), 
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    //这里的ip和端口是前端项目的;下面为需要跨域访问后端项目
    proxy: {
      // 字符串简写写法：http://localhost:5173/api -> http://localhost:3001/api
      // "/api": "http://localhost:3001",
      // "/api": "http://172.21.33.44:7861",
      '/api': {
        target: `http://172.21.33.44:7861`, // 目标服务器地址
        changeOrigin: true, // 是否改变源地址
        rewrite: (path) => path.replace(/^\/api/, '') // 重写路径

    },
  }
  },
});

