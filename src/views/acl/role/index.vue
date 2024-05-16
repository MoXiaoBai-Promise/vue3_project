<template>
    <div>
        <el-card>
            <el-form :inline="true" id="top-from">
                <el-form-item label="角色名称">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="default">搜索</el-button>
                    <el-button size="default">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card style="margin: 10px 0">
            <el-button
                type="primary"
                size="default"
                @click=""
                icon="Plus"
            >添加角色</el-button>
            <el-table border stripe style="margin: 10px 0">
                <el-table-column type="index" width="50" align="center" />
                <el-table-column label="id"></el-table-column>
                <el-table-column label="角色名称" show-overflow-tooltip></el-table-column>
                <el-table-column label="创建时间"></el-table-column>
                <el-table-column label="更新时间"></el-table-column>
                <el-table-column label="操作">
                  <template #="{row}">
                      <el-button type="primary" size="default" @click="" icon="User"> 分配权限</el-button>
                      <el-button type="success " size="default" @click="" icon="Edit" >编辑</el-button>
                      <el-button type="danger " size="default" @click="" icon="Delete" >删除</el-button>
                      
                  </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
<script lang="ts">
    export default {
        name: 'Role'
    }
</script>
<script setup lang="ts"></script>
<style scoped lang="scss">
    #top-from {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
