<template>
    <div>
        <el-form label-width="100px">
            <el-form-item label="SKU名称">
                <el-input
                    placeholder="请输入SKU名称"
                    v-model="skuParams.skuName"
                ></el-input>
            </el-form-item>
            <el-form-item label="价格(元)">
                <el-input
                    placeholder="请输入价格(元)"
                    type="number"
                    v-model="skuParams.price"
                ></el-input>
            </el-form-item>
            <el-form-item label="重量(g)">
                <el-input
                    placeholder="请输入重量(g)"
                    v-model="skuParams.weight"
                ></el-input>
            </el-form-item>
            <el-form-item label="SKU描述">
                <el-input
                    placeholder="请输入SKU描述"
                    type="textarea"
                    v-model="skuParams.skuDesc"
                ></el-input>
            </el-form-item>
            <el-form-item label="平台属性">
                <el-form inline>
                    <el-form-item
                        :label="item.attrName"
                        v-for="item in attrArr"
                        :key="item.id"
                    >
                        <el-select
                            placeholder="请选择"
                            v-model="item.attrIdAndValueId"
                        >
                            <el-option
                                :label="item1.valueName"
                                :value="`${item.id}:${item1.id}`"
                                v-for="item1 in item.attrValueList"
                                :item1.id
                            />
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="销售属性">
                <el-form inline>
                    <el-form-item
                        :label="item.saleAttrName"
                        v-for="item in saleAttr"
                        :key="item.id"
                    >
                        <el-select
                            placeholder="请选择"
                            v-model="item.saleIdAndValueId"
                        >
                            <el-option
                                :label="item1.saleAttrValueName"
                                :value="`${item.id}:${item1.id}`"
                                v-for="item1 in item.spuSaleAttrValueList"
                                :key="item1.id"
                            />
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="图片名称">
                <el-table
                    style="width: 100%"
                    border
                    :data="imageList"
                    ref="table"
                >
                    <el-table-column
                        type="selection"
                        width="80px"
                    ></el-table-column>
                    <el-table-column label="图片">
                        <template #="{ row }">
                            <el-image
                                :src="row.imgUrl"
                                fit="cover"
                                :lazy="true"
                                style="height: 100px"
                            ></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="名称"
                        prop="imgName"
                    ></el-table-column>
                    <el-table-column label="操作">
                        <template #="{ row }">
                            <el-button
                                type="warning"
                                size="default"
                                @click="defaultImg(row)"
                            >
                                设置默认
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item style="width: 100%">
                <div class="form-item-content">
                    <el-button type="primary" @click="save">保存</el-button>
                    <el-button type="primary" @click="cancel">取消</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts">
    export default {
        name: 'SkuForm'
    }
</script>
<script setup lang="ts">
    import { reqAttr } from '@/api/product/attr'
    import {
        getImageList,
        getSpuHassaleAttr,
        reqAddSku
    } from '@/api/product/spu'
    import type {
        SpuData,
        SpuHasImg,
        SaleAttrResponseData,
        SpuImg,
        SaleAttr,
        SkuData
    } from '@/api/product/spu/type.ts'
    import type { AttrReqDate, Attr } from '@/api/product/attr/type.ts'
    import { ref, reactive } from 'vue'
    import { ElMessage } from 'element-plus'
    let attrArr = ref<Attr[]>([]) //平台属性
    let imageList = ref<SpuImg[]>([]) //照片墙的数据
    let saleAttr = ref<SaleAttr[]>([]) //销售属性
    let table = ref() //table组件实例

    let skuParams = reactive<SkuData>({
        category3Id: '',
        spuId: '',
        tmId: '',
        skuName: '',
        price: '',
        weight: '',
        skuDesc: '',
        skuAttrValueList: [],
        skuSaleAttrValueList: [],
        skuDefaultImg: ''
    })
    //初始化函数
    const initSku = async (
        c1Id: number | string,
        c2Id: number | string,
        spu: SpuData
    ) => {
        //清空数据
        Object.assign(skuParams, {
            category3Id: '',
            spuId: '',
            tmId: '',
            skuName: '',
            price: '',
            weight: '',
            skuDesc: '',
            skuAttrValueList: [],
            skuSaleAttrValueList: [],
            skuDefaultImg: ''
        })

        let result: AttrReqDate = await reqAttr(c1Id, c2Id, spu.category3Id)
        ;(skuParams.category3Id = spu.category3Id),
            (skuParams.spuId = spu.id as string | number)
        skuParams.tmId = spu.tmId
        let result1: SpuHasImg = await getImageList(spu.id)

        let result2: SaleAttrResponseData = await getSpuHassaleAttr(
            spu.id as number
        )

        attrArr.value = result.data //平台属性
        imageList.value = result1.data //照片墙的数据
        saleAttr.value = result2.data //销售属性
    }

    //自定义事件改变isshow
    const $emit = defineEmits(['skuChangeIsshow'])

    //  点击取消
    const cancel = () => {
        $emit('skuChangeIsshow')
    }

    //设置默认图片
    const defaultImg = (row: any) => {
        skuParams.skuDefaultImg = row.imgUrl
        table.value.clearSelection()
        table.value.toggleRowSelection(row, true)
    }
    //点击保存按钮
    const save = async () => {
        skuParams.skuAttrValueList = attrArr.value.reduce(
            (accumulator: any, current) => {
                if (current.attrIdAndValueId) {
                    let [attrId, valueId] = current.attrIdAndValueId.split(':')

                    accumulator.push({
                        attrId,
                        valueId
                    })
                }
                return accumulator
            },
            []
        )

        skuParams.skuSaleAttrValueList = saleAttr.value.reduce(
            (accumulator: any, current) => {
                if (current.saleIdAndValueId) {
                    let [saleAttrId, saleAttrValueId] =
                        current.saleIdAndValueId.split(':')

                    accumulator.push({
                        saleAttrId,
                        saleAttrValueId
                    })
                }
                return accumulator
            },
            []
        )

        await reqAddSku(skuParams)
        ElMessage.success('添加sku成功')
        $emit('skuChangeIsshow')
    }
    defineExpose({ initSku })
</script>
<style scoped lang="scss">
    .el-select {
        width: 200px;
    }
    .form-item-content {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        height: 100%; /* 根据需要设置高度 */
        width: calc(100% - 100px);
    }
</style>
