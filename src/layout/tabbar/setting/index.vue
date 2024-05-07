<template>
    <el-button icon="Refresh" size="small" circle @click="refresh" />
    <el-button
        icon="FullScreen"
        size="small"
        circle
        @click="fullScreen"
        v-if="screenfull.isEnabled"
    />
    <el-button icon="Setting" size="small" circle />
    <img
        :src="userStore.avatar"
        style="width: 24px; height: 24px; border-radius: 50%; margin: 0 10px"
    />

    <el-dropdown trigger="click" style="margin-right: 20px">
        <span class="el-dropdown-link">
            {{ userStore.username }}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
<script lang="ts">
    export default {
        name: 'Setting'
    }
</script>
<script setup lang="ts">
    import useTabBarStore from '@/store/tabbar/index'
    import screenfull from 'screenfull'
    import useUserStore from '@/store/user/index'
    import { useRouter, useRoute } from 'vue-router'

    let userStore = useUserStore()

    let getTabBarStore = useTabBarStore()

    let $router = useRouter()

    let $route = useRoute()
    //刷新main组件
    function refresh() {
        getTabBarStore.refresh = !getTabBarStore.refresh
    }
    //全屏切换
    function fullScreen() {
        if (screenfull.isFullscreen) {
            screenfull.exit()
        } else {
            screenfull.request()
        }
    }
    //退出登录
    function logOut() {
        console.log($route)

        userStore.userLogOut() //清除用户信息
        $router.push({ name: 'login', query: { redirect: $route.path} }) //跳转到登录页面
    }
</script>
<style scoped lang="scss"></style>
