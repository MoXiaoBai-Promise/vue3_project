interface Public {
    code: number
    message: string
    ok: boolean
}

interface Data {
    records: records[]
    total: number
    size: number
    current: number
    orders: any[]
    optimizeCountSql: boolean
    hitCount: boolean
    countId: any
    maxLimit: any
    searchCount: boolean
    pages: number
}

interface records {
    id?: number
    createTime?: string
    updateTime?: string
    tmName: string
    logoUrl: string
}
interface TardemarkBack extends Public {
    data: Data
}

export type { TardemarkBack, records }
