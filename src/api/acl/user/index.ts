import request from '@/utils/request'
import type {
    UserResponseData,
    User,
    AllRoleResponseData,
    SetRoleData
} from './type.ts'
enum API {
    ALLUSER_URL = '/admin/acl/user/',
    //添加账号
    ADDUSER_URL = '/admin/acl/user/save',
    //更新账号
    UPDATEUSER_URL = '/admin/acl/user/update',
    //获取全部的职位和当前角色的职位
    ALLROLE_URL = '/admin/acl/user/toAssign/',
    //给已有的用户分配角色
    SETROLE_URL = '/admin/acl/user/doAssignRole',
    //删除某一个账号
    DELETEUSER_URL = '/admin/acl/user/remove/',
    //批量删除
    DELETEALLUSER_URL = '/admin/acl/user/batchRemove'
}

const reqUserInfo = (page: number, limit: number,username:string) =>
    request.get<any, UserResponseData>(API.ALLUSER_URL + `${page}/${limit}?username=${username}`)

//添加或修改用户信息
const reqAddOrUpdate = (data: User) => {
    if (data.id) {
        return request.put<any, any>(API.UPDATEUSER_URL, data)
    } else {
        return request.post<any, any>(API.ADDUSER_URL, data)
    }
}

const reqAllRole = (userId: number) =>
    request.get<any, AllRoleResponseData>(API.ALLROLE_URL + userId)

const reqSetRole = (data: SetRoleData) =>
    request.post<any, AllRoleResponseData>(API.SETROLE_URL, data)

const reqdeleteUser = (userId: number) =>
    request.delete<any, any>(API.DELETEUSER_URL + userId)

const reqDeleteSeleteUser = (idList: number[]) =>
    request.delete<any, any>(API.DELETEALLUSER_URL, { data: idList })

export {
    reqUserInfo,
    reqAddOrUpdate,
    reqAllRole,
    reqSetRole,
    reqdeleteUser,
    reqDeleteSeleteUser
}
