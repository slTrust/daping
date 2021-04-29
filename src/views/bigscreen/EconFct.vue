<template>
  <div class="hai-content">
    <div class="service-tit">
      <span class="span1">区域经济预测</span>
    </div>
    <main>
      <div class="lside">
        <div class="preview"></div>
      </div>
      <div class="rside">
        <div ref="echartId" class="my-echarts"></div>
        <div class="info">
          <div class="title">主要风险因素</div>
          <div class="box">
            <div class="line">
              重大突发事件(自然灾害、舆情、健康): <span class="value">15</span>
            </div>
            <div class="line">
              外部经济制裁: <span class="value">15</span>
            </div>
            <div class="line">
              金融风险: <span class="value">15</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
const echarts = require('echarts')
export default {
  name: 'Service',
  data() {
    return {}
  },
  mounted() {
    let xData =  ['2020/05/29', '2020/05/29', '2020/05/29', '2020/05/29', '2020/05/29', '2020/05/29'];
    let yAreaDataTotal = [140, 232, 101, 264, 90, 340];
    let yAreaDataPeopleAvg = [120, 282, 111, 234, 220, 340];
    let yLineData = [320, 132, 201, 334, 190, 130];
    this.initArea(xData,yAreaDataTotal,yAreaDataPeopleAvg,yLineData)
  },
  methods: {
    initArea(xData,yAreaDataTotal,yAreaDataPeopleAvg,yLineData) {
      let myChart = echarts.init(this.$refs.echartId)
      let _this = this
      var option
      option = {
        color: ['#80FFA5', '#00DDFF', '#37A2FF'],
        title: {
          text: '产业增长趋势',
          top: 30,
          left:'290',
          textStyle: {
            color: '#fff',
            fontSize: 28,
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        legend: {
          data: ['总产值增长趋势', '人均产值增长趋势', '预测趋势'],
          top:80,
          right:20,
          textStyle: {
            color: '#fff',
          },
        },
        grid: {
          top: '25%',
          left: '5%',
          right: '5%',
          bottom: '5%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
              show: true,
              interval: 0,
              rotate: 0,
              margin: 5,
              textStyle: {
                color: '#c3dbff', 
                fontSize: 12, 
              },
            },
            data: xData,
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              show: true,
              interval: 0,
              rotate: 0,
              margin: 5,
              textStyle: {
                color: '#c3dbff', //更改坐标轴文字颜色
                fontSize: 12, //更改坐标轴文字大小
              },
            },
          },
        ],
        series: [
          {
            name: '总产值增长趋势',
            type: 'line',
            stack: '总量',
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              color: 'rgba(140, 93, 135,1)',
            },
            emphasis: {
              focus: 'series',
            },
            data: yAreaDataTotal,
          },
          {
            name: '人均产值增长趋势',
            type: 'line',
            stack: '总量',
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              color: 'rgba(70, 144, 189,1)',
            },
            emphasis: {
              focus: 'series',
            },
            data: yAreaDataPeopleAvg ,
          },
          {
            name: '预测趋势',
            type: 'line',
            stack: '总量',
            symbolSize: 20,
            smooth: true,
            lineStyle: {
              width: 4,
              color: 'rgba(205,205,205)',
            },
            emphasis: {
              focus: 'series',
            },
            data: yLineData,
          },
        ],
      }
      option && myChart.setOption(option)
    },
  },
}
</script>
<style scoped lang="less">
main {
  padding-top: 10vh;
  padding-bottom:10vh;
  height: 90vh;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .lside {
    height: 100%;
    flex: 3;
    background: red;
    .preview{
      height: 100%;
      width: 100%;
      background: url('../../assets/bigscreen/p6_01.png');
    }
  }
  .rside {
    height: 100%;
    flex: 2;
    display: flex;
    flex-direction: column;
    .my-echarts {
      flex: 1;
    }
    .info {
      flex: 1;
      width:100%;
      .title{
        text-align: center;
        line-height: 50px;
        font-size: 24px;
        color:#fff;
      }
      .box{
        margin:20px;
        border:1px solid rgb(0,56,139);
        padding-left:20px;
        .line{
          line-height: 50px;
          font-size: 20px;
          color:#fff;
          .value{
            color:yellow;
          }
        }
      }
    }
  }
}
</style>