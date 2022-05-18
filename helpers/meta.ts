import { I_MetaForPageParams, I_MetaObject } from '~/types';

const domain = 'https://www.theartofuseless.com';

export const generateMetaObject = (
    params: I_MetaForPageParams
): I_MetaObject => {
    if (!params.page) return { title: 'Oops!', meta: [], link: [] };

    const extendedMetaTags = params.extendedMetaTags
        ? params.extendedMetaTags
        : [];

    return {
        title: params.page.title,
        meta: [
            {
                hid: 'description',
                name: 'description',
                content: params.page.description,
            },
            // Open Graph
            {
                hid: 'og:title',
                property: 'og:title',
                content: params.page.title,
            },
            {
                hid: 'og:description',
                property: 'og:description',
                content: params.page.description,
            },
            // Twitter Card
            {
                hid: 'twitter:title',
                name: 'twitter:title',
                content: params.page.title,
            },
            {
                hid: 'twitter:description',
                name: 'twitter:description',
                content: params.page.description,
            },
            ...extendedMetaTags,
        ],
        link: [
            {
                rel: 'canonical',
                href:
                    params.route.path === '/'
                        ? domain
                        : `${domain}${params.route.path}`,
            },
        ],
    };
};
