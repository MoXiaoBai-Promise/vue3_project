import request from '@/utils/request'
import type {
    HasSpuResponseData,
    AllTradeMark,
    SpuHasImg,
    SaleAttrResponseData,
    HasSaleAttrResponseData,
    SpuData,
    SkuData,
    SkuInfoData
} from './type.ts'
enum API {
    //获取一级分类的接口
    GETSPU_URL = '/admin/product/',
    //获取全部品牌的数据
    ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
    //获取照片墙的数据
    IMAGE_URL = '/admin/product/spuImageList/',
    //获取某一个SPU下全部的已有的销售属性
    SPUHASSALEATTR_URL = '/admin/product/spuSaleAttrList/',
    //获取整个项日全部的销售属性[颜色、版本、尺码]
    ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
    //新增spu
    ADDSPU_URL = '/admin/product/saveSpuInfo',
    //更新已有的spu
    UPDATESPU_URL = '/admin/product/updateSpuInfo',
    //添加sku
    ADDSKU_URL = '/admin/product/saveSkuInfo',
    //查看已有spu下的sku
    SKUINFO_URL = '/admin/product/findBySpuId/',
    //删除SPU
    REMOVESPU_URL = '/admin/product/deleteSpu/'
}

//获取SPU数据
const reqGetSpu = (page: number, limit: number, category3Id: number | string) =>
    request.get<any, HasSpuResponseData>(
        API.GETSPU_URL + `${page}/${limit}?category3Id=${category3Id}`
    )

//获取所有品牌的数据
const getAllTradeMark = () =>
    request.get<any, AllTradeMark>(API.ALLTRADEMARK_URL)
//获取图片list
const getImageList = (spuId: number | undefined) =>
    request.get<any, SpuHasImg>(API.IMAGE_URL + spuId)

//获取某一个SPU下全部的已有的销售属性
const getSpuHassaleAttr = (spuId: number) =>
    request.get<any, SaleAttrResponseData>(API.SPUHASSALEATTR_URL + spuId)

//获取整个项日全部的销售属性[颜色、版本、尺码]
const getAllSaleAttr = () =>
    request.get<any, HasSaleAttrResponseData>(API.ALLSALEATTR_URL)

//新增或更新已有的spu
const addOrUpdateSpu = (data: SpuData) =>
    request.post<any, any>(data.id ? API.UPDATESPU_URL : API.ADDSPU_URL, data)

//添加sku数据
const reqAddSku = (data: SkuData) =>
    request.post<any, any>(API.ADDSKU_URL, data)

//查看已有spu下的sku
const reqSkuInfo = (spuId: number | string) =>
    request.get<any, SkuInfoData>(API.SKUINFO_URL + spuId)
//删除spu
const reqremovespu = (spuId: number | string) =>
    request.delete<any, any>(API.REMOVESPU_URL + spuId)

export {
    reqGetSpu,
    getAllTradeMark,
    getImageList,
    getSpuHassaleAttr,
    getAllSaleAttr,
    addOrUpdateSpu,
    reqAddSku,
    reqSkuInfo,
    reqremovespu
}
