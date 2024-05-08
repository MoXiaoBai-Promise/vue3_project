<template>
    <div>
        欢迎{{ userStore.username}}！
    </div>
</template>s
<script setup lang="ts">
import useUserStore from '@/store/user/index'

let userStore = useUserStore()

</script>

<style scoped lang="scss"></style>
