<template>
    <div class="top">
        <div class="left">
            <span class="lbtn" @click="goHome">首页</span>
        </div>
        <div class="center">
            <div class="title">智慧旅游可视化大数据平台</div>
            <div class="warn">平台高峰预警信息（23）条）</div>
        </div>
        <div class="right">
            <span class="rbtn">统计报告</span>
            <span class="time">当前时间：{{ time }}</span>
        </div>
    </div>
</template>
<script lang="ts">
    export default {
        name: 'ScreeTop'
    }
</script>
<script setup lang="ts">
    import { ref, onMounted, onBeforeUnmount } from 'vue'
    import { useRouter } from 'vue-router'
    import moment from 'moment'
    let time = ref(moment().format('YYYY-MM-DD hh:mm:ss'))
    let timer: NodeJS.Timeout | null = null
    onMounted(() => {
        timer = setInterval(() => {
            time.value = moment().format('YYYY-MM-DD hh:mm:ss')
        }, 1000)
    })
    const $router = useRouter()
    const goHome = () => {
        $router.push('/home')
    }

    onBeforeUnmount(()=>{
        timer && clearInterval(timer)
    })
</script>
<style scoped lang="scss">
    .top {
        width: 100%;
        display: flex;
        height: 40px;
        .left {
            flex: 1;
            background: url('../images/dataScreen-header-left-bg.png') no-repeat;
            background-size: 100% 100%;
            .lbtn {
                width: 150px;
                height: 40px;
                float: right;
                text-align: center;
                line-height: 40px;
                color: #29fcff;
                background: url('../images/dataScreen-header-btn-bg-l.png')
                    no-repeat;
                background-size: 100% 100%;
                font-size: 20px;
            }
        }
        .center {
            flex: 2;
            .title {
                width: 100%;
                height: 74px;
                background: url('../images/dataScreen-header-center-bg.png')
                    no-repeat;
                background-size: 100% 100%;
                color: #29fcff;
                text-align: center;
                line-height: 74px;
                font-size: 30px;
            }
            .warn{
                background: url('../images/dataScreen-header-warn-bg.png')  no-repeat;
                background-size: 100% 100%;
                height: 44px;
                width: 100%;
                color: white;
                text-align: center;
                line-height: 40px;
            }
        }
        .right {
            flex: 1;
            background: url('../images/dataScreen-header-right-bg.png')
                no-repeat;
            background-size: 100% 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .rbtn {
                width: 150px;
                height: 40px;
                background: url('../images/dataScreen-header-btn-bg-r.png')
                    no-repeat;
                background-size: 100% 100%;
                text-align: center;
                line-height: 40px;
                color: #29fcff;
                font-size: 20px;
            }
            .time {
                color: #29fcff;
                margin-right: 10px;
                font-size: 20px;
            }
        }
    }
</style>
