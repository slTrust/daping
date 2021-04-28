<template>
  <div class="hai-content">
    <div class="service-tit">
      <span class="span1">企业画像</span>
    </div>
    <main>
      <div class="ht"></div>
      <div class="lside"
           v-if="baseInfo!=null">
        <div class="recommendPNG"
             v-show="baseInfo.recommendFlag==1"></div>
        <div class="recommendOffice">推荐办公区：{{baseInfo.recommendOffice}}</div>
        <div class="content">
          <div class="l-info">
            <div class="l-inner">
              <div class="logo">
                <img :src="baseInfo.logoUrl"
                     alt="">
              </div>
              <div class="name">{{baseInfo.name}}</div>
              <ul>
                <li>
                  <div class="label">企业规模:</div>
                  <div class="value">{{baseInfo.scaleMin}}-{{baseInfo.scaleMax}}</div>
                </li>
                <li>
                  <div class="label">企业性质:</div>
                  <div class="value">{{baseInfo.econKind}}</div>
                </li>
                <li>
                  <div class="label">融资情况:</div>
                  <div class="value">{{baseInfo.financingDt}} {{baseInfo.financingRound}}</div>
                </li>
                <li>
                  <div class="label">联系电话:</div>
                  <div class="value">{{baseInfo.tel}}</div>
                </li>
              </ul>
              <div class="score">
                <div class="label">企业实力指数</div>
                <div class="value">{{baseInfo.strength}}</div>
              </div>
              <div class="score">
                <div class="label">企业风险指数</div>
                <div class="value">{{baseInfo.risk}}</div>
              </div>
            </div>
          </div>
          <div class="r-charts">
            <div ref="chartRadar"
                 class="chart chart1"></div>
            <div ref="chartColumn"
                 class="chart chart2"></div>
          </div>
        </div>
      </div>
      <div class="rside">
        <div ref="echartId"
             class="my-echarts"></div>
      </div>
    </main>
  </div>
</template>

