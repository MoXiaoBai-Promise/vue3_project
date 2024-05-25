<template>
    <div class="tourist">
        <div class="top">
            <div class="left">
                <p class="title">实时游客统计</p>
                <p class="bg"></p>
            </div>
            <p class="right">
                可预约总量
                <span>9999</span>
                人
            </p>
        </div>
        <div class="pople">
            <span v-for="(item, index) in pople" :key="index">{{ item }}</span>
        </div>
        <!-- 水球图 -->
        <div class="charts" ref="charts">123</div>
    </div>
</template>
<script lang="ts">
    export default {
        name: 'Tourist'
    }
</script>
<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import * as echarts from 'echarts'
    import 'echarts-liquidfill'
    let charts = ref()
    onMounted(() => {
        const myChart = echarts.init(charts.value)
        
        // 指定图表的配置项和数据
        const option = {
            title: {
                text: ''
            },
            series: [
                {
                    type: 'liquidFill',
                    data: [0.5, 0.4, 0.3],
                    radius: '90%',
                    color: [
                        'rgb(30,198,212)',
                        'rgb(30,198,212)',
                        'rgb(30,198,212)'
                    ],
                    itemStyle: {
                        opacity: 0.6
                    },
                    backgroundStyle: {
                        borderColor: 'rgb(30,198,212)',
                        borderWidth: 1,
                        shadowColor: 'rgb(30,198,212)',
                        shadowBlur: 10,

                    },
                    outline: {
                        show:true,
                        // borderDistance:'10px',// 边框距离
                        borderColor: 'rgb(30,198,212)',
                        borderWidth: 2,
                        itemStyle: {
                            borderColor: 'rgb(30,198,212)',
                            borderWidth: 2,
                            borderType: 'dashed'
                        }
                    },
                    label: {
                        normal: {
                            formatter: '预约量50%',
                            textStyle: {
                                color: 'rgb(30,198,212)',
                                fontSize: 20
                            }
                        }
                    }
                }
            ],
            grid: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        }

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)
    })

    let pople = ref('235317人')
</script>
<style scoped lang="scss">
    .tourist {
        background: url('../../images/dataScreen-main-lt.png') no-repeat;
        background-size: 100% 100%;
        margin-top: 10px;
        .top {
            margin-left: 20px;
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            .title {
                color: white;
                font-size: 20px;
            }
            .bg {
                background: url('../../images/dataScreen-title.png') no-repeat;
                background-size: 100% 100%;
                height: 7px;
                width: 68px;
                margin-top: 10px;
            }
            .right {
                float: right;
                color: white;
                font-size: 20px;
                span {
                    color: #ff9300;
                }
            }
        }
        .pople {
            color: rgb(30, 198, 212);
            display: flex;
            padding: 10px;
            span {
                background: url('../../images/total.png') no-repeat;
                background-size: 100% 100%;
                flex: 1;
                height: 40px;
                text-align: center;
                line-height: 40px;
                font-size: 35px;
            }
        }
        .charts {
            color: rgb(30, 198, 212);
            height: calc(100% - 97px);
        }
    }
</style>
