<template>
    <div id="content">
        <div id="screen" ref="screen">
            <div class="top">
                <ScreeTop></ScreeTop>
            </div>
            <div class="bootom">
                <div class="left">
                    <Tourist class="tourist"></Tourist>
                    <Gender class="gender"></Gender>
                    <Age class="age"></Age>
                </div>
                <div class="center">
                    <Map class="map"></Map>
                    <Line class="line"></Line>
                </div>
                <div class="right">
                    <Rank class="rank"></Rank>
                    <Contrast class="contrast" ></Contrast>
                    <Channel class="channel" ></Channel>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    export default {
        name: 'Screen'
    }
</script>
<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import ScreeTop from './components/ScreeTop.vue'
    import Age from './components/left/Age.vue'
    import Gender from './components/left/Gender.vue'
    import Tourist from './components/left/Tourist.vue'
    import Line from './components/center/Line.vue'
    import Map from './components/center/Map.vue'
    import Rank from './components/right/Rank.vue'
    import Contrast from './components/right/Contrast.vue'
    import Channel from './components/right/Channel.vue'
    let screen = ref() //screen的vc实例

    //已挂载完毕就需要进行缩放比例的调整
    onMounted(()=>{
        screen.value.style.transform = ` scale(${getScale()}) translate(-50%,-50%)`
    })
    //缩放比例计算函数
    function getScale(w = 1920, h = 1080) {
        const ww = window.innerWidth / w
        const wh = window.innerHeight / h
        return ww > wh ? wh : ww
    }
    window.onresize = ()=>{
        screen.value.style.transform = ` scale(${getScale()}) translate(-50%,-50%)`
    }
</script>
<style scoped lang="scss">
    #content {
        background: url('./images/bg.png');
        background-size: cover;
        width: 100vw;
        height: 100vh;
        #screen {
            width: 1920px;
            height: 1080px;
            position: fixed;
            left: 50%;
            top: 50%;
            transform-origin: top  left;
            .top{
                width: 100%;
                height: 40px;
            }
            .bootom {
                height: 1040px;
                display: flex;
                .left {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    .age{
                        flex: 1;
                    }
                    .gender{
                        flex: 1;
                    }
                    .tourist{
                        flex: 1.5;
                    }
                }
                .center {
                    flex: 2;
                    display: flex;
                    flex-direction:column;
                    height: calc(100% - 20px);
                    margin-bottom: 20px;
                    margin: 0 20px;
                    .map{
                        flex: 4;
                    }
                    .line{
                        flex: 1;
                    }
                }
                .right {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    height: calc(100% - 30px);
                    margin: 10px 0 20px 0;
                    position: relative;
                    .rank{
                        flex:1.5;
                    }
                    .contrast{
                        flex:1;
                    }
                    .channel{
                        flex:1;
                    }
                }
            }
        }
    }
</style>
