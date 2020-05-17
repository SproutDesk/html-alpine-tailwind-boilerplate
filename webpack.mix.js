const mix = require('laravel-mix')
require('mix-html-builder')
require('laravel-mix-imagemin')

const RESOURCE_ROOT = 'src'
const BUILD_PATH = 'build'

mix.setPublicPath(BUILD_PATH)
mix.setResourceRoot(RESOURCE_ROOT)

mix.js(`${RESOURCE_ROOT}/app.js`, BUILD_PATH)

mix.postCss(`${RESOURCE_ROOT}/app.css`, BUILD_PATH, [require('tailwindcss')('tailwind.config.js')])

mix.html({
    output: '.', // output folder is relative to BUILD_PATH
    htmlRoot: `${RESOURCE_ROOT}/*.html`,
    partialRoot: `${RESOURCE_ROOT}/partials`,
    layoutRoot: `${RESOURCE_ROOT}/layouts`,
    minify: {
        removeComments: true,
        removeRedundantAttributes: false,
        collapseWhitespace: true,
    },
})

mix.copyDirectory('public/', 'build/')

mix.imagemin(
    'img/**.*',
    {
        context: RESOURCE_ROOT,
        force: true,
    },
    {
        optipng: {
            optimizationLevel: 4,
        },
        plugins: [],
    },
)

mix.browserSync({
    server: BUILD_PATH,
    watch: true,
    proxy: false,
})
