//axios二次分装

import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElNotification,ElMessage } from 'element-plus'
import useUserStore  from '@/store/user'

NProgress.configure({ showSpinner: false });
//1、创建实例

let request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API, //基础路径/api
    timeout: 5000 //超时时间
})
//2、request实例添加请求与响应拦截器
request.interceptors.request.use((config) => {
    NProgress.start()
    // 添加token
    let userStore = useUserStore()
    if(userStore.token){
        config.headers.token = userStore.token
    }
    return config
})

request.interceptors.response.use(
    (response) => {
        NProgress.done()
        // 统一处理错误
        
        if (response.data.code !== 200) {
            
            ElNotification({
                message: response.data.data || response.data.message,
                type: 'error'
            })
            
            return Promise.reject(new Error(response.data.data || response.data.message))
        }
        return response.data
    },
    (error) => {
        NProgress.done()
        //失败的回调：处理http网络的错误
        let message = ''
        let status = error.response.status
        switch (status) {
            case 401:
                message = 'TOKEN过期'
                break

            case 403:
                message = '无权访问'
                break
            case 404:
                message = '请求地址错误'
                break
            case 500:
                message = '服务器出现问题'
                break
            default:
                message = '网络出现问题'
                break
        }
        ElMessage.error(message)
        return Promise.reject(error)
    }
)
export default request
