// 这是项目js的入口文件
import Vue from 'vue';

import VueRouter from 'vue-router';

Vue.use(VueRouter);

// 导入 MUI 的样式
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';

// 按需导入 mint-ui 中的组件
import { Header, Swipe, SwipeItem } from 'mint-ui'; // 顶部固定栏和轮播图组件
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

import router from './router.js'

import app from './app.vue';

const vm = new Vue({
    el: '#app',
    render: c => c(app),
    router
})