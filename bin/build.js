import esbuild from 'esbuild'
import { copy } from 'esbuild-plugin-copy'

const isDev = process.argv.includes('--dev')

async function compile(options) {
    const context = await esbuild.context(options)

    if (isDev) {
        await context.watch()
    } else {
        await context.rebuild()
        await context.dispose()
    }
}

const defaultOptions = {
    define: {
        'process.env.NODE_ENV': isDev ? `'development'` : `'production'`,
    },
    bundle: true,
    mainFields: ['module', 'main'],
    platform: 'neutral',
    sourcemap: isDev ? 'inline' : false,
    sourcesContent: isDev,
    treeShaking: true,
    target: ['es2020'],
    minify: !isDev,
    plugins: [
        {
            name: 'be mijo',
            setup: function (build) {
                build.onStart(() => {
                    console.log(`Build started at ${new Date(Date.now()).toLocaleTimeString()}: ${build.initialOptions.outfile}`)
                })

                build.onEnd((result) => {
                    if (result.errors.length > 0) {
                        console.log(`Build failed at ${new Date(Date.now()).toLocaleTimeString()}: ${build.initialOptions.outfile}`, result.errors)
                    } else {
                        console.log(`Build finished at ${new Date(Date.now()).toLocaleTimeString()}: ${build.initialOptions.outfile}`)
                    }
                })
            }
        },
        copy({
            resolveFrom: 'cwd',
            assets: [
                {
                    from: ['./node_modules/grapesjs/dist/grapes.min.js','./node_modules/grapesjs/dist/grapes.min.js.map'],
                    to: ['./resources/dist/js'],
                },
                {
                    from: ['./node_modules/grapesjs/dist/css/grapes.min.css'],
                    to: ['./resources/dist/css'],
                },
                {
                    from: ['./node_modules/grapesjs-preset-webpage/dist/index.js'],
                    to: ['./resources/dist/js/grapesjs-preset-webpage.min.js'],
                },
                {
                    from: ['./node_modules/grapesjs-preset-webpage/dist/index.js.map'],
                    to: ['./resources/dist/js/grapesjs-preset-webpage.min.js.map'],
                },
                {
                    from: ['./node_modules/grapesjs-blocks-basic/dist/index.js'],
                    to: ['./resources/dist/js/grapesjs-blocks-basic.min.js'],
                },
                {
                    from: ['./node_modules/grapesjs-blocks-basic/dist/index.js.map'],
                    to: ['./resources/dist/js/grapesjs-blocks-basic.min.js.map'],
                },
                {
                    from: ['./node_modules/grapesjs-plugin-forms/dist/index.js'],
                    to: ['./resources/dist/js/grapesjs-plugin-forms.min.js'],
                },
                {
                    from: ['./node_modules/grapesjs-plugin-forms/dist/index.js.map'],
                    to: ['./resources/dist/js/grapesjs-plugin-forms.min.js.map'],
                },
                {
                    from: ['./node_modules/grapesjs-navbar/dist/index.js'],
                    to: ['./resources/dist/js/grapesjs-navbar.min.js'],
                },
                {
                    from: ['./node_modules/grapesjs-navbar/dist/index.js.map'],
                    to: ['./resources/dist/js/grapesjs-navbar.min.js.map'],
                },
                /*{
                    from: ['./node_modules/grapesjs-lory-slider/dist/grapesjs-lory-slider.min.js'],
                    to: ['./resources/dist/js/grapesjs-lory-slider.min.js'],
                },*/
                {
                    from: ['./node_modules/grapesjs-custom-code/dist/index.js'],
                    to: ['./resources/dist/js/grapesjs-custom-code.min.js'],
                },
                {
                    from: ['./node_modules/grapesjs-custom-code/dist/index.js.map'],
                    to: ['./resources/dist/js/grapesjs-custom-code.min.js.map'],
                },
            ]
        })
    ],
}

compile({
    ...defaultOptions,
    entryPoints: ['./resources/js/index.js'],
    outfile: './resources/dist/js/filament-grapesjs.js',
})