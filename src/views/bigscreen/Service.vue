<template>
  <div class="hai-content service">
    <div class="service-tit">
      <span class="span1">主动服务</span>
    </div>
    <a-row :gutter="50"
           class="vh-hg1">
      <a-col :span="8">
        <div class="sub-tit">企业主动服务分析</div>
        <div class="cp-tit">
          限时回复<span class="sp1">{{formObj.limittimeReplyRate}}</span>
          满意度<span>{{formObj.wellRate}}</span>
        </div>
        <div ref="myPie"
             class="my-pie"></div>
      </a-col>
      <a-col :span="16">
        <div class="sub-tit">跟踪评价
        </div>
        <div class="table-list">
          <a-table ref="table"
                   bordered
                   size="middle"
                   rowKey="id"
                   :dataSource="formObj.questions"
                   :columns="columns1"
                   :loading="loading1">
          </a-table>
        </div>
      </a-col>
    </a-row>

    <a-row :gutter="50"
           class="vh-hg2">
      <a-col :span="8">
        <div class="sub-tit">政策推送与兑现</div>
        <div class="cp-tit">
          精准推送量<span class="sp1">{{formObj.policypushTotal}}</span>
          政策兑换率<span>{{formObj.policypayRate}}</span>
        </div>
        <div ref="myBar"
             class="my-bar"></div>
      </a-col>
      <a-col :span="16">
        <div class="sub-tit">惠企政策TOP5</div>
        <ul class="sul">
          <li v-for="(item,index) in formObj.policies"
              :key="index">
            <span class="ft"
                  :class="'c'+item.policyType">【{{item.policyTypeName}}】</span>{{item.policyContent}}<span class="at">{{item.publishDate}}</span>
          </li>
        </ul>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getActiveservice } from '@/api/manage'
