// 导入vue-router包
import VueRouter from 'vue-router';

import home from './components/tabbar/home.vue';
import member from './components/tabbar/member.vue';
import search from './components/tabbar/search.vue';
import shopcar from './components/tabbar/shopcar.vue';
import newsList from './components/news/newsList.vue';
import newsInfo from './components/news/newsInfo.vue';

const router = new VueRouter({
    routes: [
        { path: '/home', component: home },
        { path: '/member', component: member },
        { path: '/shopcar', component: shopcar },
        { path: '/search', component: search },
        { path: '/home/newsList', component: newsList },
        { path: '/home/newsInfo/:id', component: newsInfo },
        { path: '/', redirect: '/home' }
    ],
    linkActiveClass: 'mui-active'
});

module.exports = router;