<script>
// 数据接口url
// http://121.36.9.239:9999/bigscreen/report/queryEnterprisePortray?enterpriseId=91310000792783700P
import { getPortray } from '@/api/manage'
const echarts = require('echarts')
export default {
  name: 'Service',
  data() {
    return {
      enterpriseId: null,
      baseInfo: null,
      atlas: null,
      riskDetails: null,
      strengthDetails: null,
      dataArr: [],
      dots: [
      ],
      lines: [
      ],
    }
  },
  created() {},
  mounted() {
    this.enterpriseId = this.$route.params.id || '91310000792783700P'
    // this.enterpriseId = '91120116MA05J2D11M'
    this.enterpriseId = '91310000792783700P'
    this.getData()
  },
  methods: {
    getData() {
      getPortray(this.enterpriseId).then((res) => {
        if (res.success) {
          let { baseInfo, atlas, riskDetails, strengthDetails } = res.result
          this.baseInfo = baseInfo
          this.atlas = atlas
          this.riskDetails = riskDetails
          this.strengthDetails = strengthDetails
          this.$nextTick(() => {
            this.initChart()
          })
        }
      })
    },
    initChart() {
      let { indicator, data: radarData } = this.setRadarData()
      this.initRadar(indicator, radarData)
      let { c_category, data } = this.setColumnData()
      this.initColumn(c_category, data)

      let {dots, lines} = this.setGraphData()

      this.setGraph(dots, lines)

    },
    setGraphCategoryColor(){
      let mapCategory = {}
      let mapColor = {
        'root':'rgb(14,67,255)', // 首节点
        '主要股东':'rgb(255,51,87)', // red

        '控股子公司':'rgb(0,105,255)',
        '投资公司':'rgb(0,105,255)',
        '分支机构':'rgb(0,105,255)',

        '上下游企业':'rgb(0,209,64)', // green

        '竞争企业':'rgb(255,147,42)',

        '控股企业':'rgb(0,139,209)',
        '参股投资企业':'rgb(0,139,209)'
      }
      let rootNode = JSON.parse(JSON.stringify(this.atlas))
      mapCategory[rootNode.name] = mapColor['root'];
      let currentNode = this.atlas
      currentNode.children.forEach((e) => {
        let color = mapColor[e.name] ||'black';
        mapCategory[e.name] = color;
      })
      console.log(mapCategory)
      return mapCategory;
    },
    setGraphData() {
      let mapCategory = {}
      let dots = []
      let lines = []

      let rootNode = JSON.parse(JSON.stringify(this.atlas))
      mapCategory[rootNode.name] = 1
      delete rootNode.children
      let currentNode = this.atlas
      currentNode.children.forEach((e) => {
        mapCategory[e.name] = 1
      })
      let generatorId = ()=>Math.abs(parseInt(Math.random()*1000000))
      let rid = generatorId();
      dots.push({
        // id:rid,
        name: rootNode.name,
        direction: rootNode.direction,
        target_name:rootNode.name,
        pname: rootNode.pname,
        descr: rootNode.descr,
        symbolSize: 120,
      })
      function forEachDeepNode(node) {
        node.forEach((item) => {
          item.target_name = item.pname + item.name
          item.id = generatorId();
          dots.push({
            // id:item.id,
            name: item.name,
            direction: item.direction,
            target_name:item.target_name,
            pname: item.pname,
            descr: item.descr,
            symbolSize: 70,
          })
          // let pnode = dots.find(e=>{
          //   return e.name == item.pname
          // })
          // console.log('------find  p='+ item.pname)
          // console.log(JSON.stringify(pnode))
          // console.log('------find  p')
          lines.push({
            name: '',
            source: item.name,
            target:item.pname
            // target: pnode?pnode.id:null
          })
          if (item.children != null) {
            forEachDeepNode(item.children)
          }
        })
      }
      forEachDeepNode(currentNode.children)
      console.log('------------------------------------')
      dots.forEach(e=>{
        console.log(`${e.name}-${e.pname}-id=${e.id}`)
      })
      lines.forEach(e=>{
        console.log(JSON.stringify(e))
      })
      return {
        dots,
        lines
      }
    },
    setGraph(dot, lines) {
      let _this = this;
      let option = {
        title: {
          text: '企业知识图谱',
          left: '10',
          top: 10,
          textStyle: {
            color: '#fff',
            fontSize: 32,
          },
        },
        tooltip: {
          show: false,
        },
        toolbox: {
          show: false,
        },
        series: [
          {
            type: 'graph', // 类型:关系图
            layout: 'force', //图的布局，类型为力导图
            symbolSize: 100, // 调整节点的大小
            roam: true,
            edgeSymbol: ['arrow', ''],
            // edgeSymbol: ['circle', 'arrow'],
            // edgeSymbolSize: [2, 10],
            label: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 12,
                  color: '#fff',
                },
                formatter: (data, b, c) => {
                  let params = data.name
                  let newParamsName = '' // 最终拼接成的字符串
                  let paramsNameNumber = params.length // 实际标签的个数
                  let provideNumber = 10 // 每行能显示的字的个数
                  let rowNumber = Math.ceil(paramsNameNumber / provideNumber) // 换行的话，需要显示几行，向上取整
                  /**
                   * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                   */
                  // 条件等同于rowNumber>1
                  if (paramsNameNumber > provideNumber) {
                    /** 循环每一行,p表示行 */
                    for (let p = 0; p < rowNumber; p++) {
                      let tempStr = '' // 表示每一次截取的字符串
                      let start = p * provideNumber // 开始截取的位置
                      let end = start + provideNumber // 结束截取的位置
                      // 此处特殊处理最后一行的索引值
                      if (p === rowNumber - 1) {
                        // 最后一次不换行
                        tempStr = params.substring(start, paramsNameNumber)
                      } else {
                        // 每一次拼接字符串并换行
                        tempStr = params.substring(start, end) + '\n'
                      }
                      newParamsName += tempStr // 最终拼成的字符串
                    }
                  } else {
                    // 将旧标签的值赋给新标签
                    newParamsName = params
                  }
                  //将最终的字符串返回
                  return newParamsName
                },
              },
            },
            force: {
              edgeLength: [70, 100],
              // edgeLength: 80, //默认距离
              repulsion: 700, //斥力
            },
            draggable: true,
            lineStyle: {
              normal: {
                width: 2,
                color: '#f9f9f9',
              },
            },
            edgeLabel: {
              normal: {
                show: false,
              },
            },
            data: dot,
            links: lines,
            itemStyle:{
              normal:{
                color:function (params){
                  // return 'red'
                  return _this.findInCategoryColor(params,dot)
                }
              }
            },
            // categories: categories,
          },
        ],
      }
      let myChart = echarts.init(this.$refs.echartId)
      myChart.setOption(option)
    },
    findInCategoryColor(params,allNode) {
      let map = this.setGraphCategoryColor();
      let data = params.data;
      let name= data.name;
      let res = 'black';
      let levelRelation = [];
      function findUp(start,allNode){
        allNode.forEach(item=>{
          if(item.name===start){
            levelRelation.push(item.name);
            if(item.pname && levelRelation.includes(item.pname) ===false){
              findUp(item.pname,allNode)
            }
          }
        })
      }
      findUp(name,allNode)
      console.log('-------------levelRelation')
      console.log(levelRelation)
      // 逐级向上查找
     for(let i=0;i<levelRelation.length;i++){
       let item = levelRelation[i];
        if(item in map){
          res = map[item]
          break;
        }
      }
      return res;
    },
    setRadarData() {
      let indicator = []
      let data = []
      let baseData = JSON.parse(JSON.stringify(this.strengthDetails))
      baseData.forEach((e) => {
        let value = e.cnt
        indicator.push({ text: e.typeDesc, max: 100, value: value })
        data.push(value)
      })
      return {
        indicator,
        data,
      }
    },
    initRadar(indicator, data) {
      let myChart = echarts.init(this.$refs.chartRadar, null, { renderer: 'svg' })
      var option = {
        backgroundColor: 'transparent',
        title: {
          text: '企业能力',
          left: '110',
          top: 20,
          textStyle: {
            color: '#fff',
            fontSize: 32,
          },
        },
        radar: [
          {
            indicator: indicator,
            center: ['50%', '57%'],
            radius: 85,
            splitArea: {
              show: true,
              areaStyle: {
                color: 'rgba(0,34,83,1)',
              },
            },
            name: {
              formatter: function (a, b) {
                return `${b.value}%\n${b.text}`
              },
              textStyle: {
                color: 'rgb(137,147,200)',
                textAlign: 'center',
                lineHeight: 16,
              },
            },
          },
        ],
        series: [
          {
            name: '',
            type: 'radar',
            data: [
              {
                value: data,
                areaStyle: {
                  color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
                    {
                      color: 'rgba(0,34,83,0.5)',
                      offset: 0,
                    },
                  ]),
                },
              },
            ],
          },
        ],
      }

      option && myChart.setOption(option)
    },
    setColumnData() {
      let c_category = []
      let data = []
      this.riskDetails.forEach((e) => {
        c_category.push(e.typeDesc)
        data.push(e.cnt)
      })
      return {
        c_category,
        data,
      }
    },
    initColumn(xData, yData) {
      yData = [90,80,70,60,50]
      let myChart = echarts.init(this.$refs.chartColumn)
      var option
      option = {
        title: {
          text: '企业风险',
          left: '110',
          top: 20,
          textStyle: {
            color: '#fff',
            fontSize: 32,
          },
        },
        xAxis: {
          type: 'category',
          data: xData,
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
            interval: 0,
            rotate: 15,
            margin:5,
            textStyle: {
              color: '#c3dbff', //更改坐标轴文字颜色
              fontSize: 12, //更改坐标轴文字大小
            },
          },

          axisLine: {
            lineStyle: {
              fontSize: 10,
              color: '#fff', //更改坐标轴颜色
            },
          },
        },
        yAxis: {
          type: 'value',
          max: 100,
          splitLine: {
            show: false,
          },
          axisLine: {
            //x轴坐标轴
            show: false,
          },
          axisLabel: { show: false },
          axisTick: {
            //x轴刻度线
            show: false,
            alignWithLabel: false,
          },
        },
        grid: {
          left: '10%',
          right: '4%',
          bottom: '3%',
          top:'20%',
          containLabel: true
        },
        series: [
          {
            // 分隔:蓝色线
            type: "pictorialBar",
            symbolRepeat: true,
            symbolMargin: 3,
            symbol: "rect",
            symbolClip: true,
            symbolSize: [30, 3],
            symbolPosition: "start",
            symbolOffset: [0, 0],
            symbolBoundingData: 100,
            data: yData,
            itemStyle: {
              color: 'rgb(0,130,255)',
            },
            z: 3
          },
          {
            // 分隔:蓝色线
            type: "pictorialBar",
            symbolRepeat: true,
            symbolMargin: 3,
            symbol: "rect",
            symbolClip: true,
            symbolSize: [30, 3],
            symbolPosition: "start",
            symbolOffset: [0, 0],
            symbolBoundingData: 100,
            data: yData,
            itemStyle: {
              // color: 'red'
            },
            z: 2
          },
          {
            // 分隔 背景
            type: "pictorialBar",
            symbolRepeat: true,
            symbolMargin: 3,
            symbol: "rect",
            symbolClip: true,
            symbolSize: [30, 3],
            symbolPosition: "start",
            symbolOffset: [0, 0],
            symbolBoundingData: 100,
            data: [100,100,100,100,100],
            itemStyle: {
              color: 'rgb(0,28,73)',
            },
            z: 1
          }
        ],
      }

      option && myChart.setOption(option)
    },
  },
}
</script>
<style scoped lang="less">
main {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 50px 80px 70px;
  // background: blue;
  height: 90vh;
  position: relative;
  .ht {
    position: absolute;
    right: 60px;
    top: 30px;
    height: 60px;
    width: 60px;
    background-image: url('../../assets/bigscreen/p4_ht.png');
    background-size: cover;
  }
  .lside {
    height: 100%;
    flex: 2;
    background: transparent;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    .recommendPNG {
      position: absolute;
      top: 0px;
      left: -60px;
      height: 120px;
      width: 120px;
      background-image: url('../../assets/bigscreen/p4_tj.png');
      background-size: cover;
    }
    .recommendOffice {
      font-size: 26px;
      color: #fff;
      line-height: 1;
      padding: 15px 120px;
    }
    .content {
      flex: 1;
      border: 2px solid rgb(0, 42, 110);
      display: flex;
      flex-direction: row;
      .l-info {
        flex: 1;
        .l-inner {
          height: 100%;
          padding: 40px;
          .logo {
            margin: 0 auto;
            text-align: center;
            img {
              width: 120px;
              height: 120px;
              vertical-align: top;
            }
          }
          .name {
            font-size: 32px;
            line-height: 1.2;
            color: #fff;
            font-weight: bold;
            padding: 20px 0;
            text-align: center;
          }
          ul {
            padding-bottom: 100px;
            padding-left: 0;
          }
          ul li {
            list-style: none;
            padding: 6px 0;
            display: flex;
            flex-direction: row;
            .label,
            .value {
              line-height: 1;
              font-size: 20px;
              color: #fff;
            }
            .value {
              padding-left: 10px;
              color: rgb(4, 154, 148);
            }
          }
          .score {
            height: 44px;
            line-height: 44px;
            font-size: 22px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            .label {
              color: rgb(81, 86, 217);
              line-height: 44px;
            }
            .value {
              padding-left: 20px;
              font-size: 38px;
              font-weight: bold;
              line-height: 44px;
              color: rgb(0, 255, 247);
            }
          }
        }
      }
      .r-charts {
        flex: 1;
        display: flex;
        flex-direction: column;
        .chart {
          flex: 1;
        }
      }
    }
  }
  .rside {
    height: 100%;
    flex: 3;
    .my-echarts {
      width: 100%;
      height: 100%;
      z-index: 3;
    }
  }
}
</style>