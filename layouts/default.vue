<template>
    <table>
        <tr>
            <td valign="top">
                <xyg-nav />
            </td>
            <td>
                <Nuxt />
            </td>
        </tr>
    </table>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class DefaultLayout extends Vue {}
</script>

<style lang="scss">
body {
    margin: 0;
    padding: 0;

    background: #000;
    color: white;

    background-image: url('~/static/bg.gif');

    a {
        color: cyan;
    }

    h1,
    h2,
    h3,
    h4,
    h5 {
        color: deeppink;
        text-align: center;
    }

    table {
        border: 4px double white;
        width: 100%;

        td:first-child {
            border-right: 4px double silver;
        }
    }

    pre {
        padding: 18px;
        code span.line {
            line-height: 22px;
        }
    }
}
</style>

<style lang="scss" scoped>
header {
    position: fixed;
    height: 40px;
    background: lightblue;
    display: flex;
    justify-content: center;
    width: 100vw;
    z-index: 2;
}

.main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;

    & > .content {
        flex-grow: 2;
        width: 100%;
        min-width: 320px;
        max-width: 1024px;
        background: #ffffff;
        box-sizing: border-box;
        align-self: center;
        padding: 1em 2em;
        padding-top: 60px;
        line-height: 1.6em;
    }
}
</style>
