<template>
    <div>
        <el-table border stripe style="margin: 10px 0" :data="skuArr">
            <el-table-column
                type="index"
                width="50"
                label="序号"
                align="center"
            />
            <el-table-column
                label="名称"
                width="200"
                show-overflow-tooltip
                prop="skuName"
            ></el-table-column>
            <el-table-column
                label="描述"
                width="200"
                show-overflow-tooltip
                prop="skuDesc"
            ></el-table-column>
            <el-table-column label="图片" width="150">
                <template #="{ row }">
                    <el-image
                        :src="row.skuDefaultImg"
                        fit="cover"
                        :lazy="true"
                        style="height: 100px"
                    ></el-image>
                </template>
            </el-table-column>
            <el-table-column
                label="重量"
                width="150"
                prop="weight"
            ></el-table-column>
            <el-table-column
                label="价格"
                width="150"
                prop="price"
            ></el-table-column>
            <el-table-column
                label="操作"
                width="250"
                fixed="right"
                align="center"
            >
                <template #="{ row }">
                    <el-button
                        :type="row.isSale == 1 ? 'info' : 'success'"
                        size="small"
                        :icon="row.isSale == 1 ? 'Bottom' : 'Top'"
                        @click="updateSale(row)"
                    ></el-button>
                    <el-button
                        type="info"
                        size="small"
                        icon="InfoFilled"
                        @click="drawerInfo(row)"
                    ></el-button>

                    <el-popconfirm
                        :title="`确定删除${row.skuName}吗？`"
                        width="266px"
                        icon="Delete"
                        @confirm="removeSku(row.id)"
                    >
                        <template #reference>
                            <el-button
                                type="danger"
                                size="small"
                                icon="Delete"
                            ></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="limit"
            :page-sizes="[10, 20, 50, 100]"
            :background="true"
            layout="prev, pager, next, jumper, ->, sizes,total"
            :total="total"
            small
            @current-change="getSku"
            @size-change="changeLimit"
        />

        <!-- 抽屉 -->
        <el-drawer v-model="drawer">
            <template #header>
                <h4>查看商品详情</h4>
            </template>
            <template #default>
                <el-row>
                    <el-col :span="6">名称</el-col>
                    <el-col :span="18">{{ skuInfo.skuName }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">描述</el-col>
                    <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">价格</el-col>
                    <el-col :span="18">{{ skuInfo.price }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">平台属性</el-col>
                    <el-col :span="18">
                        <el-tag
                            type="danger"
                            size="small"
                            :key="item.id"
                            v-for="item in skuInfo.skuAttrValueList"
                        >
                            {{ item.attrName }}
                        </el-tag>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">销售属性</el-col>
                    <el-col :span="18">
                        <el-tag
                            type="success"
                            size="small"
                            v-for="item in skuInfo.skuSaleAttrValueList"
                            :key="item.id"
                        >
                            {{ item.saleAttrName }}
                        </el-tag>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">商品图片</el-col>
                    <el-col :span="18">
                        <el-carousel
                            :interval="4000"
                            type="card"
                            height="200px"
                        >
                            <el-carousel-item
                                v-for="item in skuInfo.skuImageList"
                                :key="item.id"
                            >
                                <img
                                    :src="item.imgUrl"
                                    style="width: 100%; height: 100%"
                                />
                            </el-carousel-item>
                        </el-carousel>
                    </el-col>
                </el-row>
            </template>
        </el-drawer>
    </div>
</template>
<script lang="ts">
    export default {
        name: 'Sku'
    }
</script>
<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import {
        reqSkuList,
        reqSaleSku,
        reqOutSaleSku,
        reqInfoSku,
        reqRemoveSku
    } from '@/api/product/sku'
    import type { SkuBackData, SkuData } from '@/api/product/sku/type'
    import { ElMessage } from 'element-plus'
    let pageNo = ref(0)
    let limit = ref(10)
    let skuArr = ref<SkuData[]>([])
    let total = ref<number>(0)
    let drawer = ref<boolean>(false)
    let skuInfo = ref<any>({})
    onMounted(() => {
        getSku()
    })
    //获取表格数据
    const getSku = async (pager = 1) => {
        pageNo.value = pager
        let result: SkuBackData = await reqSkuList(pageNo.value, limit.value)
        console.log(result)

        total.value = result.data.total
        skuArr.value = result.data.records
    }

    const changeLimit = () => {
        getSku()
    }

    //上架|下架
    const updateSale = async (row: SkuData) => {
        if (row.isSale == 1) {
            await reqOutSaleSku(row.id as number)
            ElMessage.success('商品下架成功')
        } else {
            await reqSaleSku(row.id as number)
            ElMessage.success('商品上架架成功')
        }
        getSku(pageNo.value)
    }

    //点击查看sku
    const drawerInfo = async (row: any) => {
        let result = await reqInfoSku(row.id)
        console.log(result)
        skuInfo.value = result.data
        drawer.value = true
    }

    //删除sku
    const removeSku = async (id: number) => {
        await reqRemoveSku(id)
        ElMessage.success('删除成功！')
        getSku(skuArr.value.length == 1 ? pageNo.value - 1 : pageNo.value)
    }
</script>
<style scoped lang="scss">
    .el-row {
        margin: 10px 0;
    }
    .el-tag {
        margin: 5px;
    }
    .el-carousel__item h3 {
        color: #475669;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
        text-align: center;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
    }
</style>
