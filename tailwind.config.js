//generate colors app: https://uicolors.app/create

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
                // "brand-blue": "#2E76BC",
                "brand-blue-light": "#3390ee",
                // "brand-gray": "#F2EFE9",
                "brand-primary": "#105ab5",
                "brand-error": "#d64045",
                "brand-success": "#4fb286",
                "brand-blue": {
                    50: "#f2f7fd",
                    100: "#e3ecfb",
                    200: "#c1d9f6",
                    300: "#8ab9ef",
                    400: "#4c95e4",
                    500: "#2478d3", //main
                    600: "#1760ba",
                    700: "#134991",
                    800: "#144078",
                    900: "#163664",
                    950: "#0f2342",
                },
                "brand-red": {
                    50: "#fef3f2",
                    100: "#fde8e6",
                    200: "#fad4d1",
                    300: "#f6b0ab",
                    400: "#f0817c",
                    500: "#e5504e",
                    600: "#d64045", //main
                    700: "#b02028",
                    800: "#941d28",
                    900: "#7f1c29",
                    950: "#460b11",
                },
                "brand-green": {
                    50: "#effaf4",
                    100: "#d9f2e3",
                    200: "#b6e4cb",
                    300: "#86cfac",
                    400: "#4fb286", //main
                    500: "#31986e",
                    600: "#217a57",
                    700: "#1b6147",
                    800: "#174e3a",
                    900: "#144030",
                    950: "#0a241c",
                },
                "brand-gray": {
                    50: "#ededed",
                    100: "#e3e3e3",
                    200: "#d4d4d4",
                    300: "#bdbdbd",
                    400: "#a3a3a3",
                    500: "#9e9e9e",
                    600: "#949494",
                    700: "#878787",
                    800: "#737373",
                    900: "#616161",
                    950: "#424242",
                },
            },
            container: {
                md: {
                    maxWidth: "1024px",
                },
            },
        },
    },
};
