import Login from '@/views/login/index.vue'
import Layout from '@/layout/index.vue'
import Error from '@/views/404/index.vue'
import Home from '@/views/home/index.vue'
import Screen from '@/views/screen/index.vue'
import Permission from '@/views/acl/permission/index.vue'
import Role from '@/views/acl/role/index.vue'
import User from '@/views/acl/user/index.vue'
import Attr from '@/views/product/attr/index.vue'
import Sku from '@/views/product/sku/index.vue'
import Spu from '@/views/product/spu/index.vue'
import Trademark from '@/views/product/trademark/index.vue'

//异步路由
const asyncRoutes = [
    {
        path: '/acl',
        name: 'acl', 
        component: Layout,
        meta: {
            title: '权限管理',
            icon: 'Lock',
            hidden: false //是否需要在左侧菜单隐藏
        },
        redirect: '/acl/user',
        children: [
            {
                path: 'user',
                name: 'user',
                component: User,
                meta: {
                    title: '用户管理',
                    hidden: false,
                    icon: 'User'
                }
            },
            {
                path: 'role',
                name: 'role',
                component: Role,
                meta: {
                    title: '角色管理',
                    hidden: false,
                    icon: 'UserFilled'
                }
            },
            {
                path: 'permission',
                name: 'permission',
                component: Permission,
                meta: {
                    title: '菜单管理',
                    hidden: false,
                    icon: 'Grid'
                }
            }
        ]
    },

    {
        path: '/product',
        name: 'product',
        component: Layout,
        meta: {
            title: '商品管理',
            icon: 'Goods',
            hidden: false //是否需要在左侧菜单隐藏
        },
        redirect: '/product/trademark',
        children: [
            {
                path: 'trademark',
                name: 'trademark',
                component: Trademark,
                meta: {
                    title: '品牌管理',
                    hidden: false,
                    icon: 'ShoppingCartFull'
                }
            },
            {
                path: 'attr',
                name: 'attr',
                component: Attr,
                meta: {
                    title: '属性管理',
                    hidden: false,
                    icon: 'Aim'
                }
            },
            {
                path: 'spu',
                name: 'spu',
                component: Spu,
                meta: {
                    title: 'Spu管理',
                    hidden: false,
                    icon: 'IceCream'
                }
            },
            {
                path: 'sku',
                name: 'sku',
                component: Sku,
                meta: {
                    title: 'Sku管理',
                    hidden: false,
                    icon: 'GobletSquareFull'
                }
            }
        ]
    }
]

//常量路由
const constRoutes = [
    {
        //登录成功后的路由
        path: '/',
        name: 'layout',
        component: Layout,
        meta: {
            title: 'layout',
            hidden: true //是否需要在左侧菜单隐藏
        },
        redirect: '/home',
        children: [
            {
                path: 'home',
                name: 'home',
                component: Home,
                meta: {
                    title: '首页',
                    hidden: false,
                    icon: 'HomeFilled'
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: '登录',
            hidden: true
        }
    },
    {
        path: '/screen',
        name: 'screen',
        component: Screen,
        meta: {
            title: '数据大屏',
            icon: 'Monitor',
            hidden: false
        }
    },

    {
        path: '/404',
        name: '404',
        component: Error,
        meta: {
            title: '404',
            hidden: true
        }
    }
]

//任意路由
const anyRoutes = [
    {
        path: '/:pathMatch(.*)*',
        name: 'any',
        redirect: '/404',
        meta: {
            title: '任意路由',
            hidden: true
        }
    }
]

export {constRoutes,asyncRoutes,anyRoutes}
