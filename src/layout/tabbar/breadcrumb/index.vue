<template>
    <el-icon style="margin-right: 10px" @click="changeIcon">
        <component :is="getTabBarStore.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>

    <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item>商品</el-breadcrumb-item>
        <el-breadcrumb-item>汉字</el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script lang="ts">
    export default {
        name: 'BreadCrumb'
    }
</script>
<script setup lang="ts">
    import useTabBarStore from '@/store/tabbar'
    let getTabBarStore = useTabBarStore()
    function changeIcon() {
        getTabBarStore.fold = !getTabBarStore.fold
    }
</script>
<style scoped lang="scss"></style>
