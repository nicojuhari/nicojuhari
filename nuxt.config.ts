// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: [ '@nuxtjs/tailwindcss', [ "@storyblok/nuxt", { accessToken: 'EzikCGO5TZGapwffPYn4rAtt' }]],
    css: ['@/assets/css/styles.css'],
    runtimeConfig: {
        public : {
            gtag: {
                id: 'G-YC2EDZRT9H'
            }
        }
    },
    app: {
        head: { 
            htmlAttrs: {
                    lang: 'en'
            },
            title: 'Web Developer & Freelancer | Vienna Austria',
            link: [
                { rel: 'icon', type:'image/x-icon', href: '/favicon.ico' },
                { rel: 'shortcut icon', type:'image/png', sizes:"32x32", href:"/favicon-32x32.png" },
                { rel: 'shortcut icon', type:'image/png', sizes:"16x16", href:"/favicon-16x16.png" },
                { rel: 'apple-touch-icon', sizes:"180x180", href:"/apple-touch-icon.png" }
            ],
            meta: [
                { name: 'description', content: 'Web Developer & Freelancer in Vienna Austria - I create websites for restaurants, bars and cafes' },
                { name: 'keywords', content: 'Web developer, Freelancer, Vienna Austria, restaurant websites, website developer' },
                { name: 'google-site-verification', content: "oOiepCGY8_h_x8LguPX3bbyO0MKDXRKE6dSSKlSUiKI"}
            ],
        },
    },
    
})
