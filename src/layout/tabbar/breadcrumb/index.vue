<template>
    <el-icon style="margin-right: 10px" @click="changeIcon">
        <component :is="getTabBarStore.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>

    <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item
            v-for="tabBarRoute in tabBarRoutes"
            :key="tabBarRoute.name"
            :to="{ name: tabBarRoute.name }"
        >
            <el-icon>
                <component :is="tabBarRoute.meta.icon"></component>
            </el-icon>
            <span>{{ tabBarRoute.meta.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script lang="ts">
    export default {
        name: 'BreadCrumb'
    }
</script>
<script setup lang="ts">
    import useTabBarStore from '@/store/tabbar'
    import { useRoute } from 'vue-router'
    import { computed } from 'vue'

    let $route = useRoute()
    let getTabBarStore = useTabBarStore() //TabBar的Store

    //改变图标的类型
    function changeIcon() {
        getTabBarStore.fold = !getTabBarStore.fold
    }

    //渲染面包屑的数据
    const tabBarRoutes = computed(() =>
        $route.matched.filter((item) => !item.meta.hidden)
    ) 
</script>
<style scoped lang="scss"></style>
