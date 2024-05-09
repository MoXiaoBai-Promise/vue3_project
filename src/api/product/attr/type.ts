//分类相关的ts类型
interface AttrPublic {
    code: number
    message: string
    ok: boolean
}

export interface ItemList {
    id: number | string
    createTime: string
    updateTime: string
    name: string
    categroy1Id?: number
    categroy2Id?: number
}

export interface Categroy extends AttrPublic {
    data: ItemList[]
}

//属性值对象
export interface AttrValue {
    id?: number
    valueNanme: string
    attrId?: number
}

//属性对象
export interface Attr {
    id?: number
    attrNanme: string
    categoryId: number | string
    categoryLevel: number 
    attrValueList: AttrValue[]
}

//属性接口返回的数据类型
export interface AttrReqDate extends AttrPublic {
    data: Attr[]
}
