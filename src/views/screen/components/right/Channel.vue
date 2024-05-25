<template>
    <div class="channel">
        <div class="top">
            <div class="left">
                <p class="title">预约渠道数据统计</p>
                <p class="bg"></p>
            </div>
        </div>
        <div ref="ecahrt" class="content"></div>
    </div>
</template>
<script lang="ts">
    export default {
        name: 'Channel'
    }
</script>
<script setup lang="ts">
    import * as echarts from 'echarts'
    import { ref, onMounted } from 'vue'
    const ecahrt = ref()
    onMounted(() => {
        const myChart = echarts.init(ecahrt.value)

        const trafficWay = [
            {
                name: '智慧文旅平台',
                value: 40
            },
            {
                name: '美团',
                value: 30
            },
            {
                name: '飞猪',
                value: 20
            },
            {
                name: '同城',
                value: 10
            },
        ]
        let sum = trafficWay.reduce((cur, pre) => {
            return cur + pre.value
        }, 0)
        let data = []
        let legendData = []
        var color = [ '#2276FC', '#EE6F7C' ,'#FFADC4','#36E3E3',]
        for (var i = 0; i < trafficWay.length; i++) {
            let name = trafficWay[i].name + '  ' + trafficWay[i].value + '%'
            legendData.push(name)
            data.push(
                {
                    value: trafficWay[i].value,
                    name: name,
                    itemStyle: {
                        borderWidth: 0,
                        borderRadius: 5,
                        shadowBlur: 10,
                        borderColor: color[i],
                        shadowColor: color[i]
                    }
                },
                {
                    value: sum / 100, // 控制每个环形之间的间隙
                    name: '',
                    itemStyle: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                        color: 'rgba(0, 0, 0, 0)',
                        borderColor: 'rgba(0, 0, 0, 0)',
                        borderWidth: 0
                    }
                }
            )
        }
        let seriesOption = [
            {
                name: '',
                type: 'pie',
                clockwise: false,
                radius: ['50%', '70%'],
                center: ['30%', '50%'],
                emphasis: {
                    scale: false
                },
                label: {
                    show: false
                },
                data: data
            }
        ]
        const option = {
            // title: {
            //     text: '本月总量',
            //     subtext: sum,
            //     textStyle: {
            //         color: '#19E1E3',
            //         fontSize: 18,
            //         padding: [0, 0, 25, 0]
            //     },
            //     subtextStyle: {
            //         fontSize: 28,
            //         fontWeight: 'bolder',
            //         color: '#19E1E3'
            //     },
            //     x: '25%',
            //     y: '43%'
            // },
            color: color,
            tooltip: {
                show: false
            },
            legend: {
                icon: 'rect',
                itemWidth: 16,
                itemHeight: 8,
                itemStyle: {
                    borderWidth: 3
                },
                orient: 'vertical',
                data: legendData,
                right: '10%',
                top: 'center',
                align: 'left',
                textStyle: {
                    color: '#fff',
                    fontSize: 16,
                    padding: [0, 0, 0, 10]
                },
                itemGap: 20 // 图例之间的间隔
            },
            toolbox: {
                show: false
            },
            series: seriesOption
        }
        myChart.setOption(option)
    })
</script>
<style scoped lang="scss">
    .channel {
        width: 100%;
        height: 100%;
        background: url('../../images/dataScreen-main-rb.png') no-repeat;
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
        .content {
            height: calc(100% - 37px);
        }
    }
</style>
