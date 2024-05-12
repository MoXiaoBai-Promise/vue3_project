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
                            @click="updateAttr(scope.row)"
                        ></el-button>

                        <el-popconfirm
                            :title="`确定删除${scope.row.attrName}吗？`"
                            width="266px"
                            icon="Delete"
                            @confirm="removeAttr(scope.row.id)"
                        >
                            <template #reference>
                                <el-button
                                    size="small"
                                    type="danger"
                                    icon="Delete"
                                ></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-show="isshow === 1">
            <el-form :inline="true">
                <el-form-item label="属性名称">
                    <el-input
                        placeholder="请输入属性名称"
                        clearable
                        v-model="attrData.attrName"
                    ></el-input>
                </el-form-item>
            </el-form>
            <el-button
                type="primary"
                icon="Plus"
                :disabled="!attrData.attrName"
                @click="addAttrValueList"
            >
                添加属性值
            </el-button>
            <el-table
                style="margin: 10px 0"
                border
                :data="attrData.attrValueList"
            >
                <el-table-column
                    label="序号"
                    type="index"
                    width="80"
                ></el-table-column>
                <el-table-column label="属性值名称" prop="valueName">
                    <template #="scope">
                        <el-input
                            :ref="(vc:any)=>inputArr[scope.$index] = vc"
                            v-model="scope.row.valueName"
                            placeholder="请输入属性值名称"
                            clearable
                            size="small"
                            @blur="inputBlur(scope)"
                            v-if="scope.row.flag"
                        ></el-input>
                        <div v-else @click="clickDiv(scope.row, scope.$index)">
                            {{ scope.row.valueName }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="属性值操作">
                    <template #="scope">
                        <el-button
                            type="danger"
                            icon="Delete"
                            size="small"
                            @click="deleteValueList(scope.$index)"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button
                type="primary"
                @click="save"
                :disabled="attrData.attrValueList.length > 0 ? false : true"
            >
                保存
            </el-button>
            <el-button type="primary" @click="isshow = 0">取消</el-button>
        </div>
    </el-card>
</template>
<script lang="ts">
    export default {
        name: 'Attr'
    }
</script>
<script setup lang="ts">
    import {
        reqAttr,
        reqAddOrUpdateAttr,
        reqRemoveAttr
    } from '@/api/product/attr/index.ts'
    import { ref, reactive, nextTick } from 'vue'
    import type { Attr } from '@/api/product/attr/type.ts'
    import { ElMessage } from 'element-plus'
    let c1Id = ref<number | string>('') //选中的一级分类的id
    let c2Id = ref<number | string>('') //选中的二级级分类的id
    let c3Id = ref<number | string>('') //选中的三级级分类的id
    let isshow = ref<number>(0)
    let attrList = ref<Attr[]>([]) //属性的数组
    let inputArr = ref<any[]>([]) //存储input组件实例
    let attrData = reactive<Attr>({ //属性的所有数据
        attrName: '',
        attrValueList: [],
        categoryId: '',
        categoryLevel: 3
    })
    const getCId = async ( //拿到三级联动的id
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
    const addAttr = () => {
        Object.assign(attrData, {
            attrName: '',
            attrValueList: [],
            categoryId: '',
            categoryLevel: 3,
            id:''
        })
        isshow.value = 1
    }

    //修改属性
    const updateAttr = (row: Attr) => {
        //此处必须深拷贝
        Object.assign(attrData, JSON.parse(JSON.stringify(row)))

        isshow.value = 1
    }

    //点击属性值名称向attrValueList添加数据
    const addAttrValueList = () => {
        attrData.attrValueList.push({
            valueName: '',
            flag: true //控制每一个属性值编辑模式与切换模式的切换
        })

        nextTick(() => {
            inputArr.value[attrData.attrValueList.length - 1].focus()
        })
    }
    //保存按钮，收集数据，发请求
    const save = async () => {
        attrData.categoryId = c3Id.value
        await reqAddOrUpdateAttr(attrData)
        ElMessage.success(attrData.id ? '修改属性成功！' : '添加属性成功！')
        getCId(c1Id.value, c2Id.value, c3Id.value)
        isshow.value = 0
    }

    //属性值名称失去焦点事件
    const inputBlur = (scope: any) => {
        //属性值名称不允许为空
        if (scope.row.valueName.trim() == '') {
            ElMessage.error('属性值名称为空，不允许添加！')
            attrData.attrValueList.splice(scope.$index, 1)
            return
        }

        //属性值不允许重复start
        const verify: string[] = attrData.attrValueList.map(
            (item) => item.valueName
        )

        if (
            Array.from(new Set(verify)).length !== attrData.attrValueList.length
        ) {
            ElMessage.error('属性值名称重复，不允许添加！')
            attrData.attrValueList.splice(scope.$index, 1)
            return
        }
        //属性值不允许重复end

        scope.row.flag = false
    }

    //点击div的时候的触发事件
    const clickDiv = (row: any, index: number) => {
        row.flag = true
        //不能直接拿到组件实例，要确定dom更新之后再去拿
        nextTick(() => {
            inputArr.value[index].focus()
        })
    }

    //删除属性值
    const deleteValueList = (index: number) => {
        attrData.attrValueList.splice(index, 1)
    }

    //删除属性
    const removeAttr = async (attrId: number) => {
        await reqRemoveAttr(attrId)
        ElMessage.success("删除属性成功！")
        getCId(c1Id.value, c2Id.value, c3Id.value)
        
    }
</script>
<style scoped lang="scss"></style>
