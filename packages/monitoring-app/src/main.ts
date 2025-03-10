import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { ComponentLibraryPlugin } from 'vue-library'

const app = createApp(App)

app.use(createPinia()).use(ComponentLibraryPlugin)

app.mount('#app')
