<template>
    <div class="tabbar">
        <div class="tabbar_left">
            <Breadcrumb></Breadcrumb>
        </div>
        <div class="tabbar_right">
            <Setting></Setting>
        </div>
    </div>
</template>
<script lang="ts">
    export default {
        name: 'TabBar'
    }
</script>
<script setup lang="ts">
    import Setting from './setting/index.vue'
    import Breadcrumb from './breadcrumb/index.vue'
 </script>
<style scoped lang="scss">
    .tabbar {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        .tabbar_left {
            display: flex;
            align-items: center;
            margin-left: 20px;
        }
        .tabbar_right{
            display: flex;
            align-items: center;
            img{
                margin: 10px;
            }
        }
    }
</style>
