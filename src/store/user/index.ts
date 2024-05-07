//用户相关pinia

import { defineStore } from 'pinia'
import type { loginForm } from '@/api/user/type.ts'
import { reqLogin, reqUserInfo } from '@/api/user/index'
import type { UserState } from './type.ts'
import constRoutes from '@/router/routes.ts'

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
            let result = await reqLogin(data)
            this.token = result.data.token as string
            localStorage.setItem('TOKEN', this.token)
        },
        //获取用户信息
        userInfo: async function () {
            let result = await reqUserInfo()
            this.avatar = result.data.checkUser.avatar
            this.username = result.data.checkUser.username
        },
        //退出登录
        userLogOut: function () {
            localStorage.removeItem('TOKEN')
            this.token = ''
            this.avatar = ''
            this.username = ''
        }
    },
    getters: {}
})

export default userStore
