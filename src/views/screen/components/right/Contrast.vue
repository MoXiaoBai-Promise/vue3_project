<template>
    <div class="contrast">
        <div class="top">
            <div class="left">
                <p class="title">年度游客量对比</p>
                <p class="bg"></p>
            </div>
        </div>
        <div class="content" ref="ecahrt"></div>
    </div>
</template>
<script lang="ts">
    export default {
        name: 'Contrast'
    }
</script>
<script setup lang="ts">
    import * as echarts from 'echarts'
    import dayjs from 'dayjs';
    import { ref, onMounted } from 'vue'
    let ecahrt = ref()

    onMounted(() => {
        const myChart = echarts.init(ecahrt.value)
        // 生成x轴数据
        function generateDays(num = 12, format = 'MM') {
            let startTime = dayjs().startOf('year')
            let timeList = new Array(num).fill(null).map((_item, index) => {
                return dayjs(startTime).add(index, 'month').format(format)
            })
            return timeList
        }
        // 生成series数据
        function generateList(num = 12, random = 100) {
            return new Array(num).fill(null).map((_item) => {
                return { value: Math.ceil(Math.random() * 10000) + random }
            })
        }
        const xAxisData = generateDays()
        const seriesData1 = generateList(12, 100)
        const seriesData2 = generateList(12, 150)
        const seriesData3 = generateList(12, 200)
        const legendData = ['2021年', '2022年', '2023年']
        const option = {
            // backgroundColor: '#03213D',
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                icon: 'rect',
                orient: 'horizontal',
                left: 'right',
                itemWidth: 12,
                itemHeight: 12,
                textStyle: {
                    color: '#fff',
                    fontSize: '12px'
                },
                data: legendData
            },
            grid: {
                left: 0,
                right: 20,
                bottom: 0,
                top: 30,
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: xAxisData,
                    boundaryGap: false,
                    axisTick: {
                        show: false // 不显示坐标轴刻度线
                    },
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        color: 'rgba(230, 247, 255, 0.50)',
                        fontSize: 12
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    // name: '(人数)',
                    nameTextStyle: {
                        align: 'right',
                        color: 'rgba(230, 247, 255, 0.50)'
                    },
                    //y右侧文字
                    axisLabel: {
                        color: 'rgba(230, 247, 255, 0.50)',
                        fontSize: 12
                    },
                    // y轴的分割线
                    splitLine: {
                        show: false
                    }
                }
            ],
            series: [
                {
                    name: '2021年',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            // 坐标轴指示器，坐标轴触发有效
                            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    lineStyle: {
                        width: 1,
                        shadowColor: '#6A583A',
                        shadowBlur: 10
                    },
                    areaStyle: {
                        opacity: 0.4,
                        //右下左上
                        color: {
                            type: 'linear',
                            x: 0, //右
                            y: 0, //下
                            x2: 0, //左
                            y2: 1, //上
                            colorStops: [
                                {
                                    offset: 0.1,
                                    color: '#5090FF' // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: '#1057E5' // 100% 处的颜色
                                }
                            ]
                        }
                    },
                    data: seriesData1
                },
                {
                    name: '2022年',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            // 坐标轴指示器，坐标轴触发有效
                            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    lineStyle: {
                        width: 1,
                        shadowColor: '#6A583A',
                        shadowBlur: 10
                    },
                    areaStyle: {
                        opacity: 0.8,
                        //右下左上
                        color: {
                            type: 'linear',
                            x: 0, //右
                            y: 0, //下
                            x2: 0, //左
                            y2: 1, //上
                            colorStops: [
                                {
                                    offset: 0.1,
                                    color: '#01B3E4' // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: '#DCF300' // 100% 处的颜色
                                }
                            ]
                        }
                    },
                    data: seriesData2
                },
                {
                    name: '2023年',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            // 坐标轴指示器，坐标轴触发有效
                            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    lineStyle: {
                        width: 1,
                        shadowColor: '#6A583A',
                        shadowBlur: 10
                    },
                    areaStyle: {
                        opacity: 0.5,
                        //右下左上
                        color: {
                            type: 'linear',
                            x: 0, //右
                            y: 0, //下
                            x2: 0, //左
                            y2: 1, //上
                            colorStops: [
                                {
                                    offset: 0.1,
                                    color: '#FAC858' // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: '#F7E8C6' // 100% 处的颜色
                                }
                            ]
                        }
                    },
                    data: seriesData3
                }
            ]
        }
        myChart.setOption(option)
    })
</script>
<style scoped lang="scss">
    .contrast {
        height: 100%;
        width: 100%;
        background: url('../../images/dataScreen-main-rc.png') no-repeat;
        background-size: 100% 100%;
        margin: 20px 0;
        .top {
            margin-left: 20px;

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
        }
        .content{
            height: calc(100% - 37px);
        }
    }
</style>
