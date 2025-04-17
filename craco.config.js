module.exports = {
    webpack: {
        configure: {
            resolve: {
                fallback: {
                    crypto: require.resolve('crypto-browserify'),
                    stream: require.resolve('stream-browserify'),
                    buffer: require.resolve('buffer/'),
                    util: require.resolve('util/'),
                    process: require.resolve('process/browser'),
                    zlib: require.resolve('browserify-zlib'),
                    url: require.resolve('url/'),
                    timers: require.resolve('timers-browserify'),
                    net: false,
                    tls: false
                }
            }
        }
    }
}; 