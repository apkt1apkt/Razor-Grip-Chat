const path = require("path");

module.exports = {
    webpack: {
        alias: {
            "@web": path.resolve(__dirname, "src"),
        }
    }
}