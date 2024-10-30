import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './client/App.vue'
import { Quasar } from 'quasar'

function main() {
    // Vue
    const app = createApp(App)

    // Pinia
    const pinia = createPinia()
    app.use(pinia)

    // Quasar
    app.use(Quasar)

    app.mount('#app')
}

main()
