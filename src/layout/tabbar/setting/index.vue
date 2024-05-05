<template>
    <el-button icon="Refresh" size="small" circle />
    <el-button icon="FullScreen" size="small" circle />
    <el-button icon="Setting" size="small" circle />
    <img src="../../../../public/logo.png" style="width: 24px; height: 24px" />

    <el-dropdown trigger="click" style="margin-right: 20px">
        <span class="el-dropdown-link">
            admin
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>退出登录</el-dropdown-item>
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

</script>
<style scoped lang="scss"></style>
