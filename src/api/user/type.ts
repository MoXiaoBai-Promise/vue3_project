
//登录接口需要携带参数的ts类型
export interface loginForm{
    username:string,
    password:string
}

//登录接口返回参数的ts类型
interface dataType{
    token:string
}

export interface loginBack{
    code:number,
    data:dataType
}
