import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './pages/Home.vue';
import Goods from './pages/Goods.vue';

Vue.use(VueRouter)

export default new VueRouter({
    routes:[
        //redirect 重定向 当路径为 / 时,自动重定向到 /home
        {path:'/',redirect:'/home'},
        {path:'/home',component:Home,redirect:'/Home/Goods',
            children:[
                {path:"/home/goods",component:Goods},
                {path:"/home/comment",component:()=>import('./pages/Comment.vue')},
                {path:"/home/merchant",component:()=>import('./pages/Merchant.vue')},
            ]
        },
        {path:'/detali',component:()=>import('./pages/Detail.vue')},
    ]
})