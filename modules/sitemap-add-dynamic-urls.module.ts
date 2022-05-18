import { Module } from '@nuxt/types';

const generator: Module = function () {
    this.nuxt.hook('generate:done', (context: any) => {
        const routesToExclude: string[] = context.nuxt.options.sitemap.exclude;
        const allRoutes: string[] = Array.from(context.generatedRoutes);
        const routes: string[] = allRoutes.filter(
            (route: string) => !routesToExclude.includes(route)
        );
        this.nuxt.options.sitemap.routes = [...routes];
    });
};

export default generator;
