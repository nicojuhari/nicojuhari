// https://nuxt.com/docs/api/configuration/nuxt-config

const siteTitle = 'Full-Stack Web Developer | Business & Restaurant Websites'
const siteDescription = 'Creating fast, pixel-perfect, and SEO-friendly websites for businesses and restaurants that stand out. Let\'s bring your vision to life - reach out today!'

export default defineNuxtConfig({ 
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@vueuse/nuxt', '@nuxtjs/sitemap', ["@storyblok/nuxt", { accessToken: 'EzikCGO5TZGapwffPYn4rAtt' }], '@nuxtjs/robots'],
  // css: ['~/assets/css/main.css'],
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
    '/tools/online-checklist-maker': { ssr: false }, // Add this line
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
        public : {
          gtag: {
            id: 'G-YC2EDZRT9H'
          },
            siteUrl: 'https://nicojuhari.com',
            siteName: siteTitle,
            siteDescription,
            language: 'en',
        },
        siteUrl: 'https://nicojuhari.com',
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
        },
    },
  compatibilityDate: "2024-11-01",
})