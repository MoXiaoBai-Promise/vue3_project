<template>
    <el-button icon="Refresh" size="small" circle @click="refresh" />
    <el-button
        icon="FullScreen"
        size="small"
        circle
        @click="fullScreen"
        v-if="screenfull.isEnabled"
    />

    <el-popover placement="top-start" title="设置" :width="300" trigger="hover">
        <template #reference>
            <el-button icon="Setting" size="small" circle />
        </template>
        <el-form>
            <el-form-item label="暗黑模式">
                <el-switch v-model="dark" class="ml-2" @change="changeDark" />
            </el-form-item>
        </el-form>
    </el-popover>

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
    import { ref } from 'vue'

    let userStore = useUserStore()

    let getTabBarStore = useTabBarStore()

    let $router = useRouter()

    let $route = useRoute()
    let dark = ref<boolean>(false) //暗黑模式
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
    async function logOut() {
        await userStore.userLogOut() //清除用户信息
        $router.push({ name: 'login', query: { redirect: $route.path } }) //跳转到登录页面
    }
    
    //暗黑模式切换
    const changeDark = () => {
        let html = document.documentElement
        let layout_top = document.getElementsByClassName('layout_top') as HTMLCollectionOf<HTMLElement>
        let layout_main = document.getElementsByClassName('layout_main') as HTMLCollectionOf<HTMLElement>
        
        if (dark.value) {
           
            layout_top[0].style.backgroundColor ='#191919';
            layout_main[0].style.backgroundColor ='#191919';
            html.className = 'dark'
        } else {
            html.classList.remove('dark')
            layout_top[0].style.backgroundColor ='#f8f8ff';
            layout_main[0].style.backgroundColor ='white';
        }
    }
</script>
<style scoped lang="scss"></style>
