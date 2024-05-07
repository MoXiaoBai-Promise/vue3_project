<template>
    <template v-for="menu in menuList" :key="menu.path">
        <!--没有子路由-->
        <template v-if="!menu.children">
            <el-menu-item
                :index="menu.name"
                v-if="!menu.meta.hidden"
                @click="getMenu"
            >
                <el-icon>
                    <component :is="menu.meta.icon"></component>
                </el-icon>
                <template #title>{{ menu.meta.title }}</template>
            </el-menu-item>
        </template>

        <!-- 有子路由但是只有一个子路由 -->
        <template v-if="menu.children && menu.children.length === 1">
            <el-menu-item
                :index="menu.children[0].name"
                v-if="!menu.children[0].meta.hidden"
                @click="getMenu"
            >
                <el-icon>
                    <component :is="menu.children[0].meta.icon"></component>
                </el-icon>
                <template #title>{{ menu.children[0].meta.title }}</template>
            </el-menu-item>
        </template>

        <!-- 有子路由且个数大于一个1 -->
        <el-sub-menu
            :index="menu.name"
            v-if="menu.children && menu.children.length > 1"
        >
            <template #title>
                <el-icon>
                    <component :is="menu.meta.icon"></component>
                </el-icon>
                <span>{{ menu.meta.title }}</span>
            </template>
            <Menu :menuList="menu.children"></Menu>
        </el-sub-menu>
    </template>
</template>
<script lang="ts">
    export default {
        name: 'Menu'
    }
</script>
<script setup lang="ts">
    import { useRouter } from 'vue-router'
    let $router = useRouter()
    function getMenu(value: any) {
        $router.push({
            name: value.index
        })
    }
    defineProps(['menuList'])
</script>
<style scoped lang="scss"></style>
