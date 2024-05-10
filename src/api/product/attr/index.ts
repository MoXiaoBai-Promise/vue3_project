import request from '@/utils/request'
import type { Categroy, AttrReqDate, Attr } from './type.ts'
enum API {
    //获取一级分类的接口
    C1_URL = '/admin/product/getCategory1',
    C2_URL = '/admin/product/getCategory2/',
    C3_URL = '/admin/product/getCategory3/',
    ATTR_URL = '/admin/product/attrInfoList/',
    ATTADDORUPDATEATTRR_URL = '/admin/product/saveAttrInfo',
    DELETEATTR_URL = '/admin/product/deleteAttr/'
}

//一级分类
const reqC1 = () => request.get<any, Categroy>(API.C1_URL)

//二级分类
const reqC2 = (Category1Id: number | string) =>
    request.get<any, Categroy>(API.C2_URL + Category1Id)

//三级分类
const reqC3 = (Category2Id: number | string) =>
    request.get<any, Categroy>(API.C3_URL + Category2Id)

//获取分类下的属性
const reqAttr = (
    c1Id: number | string,
    c2Id: number | string,
    c3Id: number | string
) => request.get<any, AttrReqDate>(API.ATTR_URL + `${c1Id}/${c2Id}/${c3Id}`)

//属性新增或修改
const reqAddOrUpdateAttr = (data: Attr) =>
    request.post<any, any>(API.ATTADDORUPDATEATTRR_URL, data)

//删除属性
const reqRemoveAttr = (attrId:number) =>
    request.delete<any, any>(API.DELETEATTR_URL + attrId)


export { reqC1, reqC2, reqC3, reqAttr, reqAddOrUpdateAttr, reqRemoveAttr }
