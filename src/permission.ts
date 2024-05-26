//路由鉴权
import router from '@/router'
import NProgress from 'nprogress'
import useUserStore from '@/store/user'
import piain from '@/store'
import setting from './setting.ts'
NProgress.configure({ showSpinner: false })
const userStore = useUserStore(piain)

// //拿到所有路由的name
// function getRoutersName(menuRoutes:any) {
//     const names:string[] = []
//     menuRoutes.forEach((item:any) => {
//         names.push(item.name)
//         if (item.children) {
//             names.push(...getRoutersName(item.children))
//         }
//     })
//     return names
// }
//全局前置守卫
router.beforeEach(async (to, _from, next) => {
    NProgress.start()
    document.title = `${setting.title}__${to.meta.Wtitle}`
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
                    
                    // //判断，如果进入的是没有权限的页面，跳转到404页面
                    // if(!getRoutersName(userStore.menuRoutes).includes(to.name as string)){
                    //     next({name:'404'})
                    // }
                    
                    //如果刷新的时候是异步路由，异步路由没有加载完毕，会导致白屏问题,需要next({...to})这种写法
                    next({ ...to })
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
