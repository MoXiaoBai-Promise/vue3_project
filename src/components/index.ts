import SvgIcons from '@/components/SvgIcons/index.vue'
import Category from '@/components/Category/index.vue'
import { App } from 'vue'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//所有的全局组件都应在此对象中
const components: any = { SvgIcons,Category }
export default {
    //必须为install方法名
    install(app: App) {
        Object.keys(components).forEach((key) => {
            app.component(key, components[key])
        })

        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
    }
}
