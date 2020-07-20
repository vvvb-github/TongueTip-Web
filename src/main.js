import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from '@/router';
import store from "@/store";
import App from "@/App";
import SERVICE_PATH from "./config";

Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.prototype.SERVICE_PATH = SERVICE_PATH;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
