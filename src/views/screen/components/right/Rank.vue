<template>
    <div class="rank">
        <div class="top">
            <div class="left">
                <p class="title">热门景区排行</p>
                <p class="bg"></p>
            </div>
        </div>
        <div class="chart-bg">
            <p class="left" > 排名</p>
            <p class="center" >景区</p>
            <p class="right" >预约量</p>
        </div>
        <div class="content" ref="ecahrt"></div>
    </div>
</template>
<script lang="ts">
    export default {
        name: 'Rank'
    }
</script>
<script setup lang="ts">
    import * as echarts from 'echarts'
    import { ref, onMounted } from 'vue'
    const ecahrt = ref()
    onMounted(() => {
        let ranking1 = `data:image/png;base64,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`
        let ranking2 = `data:image/png;base64,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`
        let ranking3 = `data:image/png;base64,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`

        const myChart = echarts.init(ecahrt.value)
        const datas = [
            {
                value: 6.00,
                name: '黄山'
            },
            {
                value: 5.00,
                name: '九华山'
            },
            {
                value: 4.01,
                name: '峨眉山'
            },
            {
                value: 3.13,
                name: '灵隐寺'
            },
            {
                value: 2.37,
                name: '三亚'
            }
        ]
        const colorList = [
            '#C467FF',
            '#2CAF70 ',
            '#FFA23F',
            '#625AFF',
            '#4B8BFF'
        ]
        let maxArr = new Array(datas.length).fill(10)
        const option = {
            grid: {
                left: 40,
                right: 20,
                bottom: 0,
                top: 70,
                containLabel: true
            },
            tooltip: {
                trigger: 'item',
                axisPointer: {
                    type: 'none'
                },
                formatter: function (params: any) {
                    return params[0].name + ' : ' + params[0].value
                }
            },
            xAxis: {
                show: false,
                type: 'value'
            },
            yAxis: [
                {
                    type: 'category',
                    inverse: true,
                    axisLabel: {
                        fontSize: '18px',
                        inside: false,
                        verticalAlign: 'center',
                        padding: [5, 0, 0, 0],
                        margin: 20, //刻度标签与轴线之间的距离
                        color: '#fff',
                        show: true,
                        align: 'right',
                        textStyle: {
                            color: '#fff',
                            fontSize: 16
                        },
                        formatter: function (value: any, index: number) {
                            if (index < 3) {
                                return `{img${index}|} {a|${value}}`
                            } else {
                                return `{b|${index + 1}}{a|${value}}`
                            }
                        },
                        rich: {
                            a: {
                                fontSize: '14px',
                                color: '#fff',
                                fontFamily: 'SourceHanSansCN-Regular',
                                padding: [4, 0, 0, 15],
                                width: 50
                            },
                            b: {
                                fontSize: '18px',
                                color: '#fff',
                                fontFamily: 'Barlow Condensed SemiBold',
                                padding: [4, 15, 0, 15]
                            },
                            img0: {
                                width: 34,
                                height: 24,
                                backgroundColor: {
                                    image: ranking1
                                }
                            },
                            img1: {
                                width: 34,
                                height: 24,
                                backgroundColor: {
                                    image: ranking2
                                }
                            },
                            img2: {
                                width: 34,
                                height: 24,
                                backgroundColor: {
                                    image: ranking3
                                }
                            }
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    data: datas.map((item) => item.name)
                },
                {
                    type: 'category',
                    inverse: true,
                    axisTick: 'none',
                    axisLine: 'none',
                    show: true,
                    axisLabel: {
                        textStyle: {
                            color: '#fff',
                            fontSize: '12'
                        },
                        formatter: '{value}w'
                    },
                    data: datas.map((item) => item.value)
                }
            ],
            series: [
                {
                    name: '值',
                    type: 'bar',
                    zlevel: 1,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 30,
                            color: (params: any) => {
                                return colorList[params.dataIndex]
                            }
                        }
                    },
                    barWidth: 20,
                    data: datas
                },
                {
                    name: '背景',
                    type: 'bar',
                    barWidth: 20,
                    barGap: '-100%',
                    data: maxArr,
                    itemStyle: {
                        normal: {
                            color: '#ededed',
                            barBorderRadius: 30
                        }
                    }
                }
            ]
        }
        myChart.setOption(option)
    })
</script>
<style scoped lang="scss">
    .rank {
        height: 100%;
        width: 100%;
        background: url('../../images/dataScreen-main-rt.png') no-repeat;
        background-size: 100% 100%;
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
        .chart-bg {
            background: url('../../images/rankingChart-bg.png') no-repeat;
            background-size: 100% 100%;
            height: 36px;
            position: absolute;
            top: 67px;
            width: calc(100% - 40px);
            margin: 0px 20px;
            display: flex;
            text-align: center;
            line-height: 36px;
            color: #ff9300;
            .left{
                // flex: 1;
                width: 65px;
            }
            .center{
               width: 76px;
            }
            .right{
                flex: 1;
                text-indent: -60px;
            }
        }

        .content {
            height: calc(100% - 37px);
        }
    }
</style>
