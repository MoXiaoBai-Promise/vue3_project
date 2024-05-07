//tabbar相关pinia

import { defineStore } from 'pinia'

let tabBarStore = defineStore('TabBarStore', {
    state: () => {
        return {
            fold: false,//控制图标
            refresh:false //刷新使用
        }
    },
    actions: {},
    getters: {}
})

export default tabBarStore
