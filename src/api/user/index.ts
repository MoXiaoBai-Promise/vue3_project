//统一管理用户接口
import request from '@/utils/request'
import type { loginForm, loginBack } from './type'
enum API {
    LOGIN_URL = '/user/login',
    USERINFO_URL = '/user/info'
}

//登录接口
const reqLogin = (data: loginForm) =>
    request.post<any, loginBack>(API.LOGIN_URL, data)

const reqUserInfo = () => request.get(API.USERINFO_URL)

export { reqLogin, reqUserInfo }
