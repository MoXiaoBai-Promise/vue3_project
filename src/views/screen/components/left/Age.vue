<template>
    <div class="gender">
        <div class="top">
            <div class="left">
                <p class="title">年龄比例</p>
                <p class="bg"></p>
            </div>
        </div>

        <div class="content" ref="perChart"></div>
    </div>
</template>
<script lang="ts">
    export default {
        name: 'Age'
    }
</script>
<script setup lang="ts">
    import * as echarts from 'echarts'
    import { ref, onMounted } from 'vue'

    let perChart = ref()
    onMounted(() => {
        let myChart = echarts.init(perChart.value)
        const data = [
            {
                name: '0-10岁',
                value: 854
            },
            {
                name: '10-20岁',
                value: 1789
            },
            {
                name: '20-40岁',
                value: 2243
            },
            {
                name: '40-60岁',
                value: 2671
            },
            {
                name: '60-80岁',
                value: 1573
            },
            {
                name: '80岁以上',
                value: 789
            }
        ]
        const color = [
            '#3591FF',
            '#31B571',
            '#3EF6D1',
            '#C1CC77',
            '#3351E3',
            '#FFD700',
        ]
        const legendData = data.map((item, index) => {
            return {
                name: item.name,
                itemStyle: {
                    color: color[index] || ''
                },
                textStyle: {
                    rich: {
                        title: {
                            color: '#CDCEDA',
                            fontSize: 14,
                            width: 70,
                            fontWeight: 'bold'
                        },
                        p: {
                            fontSize: 14,
                            width: 55,
                            color: '#02D0C5',
                            shadowColor: '#000',
                            inactiveColor: '#000',
                            fontWeight: 'bold'
                        }
                    }
                }
            }
        })
        let option = {
            //你的代码
            // backgroundColor: '#000',
            legend: {
                // type: 'scroll',
                show: true,
                orient: 'vertical',
                right: 5,
                top: 'center',
                itemGap: 25,
                borderRadius: 5,
                itemWidth: 10,
                icon: 'circle',
                itemHeight: 10,
                data: legendData,
                formatter: function (name: any) {
                    const name1 = name
                    const value = data.filter((item) => item.name === name)[0]
                        .value
                    // const proportion = data.filter((item) => item.name === name)[0].proportion;
                    return `{title|${name1}}{p||   ${value}人}`
                }
            },
            tooltip: {
                trigger: 'item',
                backgroundColor: 'rgba(13,5,30,.6)',
                borderWidth: 1,
                borderColor: '#32A1FF',
                padding: 5,
                textStyle: {
                    color: '#fff'
                },
                formatter: (data: any) => {
                    const { name = '', value = '' } = data.data || {}
                    const name1 =
                        name.length > 10
                            ? `${name.substring(0, 10)} <br /> ${name.substring(
                                  10,
                                  name.length
                              )}`
                            : name
                    return `${name1} ${value}人`
                }
            },
            title: {
                text: '{a|9919}{b|人}',
                textStyle: {
                    rich: {
                        a: {
                            color: '#fff',
                            fontSize: 20,
                            align: '35%'
                        },
                        b: {
                            fontSize: 20,
                            color: '#fff',
                            align: '35%'
                        }
                    }
                },
                x: '38%',
                y: '45%'
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: ['50%', '90%'],
                    center: ['45%', '50%'],
                    startAngle: 90,
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 103, 255, 0.2)',
                        shadowOffsetX: -5,
                        shadowOffsetY: 5,

                        color: function (params: any) {
                            return color[params.dataIndex % 6]
                        }
                    },
                    label: {
                        show: false
                    },
                    labelLine: {},
                    data: data
                }
            ],
            grid: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        }

        // 使用刚指定的配置项和数据显示图表
        myChart.setOption(option)
    })
</script>
<style scoped lang="scss">
    .gender {
        width: 100%;
        height: 100%;
        background: url('../../images/dataScreen-main-lb.png') no-repeat;
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
        .content {
            color: rgb(30, 198, 212);
            height: calc(100% - 37px);
        }
    }
</style>
