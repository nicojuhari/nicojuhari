// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@formkit/nuxt', '@vueuse/nuxt', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  ui: {
    icons: ["ph"]
  },
  colorMode: {
    preference: 'light'
  },
  runtimeConfig: {
  },
  routeRules: {
    '/free-menu-maker/**': { ssr: false },
  },
   runtimeConfig: {
        public : {
            gtag: {
                id: 'G-YC2EDZRT9H'
            },
        },
    },
})
