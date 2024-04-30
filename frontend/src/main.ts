import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import VueTree from '@ssthouse/vue3-tree-chart'

const app = createApp(App)
app.component('vue-tree', VueTree)
app.mount('#app')

