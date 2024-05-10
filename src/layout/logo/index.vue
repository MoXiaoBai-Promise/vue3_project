<template>
    <div class="logo" v-if="titleAndLogo.logoHide">
        <img :src="titleAndLogo.logo" style="border-radius: 50%;"/>
        <p>{{ titleAndLogo.title }}</p>
    </div>
</template>
<script lang="ts">
    export default {
        name: 'Logo'
    }
</script>
<script setup lang="ts">
    import titleAndLogo from '@/setting'
</script>
<style scoped lang="scss">
    .logo {
        height: $base-logo-height;
        color: white;
        display: flex;
        align-items: center;
        // justify-content: center;
        padding: 5px 10px;
        img {
            height: 35px;
            width: 35px;
        }
        p {
            font-size: $base-logo-title-font-size;
            margin-left: 5px;
        }
    }
</style>
