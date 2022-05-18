<template>
    <nav>
        <ul>
            <li v-for="(rootItem, i) in links" :key="i">
                <nuxt-link :to="rootItem.href">{{ rootItem.anchor }}</nuxt-link>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import navigationLinks from '@/helpers/navigation-links';
import { I_Nav } from '~/types';

@Component
export default class XygNav extends Vue {
    links: I_Nav[] = navigationLinks;
}
</script>

<style lang="scss" scoped src="./xyg-nav.scss" />
