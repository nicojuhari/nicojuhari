// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: [ '@nuxt/ui', '@vueuse/nuxt', 'nuxt-icon', '@nuxtjs/seo', [ "@storyblok/nuxt", { accessToken: 'EzikCGO5TZGapwffPYn4rAtt' }]],
    css: ['@/assets/css/styles.css'],
    runtimeConfig: {
        public : {
            gtag: {
                id: 'G-YC2EDZRT9H'
            },
            siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://nicojuhari.com',
            siteName: 'Freelance Web Developer',
            siteDescription: 'I create pixel-perfect, fast, and SEO-friendly business websites and landing pages. Also, I optimize websites in order to increase the conversion rate.',
            language: 'en', // prefer more explicit language codes like `en-AU` over `en`
        },
        siteUrl: 'https://nicojuhari.com',
    },
    ui: {
        icons: ["ph"]
    },
    site: {
        url: process.env.NUXT_PUBLIC_SITE_URL || 'https://nicojuhari.com',
    },
    app: {
        head: { 
            htmlAttrs: {
                    lang: 'en'
            },
            title: 'Freelance Web Developer in Vienna, Austria',
            link: [
                { rel: 'icon', type:'image/x-icon', href: '/favicon.ico' },
                { rel: 'shortcut icon', type:'image/png', sizes:"32x32", href:"/favicon-32x32.png" },
                { rel: 'shortcut icon', type:'image/png', sizes:"16x16", href:"/favicon-16x16.png" },
                { rel: 'apple-touch-icon', sizes:"180x180", href:"/apple-touch-icon.png" }
            ],
            meta: [
                { name: 'description', content: 'I create pixel-perfect, fast, and SEO-friendly websites and landing pages. I specialize in websites for restaurants, bars, and cafes.' },
                { name: 'keywords', content: 'Web developer, Freelancer, Vienna Austria, restaurant websites, website developer' },
                { name: 'google-site-verification', content: "oOiepCGY8_h_x8LguPX3bbyO0MKDXRKE6dSSKlSUiKI"}
            ],
        },
    },
})
