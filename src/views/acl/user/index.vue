<template>
    <div>
        <el-card>
            <el-form :inline="true" id="top-from">
                <el-form-item label="用户名">
                    <el-input v-model="username"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        size="default"
                        :disabled="!username"
                        @click="getUserInfo()"
                    >
                        搜索
                    </el-button>
                    <el-button size="default" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card style="margin: 10px 0">
            <el-button type="primary" size="default" @click="addUser">
                添加
            </el-button>
            <el-button
                type="danger"
                size="default"
                @click="deleteSelectedUser"
                :disabled="seletedArr.length < 1"
            >
                批量删除
            </el-button>
            <el-table
                border
                stripe
                style="margin: 10px 0"
                :data="UserInfoArr"
                show-overflow-tooltip
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column
                    type="index"
                    width="50"
                    label="序号"
                    align="center"
                />
                <el-table-column
                    label="id"
                    align="center"
                    prop="id"
                ></el-table-column>
                <el-table-column
                    label="用户名字"
                    prop="username"
                ></el-table-column>
                <el-table-column label="用户名称" prop="name"></el-table-column>
                <el-table-column
                    label="用户角色"
                    prop="roleName"
                ></el-table-column>
                <el-table-column
                    label="创建时间"
                    prop="createTime"
                ></el-table-column>
                <el-table-column
                    label="更新时间"
                    prop="updateTime"
                ></el-table-column>
                <el-table-column label="操作" width="350" align="center">
                    <template #="{ row }">
                        <el-button
                            type="primary"
                            size="default"
                            @click="setRole(row)"
                            icon="User"
                        >
                            分配角色
                        </el-button>
                        <el-button
                            type="success"
                            size="default"
                            @click="updateUser(row)"
                            icon="Edit"
                        >
                            编辑
                        </el-button>
                        <el-button
                            type="danger"
                            size="default"
                            @click="deleteUser(row.id)"
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
                :page-sizes="[10, 20, 50, 100]"
                :background="true"
                layout="prev, pager, next, jumper, ->, sizes,total"
                :total="total"
                @current-change="getUserInfo"
                @size-change="getUserInfo(1)"
            />
        </el-card>

        <el-drawer v-model="drawer">
            <template #header>
                <h4>{{ userData.id ? '修改用户' : '添加用户' }}</h4>
            </template>
            <template #default>
                <div>
                    <el-form :model="userData" :rules="rules" ref="form">
                        <el-form-item label="用户姓名" prop="username">
                            <el-input
                                placeholder="请输入用户姓名"
                                v-model="userData.username"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="用户昵称" prop="name">
                            <el-input
                                placeholder="请输入用户昵称"
                                v-model="userData.name"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="用户密码"
                            prop="password"
                            v-if="!userData.id"
                        >
                            <el-input
                                placeholder="请输入用户密码"
                                v-model="userData.password"
                            ></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </template>
            <template #footer>
                <div style="flex: auto">
                    <el-button @click="cancelClick">取消</el-button>
                    <el-button type="primary" @click="confirmClick">
                        确定
                    </el-button>
                </div>
            </template>
        </el-drawer>

        <el-drawer v-model="drawer2">
            <template #header>
                <h4>分配角色</h4>
            </template>
            <template #default>
                <div>
                    <el-form>
                        <el-form-item label="用户姓名">
                            <el-input
                                v-model="userData.username"
                                disabled
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="角色列表">
                            <el-checkbox
                                v-model="checkAll"
                                :indeterminate="isIndeterminate"
                                @change="handleCheckAllChange"
                            >
                                全选
                            </el-checkbox>
                            <el-checkbox-group
                                v-model="checkedRoles"
                                @change="handleCheckedCitiesChange"
                            >
                                <el-checkbox
                                    v-for="city in allRoles"
                                    :key="city"
                                    :label="city"
                                    :value="city"
                                >
                                    {{ city }}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-form>
                </div>
            </template>
            <template #footer>
                <div style="flex: auto">
                    <el-button @click="drawer2 = false">取消</el-button>
                    <el-button type="primary" @click="setRoleConfirm">
                        确定
                    </el-button>
                </div>
            </template>
        </el-drawer>
    </div>
</template>
<script lang="ts">
    export default {
        name: 'User'
    }
