// 这是项目js的入口文件
// console.log('ok');
import Vue from 'vue';

// 导入 MUI 的样式
import './lib/mui/css/mui.min.css';

// 按需导入 mint-ui 中的组件
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);

import app from './app.vue';

const vm = new Vue({
    el: '#app',
    render: c => c(app)
})