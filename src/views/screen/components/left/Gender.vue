<template>
    <div class="gender">
        <div class="top">
            <div class="left">
                <p class="title">男女比例</p>
                <p class="bg"></p>
            </div>
        </div>

        <div class="content">
            <div class="top">
                <div class="man">
                    <div><img src="../../images/man.png" /></div>
                </div>
                <div class="woman">
                    <div><img src="../../images/woman.png" /></div>
                </div>
            </div>
            <div class="center">
                <p style="color: #007afe">45%</p>
                <p style="color: #ff4b7a">55%</p>
            </div>
            <!-- 柱状图 -->
            <div ref="barChart" class="barChart"></div>
        </div>
    </div>
</template>
<script lang="ts">
    export default {
        name: 'Gender'
    }
</script>
<script setup lang="ts">
    import * as echarts from 'echarts'
    import { ref, onMounted } from 'vue'

    let barChart = ref()
    onMounted(() => {
        let myChart = echarts.init(barChart.value)

        // 指定图表的配置项和数据
        let option = {
            title: {
                text: '',
                left: 'center', // 设置标题水平居中
                top: -5, // 设置标题垂直居中
                textStyle: {
                    color: 'red' // 设置标题文字颜色为红色
                }
            },
            tooltip: {
                show: false // 禁用提示框显示
            },
            xAxis: {
                show: false
            },
            yAxis: {
                show: false,
                type: 'category'
            },
            series: [
                {
                    type: 'bar',
                    data: [45],
                    itemStyle: {
                        color: '#007afe', // 设置柱体颜色为浅蓝色
                        barBorderRadius: 20 // 设置柱体圆角，顺序为左上、右上、右下、左下
                    },
                    barWidth: 20,
                    z: 999
                },
                {
                    type: 'bar',
                    data: [100],
                    itemStyle: {
                        color: '#ff4b7a', // 设置柱体颜色为浅蓝色
                        barBorderRadius: 20 // 设置柱体圆角，顺序为左上、右上、右下、左下
                    },
                    barWidth: 20,
                    barGap: '-100%' //
                }
            ],
            grid: {
                left: 0,
                right: 0,
                top: -30,
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
        background: url('../../images/dataScreen-main-lc.png') no-repeat;
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
            .top {
                height: 65%;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                .man {
                    background: url('../../images/man-bg.png') no-repeat;
                    background-size: 100% 100%;
                    width: 111px;
                    height: 116px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .woman {
                    background: url('../../images/woman-bg.png') no-repeat;
                    background-size: 100% 100%;
                    width: 111px;
                    height: 116px;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
            .barChart {
                height: 25%;
                width: 62%;
                margin: 0 auto;
                padding-left: 20px;
            }
            .center {
                height: 10%;
                margin: 10px 0 5px 0;
                display: flex;
                justify-content: space-evenly;
                margin-left: 20px;
                p {
                    width: 118.11px;
                    text-align: center;
                }
            }
        }
    }
</style>
