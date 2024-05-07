<template>
    <div>
        欢迎{{ userStore.username}}！
    </div>
</template>s
<script setup lang="ts">
import { onMounted } from 'vue'
import useUserStore from '@/store/user/index'

let userStore = useUserStore()
//首页一挂载完毕，就去获取用户的信息
onMounted(()=>{
    userStore.userInfo()
})
</script>

<style scoped lang="scss"></style>
