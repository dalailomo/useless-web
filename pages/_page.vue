<template>
    <nuxt-content :document="page" />
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { Context } from '@nuxt/types';
import { generateMetaObject } from '@/helpers/meta';
import {
    I_ExtendedFetchReturn,
    I_MetaObject,
    I_PageComponent,
    I_PageComponentAsyncData,
} from '~/types';

@Component({
    async asyncData(ctx: Context): Promise<I_PageComponentAsyncData> {
        const p = ctx.route.params;
        const path = `page/${p.page}`;
        return {
            page: await ctx.$content(path).fetch(),
        };
    },
})
export default class PillarRootPage extends Vue implements I_PageComponent {
    page!: I_ExtendedFetchReturn;

    head(): I_MetaObject {
        return generateMetaObject({
            page: this.page,
            route: this.$route,
        });
    }
}
</script>