const echarts = require('echarts')
export default {
  name: 'Service',
  data() {
    return {
      formObj: {
        policies: [],
        questions: [],
      },
      loading1: false,
      columns1: [
        { title: '咨询企业', align: 'left', dataIndex: 'enterpriseName' },
        { title: '企业问题', align: 'left', dataIndex: 'questionContent' },
        { title: '责任部门', align: 'center', dataIndex: 'dutyDepart' },
        {
          title: '办理进度',
          align: 'center',
          dataIndex: 'progress,status',
          scopedSlots: { customRender: 'progress,status' },
        },
        { title: '评价', align: 'center', dataIndex: 'operation', scopedSlots: { customRender: 'operation' } },
      ],
    }
  },
  created() {
    this.getDatas()
  },
  mounted() {},
  methods: {
    getDatas() {
      getActiveservice().then((res) => {
        if (res.success) {
          this.formObj = res.result
          let arr = res.result.questionCollects
          let arrXY = res.result.policypushCollects
          let arrNew = []
          let arrX = []
          let arrY = []
          let arrY2 = []
          for (let i = 0; i < arr.length; i++) {
            arrNew.push({
              name: arr[i].questionTypeName,
              value: arr[i].questionAmount,
            })
          }
          for (let n = 0; n < arrXY.length; n++) {
            arrX.push(arrXY[n].policyTypeName)
            arrY.push(arrXY[n].policyPayAmount)
            arrY2.push(arrXY[n].policyPushAmount)
          }
          this.setPie(arrNew)
          this.setBar(arrX, arrY, arrY2)
        }
      })
    },
    setPie(arr) {
      let option = {
        tooltip: {
          show: false,
        },
        legend: {
          show: false,
        },
        graphic: [
          {
            type: 'text',
            left: 'center',
            top: '45%',
            style: {
              text: this.formObj.finishTotal,
              textAlign: 'center',
              fill: '#f1d809',
              fontSize: 24,
            },
          },
          {
            type: 'text',
            left: 'center',
            top: '55%',
            style: {
              text: '办理数量',
              textAlign: 'center',
              fill: '#fff',
              fontSize: 18,
            },
          },
        ],
        series: [
          {
            name: '办理数量',
            type: 'pie',
            radius: ['60%', '70%'],
            avoidLabelOverlap: false,
            label: {
              formatter: '{b}\n {c}/{d}%',
              color: '#03f6d8',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold',
              },
            },
            data: arr,
          },
        ],
      }
      let myChart = echarts.init(this.$refs.myPie)
      myChart.setOption(option)
    },
    setBar(xData2, data1, data2) {
      let option = {
        // backgroundColor: '#021132',
        tooltip: {
          trigger: 'item',
        },
        grid: {
          left: 100,
          bottom: 100,
        },
        xAxis: {
          data: xData2,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            textStyle: {
              color: '#fff',
              fontSize: 16,
            },
            margin: 20, //刻度标签与轴线之间的距离。
          },
        },
        yAxis: {
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: '#fff',
              fontSize: 12,
            },
          },
        },
        series: [
          {
            //三个最低下的圆片
            name: '',
            type: 'pictorialBar',
            symbolSize: [45, 25],
            symbolOffset: [0, 10],
            z: 12,
            itemStyle: {
              opacity: 1,
              color: function (params) {
                let a = params.name
                if (a === '科技政策') {
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: '#FF9A22', // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#FFD56E', // 100% 处的颜色
                      },
                    ],
                    false
                  )
                } else if (a === '人才政策' || a === '上市政策') {
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: '#00EC28', // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#5DF076', // 100% 处的颜色
                      },
                    ],
                    false
                  )
                } else if (a === '财税政策' || a === '国家给予政策') {
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: '#12B9DB', // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#6F8EF2', // 100% 处的颜色
                      },
                    ],
                    false
                  )
                }
              },
            },
            data: [1, 1, 1, 1, 1],
          },
          //下半截柱状图
          {
            name: '兑现数',
            type: 'bar',
            barWidth: 45,
            barGap: '-100%',
            itemStyle: {
              //lenged文本
              opacity: 0.7,
              color: function (params) {
                let a = params.name
                if (a === '科技政策') {
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: '#FF9A22', // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#FFD56E', // 100% 处的颜色
                      },
                    ],
                    false
                  )
                } else if (a === '人才政策' || a === '上市政策') {
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: '#00EC28', // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#5DF076', // 100% 处的颜色
                      },
                    ],
                    false
                  )
                } else if (a === '财税政策' || a === '国家给予政策') {
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: '#12B9DB', // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#6F8EF2', // 100% 处的颜色
                      },
                    ],
                    false
                  )
                }
              },
            },
            data: data1,
          },
          {
            // 替代柱状图 默认不显示颜色，是最下方柱图（邮件营销）的value值 - 20
            type: 'bar',
            barWidth: 45,
            barGap: '-100%',
            stack: '广告',
            itemStyle: {
              color: 'transparent',
            },
            data: data1,
          },
          {
            name: '总数', //头部
            type: 'pictorialBar',
            symbolSize: [45, 25],
            symbolOffset: [0, -10],
            z: 12,
            symbolPosition: 'end',
            itemStyle: {
              color: '#163F7A',
              opacity: 1,
            },
            data: data2,
          },
          {
            name: '总数',
            type: 'pictorialBar',
            symbolSize: [45, 25],
            symbolOffset: [0, -10],
            z: 12,
            itemStyle: {
              opacity: 1,
              color: function (params) {
                let a = params.name
                if (a === '科技政策') {
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: '#FF9A22', // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#FFD56E', // 100% 处的颜色
                      },
                    ],
                    false
                  )
                } else if (a === '人才政策' || a === '上市政策') {
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: '#00EC28', // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#5DF076', // 100% 处的颜色
                      },
                    ],
                    false
                  )
                } else if (a === '财税政策' || a === '国家给予政策') {
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: '#12B9DB', // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#6F8EF2', // 100% 处的颜色
                      },
                    ],
                    false
                  )
                }
              },
            },
            symbolPosition: 'end',
            data: data1,
          },
          {
            name: '总数',
            type: 'bar',
            barWidth: 45,
            barGap: '-100%',
            z: 0,
            itemStyle: {
              color: '#163F7A',
              opacity: 0.7,
            },
            data: data2,
          },
        ],
      }
      let myChart = echarts.init(this.$refs.myBar)
      myChart.setOption(option)
    },
  },
}
</script>
<style>
.hai-content.service .ant-table-tbody > tr > td {
  background-color: #000c34;
  color: #91e5ce !important;
  font-size: 16px;
}
</style>
<style scoped>
.hai-content {
  padding: 0 30px;
}
.vh-hg1 {
  height: 48vh;
}
.vh-hg2 {
  height: 38vh;
}
.hai-content .sub-tit {
  color: #fff;
  font-size: 24px;
  padding: 10px 0 20px;
  font-weight: 600;
}
.hai-content .sul {
  color: #77bda6;
  font-size: 20px;
}
.hai-content .sul li {
  margin: 8px 0;
}
.hai-content .sul .ft {
  display: inline-block;
  width: 180px;
}
.hai-content .sul .c1 {
  color: #e7334b;
}
.hai-content .sul .c2 {
  color: #ffa800;
}
.hai-content .sul .c3 {
  color: #28f4a6;
}
.hai-content .sul .c4 {
  color: #1e89e5;
}
.hai-content .sul .c5 {
  color: #e7334b;
}
.hai-content .sul .at {
  float: right;
  color: #247bc5;
}
.hai-content .my-pie {
  height: 30vh;
  padding-top: 60px;
}
.hai-content .my-bar {
  height: 30vh;
}
.hai-content .cp-tit {
  background-color: #00134d;
  text-align: center;
  color: #fff;
  font-size: 16px;
  padding-bottom: 3px;
}
.hai-content .cp-tit span {
  color: #fcf000;
  font-size: 22px;
  margin-left: 4px;
}
.hai-content .cp-tit .sp1 {
  margin-right: 20px;
}
.col-t1 .sp1 {
  color: #1bfb2b;
  margin-right: 5px;
}
.col-t2 .anticon {
  font-size: 28px;
}
</style>