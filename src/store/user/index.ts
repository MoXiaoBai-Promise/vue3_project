//用户相关pinia

import { defineStore } from 'pinia'
import type { loginForm } from '@/api/user/type.ts'
import { reqLogin } from '@/api/user/index'
import type { UserState } from './type.ts'
import constRoutes from '@/router/routes.ts'


let userStore = defineStore('User', {
    state: (): UserState => {
        return {
            token: localStorage.getItem('TOKEN'),
            menuRoutes:constRoutes,
        }
    },
    actions: {
        userLogin: async function (data: loginForm) {
            let result = await reqLogin(data)
            this.token = result.data.token as string
            localStorage.setItem('TOKEN', this.token)

            return 'ok' //返回成功的promise
        }
    },
    getters: {}
})

export default userStore
