<template>
    <div class="map">
        <div class="maptop">
            景区实时客流量
        </div>
        <div ref="map" class="content"></div>
    </div>
</template>
<script lang="ts">
    export default {
        name: 'Map'
    }
</script>
<script setup lang="ts">
    import chinaMap from './chinaMap.json'
    import * as echarts from 'echarts'
    import { ref, onMounted } from 'vue'
    let map = ref()
    echarts.registerMap('china', chinaMap as any)
    onMounted(() => {
        let myChart = echarts.init(map.value)
        const planePath =
            'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z'
        const points = [
            { value: [116.405285, 39.904989], itemStyle: { color: '#FFFA00' } },
            { value: [113.54909, 22.198951], itemStyle: { color: '#00EEFF' } },
            { value: [91.132212, 29.660361], itemStyle: { color: '#00EEFF' } },
            { value: [126.642464, 45.756967], itemStyle: { color: '#00EEFF' } },
            { value: [87.617733, 43.792818], itemStyle: { color: '#00EEFF' } }
        ]
        const colors:string[] = [
            '#FF5733',
            '#33FF88',
            '#3366FF',
            '#FF33FF',
            '#FFFF33',
            '#33FFFF',
            '#FF3366',
            '#33FF33',
            '#9933FF',
            '#33FFCC'
        ]

        const coordsList = [
            [
                [116.405285, 39.904989],
                [113.54909, 22.198951]
            ],
            [
                [116.405285, 39.904989],
                [91.132212, 29.660361]
            ],
            [
                [116.405285, 39.904989],
                [126.642464, 45.756967]
            ],
            [
                [116.405285, 39.904989],
                [87.617733, 43.792818]
            ],
            [
                [87.617733, 43.792818],
                [116.405285, 39.904989]
            ],
            [
                [117.283042, 31.86119],
                [101.778916, 36.623178]
            ],
            [
                [106.713478, 26.578343],
                [117.283042, 31.86119]
            ],
            [
                [125.3245, 43.886841],
                [117.283042, 31.86119]
            ],
            [
                [110.33119, 20.031971],
                [117.283042, 31.86119]
            ],
            [
                [118.767413, 32.041544],
                [116.405285, 39.904989]
            ]
        ]
        const seriesData: any = []
        for (const index in coordsList) {
            seriesData.push({
                coords: coordsList[index],
                lineStyle: {
                    color: colors[(index as any) % 10] // 自定义颜色
                }
            })
        }
        const option = {
            geo: {
                map: 'china',
                roam: true, // 是否开启放大缩小/拖拽功能
                zoom: 1.2, // 缩放比列
                layoutCenter: ['50%', '70%'], // 地图中心点位置
                layoutSize: '100%',
                label: {
                    show: true,
                    color: '#fff'
                },
                itemStyle: {
                    areaColor: '#12235c',
                    borderColor: '#2ab8ff',
                    borderWidth: 0.5,
                    shadowColor: 'rgba(0,54,255, 0.4)',
                    shadowBlur: 100
                },
                emphasis: {
                    //区域激活时的样式
                    itemStyle: {
                        areaColor: '#02102b'
                    },
                    label: {
                        color: '#fff',
                        fontSize: '20px'
                    }
                }
            },
            series: [
                // 添加迁移线数据
                {
                    type: 'lines',
                    data: seriesData,
                    effect: {
                        show: true,
                        period: 5, //箭头指向速度，值越小速度越快
                        trailLength: 0, //特效尾迹长度[0,1]值越大，尾迹越长重
                        //symbol: 'arrow', //箭头图标
                        symbol: planePath,
                        symbolSize: 15 //图标大小
                    },
                    lineStyle: {
                        color: '#00eaff',
                        width: 1, //尾迹线条宽度
                        opacity: 0.7, //尾迹线条透明度
                        curveness: 0.3 //尾迹线条曲直度
                    }
                },
                {
                    // 带有涟漪特效动画的散点（气泡）图
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    showEffectOn: 'render',
                    zlevel: 1,
                    rippleEffect: {
                        number: 3, // 波纹的数量。
                        period: 5, // 动画的周期，秒数。
                        scale: 17, // 动画中波纹的最大缩放比例。
                        brushType: 'fill' // 波纹的绘制方式，可选 'stroke' 和 'fill'。
                    },
                    symbolSize: 2,
                    data: points
                }
            ]
        }

        myChart.setOption(option)
    })
</script>
<style scoped lang="scss">
    .map {
        position: relative;
        height: 100%;
        .content {
            height: 100%;
        }
        .maptop{
            background: url('../../images/map-title-bg.png') no-repeat;
            background-size: 100% 100%;
            height: 35px;
            width: 300px;
            position: absolute;
            top: 100px;
            left: 30px;
            text-align: left;
            text-indent: 40px;
            line-height: 35px;
            color: white;
        }
    }
</style>
