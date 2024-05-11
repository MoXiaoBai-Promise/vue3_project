<template>
    <div>
        <el-form label-width="100px">
            <el-form-item label="SPU名称">
                <el-input
                    placeholder="请输入SPU名称"
                    v-model="spuData.spuName"
                ></el-input>
            </el-form-item>
            <el-form-item label="SPU品牌">
                <el-select
                    placeholder="请选择SPU品牌"
                    style="width: 260px"
                    v-model="spuData.tmId"
                >
                    <el-option
                        v-for="item in allTradeMark"
                        :key="item.id"
                        :label="item.tmName"
                        :value="item.id"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="SPU描述">
                <el-input
                    type="textarea"
                    placeholder="请输入SPU描述"
                    v-model="spuData.description"
                />
            </el-form-item>
            <el-form-item label="SPU照片">
                <el-upload
                    v-model:file-list="imgList"
                    :action="`${VITE_APP_BASE_API}/admin/product/fileUpload`"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :before-upload="handlerUpload"
                >
                    <el-icon><Plus /></el-icon>
                </el-upload>

                <el-dialog v-model="dialogVisible">
                    <img
                        w-full
                        :src="dialogImageUrl"
                        alt="Preview Image"
                        style="width: 100%; height: 100%"
                    />
                </el-dialog>
            </el-form-item>
            <el-form-item label="SPU销售属性">
                <el-select
                    :placeholder="
                        filterSaleAttr.length == 0
                            ? `无`
                            : `还剩${filterSaleAttr.length}个没选择`
                    "
                    style="width: 260px"
                    v-model="noneSaleAttr"
                >
                    <el-option
                        :label="item.name"
                        v-for="item in filterSaleAttr"
                        :key="item.id"
                        :value="`${item.id}:${item.name}`"
                    />
                </el-select>
                <el-button
                    type="primary"
                    icon="Plus"
                    style="margin-left: 5px"
                    :disabled="!noneSaleAttr"
                    @click="addSpuHassaleAttr"
                >
                    添加销售属性
                </el-button>
                <el-table
                    style="width: 100%; margin: 10px 0"
                    border
                    :data="spuHassaleAttr"
                >
                    <el-table-column
                        label="序号"
                        type="index"
                        width="80px"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        label="销售属性名"
                        width="120px"
                        prop="saleAttrName"
                    ></el-table-column>
                    <el-table-column label="销售属性值">
                        <template #="{ row }">
                            <el-tag
                                v-for="tag in row.spuSaleAttrValueList"
                                :key="tag.id"
                                closable
                                style="margin: 0 5px"
                            >
                                {{ tag.saleAttrValueName }}
                            </el-tag>
                            <el-button
                                type="primary"
                                size="small"
                                icon="Plus"
                            ></el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120px" align="center">
                        <template #="{ $index }">
                            <el-button
                                type="danger"
                                size="small"
                                icon="Delete"
                                @click="spuHassaleAttr.splice($index, 1)"
                            ></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">保存</el-button>
                <el-button type="primary" @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts">
    export default {
        name: 'SpuForm'
    }
</script>
<script setup lang="ts">
    import type { SpuData } from '@/api/product/spu/type.ts'
    import {
        getAllTradeMark,
        getImageList,
        getSpuHassaleAttr,
        getAllSaleAttr
    } from '@/api/product/spu'
    import type {
        AllTradeMark,
        SpuHasImg,
        SaleAttrResponseData,
        HasSaleAttrResponseData,
        Trademark,
        SpuImg,
        SaleAttr,
        HasSaleAttr
    } from '@/api/product/spu/type'
    import { ElMessage } from 'element-plus'
    import { computed, ref } from 'vue'
    const $emit = defineEmits(['changeIsshow'])

    let allTradeMark = ref<Trademark[]>([]) //全部品牌的数据
    let imgList = ref<SpuImg[]>([]) //图片list
    let spuHassaleAttr = ref<SaleAttr[]>([]) //已有的spu的销售属性
    let allSaleAttr = ref<HasSaleAttr[]>([]) //SPU下全部的销售属性
    let spuData = ref<SpuData>({
        //spu的数据
        category3Id: '', //收集三级分类的ID
        spuName: '', //SPU的名字
        description: '', //SPU的描述
        tmId: '', //品牌的ID
        spuImageList: [],
        spuSaleAttrList: []
    })
    let dialogVisible = ref<boolean>(false) //照片放大的显示与隐藏
    let dialogImageUrl = ref<string>('') //图片预览的url
    let noneSaleAttr = ref<string>('') //选择还未收集的销售属性
    const VITE_APP_BASE_API = import.meta.env.VITE_APP_BASE_API
    //初始化函数
    const init = async (spu: SpuData) => {
        spuData.value = spu
        //获取全部品牌的数据
        let result: AllTradeMark = await getAllTradeMark()
        allTradeMark.value = result.data

        //获取图片list
        let result1: SpuHasImg = await getImageList(spu.id)
        imgList.value = result1.data.map((item) => {
            return {
                name: item.imgName,
                url: item.imgUrl
            }
        })

        //获取已有的spu的销售属性
        let result2: SaleAttrResponseData = await getSpuHassaleAttr(
            spu.id as number
        )
        spuHassaleAttr.value = result2.data

        //获取某一个SPU下全部的已有的销售属性
        let result3: HasSaleAttrResponseData = await getAllSaleAttr()
        allSaleAttr.value = result3.data
    }

    //照片预览钩子
    const handlePictureCardPreview = (file: any) => {
        dialogImageUrl.value = file.url
        dialogVisible.value = true
    }
    //文件上传约束
    const handlerUpload = (file: any) => {
        const filesType: string[] = ['image/jpeg', 'image/png', 'image/gif'] //允许上传的文件类型

        if (filesType.includes(file.type)) {
            return true
        } else {
            ElMessage.error(`文件类型必须为JPG或PNG或GIF类型！`)
            return false
        }
    }
    let filterSaleAttr = computed(() => {
        let saleAttr = allSaleAttr.value.filter((item) => {
            return spuHassaleAttr.value.every((item1) => {
                return item.name != item1.saleAttrName
            })
        })
        return saleAttr
    })

    //添加销售属性
    const addSpuHassaleAttr = () => {
        const [baseSaleAttrId, saleAttrName] = noneSaleAttr.value.split(':')
        spuHassaleAttr.value.push({
            baseSaleAttrId,
            saleAttrName,
            spuSaleAttrValueList: []
        })
        //清空数据
        noneSaleAttr.value = ''
    }
    //点击取消按钮
    const cancel = () => {
        $emit('changeIsshow')
    }
    defineExpose({ init })
</script>
<style scoped lang="scss"></style>
