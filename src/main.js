/*
 * @Author: 星野梦美 222736
 * @Date: 2023-08-08 18:39:20
 * @LastEditors: 174050379@qq.com
 * @LastEditTime: 2023-12-26 11:11:55
 */
//  V3 事多
import { createApp } from 'vue'
import router from './router/index';
import TDesign from 'tdesign-vue-next';
import App from './App.vue'
import 'tdesign-vue-next/es/style/index.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import './style.css'

const app = createApp(App);
app.use(router);
app.use(TDesign);
app.use(ElementPlus)
app.mount('#app')