import request from '@/utils/request'
import type { RoleResponseData, RoleData, MenuResponseData } from './type'
enum API {
    //获取全部的角色数据
    ALLROLE_URL = '/admin/acl/role/',
    //新增角色
    ADDROLE_URL = '/admin/acl/role/save',
    //修改角色
    UPDATEROLE_URL = '/admin/acl/role/update',
    //获取全部菜单与按钮的数据
    ALLPERMISSTION = '/admin/acl/permission/toAssign/',
    //给角色职位分配权限
    SETPERMISSION_URL = 'admin/acl/permission/doAssign/?',
    //删除职位
    REMOVEROLE_URL = '/admin/acl/role/remove/'
}

const reqAllRole = (page: number, limit: number, roleName: string) =>
    request.get<any, RoleResponseData>(
        API.ALLROLE_URL + `${page}/${limit}?roleName=${roleName}`
    )
const reqAddOrUpdateRole = (data: RoleData) => {
    if (data.id) {
        return request.put<any, any>(API.UPDATEROLE_URL, data)
    } else {
        return request.post<any, any>(API.ADDROLE_URL, data)
    }
}

const reqAllMenuList = (roleId: number) =>
    request.get<any, MenuResponseData>(API.ALLPERMISSTION + roleId)

const reqPermistion = (roleId: number, permissionId: number[]) =>
    request.post<any, any>(
        API.SETPERMISSION_URL + `roleId=${roleId}&permissionId=${permissionId}`
    )

//删除角色
const reqRemoveRole = (roleId: number) =>
    request.delete<any, any>(API.REMOVEROLE_URL + roleId)
export {
    reqAllRole,
    reqAddOrUpdateRole,
    reqAllMenuList,
    reqPermistion,
    reqRemoveRole
}
