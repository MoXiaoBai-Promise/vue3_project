import request from '@/utils/request'
import type { PermisstionResponseData,MenuParams} from './type'
enum API {
    //获取全部菜单和按钮的数据
    ALLPERMISSION_URL = '/admin/acl/permission',
    //给某一级新增子菜单
    ADDMENU_URL = '/admin/acl/permission/save',
    //更新菜单
    UPDATEMENU_URL = '/admin/acl/permission/update',
    //删除菜单
    DELETEMENU_URL = '/admin/acl/permission/remove/'
}

//获取全部菜单和按钮的数据
const reqAllPermission = () =>
    request.get<any, PermisstionResponseData>(API.ALLPERMISSION_URL)

//添加与更新菜单
const addOrUpdateMenu = (data: MenuParams) => {
    if (data.id) {
        return request.put<any,any>(API.UPDATEMENU_URL, data)
    } else {
        return request.post<any,any>(API.ADDMENU_URL, data)
    }
}

const reqDeleteMenu = (id:number)=>request.delete<any,any>(API.DELETEMENU_URL+id)

export { reqAllPermission,addOrUpdateMenu,reqDeleteMenu }
