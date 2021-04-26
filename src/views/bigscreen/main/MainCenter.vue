<template>
<!-- 大屏-主屏 -->
    <div class="led-main">
        </div>
</template>

<script>
  import countTo from 'vue-count-to'
  import vueSeamlessScroll from 'vue-seamless-scroll'
  import {queryEnterpriseProduction,queryIndustryStatus} from '@/api/bigScreenAPI'
  export default {
    name: 'LedMain',
    components: { countTo, vueSeamlessScroll },
    data() {
      return {

      }
    },
    computed: {
    },
    mounted () {

        // 监听屏幕高度
        window.onresize = () => {

            return (() => {
                window.screenHeight = document.body.clientHeight;
                this.screenHeight = window.screenHeight;
            })();
        }
    },
    created () {
    },
    methods: {

    }
  }
</script>

<style lang="css" scoped>
    /* ::-webkit-scrollbar {
        width: 7px;
        height: 7px;
    }
    ::-webkit-scrollbar, ::-webkit-scrollbar-track-piece {
        background-color: transparent;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background-color: rgba(144,146,152,.3);
    }
    ::-webkit-scrollbar, ::-webkit-scrollbar-track-piece {
        background-color: transparent;
    } */
</style>
<style lang="less" scoped>
    @import '~@assets/fonts/fonts.less';
    @import '~@assets/less/bigscreen_main.less';
</style>