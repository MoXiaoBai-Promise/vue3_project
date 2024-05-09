<template>
    <Category @sendDate="getCId" :isshow="isshow" />
    <el-card style="margin: 10px 0">
        <div v-show="isshow === 0">
            <el-button
                type="primary"
                icon="Plus"
                style="margin-bottom: 10px"
                :disabled="!c3Id"
                @click="addAttr"
            >
                添加属性
            </el-button>
            <el-table :data="attrList" stripe style="width: 100%" border>
                <el-table-column
                    type="index"
                    width="50"
                    label="序号"
                    align="center"
                />
                <el-table-column prop="attrName" label="属性名称" width="120" />
                <el-table-column label="属性值名称">
                    <template #default="scope">
                        <el-tag
                            type="primary"
                            v-for="item in scope.row.attrValueList"
                            :key="item.id"
                        >
                            {{ item.valueName }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120">
                    <template #default="scope">
                        <el-button
                            size="small"
                            icon="EditPen"
                            type="warning"
                            @click="updateAttr"
                        ></el-button>
                        <el-button
                            size="small"
                            type="danger"
                            icon="Delete"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-show="isshow === 1">
            <el-form :inline="true">
                <el-form-item label="属性名称" >
                        <el-input placeholder="请输入属性名称" clearable></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" icon="Plus">添加属性值</el-button>
            <el-table  style="margin: 10px 0" border>
                <el-table-column label="序号" type="index" width="80"></el-table-column>
                <el-table-column label="属性值名称" ></el-table-column>
                <el-table-column label="属性值操作" ></el-table-column>
            </el-table>
            <el-button type="primary" >保存</el-button>
            <el-button type="primary" @click="isshow = 0" >取消</el-button>
        </div>
    </el-card>
</template>
<script lang="ts">
    export default {
        name: 'Attr'
    }
</script>
<script setup lang="ts">
    import { reqAttr } from '@/api/product/attr/index.ts'
    import { ref,reactive } from 'vue'
    import type { Attr } from '@/api/product/attr/type.ts'
    let c1Id = ref<number | string>('') //选中的一级分类的id
    let c2Id = ref<number | string>('') //选中的二级级分类的id
    let c3Id = ref<number | string>('') //选中的三级级分类的id
    let isshow = ref<number>(0)
    let attrList = ref<Attr[]>([]) //属性的数组

    let attrData = reactive<Attr>({
        attrNanme:'',
        attrValueList:[],
        categoryId: '' ,
        categoryLevel:3

    })
    const getCId = async (
        c1: number | string,
        c2: number | string,
        c3: number | string
    ) => {
        c1Id.value = c1
        c2Id.value = c2
        c3Id.value = c3

        //如果有三级分类，拿到数据展示
        if (c3) {
            let result = await reqAttr(c1, c2, c3)
            attrList.value = result.data
        } else {
            //如果没有有三级分类，页面清空
            attrList.value = []
        }
    }
    //添加属性
    const addAttr = ()=>{
        isshow.value = 1
    }

    //修改属性
    const updateAttr = ()=>{
        isshow.value = 1
    }
</script>
<style scoped lang="scss"></style>
