// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import App from '@/App.vue'
import 'virtual:svg-icons-register'
//引入自定义插件，所有的全局组件都在这里
import gloalComponent from '@/components/index'
//引入全局样式
import '@/styles/index.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'
import router from './router'
//引入路由鉴权
import '@/permission.ts'
import Pinia  from './store/index.ts'

const app = createApp(App)


app.use(gloalComponent)
app.use(ElementPlus, {
    locale: zhCn
})
app.use(router)
app.use(Pinia)
app.mount('#app')


