<template>
    <div class="line">
        <div class="top">
            <div class="left">
                <p class="title">未来七天游客数据趋势图</p>
                <p class="bg"></p>
            </div>
        </div>
        <div ref="line" class="echart"></div>
    </div>
</template>
<script lang="ts">
    export default {
        name: 'Line'
    }
</script>
<script setup lang="ts">
    import * as echarts from 'echarts'
    import { ref, onMounted } from 'vue'

    let line = ref()

    onMounted(() => {
        let myChart = echarts.init(line.value)

        const xAxisData = [
            '星期一',
            '星期二',
            '星期三',
            '星期四',
            '星期五',
            '星期六',
            '星期日',
        ]
        const seriesData = [487,1917,133,1458,272,2489,2378]

        const option = {
            // backgroundColor: '#0c2d55',

            grid: {
                top: 20,
                right:17,
                left: 0,
                bottom: 25,
                containLabel: true
            },
            tooltip: {
                show: true,
                trigger: 'axis',
                axisPointer: {
                    type: 'line'
                },
                textStyle: {
                    fontSize: 12
                },
                formatter: '数量：{c}人'
            },
            xAxis: {
                type: 'category',
                data: xAxisData,
                boundaryGap: false, // x 轴的左边界对齐
                // x轴文字
                axisLabel: {
                    textStyle: {
                        color: 'rgba(255,255,255,0.6)',
                        fontSize: 12
                    }
                },
                // x轴
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 2,
                        color: 'rgba(255,255,255,0.6)'
                    }
                },
                // x轴刻度
                axisTick: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                // y轴 文字
                axisLabel: {
                    textStyle: {
                        fontSize: 12
                    }
                },
                // y轴
                axisLine: {
                    show: false
                },
                // y轴横向 标线
                splitLine: {
                    show: false
                }
            },
            series: [
                {
                    data: seriesData,
                    type: 'line',
                    symbol: 'none',
                    lineStyle: {
                        //color: '#FFD000'

                        color:'rgba(255, 208, 0, 0.60)'
                    },
                    // //点
                    // itemStyle: {
                    //     color: '#FFD000'
                    // },
                    // 平滑 属性
                    smooth: true,
                    //symbol: 'emptyCircle',
                    // 区域黄色渐变效果
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    {
                                        offset: 0,
                                        color: 'rgba(255, 214, 62, 0.50)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(255, 214, 62, 0.050)'
                                    }

                                ],
                                false
                            ),
                            shadowColor: 'rgba(255, 214, 62, 0.10)',
                            shadowBlur: 10
                        }
                    }
                }
            ]
        }

        myChart.setOption(option)
    })
</script>
<style scoped lang="scss">
    .line {
        width: 100%;
        height: 100%;
        background: url('../../images/dataScreen-main-cb.png') no-repeat;
        background-size: 100% 100%;
        .top {
            margin-left: 15px;

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
        .echart {
            height: calc(100% - 37px);
        }
    }
</style>
