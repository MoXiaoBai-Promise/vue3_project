//路由鉴权
import router from '@/router'
import NProgress from 'nprogress'
import useUserStore  from '@/store/user'
import piain from '@/store'

const userStore = useUserStore(piain)

//全局前置守卫
router.beforeEach((to, from, next) => {
    NProgress.start()
    let token = userStore.token


    if(token){
        //登录成功不允许再访问login页面
        if(to.name == 'login' ){
            next({name:'home'})
        }else{
            next()
        }
    }else{
        //用户未登录判断
        if(to.name == 'login' ){
            next()
        }else{
            next({name:'login',query:{redirect:to.path}})
        }
    }
})

//全局后置守卫
router.afterEach((to, from) => {
    NProgress.done()
})
