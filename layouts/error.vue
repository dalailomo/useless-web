<template>
    <div>
        <h1>Página no encontrada</h1>
        <nuxt-link to="/">Inicio</nuxt-link>
    </div>
</template>

<script lang="ts">
export default {
    props: ['error'],
    layout: 'error', // you can set a custom layout for the error page
};
</script>
