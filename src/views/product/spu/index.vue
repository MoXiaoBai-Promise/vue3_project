<template>
    <div>
        <Category @sendDate="getCId" :isshow="isshow" />
        <el-card style="margin: 10px 0">
            <div v-show="isshow == 0">
                <el-button
                    type="primary"
                    icon="Plus"
                    :disabled="c3Id ? false : true"
                    @click="addSpu"
                >
                    添加SPU
                </el-button>
                <el-table
                    style="width: 100%; margin: 10px 0"
                    border
                    :data="recordes"
                    show-overflow-tooltip
                >
                    <el-table-column
                        label="序号"
                        type="index"
                        width="80px"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        label="SPU名称"
                        prop="spuName"
                    ></el-table-column>
                    <el-table-column
                        label="SPU描述"
                        prop="description"
                    ></el-table-column>
                    <el-table-column label="操作">
                        <template #="{ row }">
                            <el-button
                                type="primary"
                                icon="Plus"
                                size="small"
                                title="添加SKU"
                            ></el-button>
                            <el-button
                                type="warning"
                                icon="Edit"
                                size="small"
                                title="修改SPU"
                                @click="updateSpu(row)"
                            ></el-button>
                            <el-button
                                type="info"
                                icon="View"
                                size="small"
                                title="查看SKU列表"
                            ></el-button>
                            <el-button
                                type="danger "
                                icon="Delete"
                                size="small"
                                title="删除SPU"
                            ></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    v-model:current-page="pageNo"
                    v-model:page-size="limit"
                    :page-sizes="[3, 5, 7, 9]"
                    :background="true"
                    layout="prev, pager, next, jumper, ->, sizes,total"
                    :total="total"
                    @current-change="getSpu"
                    @size-change="changeLimit"
                />
            </div>
            <!-- 添加|修改Sku -->
            <SpuForm
                v-show="isshow === 1"
                @changeIsshow="changeIsshow"
                ref="spu"
            />
            <!-- 添加Sku -->
            <SkuForm v-show="isshow === 2" />
        </el-card>
    </div>
</template>
<script lang="ts">
    export default {
        name: 'Attr'
    }
</script>
<script setup lang="ts">
    import SkuForm from './skuForm.vue'
    import SpuForm from './spuForm.vue'
    import { ref } from 'vue'
    import { reqGetSpu } from '@/api/product/spu'
    import type {
        HasSpuResponseData,
        Records,
        SpuData
    } from '@/api/product/spu/type.ts'
    let c1Id = ref<number | string>('') //选中的一级分类的id
    let c2Id = ref<number | string>('') //选中的二级级分类的id
    let c3Id = ref<number | string>('') //选中的三级级分类的id
    let pageNo = ref<number>(1) //分页器页码
    let limit = ref<number>(3) //每页展示几条数据
    let recordes = ref<Records>([]) //已有spu的数据
    let total = ref<number>(0)
    let isshow = ref<number>(0) //0：显示已有spu ，1：添加或修改spu，2：添加sku
    let spu = ref() //spuForm组件实例
    const getCId = async (
        //拿到三级联动的id
        c1: number | string,
        c2: number | string,
        c3: number | string
    ) => {
        c1Id.value = c1
        c2Id.value = c2
        c3Id.value = c3

        if (!c3) return

        getSpu()
    }

    //获取SPU的数据
    const getSpu = async (page = 1) => {
        pageNo.value = page
        let result: HasSpuResponseData = await reqGetSpu(
            pageNo.value,
            limit.value,
            c3Id.value
        )
        recordes.value = result.data.records
        total.value = result.data.total
    }

    //改变每一页展示几条数据
    const changeLimit = () => {
        getSpu()
    }

    //添加SPU按钮
    const addSpu = () => {
        isshow.value = 1
        spu.value.initAdd(c3Id.value)
    }
    //修改SPU
    const updateSpu = (row: SpuData) => {
        isshow.value = 1
        spu.value.initUpdate(row)
    }
    //子组件修改isshow自定义事件的回调
    const changeIsshow = (scene: string) => {
        isshow.value = 0
        getSpu(scene == 'update' ? pageNo.value : 1)
    }
</script>
<style scoped lang="scss"></style>
