<template>
  <!-- 大屏-主屏 -->
  <div class="led-main">
    <a-row class="led-main-board">
      <a-row class="led-main-title"><div class="logo"></div></a-row>
      <!-- 左屏 -->
      <a-col class="left-board">
        <main-left ref="mainLeft"></main-left>
      </a-col>
      <!-- 中间屏 -->
      <a-col class="center-board">
      </a-col>
      <!-- 右屏 -->
      <a-col class="right-board">
        <main-right ref="mainRight"></main-right>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import { setRootFontSize } from '@/utils/util'
  import mainLeft from '@/views/bigscreen/main/MainLeft'
  import mainRight from '@/views/bigscreen/main/MainRight'
  export default {
    components: {
      'main-left': mainLeft,
      'main-right': mainRight
    },
    data() {
      return {
      }
    },
    computed: {
    },
    mounted () {
      // 监听屏幕高度
      window.onresize = () => {
        setRootFontSize();
        this.$refs.mainLeft.resize();
        this.$refs.mainRight.resize();

        return (() => {
          window.screenHeight = document.body.clientHeight;
          this.screenHeight = window.screenHeight;
        })();
      }
    },
    created () {
      setRootFontSize();
    },
    methods: {
    }
  }
</script>

<style lang="less" scoped>
</style>
<style lang="less" scoped>
  @import '~@assets/fonts/fonts.less';
  @import '~@assets/less/bigscreen_main.less';

  @images: "~@assets/bigscreen";

  .ellipsis{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .led-main {
    font-family: "SourceHanSansCN-Regular";
    overflow-x: scroll;
    width: 100vw; //在大屏下要改成100vw
    height: 100vh;
    /*min-width: 4095px; // 最小适应1377*766*/
    /*min-height: 768px;*/
    overflow-y: hidden;
    // font-size: 14px;
  }
  .led-main-title{
    position:absolute;
    // width: 100%;
    height: auto;
    text-align: center;
    margin-left: calc(50% - 45rem);
    .logo{
      margin-top: 2rem;
      width: 90rem;
      height: 8rem;
      background: url('@{images}/bigscreen_logo.png') center 0 escape("/") 100% auto no-repeat;
    }
  }
  .led-main-board {
    width: 100%;
    height: 100%;
    padding-bottom: calc(100vh - 100%);
    box-sizing: border-box;
    display: flex;
    /*background-color: #00082e;*/
    background: #00082e url('@{images}/bg.jpg') 0 0 escape("/") 100% 100% no-repeat;
  }
  .left-board {
    width: 17%;
    /*width: 100%;*/
    height: 100%;
    /*flex: 1;*/
    flex-shrink: 0;
    color: #b3ccf8;
    color: #ff758d;
    padding: 3rem 2rem 2rem 4rem;
    overflow: hidden;
    font-size: 0;
  }
  .center-board{
    width: 65%;
    height: 100%;
    flex: 4;
    font-size: 0;
    overflow: hidden;
  }
  .right-board {
    width: 18%;
    height: 100%;
    /*flex: 1;*/
    padding: 3rem 2rem 2rem 4rem;
    font-size: 0;
    overflow: hidden;
  }
</style>