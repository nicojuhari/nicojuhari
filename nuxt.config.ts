// https://nuxt.com/docs/api/configuration/nuxt-config

const siteTitle = 'Shopify & JavaScript Developer - Performance & CRO'
const siteDescription = 'I am a Shopify expert and full-stack JavaScript developer with a passion for creating fast, pixel-perfect, and SEO-friendly eCommerce stores that stand out.'

export default defineNuxtConfig({ 
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@vueuse/nuxt', '@nuxtjs/sitemap', '@pinia/nuxt', '@vueuse/motion/nuxt', ["@storyblok/nuxt", { accessToken: 'EzikCGO5TZGapwffPYn4rAtt' }], '@nuxtjs/robots', 'pinia-plugin-persistedstate/nuxt',],
  css: ['@/assets/css/main.css'],
  ui: {
    theme: {
      colors: ['primary', 'secondary', 'neutral', 'error', 'success']
    },
    colorMode: false
  },
  
  routeRules: {
    '/': { prerender: true },
    '/tools/free-qr-code-generator/**': { prerender: true },
    '/projects/**': { prerender: true },
    '/tools/free-menu-maker': { redirect: 'https://1food.menu' },
    '/tools/bunny-cdn': { redirect: 'https://bunny-cdn.netlify.app' },
    '/demos/restaurant-website-design/**': { 
      redirect: {
        to: '/restaurant-website-examples',
        statusCode: 301
      }
    }
  },

  runtimeConfig: {
        public: {
          siteUrl: 'https://nicojuhari.com',
          siteName: siteTitle,
          siteDescription,
          language: 'en',
          STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
        },
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
        siteUrl: 'https://nicojuhari.com'
    },
  app: {
        head: { 
            htmlAttrs: {
              lang: 'en'
            },
            title: siteTitle,
            titleTemplate: '%s',
            link: [
                { rel: 'icon', type:'image/x-icon', href: '/favicon.ico' },
                { rel: 'shortcut icon', type:'image/png', sizes:"32x32", href:"/favicon-32x32.png" },
                { rel: 'shortcut icon', type:'image/png', sizes:"16x16", href:"/favicon-16x16.png" },
                { rel: 'apple-touch-icon', sizes:"180x180", href:"/apple-touch-icon.png" }
            ],
            meta: [
                { name: 'description', content: siteDescription },
                { name: 'keywords', content: 'Web developer, JavaScript developer, Nuxt, Vue, web apps' },
                { name: 'google-site-verification', content: "oOiepCGY8_h_x8LguPX3bbyO0MKDXRKE6dSSKlSUiKI"} 
            ],
            script: [
              { src: "https://cloud.umami.is/script.js", "data-website-id" : "c772c6d0-db82-4c66-893f-546c8101130e", defer: true},
              // { src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4659100624570587", crossorigin: "anonymous", async: true}
            ]
        },
    },
  compatibilityDate: "2025-07-15",
})