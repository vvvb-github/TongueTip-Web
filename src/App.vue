<template>
    <div id="app">
        <router-view style="position: absolute;width: 100%;height: 100%"/>
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style>
    #app{
        width: 100%;
        height: 100%;
    }
</style>
