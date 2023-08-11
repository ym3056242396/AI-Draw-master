//  V3 事多
import { createApp } from 'vue'
import TDesign from 'tdesign-vue-next';
import App from './App.vue'
import 'tdesign-vue-next/es/style/index.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import './style.css'

const app = createApp(App);
app.use(TDesign);
app.use(ElementPlus)
app.mount('#app')