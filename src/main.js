import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {
  Layout, Row, Col,
  Menu,
  Table,
  Icon, Pagination, Switch,
  message
} from 'ant-design-vue'

Vue.component(Layout.name, Layout)
Vue.component(Layout.Header.name, Layout.Header)
Vue.component(Layout.Content.name, Layout.Content)

Vue.component(Row.name, Row)
Vue.component(Col.name, Col)

Vue.component(Menu.name, Menu)
Vue.component(Menu.Item.name, Menu.Item)
Vue.component(Table.name, Table)
Vue.component(Icon.name, Icon)
Vue.component(Pagination.name, Pagination)
Vue.component(Switch.name, Switch)

Vue.prototype.$message = message

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
