import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 引入重置样式
import './assets/style/reset.css';
// 引入vant
import Vant from 'vant';
import 'vant/lib/index.css';
// 引入axios拦截器
import './utils/axiosUtils';
// 引入store
import store from './store';

Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,   //路由配置项
  store,
}).$mount('#app')
