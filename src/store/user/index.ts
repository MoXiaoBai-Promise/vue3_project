//用户相关pinia

import { defineStore } from 'pinia'
import type { loginForm, loginBack, userInfoBack } from '@/api/user/type.ts'
import { reqLogin, reqUserInfo, reqLogOut } from '@/api/user/index'
import type { UserState } from './type.ts'
import { constRoutes, anyRoutes, asyncRoutes } from '@/router/routes.ts'
import router from '@/router/index.ts'

//@ts-ignore
import cloneDeep from 'lodash/cloneDeep'

//由于首字母是小写的需要转换
function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

//过滤当前路由
function filterRoute(asyncRoutes: any, routes: any) {
    return asyncRoutes.filter((item: any) => {
        if (routes.includes(capitalizeFirstLetter(item.name))) {
            if (item.children && item.children.length > 0) {
                item.children = filterRoute(item.children, routes)
            }
            return true
        }
    })
}

let userStore = defineStore('User', {
    state: (): UserState => {
        return {
            token: localStorage.getItem('TOKEN'),
            menuRoutes: constRoutes,
            avatar: '',
            username: ''
        }
    },
    actions: {
        //登录
        userLogin: async function (data: loginForm) {
            let result: loginBack = await reqLogin(data)
            this.token = result.data as string
            localStorage.setItem('TOKEN', this.token)
            
        },
        //获取用户信息
        userInfo: async function () {
            let result: userInfoBack = await reqUserInfo()
            this.avatar = result.data.avatar
            this.username = result.data.name

            //计算当前用户需要用到的异步路由
            let userAsyncRoute = filterRoute(cloneDeep(asyncRoutes), result.data.routes)

            this.menuRoutes = [...constRoutes, ...anyRoutes, ...userAsyncRoute]

            let addRoutes = [...anyRoutes, ...userAsyncRoute]
            //追加路由
            addRoutes.forEach((item) => {
                router.addRoute(item)
            })
        },
        //退出登录
        userLogOut: async function () {
            await reqLogOut()
            localStorage.removeItem('TOKEN')
            this.token = ''
            this.avatar = ''
            this.username = ''
            this.menuRoutes = constRoutes
            
        }
    },
    getters: {}
})

export default userStore
