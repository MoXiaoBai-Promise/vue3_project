<template>
    <el-table
        :data="allPermissionList"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
    >
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="code" label="权限值" />
        <el-table-column prop="updateTime" label="修改时间" />
        <el-table-column label="操作">
            <template #="{ row }">
                <el-button
                    type="primary"
                    size="small"
                    @click="addPermission(row)"
                    :disabled="row.level === 4"
                >
                    {{ row.level === 3 ? '添加功能' : '添加菜单' }}
                </el-button>
                <el-button
                    type="primary"
                    size="small"
                    @click="updatePermission(row)"
                    :disabled="row.level === 1"
                >
                    编辑
                </el-button>

                <el-popconfirm
                    :title="`确定删除${row.name}吗？`"
                    width="266px"
                    icon="Delete"
                    @confirm="deleteMenu(row)"
                >
                    <template #reference>
                        <el-button
                            type="primary"
                            size="small"
                            @click=""
                            :disabled="row.level === 1"
                        >
                            删除
                        </el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog
        v-model="dialogVisible"
        :title="`${dialogForm.id ? '修改菜单' : '添加菜单'}`"
    >
        <el-form label-width="60" label-position="left">
            <el-form-item label="名称">
                <el-input v-model="dialogForm.name"></el-input>
            </el-form-item>
            <el-form-item label="权限值">
                <el-input v-model="dialogForm.code"></el-input>
            </el-form-item>
        </el-form>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="confirm">确认</el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script lang="ts">
    export default {
        name: 'Permission'
    }
</script>
<script setup lang="ts">
    import {
        reqAllPermission,
        addOrUpdateMenu,
        reqDeleteMenu
    } from '@/api/acl/permission'
    import type {
        PermisstionResponseData,
        Permisstion,
        MenuParams
    } from '@/api/acl/permission/type'
    import { ElMessage } from 'element-plus'
    import { ref, onMounted } from 'vue'
    let allPermissionList = ref<Permisstion[]>([])
    let dialogVisible = ref<boolean>(false)
    let dialogForm = ref<MenuParams>({
        code: '', //权限数值
        level: 0, //几级菜单
        name: '', //菜单的名字
        pid: 0 //菜单的ID
    })
    const init = async () => {
        let result: PermisstionResponseData = await reqAllPermission()

        allPermissionList.value = result.data
    }
    onMounted(() => {
        init()
    })
    //添加菜单
    const addPermission = (row: Permisstion) => {
        dialogForm.value = {
            code: '', //权限数值
            level: 0, //几级菜单
            name: '', //菜单的名字
            pid: 0 //菜单的ID
        }

        dialogVisible.value = true
        dialogForm.value.level = row.level + 1
        dialogForm.value.pid = row.id as number
    }
    //修改菜单
    const updatePermission = (row: Permisstion) => {
        dialogVisible.value = true
        Object.assign(dialogForm.value, row)
    }

    //添加或编辑菜单确认按钮
    const confirm = async () => {
        await addOrUpdateMenu(dialogForm.value)
        dialogVisible.value = false
        ElMessage.success(
            dialogForm.value.id ? '修改菜单成功' : '添加菜单成功！'
        )
        init()
    }
    //删除菜单
    const deleteMenu = async (row: Permisstion) => {
        await reqDeleteMenu(row.id as number)
        ElMessage.success('删除成功！')
        init()
    }
</script>
<style scoped lang="scss"></style>
