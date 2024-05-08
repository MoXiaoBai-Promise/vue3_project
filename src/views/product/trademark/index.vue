<template>
    <div>
        <el-card>
            <el-button type="primary" @click="" icon="Plus">添加品牌</el-button>

            <el-table stripe style="width: 100%" :data="tardeMarkList" border>
                <el-table-column
                    label="序号"
                    width="60px"
                    align="center"
                    type="index"
                ></el-table-column>
                <el-table-column
                    label="品牌名称"
                    prop="tmName"
                ></el-table-column>
                <el-table-column label="品牌LOGO">
                    <template #default="scope">
                        <img
                            :src="scope.row.logoUrl"
                            style="width: 60px; height: 60px"
                        />
                    </template>
                </el-table-column>
                <el-table-column label="品牌操作">
                    <template #default="scope">
                        <el-button
                            size="small"
                            icon="EditPen"
                            type="warning"
                        >
                        </el-button>
                        <el-button
                            size="small"
                            type="danger"
                            icon="Delete"
                        >
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页器 -->
            <el-pagination
                v-model:current-page="pageNo"
                v-model:page-size="limit"
                :page-sizes="[3, 5, 7, 9]"
                :background="true"
                layout="prev, pager, next, jumper, ->, sizes,total"
                :total="total"
            />
        </el-card>
    </div>
</template>
<script lang="ts">
    export default {
        name: 'TradeMark'
    }
</script>
<script setup lang="ts">
    import { reqTardeMark } from '@/api/product/tardemark/index.ts'
    import { ref, onMounted, reactive } from 'vue'
    let pageNo = ref<number>(1) //第几页
    let limit = ref<number>(3) //每一页展示几条数据
    let total = ref<number>(0) //总共多少条数据
    let tardeMarkList = ref([])
    const getTardeMark = async () => {
        let res = await reqTardeMark(pageNo.value, limit.value)
        tardeMarkList.value = res.data.records

        total.value = res.data.total
    }
    onMounted(() => {
        getTardeMark()
    })
</script>
<style scoped lang="scss"></style>
