// 这是项目js的入口文件
import Vue from 'vue';

import VueRouter from 'vue-router';

Vue.use(VueRouter);

// 导入格式化时间的插件
import moment from 'moment';
// 定义全局的过滤器
Vue.filter('dateFormat', (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(dataStr).format(pattern);
})

// 导入 vue-resource
import VueResource from 'vue-resource';
Vue.use(VueResource);

Vue.http.options.root = 'http://www.liulongbin.top:3005/';

// 导入 MUI 的样式
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';

// 按需导入 mint-ui 中的组件
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'; // 顶部固定栏和轮播图组件
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
import MintUI from 'mint-ui';
Vue.use(MintUI);
import 'mint-ui/lib/style.css';

// 安装图片预览插件
import VuePreview from 'vue-preview';
Vue.use(VuePreview);

import router from './router.js';

import app from './app.vue';

const vm = new Vue({
    el: '#app',
    render: c => c(app),
    router
})