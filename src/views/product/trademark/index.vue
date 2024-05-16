<template>
    <div>
        <el-card>
            <el-button type="primary" icon="Plus" @click="addTradeMark">
                添加品牌
            </el-button>

            <el-table stripe style="width: 100%;margin: 10px 0 " :data="tardeMarkList" border>
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
                            @click="updateTardeMark(scope.row)"
                        ></el-button>

                        <el-popconfirm
                            :title="`确定删除${scope.row.tmName}吗？`"
                            width="266px"
                            icon="Delete"
                            @confirm="confirmDelete(scope.row.id)"
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

            <!-- 分页器 -->
            <el-pagination
                v-model:current-page="pageNo"
                v-model:page-size="limit"
                :page-sizes="[3, 5, 7, 9]"
                :background="true"
                layout="prev, pager, next, jumper, ->, sizes,total"
                :total="total"
                @current-change="getTardeMark"
                @size-change="changeLimit"
            />
        </el-card>

        <el-dialog
            v-model="dialogVisible"
            :title="tardeMark.id ? '修改品牌' : '新增品牌'"
        >
            <el-form
                ref="form"
                label-width="80px"
                label-position="left"
                style="width: 80%"
                :rules="rules"
                :model="tardeMark"
            >
                <el-form-item label="品牌名称" prop="tmName">
                    <el-input
                        placeholder="请输入品牌名称"
                        v-model="tardeMark.tmName"
                    ></el-input>
                </el-form-item>
                <el-form-item label="品牌LOGO" prop="logoUrl">
                    <el-upload
                        :action="`${VITE_APP_BASE_API}/admin/product/fileUpload`"
                        class="avatar-uploader"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        :headers="{ token: userStore.token }"
                    >
                        <img
                            v-if="tardeMark.logoUrl"
                            :src="tardeMark.logoUrl"
                            class="avatar"
                        />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="confirm">确认</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script lang="ts">
    export default {
        name: 'TradeMark'
    }
</script>
<script setup lang="ts">

    import {
        reqTardeMark,
        reqAddOrUpdateTardeMark,
        reqDeleteTardeMark
    } from '@/api/product/tardemark/index.ts'
    import { ref, onMounted, reactive, nextTick } from 'vue'
    import type { UploadProps } from 'element-plus'
    import { ElMessage } from 'element-plus'
    import type {
        TardemarkBack,
        records
    } from '@/api/product/tardemark/type.ts'
    import useUserStore from '@/store/user'
    const userStore = useUserStore()
    let pageNo = ref<number>(1) //第几页
    let limit = ref<number>(3) //每一页展示几条数据
    let total = ref<number>(0) //总共多少条数据
    let tardeMarkList = ref<records[]>([]) //所有品牌的list
    let dialogVisible = ref<boolean>(false) //控制新增品牌页面的显示与隐藏
    let tardeMark = reactive<records>({
        //品牌的数据
        tmName: '',
        logoUrl: ''
    })
    let VITE_APP_BASE_API = import.meta.env.VITE_APP_BASE_API
    let form = ref()
    //挂在完成就发请求拿数据并展示
    onMounted(() => {
        getTardeMark()
    })

    //获取品牌的数据
    const getTardeMark = async (page = 1) => {
        pageNo.value = page
        let res: TardemarkBack = await reqTardeMark(pageNo.value, limit.value)
        tardeMarkList.value = res.data.records

        total.value = res.data.total
    }

    //改变每一页展示几条数据
    const changeLimit = () => {
        getTardeMark()
    }

    //点击新增品牌按钮
    const addTradeMark = () => {
        tardeMark.id = 0
        tardeMark.logoUrl = ''
        tardeMark.tmName = ''
        dialogVisible.value = true

        //清除表单的错误验证信息 第一种写法
        //form.value?.clearValidate()

        /* 清除表单的错误验证信息 第二种写法 */
        nextTick(() => {
            form.value.clearValidate()
        })
    }

    //点击确认按钮
    const confirm = async () => {
        await form.value.validate()
        let res: any = await reqAddOrUpdateTardeMark(tardeMark)
        ElMessage.success(res.message)
        getTardeMark(tardeMark.id ? pageNo.value : 1)
        dialogVisible.value = false
    }

    //上传前的校验
    const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
        const filesType: string[] = ['image/jpeg', 'image/png', 'image/gif'] //允许上传的文件类型
        const filesSize: number = 4 //允许上传的文件大小，单位为M
        if (
            filesType.includes(rawFile.type) &&
            filesSize / 1024 / 1024 < filesSize
        ) {
            return true
        } else {
            ElMessage.error(`文件类型必须为JPG或PNG或GIF且文件大小必须小于4M`)
            return false
        }
    }
    //上传成功的回调
    const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
        tardeMark.logoUrl = response.data
        //清楚图片的表单校验
        form.value.clearValidate('logoUrl')
    }

    //点击修改按钮
    const updateTardeMark = (row: records) => {
        // form.value?.clearValidate() //清除表单的错误验证信息
        nextTick(() => {
            form.value.clearValidate()
        })
        dialogVisible.value = true

        Object.assign(tardeMark, row)
    }

    //图片的校验规则
    const validateLogoUrl = (_rule: any, value: any, callback: any) => {
        if (value) {
            callback()
        } else {
            callback(new Error('请选择图片！'))
        }
    }

    //表单校验
    const rules = reactive({
        tmName: [
            {
                required: true,
                min: 2,
                max: 20,
                message: '品牌名应在2-10个字符之间！',
                trigger: 'blur'
            }
        ],
        logoUrl: [
            {
                required: true,
                validator: validateLogoUrl
            }
        ]
    })

    //品牌删除点击确认删除
    const confirmDelete = async (id: number) => {

        await reqDeleteTardeMark(id)
        ElMessage.success('删除品牌成功！')

        //删除成功重新发请求拿数据，如果删除的是最后一个那进入前一页，如果删除的不是最后一个在当前页
        getTardeMark(
            tardeMarkList.value.length === 1 ? pageNo.value - 1 : pageNo.value
        )
    }
</script>

<style scoped>
    .avatar-uploader .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
    }

    .avatar-uploader .el-upload:hover {
        border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
    }
</style>
