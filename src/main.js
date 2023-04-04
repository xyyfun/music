import { createApp } from 'vue';
import router from '@/router';
import store from '@/store';
import './assets/style/common.less';
import './assets/iconfont/iconfont.css';
import plugin from './plugin';
import App from './App.vue';

createApp(App).use(router).use(store).use(plugin).mount('#app');
