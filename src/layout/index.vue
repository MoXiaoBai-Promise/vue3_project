<template>
    <div class="layout_container">
        <div class="layout_left">
            <Logo />
            <!-- 滚动组件 -->
            <el-scrollbar class="scrollbar">
                <el-menu
                    background-color="#001529"
                    text-color="white"
                    :default-active="$route.name"
                    :collapse="getTabBarStore.fold"
                >
                    <Menu :menuList="menuRoutes.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <div class="layout_top" :class="{ fold: getTabBarStore.fold }">
            <Tabbar></Tabbar>
        </div>
        <div class="layout_main" :class="{ fold: getTabBarStore.fold }">
            <router-view v-slot="{ Component }" v-if="refresh">
                <transition name="fade">
                    <component :is="Component"></component>
                </transition>
            </router-view>
        </div>
    </div>
</template>
<script lang="ts">
    export default {
        name: 'Layout'
    }
</script>
<script setup lang="ts">
    import { useRoute } from 'vue-router'
    import Logo from '@/layout/logo/index.vue'
    import Menu from '@/layout/menu/index.vue'
    import userStore from '@/store/user/index'
    import Tabbar from '@/layout/tabbar/index.vue'
    import useTabBarStore from '@/store/tabbar'
    import { ref, watch, nextTick } from 'vue'
    let getTabBarStore = useTabBarStore()
    let refresh = ref(true) //控制main组件重建和销毁

    let menuRoutes = userStore()
    let $route = useRoute()

    //监听getTabBarStore.refresh，如果数据发生了改变，通过改变refresh让main组件销毁后再重建
    watch(
        () => getTabBarStore.refresh,
        () => {
            refresh.value = false
            nextTick(() => {
                refresh.value = true
            })
        }
    )
</script>
<style scoped lang="scss">
    .layout_container {
        width: 100%;
        height: 100vh;
        .layout_left {
            width: $base-menu-width;
            height: 100vh;
            background-color: $base-menu-background;
            color: white;
            transition: all 0.3s;
            .scrollbar {
                height: calc(100vh - $base-logo-height - 10px);
                .el-menu {
                    border-right: none;
                }
            }
            // &.fold {
            //     width: $base-menu-min-width;
            // }
        }

        .layout_top {
            position: fixed;
            height: $base-tabbar-height;
            width: calc(100% - $base-menu-width);
            top: 0;
            left: $base-menu-width;
            transition: all 0.3s;
            background: #F8F8FF;
            border-bottom: 1px solid #DCDCDC;
            &.fold {
                width: calc(100% - $base-menu-min-width);
                left: $base-menu-min-width;
            }
        }
        .layout_main {
            position: absolute;
            width: calc(100% - $base-menu-width - 40px);
            height: calc(100vh - $base-tabbar-height - 40px);
            top: $base-tabbar-height;
            left: $base-menu-width;
            padding: 20px;
            overflow: auto;
            transition: all 0.3s;
            background-color: white;
            &.fold {
                width: calc(100% - $base-menu-min-width - 40px);
                left: $base-menu-min-width;
            }
        }
    }

    .fade-enter-from {
        opacity: 0;
    }
    .fade-enter-active {
        transition: all 1s;
    }
    .fade-enter-to {
        opacity: 1;
    }
</style>
