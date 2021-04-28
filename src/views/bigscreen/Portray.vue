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
        <div class="recommendOffice">推荐办公区：生态城园区</div>
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
let mock_data = {
  success: true,
  message: '操作成功！',
  code: 200,
  result: {
    baseInfo: {
      id: 1,
      creditNo: '91310000792783700P',
      name: '上海爱数信息技术股份有限公司',
      registCapi: '18122.5935万元人民币',
      industry: '专业技术服务业',
      financingDt: '2020年6月',
      financingRound: 'D轮',
      strength: 90,
      risk: 10,
      logoUrl: 'https://image.qcc.com/logo/2d2b06eba4d1f32c25e25b08e3edf53e.jpg?x-oss-process=style/logo_200',
      scaleMin: 1500,
      scaleMax: 2000,
      tel: '021-54222601',
      econKind: '私营企业',
    },
    atlas: {
      name: '上海爱数信息技术股份有限公司',
      pname: '上海爱数信息技术股份有限公司',
      descr: null,
      direction: 0,
      children: [
        {
          name: '分支机构',
          pname: '上海爱数信息技术股份有限公司',
          descr: null,
          direction: 0,
          children: [
            {
              name: '爱数智城',
              pname: '分支机构',
              descr: null,
              direction: 0,
              children: null,
            },
            {
              name: '长沙分公司',
              pname: '分支机构',
              descr: null,
              direction: 0,
              children: null,
            },
          ],
        },
        {
          name: '投资公司',
          pname: '上海爱数信息技术股份有限公司',
          descr: null,
          direction: 0,
          children: null,
        },
        {
          name: '控股子公司',
          pname: '上海爱数信息技术股份有限公司',
          descr: null,
          direction: 0,
          children: null,
        },
        {
          name: '竞争企业',
          pname: '上海爱数信息技术股份有限公司',
          descr: null,
          direction: 0,
          children: [
            {
              name: 'AnyBackup',
              pname: '竞争企业',
              descr: null,
              direction: 0,
              children: [
                {
                  name: '鼎甲',
                  pname: 'AnyBackup',
                  descr: '竞品：测试',
                  direction: 0,
                  children: null,
                },
              ],
            },
            {
              name: 'AnyData',
              pname: '竞争企业',
              descr: null,
              direction: 0,
              children: null,
            },
            {
              name: 'AnyRobot',
              pname: '竞争企业',
              descr: null,
              direction: 0,
              children: [
                {
                  name: '日志易',
                  pname: 'AnyRobot',
                  descr: '竞品：测试',
                  direction: 0,
                  children: null,
                },
                {
                  name: '听云',
                  pname: 'AnyRobot',
                  descr: '竞品：听云',
                  direction: 0,
                  children: null,
                },
              ],
            },
            {
              name: 'AnyShare',
              pname: '竞争企业',
              descr: null,
              direction: 0,
              children: null,
            },
          ],
        },
        {
          name: '上下游企业',
          pname: '上海爱数信息技术股份有限公司',
          descr: null,
          direction: 0,
          children: [
            {
              name: 'Oracle',
              pname: '上下游企业',
              descr: '上游',
              direction: 0,
              children: null,
            },
            {
              name: '太极',
              pname: '上下游企业',
              descr: '下游',
              direction: 0,
              children: null,
            },
          ],
        },
        {
          name: '参股投资企业',
          pname: '上海爱数信息技术股份有限公司',
          descr: null,
          direction: 1,
          children: null,
        },
        {
          name: '控股企业',
          pname: '上海爱数信息技术股份有限公司',
          descr: null,
          direction: 1,
          children: null,
        },
        {
          name: '主要股东',
          pname: '上海爱数信息技术股份有限公司',
          descr: null,
          direction: 1,
          children: [
            {
              name: '贺鸿富',
              pname: '主要股东',
              descr: null,
              direction: 1,
              children: null,
            },
            {
              name: '邓平',
              pname: '主要股东',
              descr: null,
              direction: 1,
              children: null,
            },
            {
              name: '李基亮',
              pname: '主要股东',
              descr: null,
              direction: 1,
              children: null,
            },
          ],
        },
      ],
    },
    strengthDetails: [
      {
        id: 1,
        creditNo: '91310000792783700P',
        type: '00',
        typeDesc: '注册资本',
        cnt: 90,
      },
      {
        id: 2,
        creditNo: '91310000792783700P',
        type: '01',
        typeDesc: '营收实力',
        cnt: 90,
      },
      {
        id: 3,
        creditNo: '91310000792783700P',
        type: '02',
        typeDesc: '税收贡献',
        cnt: 90,
      },
      {
        id: 4,
        creditNo: '91310000792783700P',
        type: '03',
        typeDesc: '生存能力',
        cnt: 90,
      },
      {
        id: 5,
        creditNo: '91310000792783700P',
        type: '04',
        typeDesc: '资本市场吸引力',
        cnt: 90,
      },
      {
        id: 6,
        creditNo: '91310000792783700P',
        type: '05',
        typeDesc: '人才吸引力',
        cnt: 90,
      },
      {
        id: 7,
        creditNo: '91310000792783700P',
        type: '06',
        typeDesc: '创新投入产出能力',
        cnt: 90,
      },
      {
        id: 8,
        creditNo: '91310000792783700P',
        type: '07',
        typeDesc: '创新实力',
        cnt: 90,
      },
      {
        id: 9,
        creditNo: '91310000792783700P',
        type: '08',
        typeDesc: '企业品牌活跃度',
        cnt: 90,
      },
    ],
    riskDetails: [
      {
        id: 1,
        creditNo: '91310000792783700P',
        type: '00',
        typeDesc: '企业风险风险',
        cnt: 10,
      },
      {
        id: 2,
        creditNo: '91310000792783700P',
        type: '01',
        typeDesc: '经营风险',
        cnt: 10,
      },
      {
        id: 3,
        creditNo: '91310000792783700P',
        type: '02',
        typeDesc: '司法风险',
        cnt: 10,
      },
      {
        id: 4,
        creditNo: '91310000792783700P',
        type: '03',
        typeDesc: '监管风险',
        cnt: 10,
      },
      {
        id: 5,
        creditNo: '91310000792783700P',
        type: '04',
        typeDesc: '工商风险',
        cnt: 10,
      },
    ],
  },
  timestamp: 1619519632959,
}
import { getEnterprise, getPortray } from '@/api/manage'
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
        // {name: '企业',symbolSize: 60,category: 0},{name: '政策',symbolSize: 60,category: 1},
        // {name: '产业',symbolSize: 60,category: 2},{name: '商标种类',symbolSize: 40,category: 0},
        // {name: '发布单位',symbolSize: 40,category: 1},{name: '上游产业',symbolSize: 40,category: 2},
        // {name: '测试1',symbolSize: 40,category: 2},{name: '测试2',symbolSize: 40,category: 2},
        // {name: '测试3',symbolSize: 40,category: 2},{name: '测试4',symbolSize: 40,category: 2},
        // {name: '测试5',symbolSize: 40,category: 2},{name: '测试6',symbolSize: 40,category: 2},
        // {name: '测试7',symbolSize: 40,category: 2},{name: '测试8',symbolSize: 40,category: 2}
      ],
      lines: [
        // {source: '企业',target: '政策',name: ''}, {source: '政策',target: '产业',name: ''},
        // {source: '企业',target: '商标种类',name: ''},{source: '政策',target: '发布单位',name: ''},
        // {source: '产业',target: '上游产业',name: ''},{source: '上游产业',target: '测试1',name: ''},
        // {source: '测试1',target: '测试2',name: ''},{source: '产业',target: '测试3',name: ''},
        // {source: '产业',target: '测试4',name: ''},{source: '产业',target: '测试5',name: ''},
        // {source: '产业',target: '测试6',name: ''},{source: '产业',target: '测试7',name: ''},
        // {source: '产业',target: '测试8',name: ''}
      ],
    }
  },
  created() {},
  mounted() {
    this.enterpriseId = this.$route.params.id || '91310000792783700P'
    this.enterpriseId = '91310000792783700P'
    this.getData()
  },
  methods: {
    getData() {
      getPortray(this.enterpriseId).then((res) => {
        if (res.success) {
          let { baseInfo, atlas, riskDetails, strengthDetails } = res.result
          console.log(res.result)
          this.baseInfo = baseInfo
          this.atlas = atlas
          this.riskDetails = riskDetails
          this.strengthDetails = strengthDetails
        } else {
          console.log('数据获取失败！！！采用mock数据')
          let { baseInfo, atlas, riskDetails, strengthDetails } = mock_data.result
          console.log(baseInfo)
          console.log(atlas)
          console.log(riskDetails)
          this.baseInfo = baseInfo
          this.atlas = atlas
          this.riskDetails = riskDetails
          this.strengthDetails = strengthDetails
        }
        this.baseInfo.recommendFlag = 1 // 推荐标志
        this.$nextTick(() => {
          this.initChart()
        })
      })
    },
    initChart() {
      let { indicator, data: radarData } = this.setRadarData()
      this.initRadar(indicator, radarData)
      let { c_category, data } = this.setColumnData()
      this.initColumn(c_category, data)
      // let {dot,links} =
      this.setGraphData()
    },
    setGraphData() {
      let mapCategory = {}
      let category = []
      let dots = []
      let lines = []

      let rootNode = JSON.parse(JSON.stringify(this.atlas))
      mapCategory[rootNode.name] = 1
      delete rootNode.children
      let currentNode = this.atlas
      currentNode.children.forEach((e) => {
        mapCategory[e.name] = 1
      })
      dots.push({
        name: rootNode.name,
        direction: rootNode.direction,
        pname: rootNode.pname,
        descr: rootNode.descr,
        id: rootNode.name,
        symbolSize: 120,
      })
      function forEachDeepNode(node) {
        node.forEach((item) => {
          console.log(item)
          dots.push({
            name: item.name,
            direction: item.direction,
            pname: item.pname,
            descr: item.descr,
            id: item.name,
            symbolSize: 70,
          })
          lines.push({
            name: '',
            source: item.name,
            target: item.pname,
          })
          if (item.children != null) {
            forEachDeepNode(item.children)
          }
        })
      }
      forEachDeepNode(currentNode.children)
      console.log(dots)
      console.log(lines)
      this.setGraph(dots, lines)
    },
    getList(arr, type, pCode) {
      for (let i = 0; i < arr.length; i++) {
        let lineObj = {}
        let obj = {
          id: arr[i].code,
          name: arr[i].name,
        }
        obj.symbolSize = 40
        obj.category = type
        this.dots.push(obj)
        lineObj.source = pCode
        lineObj.target = arr[i].code
        lineObj.name = ''
        this.lines.push(lineObj)
        if (arr[i].children) {
          this.getList(arr[i].children, type, arr[i].code)
        }
      }
    },
    setGraph(dot, lines) {
      let categories = []
      console.log(categories)
      let option = {
        // legend: {
        //   data: categories.map((item) => item.name),
        // },
        color: ['#e28400', '#23e9f4', '#00a1fc'],
        title: {
          text: '',
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
                  console.log(newParamsName)
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
            // categories: categories,
          },
        ],
      }
      let myChart = echarts.init(this.$refs.echartId)
      myChart.setOption(option)
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
      console.log(data, indicator)
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
            rotate: 45,
            textStyle: {
              color: '#c3dbff', //更改坐标轴文字颜色
              fontSize: 14, //更改坐标轴文字大小
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
        series: [
          {
            data: yData,
            type: 'bar',
            barWidth: 30,
            showBackground: true,
            itemStyle: {
              // 图形的形状
              color: 'rgb(137,147,200)',
            },
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