</script>
<script setup lang="ts">
    //
    //@size-change="changeLimit"
    import { ref, onMounted, reactive, nextTick } from 'vue'
    import {
        reqUserInfo,
        reqAddOrUpdate,
        reqAllRole,
        reqSetRole,
        reqdeleteUser,
        reqDeleteSeleteUser
    } from '@/api/acl/user'
    import type {
        Records,
        UserResponseData,
        User,
        RoleData,
        AllRole,
        SetRoleData
    } from '@/api/acl/user/type'
    import { ElMessage } from 'element-plus'
    let pageNo = ref<number>(1)
    let limit = ref<number>(10)
    let total = ref<number>(0)
    let UserInfoArr = ref<Records>([]) //用户数据的数组
    let drawer = ref(false) //抽屉的显示与隐藏
    let allRolesList = ref<AllRole>([])
    let drawer2 = ref(false)
    let seletedArr = ref<number[]>([]) //选中的用户id，批量删除时用
    let username = ref<string>('')
    let userData = reactive<User>({
        username: '',
        name: '',
        password: ''
    })
    let form = ref() //form表单的vc
    onMounted(() => {
        getUserInfo()
    })

    //获取分页数据的回调
    const getUserInfo = async (page = 1) => {
        pageNo.value = page
        let result: UserResponseData = await reqUserInfo(
            pageNo.value,
            limit.value,
            username.value
        )
        total.value = result.data.total
        UserInfoArr.value = result.data.records
    }
    //点击添加按钮
    const addUser = () => {
        //

        drawer.value = true
        Object.assign(userData, {
            username: '',
            name: '',
            password: '',
            id: ''
        })
        nextTick(() => {
            form.value.clearValidate()
        })
    }
    //点击编辑操作
    const updateUser = (row: User) => {
        form.value?.clearValidate()
        drawer.value = true
        userData.id = row.id
        userData.username = row.username
        userData.name = row.name
        userData.password = row.password
    }

    //取消
    const cancelClick = () => {
        drawer.value = false
    }
    //确定
    const confirmClick = async () => {
        await form.value.validate()

        await reqAddOrUpdate(userData)
        ElMessage.success(userData.id ? '修改用户成功！' : '添加用户成功！')
        drawer.value = false

        getUserInfo(userData.id ? pageNo.value : 1)
        //如果用户修改正在登陆的自己的账号，刷新页面
        window.location.reload()
    }

    const rules = reactive({
        username: [
            {
                required: true,
                min: 5,
                message: '用户姓名必须大于5位',
                trigger: 'blur'
            }
        ],
        name: [
            {
                required: true,
                min: 5,
                message: '用户昵称必须大于5位',
                trigger: 'blur'
            }
        ],
        password: [
            {
                required: true,
                min: 6,
                message: '用户密码必须大于6位',
                trigger: 'blur'
            }
        ]
    })

    //点击分配角色按钮
    const setRole = async (row: User) => {
        checkAll.value = false
        isIndeterminate.value = false
        drawer2.value = true
        Object.assign(userData, row)

        let result = await reqAllRole(userData.id as number)
        allRolesList.value = result.data.allRolesList
        allRoles.value = Array.from(
            //所有的角色，因为接口返回有重复的数据，得去重
            new Set(
                result.data.allRolesList.map((item: RoleData) => item.roleName)
            )
        )

        checkedRoles.value = result.data.assignRoles.map(
            //当前的角色
            (item: RoleData) => item.roleName
        )

        checkedRoles.value.forEach((item) => {
            if (checkedRoles.value.includes(item)) {
                isIndeterminate.value = true
                return
            }
        })    

        if(allRoles.value.length <= checkedRoles.value.length){

          isIndeterminate.value = false
          checkAll.value = true
        }
    }
    //分配角色确定按钮
    const setRoleConfirm = async () => {
        //由于数据所有角色数据有重复的，这里需要再次遍历拿到id ps：设计有点复杂了，待优化
        const data: SetRoleData = {
            userId: userData.id as number,
            roleIdList: []
        }
        data.roleIdList = checkedRoles.value.flatMap((item: string) =>
            allRolesList.value
                .map((item1) => {
                    if (item == item1.roleName) {
                        return item1.id as number
                    }
                })
                .filter((id): id is number => id !== undefined)
        )
        await reqSetRole(data)
        ElMessage.success('分配角色成功')
        drawer2.value = false
        getUserInfo(pageNo.value)
    }
    //删除用户
    const deleteUser = async (userId: number) => {
        await reqdeleteUser(userId)
        ElMessage.success('删除用户成功')
        getUserInfo(
            UserInfoArr.value.length === 1 ? pageNo.value - 1 : pageNo.value
        )
    }
    //多选框start
    const checkAll = ref(false)
    const isIndeterminate = ref(false)
    const checkedRoles = ref<string[]>([])
    const allRoles = ref<string[]>([])

    const handleCheckAllChange = (val: boolean) => {
        checkedRoles.value = val ? allRoles.value : []
        isIndeterminate.value = false
    }
    const handleCheckedCitiesChange = (value: string[]) => {
        const checkedCount = value.length
        checkAll.value = checkedCount === allRoles.value.length

        isIndeterminate.value =
            checkedCount > 0 && checkedCount < allRoles.value.length
    }
    //多选框end

    //拿到所有选中的user
    const handleSelectionChange = (value: User[]) => {
        seletedArr.value = value.map((user) => user.id as number)
    }
    //批量删除
    const deleteSelectedUser = async () => {
        await reqDeleteSeleteUser(seletedArr.value)
        ElMessage.success('批量删除成功！')
        getUserInfo(
            seletedArr.value.length === UserInfoArr.value.length
                ? pageNo.value - 1 < 1
                    ? 1
                    : pageNo.value - 1
                : pageNo.value
        )
    }
    //重置按钮
    const reset = ()=>{
        username.value = ''
        getUserInfo()
    }
</script>

<style scoped lang="scss">
    #top-from {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
