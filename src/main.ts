import { createApp } from 'vue'
import 'normalize.css'
import './style.css'
import App from './App.vue'

import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccount } from '@mdi/js'
import { IMaskDirective } from 'vue-imask';

import { createPinia } from 'pinia'
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.directive('imask', IMaskDirective);
app.mount('#app')
