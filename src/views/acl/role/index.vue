<template>
    <div>
        <el-card>
            <el-form :inline="true" id="top-from">
                <el-form-item label="角色名称">
                    <el-input v-model="roleName"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        size="default"
                        :disabled="!roleName"
                        @click="getAllRole()"
                    >
                        搜索
                    </el-button>
                    <el-button size="default" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card style="margin: 10px 0">
            <el-button
                type="primary"
                size="default"
                icon="Plus"
                @click="addRole"
            >
                添加角色
            </el-button>
            <el-table border stripe style="margin: 10px 0" :data="allRoleList">
                <el-table-column
                    type="index"
                    width="50"
                    align="center"
                    label="#"
                />
                <el-table-column label="id" prop="id"></el-table-column>
                <el-table-column
                    label="角色名称"
                    show-overflow-tooltip
                    prop="roleName"
                ></el-table-column>
                <el-table-column
                    label="创建时间"
                    prop="createTime"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                    label="更新时间"
                    prop="updateTime"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column label="操作" width="350" align="center">
                    <template #="{ row }">
                        <el-button
                            type="primary"
                            size="default"
                            @click="privileges(row)"
                            icon="User"
                        >
                            分配权限
                        </el-button>
                        <el-button
                            type="success "
                            size="default"
                            @click="updateRole(row)"
                            icon="Edit"
                        >
                            编辑
                        </el-button>
                        <el-button
                            type="danger "
                            size="default"
                            @click=""
                            icon="Delete"
                        >
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination
                v-model:current-page="pageNo"
                v-model:page-size="limit"
                :page-sizes="[3, 7, 9]"
                :background="true"
                layout="prev, pager, next, jumper, ->, sizes,total"
                :total="total"
                @current-change="getAllRole"
                @size-change="getAllRole(1)"
            />
        </el-card>
        <el-dialog
            v-model="dialogIsshow"
            width="40%"
            style="height: 200px"
            :title="`${roleData.id ? '修改角色' : '添加角色'}`"
        >
            <el-form :model="roleData" :rules="rules" ref="form">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input
                        v-model="roleData.roleName"
                        placeholder="请输入角色名称"
                    ></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button size="default" @click="dialogIsshow = false">
                    取消
                </el-button>
                <el-button type="primary" size="default" @click="dialogAffirm">
                    确认
                </el-button>
            </template>
        </el-dialog>

        <el-drawer v-model="drawer">
            <template #header>
                <h4>分配菜单与按钮的权限</h4>
            </template>
            <template #default>
                <div>
                    <el-tree    
                        :data="menuAllList"
                        show-checkbox
                        default-expand-all
                        node-key="id"
                        :default-checked-keys="[5]"
                        :props="defaultProps"
                    />
                </div>
            </template>
            <template #footer>
                <div style="flex: auto">
                    <el-button @click="drawer = false">取消</el-button>
                    <el-button type="primary" @click="confirmClick">
                        确定
                    </el-button>
                </div>
            </template>
        </el-drawer>
    </div>
</template>
<script lang="ts">
    export default {
        name: 'Role'
    }
</script>
<script setup lang="ts">
    import { reqAllRole, reqAddOrUpdateRole ,reqAllMenuList} from '@/api/acl/role'
    import type { RoleResponseData, RoleData ,MunuData,MenuResponseData} from '@/api/acl/role/type'
    import { ElMessage } from 'element-plus'
    import { ref, onMounted, reactive } from 'vue'

    let pageNo = ref<number>(1)
    let limit = ref<number>(3)
    let total = ref<number>(0)
    let roleName = ref<string>('') //角色名称
    let allRoleList = ref<RoleData[]>([])
    let dialogIsshow = ref<boolean>(false)
    let form = ref() //form表单的vc
    let roleData = reactive<RoleData>({
        roleName: ''
    })
    let drawer = ref<boolean>(false)
    let menuAllList = ref<MunuData[]>([])
    onMounted(() => {
        getAllRole()
    })
    //获取分页数据的回调
    const getAllRole = async (page = 1) => {
        pageNo.value = page
        let result: RoleResponseData = await reqAllRole(
            pageNo.value,
            limit.value,
            roleName.value
        )
        total.value = result.data.total
        allRoleList.value = result.data.records
    }
    //重置
    const reset = () => {
        roleName.value = ''
        getAllRole()
    }

    //新增角色按钮
    const addRole = () => {
        form.value?.clearValidate()

        Object.assign(roleData, {
            roleName: '',
            id: ''
        })
        dialogIsshow.value = true
    }
    //点击确认按钮
    const dialogAffirm = async () => {
        await form.value.validate()

        dialogIsshow.value = false
        await reqAddOrUpdateRole(roleData)
        ElMessage.success(roleData.id ? '修改角色名称成功！' : '添加角色成功！')
        getAllRole(roleData.id ? pageNo.value : 1)
    }
    //修改角色按钮
    const updateRole = (row: RoleData) => {
        form.value?.clearValidate()

        Object.assign(roleData, row)
        dialogIsshow.value = true
    }
    //角色校验规则

    const rules = reactive({
        roleName: [
            {
                required: true,
                min: 2,
                message: '角色名称至少两位',
                trigger: 'blur'
            }
        ]
    })
    //分配权限确定按钮
    const confirmClick = () => {
        drawer.value = false
    }
    //分配权限按钮
    const privileges = async(row:RoleData) => {
        drawer.value = true
        let result:MenuResponseData = await reqAllMenuList(row.id as number)
        console.log(result);
        menuAllList.value = result.data

    }

    const defaultProps = {
        children: 'children',
        label: 'name'
    }
</script>
<style scoped lang="scss">
    #top-from {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
