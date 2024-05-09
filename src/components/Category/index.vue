<template>
    <el-card>
        <el-form :inline="true">
            <el-form-item label="一级分类">
                <el-select v-model="c1Id" @change="getC2List" :disabled="isshow == 1">
                    <el-option
                        :value="item.id"
                        v-for="item in c1List"
                        :key="item.id"
                        :label="item.name"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select v-model="c2Id" :disabled="!c1Id || isshow == 1" @change="getC3List">
                    <el-option
                        :label="item.name"
                        :value="item.id"
                        v-for="item in c2List"
                        :key="item.id"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select v-model="c3Id" :disabled="!c2Id || isshow == 1 ">
                    <el-option
                        :label="item.name"
                        :value="item.id"
                        v-for="item in c3List"
                        :key="item.id"
                    />
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script lang="ts">
    export default {
        name: 'Category'
    }
</script>
<script setup lang="ts">
    import { ref, onMounted, watch } from 'vue'
    import type { Categroy, ItemList } from '@/api/product/attr/type.ts'
    import { reqC1, reqC2, reqC3 } from '@/api/product/attr/index.ts'

    let c1List = ref<ItemList[]>([]) //一级分类的数据
    let c2List = ref<ItemList[]>([]) //二级分类的数据
    let c3List = ref<ItemList[]>([]) //三级分类的数据
    let c1Id = ref<number | string>('') //选中的一级分类的id
    let c2Id = ref<number | string>('') //选中的二级级分类的id
    let c3Id = ref<number | string>('') //选中的三级级分类的id
    //组件一挂载完毕就发请求拿到一级分类的数据
    onMounted(async () => {
        let result: Categroy = await reqC1()
        c1List.value = result.data
    })

    //选中一级分类后，去获取二级分类的数据
    const getC2List = async () => {
        let result: Categroy = await reqC2(c1Id.value)
        c2Id.value = ''
        c3Id.value = ''
        c3List.value = []
        c2List.value = result.data
    }
    //选中二级分类后，去获取三级分类的数据
    const getC3List = async () => {
        let result: Categroy = await reqC3(c2Id.value)
        c3Id.value = ''
        c3List.value = result.data
    }

    defineProps(['isshow'])

    let $emit = defineEmits(['sendDate'])

    //监听c3Id数据，如果c3Id有数据就给父组件传递
    watch(c3Id, () => {
        $emit('sendDate', c1Id.value, c2Id.value, c3Id.value)
    })
</script>
<style scoped lang="scss">
    .el-select {
        --el-select-width: 200px;
    }
</style>
