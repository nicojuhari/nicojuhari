// https://nuxt.com/docs/api/configuration/nuxt-config

const siteTitle = 'Full-Stack Web Developer - Nuxt and Appwrite'
const siteDescription = 'Creating fast, pixel-perfect, and SEO-friendly web apps for modern businesses, using Nuxt and Appwrite. Explore my portfolio and FREE web tools.'

export default defineNuxtConfig({ 
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@formkit/nuxt', '@vueuse/nuxt', '@pinia/nuxt', '@nuxtjs/seo', [ "@storyblok/nuxt", { accessToken: 'EzikCGO5TZGapwffPYn4rAtt' }]],
  css: ['~/assets/css/main.css'],
  colorMode: {
    preference: 'light',
    fallback: 'light'
  },

  site: {
        url: process.env.NUXT_PUBLIC_SITE_URL || 'https://nicojuhari.com',
  },

  routeRules: {
    '/': { prerender: true },
    '/tools/free-qr-code-generator/**': { prerender: true },
    '/projects/**': { prerender: true },
  },

  runtimeConfig: {
        public : {
          gtag: {
            id: 'G-YC2EDZRT9H'
          },
            siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://nicojuhari.com',
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
  compatibilityDate: '2024-09-05',
})