<template>
    <div>
        <el-form label-width="100px">
            <el-form-item label="SKU名称">
                <el-input placeholder="请输入SKU名称"></el-input>
            </el-form-item>
            <el-form-item label="价格(元)">
                <el-input placeholder="请输入价格(元)" type="number"></el-input>
            </el-form-item>
            <el-form-item label="重量(g)">
                <el-input placeholder="请输入重量(g)"></el-input>
            </el-form-item>
            <el-form-item label="SKU描述">
                <el-input
                    placeholder="请输入SKU描述"
                    type="textarea"
                ></el-input>
            </el-form-item>
            <el-form-item label="平台属性">
                <el-form inline>
                    <el-form-item label="cpu">
                        <el-select placeholder="请选择">
                            <el-option label="1" value="1" />
                            <el-option label="1" value="1" />
                            <el-option label="1" value="1" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="cpu">
                        <el-select placeholder="请选择">
                            <el-option label="1" value="1" />
                            <el-option label="1" value="1" />
                            <el-option label="1" value="1" />
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="图片名称">
                <el-table style="width: 100%" border>
                    <el-table-column
                        type="selection"
                        width="80px"
                    ></el-table-column>
                    <el-table-column label="图片" prop=""></el-table-column>
                    <el-table-column label="名称" prop=""></el-table-column>
                    <el-table-column label="操作" prop=""></el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item style="width: 100%">
                <div class="form-item-content">
                    <el-button type="primary">保存</el-button>
                    <el-button type="primary" @click="cancel">取消</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts">
    export default {
        name: 'SkuForm'
    }
</script>
<script setup lang="ts">
    const $emit = defineEmits(['skuChangeIsshow'])

    const cancel = () => {
        $emit('skuChangeIsshow')
    }
</script>
<style scoped lang="scss">
    .el-select {
        width: 200px;
    }
    .form-item-content {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        height: 100%; /* 根据需要设置高度 */
        width: calc(100% - 100px);
    }
</style>
