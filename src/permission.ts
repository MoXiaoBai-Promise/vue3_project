//路由鉴权
import router from '@/router'
import NProgress from 'nprogress'
import useUserStore from '@/store/user'
import piain from '@/store'
import setting from './setting.ts'
NProgress.configure({ showSpinner: false })
const userStore = useUserStore(piain)

//全局前置守卫
router.beforeEach(async (to, _from, next) => {

    NProgress.start()
    document.title = `${setting.title}__${to.meta.title}`
    let token = userStore.token
    let username = userStore.username

    if (token) {
        //登录成功不允许再访问login页面
        if (to.name == 'login') {
            next({ name: 'home' })
        } else {
            //判断是否有用户名用户名
            if (username) {
                next()
            } else {
                //如果没有
                try {
                    await userStore.userInfo()
                    next()
                } catch (error) {
                    //因为在拦截器里做过判断，所以这里可以不用再给提示信息
                    await userStore.userLogOut()
                    next({ name: 'login', query: { redirect: to.path } })
                }
            }
        }
    } else {
        //用户未登录判断
        if (to.name == 'login') {
            next()
        } else {
            next({ name: 'login', query: { redirect: to.path } })
        }
    }
})

//全局后置守卫
router.afterEach((_to, _from) => {
    NProgress.done()
})
