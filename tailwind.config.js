/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
        screens: {
            sm: "480px",
            md: "768px",
            lg: "1000px",
            xl: "1440px",
        },
        extend: {},
    },
    plugins: [],
};
