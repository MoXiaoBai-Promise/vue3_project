//统一管理用户接口
import request from '@/utils/request'
import type{ loginForm,loginBack,userInfoBack } from './type'
enum API {
    LOGIN_URL = '/admin/acl/index/login',
    USERINFO_URL = '/admin/acl/index/info',
    LOGOUT_URL = '/admin/acl/index/logout'
}

//登录接口
const reqLogin = (data: loginForm) =>
    request.post<any, loginBack>(API.LOGIN_URL, data)

//获取用户信息
const reqUserInfo = () => request.get<any,userInfoBack>(API.USERINFO_URL)


//退出登录
const reqLogOut = () =>
    request.post<any, any>(API.LOGOUT_URL)

export { reqLogin, reqUserInfo ,reqLogOut}
