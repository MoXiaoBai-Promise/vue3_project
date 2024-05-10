import request from '@/utils/request'
import type {HasSpuResponseData} from './type.ts'
enum API {
    //获取一级分类的接口
    GETSPU_URL = '/admin/product/',

}

//获取SPU数据
const reqGetSpu = (page:number,limit:number,category3Id:number|string) => request.get<any, HasSpuResponseData>(API.GETSPU_URL+ `${page}/${limit}?category3Id=${category3Id}`)


export {reqGetSpu}