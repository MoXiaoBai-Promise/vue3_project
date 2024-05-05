//tabbar相关pinia

import { defineStore } from 'pinia'

let tabBarStore = defineStore('tabBarStore', {
    state: () => {
        return {
            fold: false
        }
    },
    actions: {},
    getters: {}
})

export default tabBarStore
