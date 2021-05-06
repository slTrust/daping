<template>
  <div class="scroll_table_container">
    <div class="scroll_table_wrapper"
         style="">
      <div class="tempTableWrapper">
        <table class="tempTable data_table">
          <thead>
            <tr>
              <th>产品列表</th>
              <th>竞争产品</th>
              <th>竞争企业</th>
            </tr>
          </thead>
        </table>
      </div>
      <vue-seamless-scroll :data="scroll_data"
                           :class-option="defaultOption">

        <table class="ul-scoll data_table">
          <tr v-for="(item, index) in scroll_data"
              :key='index'>
            <td>
              {{index}}-{{item.c0}}
            </td>
            <td>
              {{item.c1}}
            </td>
            <td>
              {{item.c2}}
            </td>
          </tr>
        </table>
      </vue-seamless-scroll>
    </div>
  </div>
</template>
 
<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
export default {
  name: 'SCROLL_TABLE',
  components: {
    vueSeamlessScroll,
  },
  data() {
    return {
      scroll_data: [
        { id: '1', c0: 'anyData', c1: '日志易', c2: '希望在2021年2月将拟购生态城土' },
        { id: '1', c0: 'anyData', c1: '日志易', c2: '希望在2021年2月将拟购生态城土' },
        { id: '2', c0: 'anyData', c1: '日志易', c2: '希望在2021年2月将拟购生态城土' },
        { id: '3', c0: 'anyData', c1: '日志易', c2: '希望在2021年2月将拟购生态城土' },
        { id: '4', c0: 'anyData', c1: '日志易', c2: '希望在2021年2月将拟购生态城土' },
        { id: '5', c0: 'anyData', c1: '日志易', c2: '希望在2021年2月将拟购生态城土' },
        { id: '6', c0: 'anyData', c1: '日志易', c2: '希望在2021年2月将拟购生态城土' },
        { id: '7', c0: 'anyData', c1: '日志易', c2: '希望在2021年2月将拟购生态城土' },
        { id: '8', c0: 'anyData', c1: '日志易', c2: '希望在2021年2月将拟购生态城土' },
      ],
    }
  },
  // 监听属性 类似于data概念
  computed: {
    defaultOption() {
      return {
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      }
    },
  },
  created() {},
  mounted() {},
}
</script>
<style scoped lang="less">
.scroll_table_wrapper {
  width: 100%;
  height: 400px;
  overflow: hidden;
  border: 1px solid #283dff;
  position: relative;

  .data_table {
    border-collapse: collapse;
    border: 1px solid #011b70;
    tr {
      th:nth-child(1),
      td:nth-child(1) {
        width: 20%;
      }
      th:nth-child(2),
      th:nth-child(3),
      td:nth-child(2),
      td:nth-child(3) {
        width: 40%;
      }
    }
  }
  .tempTableWrapper {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 43px;
    z-index: 10;
    overflow: hidden;
  }
  .tempTable {
    width: 100%;
    background-color: #000c34;
    color: #91e5ce !important;
    border-collapse: collapse;
    border: 1px solid #011b70;
    font-size: 16px;
    line-height: 40px;
    thead,
    tbody,
    thead tr,
    tbody,
    tr {
      width: 100%;
    }
  }
  .ul-scoll {
    width: 100%;
    tr td {
      background-color: #000c34;
      color: #91e5ce !important;
      font-size: 16px;
      line-height: 50px;
    }
  }
}
</style>　