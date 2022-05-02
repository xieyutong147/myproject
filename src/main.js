import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI, {Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import request from "@/utils/request";
import store from "@/store";
Vue.config.productionTip = false
Vue.prototype.request=request
Vue.use(ElementUI);
Vue.directive('title',  function (el, binding) {
  document.title = el.dataset.title
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
