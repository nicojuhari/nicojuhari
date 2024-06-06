// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@formkit/nuxt', '@vueuse/nuxt', '@pinia/nuxt', '@nuxtjs/seo', [ "@storyblok/nuxt", { accessToken: 'EzikCGO5TZGapwffPYn4rAtt' }]],
  ui: {
    icons: ["ph"],
    disableGlobalStyles: true,
  },
  colorMode: {
    preference: 'light',
    fallback: 'light'
  },
  site: {
        url: process.env.NUXT_PUBLIC_SITE_URL || 'https://nicojuhari.com',
  },
  routeRules: {
    '/': { prerender: true },
    '/tools/free-menu-maker/**': { prerender: true },
    '/tools/free-qr-code-generator/**': { prerender: true },
    '/projects/**': { prerender: true },
  },
  runtimeConfig: {
        public : {
          gtag: {
            id: 'G-YC2EDZRT9H'
          },
            siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://nicojuhari.com',
            siteName: 'Freelance Web Developer - Shopify & Business Websites',
            siteDescription: 'Pixel-perfect, fast, and SEO-friendly web apps designed specially for your business. Improve your online presence with expert design and development.',
            language: 'en', 
        },
        siteUrl: 'https://nicojuhari.com',
    },
  app: {
        head: { 
            htmlAttrs: {
              lang: 'en'
            },
            title: 'Shopify Developer and Freelancer',
            titleTemplate: '%s',
            link: [
                { rel: 'icon', type:'image/x-icon', href: '/favicon.ico' },
                { rel: 'shortcut icon', type:'image/png', sizes:"32x32", href:"/favicon-32x32.png" },
                { rel: 'shortcut icon', type:'image/png', sizes:"16x16", href:"/favicon-16x16.png" },
                { rel: 'apple-touch-icon', sizes:"180x180", href:"/apple-touch-icon.png" }
            ],
            meta: [
                { name: 'description', content: 'Pixel-perfect, fast, and SEO-friendly web apps designed specially for your business. Improve your online presence with expert design and development.' },
                { name: 'keywords', content: 'Web developer, freelancer, shopify developer, business website design' },
                { name: 'google-site-verification', content: "oOiepCGY8_h_x8LguPX3bbyO0MKDXRKE6dSSKlSUiKI"}
            ],
        },
    },
})
