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

// 导入vuex 全局数据共享仓库
import Vuex from 'vuex';
Vue.use(Vuex);

// 从本地 localStorage 中取出shopCar
let shopCar = JSON.parse(localStorage.getItem('shopCar') || '[]');

const store = new Vuex.Store({
    state: {
        shopCar
    },
    mutations: {
        addToCar(state, goodsList) {
            let flag = false;
            state.shopCar.some(item => {
                if (parseInt(item.id) === parseInt(goodsList.id)) {
                    item.count += parseInt(goodsList.count);
                    flag = true;
                    return true;
                }
            });
            if (!flag) {
                state.shopCar.push(goodsList);
            }

            // 当更新 shopCar 之后, 把 shopCar 数组存储到本地的 localStorage 中
            localStorage.setItem('shopCar', JSON.stringify(state.shopCar));
        },
        updateGoodsInfo(state, goodsObj) {
            state.shopCar.some(item => {
                if (parseInt(item.id) === parseInt(goodsObj.id)) {
                    item.count = parseInt(goodsObj.count);
                    // console.log('ok');
                    return true;
                }
            });
            // 当更新 shopCar 之后, 把 shopCar 数组存储到本地的 localStorage 中
            localStorage.setItem('shopCar', JSON.stringify(state.shopCar));
        },
        removeGoodFromCar(state, id) {
            let index = state.shopCar.findIndex(item => parseInt(item.id) === parseInt(id));
            state.shopCar.splice(index, 1);
            // 当更新 shopCar 之后, 把 shopCar 数组存储到本地的 localStorage 中
            localStorage.setItem('shopCar', JSON.stringify(state.shopCar));
        },
        updateSelect(state, obj) {
            state.shopCar.some(item => {
                if (parseInt(item.id) === parseInt(obj.id)) {
                    item.selected = obj.selected;
                    return true;
                }
            })
            // 当更新 shopCar 之后, 把 shopCar 数组存储到本地的 localStorage 中
            localStorage.setItem('shopCar', JSON.stringify(state.shopCar));
        }
    },
    getters: {
        getCount(state) {
            let count = 0;
            state.shopCar.forEach(item => {
                count += item.count;
            })
            return count;
        },
        getGoodsCount(state) {
            let c = {};
            state.shopCar.forEach(item => {
                c[item.id] = item.count;
            });
            return c;
        },
        getValue(state) {
            let obj = {};
            state.shopCar.forEach(item => {
                obj[item.id] = item.selected;
            });
            return obj;
        },
        getFinalCountAndAmount(state) {
            let obj = {
                count: 0,
                amount: 0
            };
            state.shopCar.forEach(item => {
                if (item.selected) {
                    obj.count += parseInt(item.count);
                    obj.amount += item.count * item.price;
                }
            });
            return obj;
        }
    }    
})

import router from './router.js';

import app from './app.vue';

const vm = new Vue({
    el: '#app',
    render: c => c(app),
    router,
    store
})