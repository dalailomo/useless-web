import { getHighlighter } from 'shiki';

const isDev = process.env.NODE_ENV !== 'production';
const hostname = 'https://theartofuseless.com';

export default {
    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'hpm-nuxt',
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        '@/modules/sitemap-add-dynamic-urls.module',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/content
        '@nuxt/content',
        '@nuxtjs/gtm',
        '@nuxtjs/sitemap',
        '@nuxtjs/robots',
    ],

    // Content module configuration: https://go.nuxtjs.dev/config-content
    content: {
        markdown: {
            async highlighter() {
                const highlighter = await getHighlighter({
                    theme: 'dracula',
                });
                return (rawCode, lang) => {
                    return highlighter.codeToHtml(rawCode, lang);
                };
            },
        },
    },

    gtm: {
        id: 'GTM-NJKB2PL',
        enabled: !isDev,
    },

    sitemap: {
        hostname,
        gzip: true,
        exclude: ['/politica-privacidad'],
    },

    robots: [
        {
            UserAgent: '*',
            Allow: '/',
            Sitemap: `${hostname}/sitemap.xml`,
        },
    ],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},

    generate: {
        fallback: '404.html',
    },
};
