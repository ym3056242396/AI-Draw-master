/*
 * @Author: 星野梦美 222736
 * @Date: 2023-08-08 18:39:20
 * @LastEditors: 174050379@qq.com
 * @LastEditTime: 2023-09-18 17:33:55
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
// import path from 'path'
// import fs from 'fs'
// import os from 'os'
// const homedir = os.homedir()

// https://vitejs.dev/config/
// https://cn.vitejs.dev/config/server-options.html#server-hmr
export default defineConfig({
  server: {
    host: true,
    // host:'0.0.0.0' ,//ip地址
    port: 8090, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
  },
  plugins: [
    vue(),
    Pages({
      pagesDir: 'src/pages',
      extensions: ['vue'],
    }),
  ],
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        // additionalData: '@import "./src/assets/style/global.less";',
      },
    },
  },

  // https: {
  //   key: fs.readFileSync(path.resolve(`${homedir}/.office-addin-dev-certs/localhost.key`)),
  //   cert: fs.readFileSync(path.resolve(`${homedir}/.office-addin-dev-certs/localhost.crt`)),
  //   ca: fs.readFileSync(path.resolve(`${homedir}/.office-addin-dev-certs/ca.crt`))
  // }
  // 反向代理
  // proxy: {
  //   '/api': {
  //     target: 'https://blog.csdn.net/qq_25467415',
  //     changeOrigin: true,
  //     rewrite: path => path.replace(/^\/api/, '')
  //   }
  // }
});
