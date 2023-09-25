/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        `components/**/*.{vue,js}`,
        `layouts/**/*.vue`,
        `pages/**/*.vue`,
        `composables/**/*.{js,ts}`,
        `plugins/**/*.{js,ts}`,
        `App.{js,ts,vue}`,
        `app.{js,ts,vue}`,
    ],
    theme: {
        extend: {
            colors: {
                "brand-color": "#1c1e26",
                "brand-blue": '#2E76BC',
                "brand-blue-light": "#3390ee",
                "brand-gray": "#F2EFE9",
            },
        },
    },
    plugins: [],
};
