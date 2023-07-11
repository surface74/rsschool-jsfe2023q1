const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        open: {
            app: {
                name: 'chrome',
            },
        },
        static: {
            directory: path.resolve('../dist'),
        },
        hot: true,
        compress: true,
        port: 3000,
    },
};
