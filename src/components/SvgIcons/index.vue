<template>
    <svg :style="{height,width}">
        <use :xlink:href="prefix + name" :fill="fill"></use>
    </svg>
</template>

<script setup lang="ts">
    defineProps({
        prefix: {
            type: String,
            default: '#icon-' //前缀
        },
        name: String,
        fill: {
            type: String,
            default: ''
        },
        width: {
            type: String,
            default: '16px'
        },
        height: {
            type: String,
            default: '16px'
        }
    })

</script>

<style scoped lang="scss"></style>
