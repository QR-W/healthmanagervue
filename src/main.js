import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'normalize.css/normalize.css'

import '@/styles/index.scss'



import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
