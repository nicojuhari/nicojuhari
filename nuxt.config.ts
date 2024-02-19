// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@formkit/nuxt', '@vueuse/nuxt', '@pinia/nuxt', '@nuxtjs/seo', [ "@storyblok/nuxt", { accessToken: 'EzikCGO5TZGapwffPYn4rAtt' }]],
  css: ['~/assets/css/index.css'],
  ui: {
    icons: ["ph"]
  },
  colorMode: {
    preference: 'light',
    fallback: 'light'
  },
  site: {
        url: process.env.NUXT_PUBLIC_SITE_URL || 'https://nicojuhari.com',
  },
  routeRules: {
    '/': { static: true },
    '/tools/free-menu-maker/**': { static: true },
    '/tools/free-qr-code-generator/**': { static: true },
    '/projects/**': { static: true },
  },
  runtimeConfig: {
        public : {
          gtag: {
            id: 'G-YC2EDZRT9H'
          },
            siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://nicojuhari.com',
            siteName: 'Freelance Web Developer from Vienna, Austria',
            siteDescription: 'I create pixel-perfect, fast, and SEO-friendly web apps. I specialize in business and restaurant websites and landing pages.',
            language: 'en', 
        },
        siteUrl: 'https://nicojuhari.com',
    },
  app: {
        head: { 
            htmlAttrs: {
              lang: 'en'
            },
            title: 'Freelance Web Developer from Vienna, Austria',
            titleTemplate: '%s',
            link: [
                { rel: 'icon', type:'image/x-icon', href: '/favicon.ico' },
                { rel: 'shortcut icon', type:'image/png', sizes:"32x32", href:"/favicon-32x32.png" },
                { rel: 'shortcut icon', type:'image/png', sizes:"16x16", href:"/favicon-16x16.png" },
                { rel: 'apple-touch-icon', sizes:"180x180", href:"/apple-touch-icon.png" }
            ],
            meta: [
                { name: 'description', content: 'I create pixel-perfect, fast, and SEO-friendly web apps. I specialize in business and restaurant websites and landing pages.' },
                { name: 'keywords', content: 'Web developer, Freelancer, Vienna Austria, restaurant websites, website developer' },
                { name: 'google-site-verification', content: "oOiepCGY8_h_x8LguPX3bbyO0MKDXRKE6dSSKlSUiKI"}
            ],
        },
    },
})
