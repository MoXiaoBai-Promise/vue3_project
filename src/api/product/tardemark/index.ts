//统一管理品牌管理接口
import request from '@/utils/request'
import type { TardemarkBack, records } from './type.ts'
enum API {
    //获取所有品牌信息的url
    TRADEMARK_URL = '/admin/product/baseTrademark/',
    //新增品牌url
    ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
    //更新品牌url
    UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
    //删除品牌url
    DELETE_URL = '/admin/product/baseTrademark/remove/'
}
//获取已有品牌的接口方法
//page:获取第几页 ---默认第一页
//limit:获取几个已有品牌的数据
let reqTardeMark = (page: number, limit: number) =>
    request.get<any, TardemarkBack>(API.TRADEMARK_URL + `${page}/${limit}`)

//新增或修改品牌的接口方法
let reqAddOrUpdateTardeMark = (data: records) => {
    if (data.id) {
        return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
    } else {
        return request.post<any, any>(API.ADDTRADEMARK_URL, data)
    }
}
//删除品牌的接口方法
let reqDeleteTardeMark = (data:number)=>request.delete<any,any>(API.DELETE_URL+`${data}`)

export { reqTardeMark, reqAddOrUpdateTardeMark,reqDeleteTardeMark }
