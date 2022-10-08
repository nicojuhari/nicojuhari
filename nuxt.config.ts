// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss', 
        [ "@storyblok/nuxt", { accessToken: 'EzikCGO5TZGapwffPYn4rAtt' }]
    ],
    css: ['@/assets/css/styles.css'],
    runtimeConfig: {
        public : {
            gtag: {
                id: 'G-YC2EDZRT9H'
            }
        }
    },
})
