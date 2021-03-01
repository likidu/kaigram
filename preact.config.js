export default {
    /**
     * Function that mutates the original webpack config.
     * Supports asynchronous changes when a promise is returned (or it's an async function).
     *
     * @param {object} config - original webpack config.
     * @param {object} env - options passed to the CLI.
     * @param {WebpackConfigHelpers} helpers - object with useful helpers for working with the webpack config.
     * @param {object} options - this is mainly relevant for plugins (will always be empty in the config), default to an empty object
     **/
    webpack(config, env, helpers, options) {
        // Remove default PostCSS options and use postcss.config.js instead
        const postCssLoaders = helpers.getLoadersByName(
            config,
            'postcss-loader',
        )
        postCssLoaders.forEach(({ loader }) => delete loader.options)
    },
}
