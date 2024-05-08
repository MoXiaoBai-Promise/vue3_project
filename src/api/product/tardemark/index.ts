//统一管理品牌管理接口
import request from '@/utils/request'
enum API {
    TRADEMARK_URL = '/admin/product/baseTrademark/',

}
//获取已有品牌的接口方法
//page:获取第几页 ---默认第一页
//limit:获取几个已有品牌的数据

let reqTardeMark = (page:number,limit:number)=>request.get<any,any>(API.TRADEMARK_URL+`${page}/${limit}`)
export { reqTardeMark}
