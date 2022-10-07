// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss'],

    css: ['@/assets/css/styles.css'],
    
    runtimeConfig: {
        public : {
            gtag: {
                id: 'G-YC2EDZRT9H'
            }
        }
    },
})
