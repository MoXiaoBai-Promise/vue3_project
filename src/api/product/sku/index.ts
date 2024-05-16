//SKU接口模块
import request from '@/utils/request'
import type { SkuBackData } from './type.ts'
enum API {
    SKU_URL = '/admin/product/list/',
    //商品上架
    SALE_URL = '/admin/product/onSale/',
    //商品下架
    OUTSALE_URL = '/admin/product/cancelSale/',
    //获取sku的信息，抽屉展示用
    INFOSKU_URL = '/admin/product/getSkuInfo/',
    //删除sku
    DELETESKU_URL = '/admin/product/deleteSku/'
}

const reqSkuList = (page: number, limit: number) =>
    request.get<any, SkuBackData>(API.SKU_URL + `${page}/${limit}`)

const reqSaleSku = (skuId: number) =>
    request.get<any, any>(API.SALE_URL + skuId)

const reqOutSaleSku = (skuId: number) =>
    request.get<any, any>(API.OUTSALE_URL + skuId)

const reqInfoSku = (skuId: number) =>
    request.get<any, any>(API.INFOSKU_URL + skuId)

const reqRemoveSku =  (skuId: number) =>
    request.delete<any, any>(API.DELETESKU_URL + skuId)

export { reqSkuList, reqSaleSku ,reqOutSaleSku,reqInfoSku,reqRemoveSku}
