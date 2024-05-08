//登录接口需要携带参数的ts类型
interface loginForm {
    username: string
    password: string
}

//全部接口返回参数通用ts类型
interface reqDataType {
    code: number
    message: string
    ok: boolean
}

//登录接口返回的ts类型
interface loginBack extends reqDataType {
    data: string
}

//获取用户信息接口返回的ts类型
interface userInfoBack extends reqDataType {
    data: {
        routes: string[];
        buttons: string[];
        roles: string[];
        name: string;
        avatar: string;
      }
}
  
export type { loginForm, loginBack, userInfoBack }
