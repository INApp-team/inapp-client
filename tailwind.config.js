const { headerHeight, footerHeight } = require("./src/constants/styles/layout");
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        layout: {
            headerHeight: headerHeight,
            footerHeight: footerHeight
        },
        extend: {
            boxShadow: {
                custom: "0 0 0 50vmax rgba(0,0,0,.5)"
            }
        }
    },
    plugins: []
};
