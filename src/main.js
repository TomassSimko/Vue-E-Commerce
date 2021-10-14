import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret,faCartPlus,faFolderOpen,faIdCard,faSignOutAlt,faUserShield,faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '@/plugins/bootstrap-vue'
import '@/assets/style.scss'
import Vue2Editor from "vue2-editor"



library.add(faUserSecret,faCartPlus,faFolderOpen,faIdCard,faSignOutAlt,faUserShield,faEdit)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(Vue2Editor);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
