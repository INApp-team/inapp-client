const { headerHeight, footerHeight } = require("./src/constants/styles/layout");
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        layout: {
            headerHeight: headerHeight,
            footerHeight: footerHeight
        }
    },
    plugins: []
};
