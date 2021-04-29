<template>
  <div class="hai-content">
    <div class="service-tit">
      <span class="span1">企业画像</span>
    </div>
    <main>
      <div class="ht"></div>
      <div class="lside"
           v-if="baseInfo != null">
        <div class="recommendPNG"
             v-show="baseInfo.recommendFlag == 1"></div>
        <div class="recommendOffice">推荐办公区：{{ baseInfo.recommendOffice }}</div>
        <div class="content">
          <div class="l-info">
            <div class="l-inner">
              <div class="logo">
                <img :src="baseInfo.logoUrl"
                     alt="" />
              </div>
              <div class="name">{{ baseInfo.name }}</div>
              <ul>
                <li>
                  <div class="label">企业规模:</div>
                  <div class="value">{{ baseInfo.scaleMin }}-{{ baseInfo.scaleMax }}</div>
                </li>
                <li>
                  <div class="label">企业类型:</div>
                  <div class="value">{{ baseInfo.econKind }}</div>
                </li>
                <li>
                  <div class="label">融资情况:</div>
                  <div class="value">{{ baseInfo.financingDt }} {{ baseInfo.financingRound }}</div>
                </li>
                <li>
                  <div class="label">联系电话:</div>
                  <div class="value">{{ baseInfo.tel }}</div>
                </li>
              </ul>
            </div>
            <div class="l-list">
              <div class="title">
                产品列表
              </div>
              <ul>
                <li>产品1</li>
                <li>产品2</li>
                <li>产品3</li>
              </ul>
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
import { getPortray } from '@/api/manage'
const echarts = require('echarts')
/*websocket集成*/
import store from '@/store/'
import { randomUUID } from '@/utils/util'
// import func from 'vue-editor-bridge'
export default {
  name: 'Portray',
  data() {
    return {
      enterpriseId: null,
      baseInfo: null,
      atlas: null,
      riskDetails: null,
      strengthDetails: null,
      dataArr: [],
      dots: [],
      lines: [],
      /*websocket集成*/
      pageId: randomUUID(),
      websock: null,
      lockReconnect: false,
      heartCheck: null,
    }
  },
  created() {},
  mounted() {
     this.enterpriseId = '91310000792783700P'
    this.getData()

    /*websocket集成*/
    this.initWebSocket()
    this.heartCheckFun()
  },
  /*websocket集成*/
  destroyed: function () {
    this.websocketOnclose()
  },
  methods: {
    getData() {
      const execData = (res) => {
        let { baseInfo, atlas, riskDetails, strengthDetails } = res.result
        this.baseInfo = baseInfo != null ? baseInfo : {}
        this.atlas = atlas != null ? atlas : {}
        this.riskDetails = riskDetails != null ? riskDetails : []
        this.strengthDetails = strengthDetails != null ? strengthDetails : []
        this.$nextTick(() => {
          this.initChart()
        })
      }
      getPortray(this.enterpriseId).then((res) => {
        console.log('------------ajax----')
        if (res.success) {
          execData(res)
        }
      })
      // execData(mock_data)

      // setInterval(() => {
      //   mock_data.result.baseInfo.name = parseInt(Math.random() * 100)
      //   console.log(mock_data.result.baseInfo.name)
      //   mock_data.result.strengthDetails[0].cnt = parseInt(Math.random() * 100)
      //   mock_data.result.strengthDetails[1].cnt = parseInt(Math.random() * 100)
      //   mock_data.result.strengthDetails[2].cnt = parseInt(Math.random() * 100)
      //   mock_data.result.strengthDetails[3].cnt = parseInt(Math.random() * 100)
      //   mock_data.result.riskDetails[0].cnt = parseInt(Math.random() * 100)
      //   mock_data.result.riskDetails[1].cnt = parseInt(Math.random() * 100)
      //   mock_data.result.riskDetails[2].cnt = parseInt(Math.random() * 100)
      //   mock_data.result.riskDetails[3].cnt = parseInt(Math.random() * 100)
      //   mock_data.result.atlas.name = parseInt(Math.random() * 10000)
      //   execData(mock_data)
      // }, 2000)
    },
    initChart() {
      let { indicator, data: radarData } = this.setRadarData()
      this.initRadar(indicator, radarData)
      let { c_category, data } = this.setColumnData()
      this.initColumn(c_category, data)
      let { dots, lines } = this.setGraphData()
      this.setGraph(dots, lines)
    },
    setGraphCategoryColor() {
      let mapCategory = {}
      let mapColor = {
        root: 'rgb(14,67,255)', // 首节点
        主要股东: 'rgb(255,51,87)', // red

        控股子公司: 'rgb(0,105,255)',
        投资公司: 'rgb(0,105,255)',
        分支机构: 'rgb(0,105,255)',

        上下游企业: 'rgb(0,209,64)', // green

        竞争企业: 'rgb(255,147,42)',

        控股企业: 'rgb(0,139,209)',
        参股投资企业: 'rgb(0,139,209)',
      }
      let rootNode = JSON.parse(JSON.stringify(this.atlas))
      mapCategory[rootNode.name] = mapColor['root']
      let currentNode = this.atlas
      currentNode.children.forEach((e) => {
        let color = mapColor[e.name] || 'black'
        mapCategory[e.name] = color
      })
      return mapCategory
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
      dots.push({
        name: rootNode.code,
        pname: rootNode.pcode,
        direction: rootNode.direction,
        _name: rootNode.name,
        descr: rootNode.descr,
        symbolSize: 120,
      })
      function forEachDeepNode(node) {
        node.forEach((item) => {
          dots.push({
            name: item.code,
            pname: item.pcode,
            _name: item.name,
            direction: item.direction,
            descr: item.descr,
            symbolSize: 70,
          })
          lines.push({
            source: item.code,
            target: item.pcode,
            label: {
              show: true,
              formatter: function () {
                return item.descr || ''
              },
            },
          })
          if (item.children != null) {
            forEachDeepNode(item.children)
          }
        })
      }
      forEachDeepNode(currentNode.children)
      return {
        dots,
        lines,
      }
    },
    setGraph(dot, lines) {
      let _this = this
      let option = {
        title: {
          text: '',
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
                  let params = data.data._name
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
            itemStyle: {
              normal: {
                color: function (params) {
                  // return 'red'
                  return _this.findInCategoryColor(params, dot)
                },
              },
            },
            // categories: categories,
          },
        ],
      }
      let myChart = echarts.init(this.$refs.echartId)
      myChart.setOption(option)
    },
    findInCategoryColor(params, allNode) {
      let map = this.setGraphCategoryColor()
      let data = params.data
      let res = 'black'
      let levelRelation = []
      function findUp(start, allNode) {
        allNode.forEach((item) => {
          if (item.name === start) {
            levelRelation.push(item.name)
            if (item.pname && levelRelation.includes(item.pname) === false) {
              findUp(item.pname, allNode)
            }
          }
        })
      }
      findUp(data.name, allNode)
      // 逐级向上查找
      // console.log('-------------逐级向上查找')
      let levelRelationNames = levelRelation.map((code) => {
        let item = allNode.find((e) => e.name === code)
        return item._name
      })
      levelRelationNames.forEach((item) => {})
      for (let i = 0; i < levelRelationNames.length; i++) {
        let item = levelRelationNames[i]
        if (item in map) {
          res = map[item]
          break
        }
      }
      return res
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
      let _this = this;
      var option = {
        backgroundColor: 'transparent',
        title: {
          text: '企业实力指数：' +this.baseInfo.strength,
          left: '100',
          top: 20,
          textStyle: {
            color: '#fff',
            fontSize: 28,
          },
        },
        radar: [
          {
            indicator: indicator,
            center: ['50%', '57%'],
            radius: 80,
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
      let _this = this;
      var option
      option = {
        title: {
          text: '企业风险指数：' + _this.baseInfo.risk,
          left: '120',
          top: 20,
          textStyle: {
            color: '#fff',
            fontSize: 28,
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
            rotate: 0,
            margin: 5,
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
          left: '5%',
          right: '5%',
          bottom: '10%',
          top: '30%',
          containLabel: true,
        },
        series: [
          {
            // 分隔:蓝色线
            type: 'pictorialBar',
            symbolRepeat: true,
            symbolMargin: 3,
            symbol: 'rect',
            symbolClip: true,
            symbolSize: [30, 3],
            symbolPosition: 'start',
            symbolOffset: [0, 0],
            symbolBoundingData: 100,
            data: yData,
            itemStyle: {
              color: 'rgb(0,130,255)',
            },
            z: 3,
          },
          {
            // 分隔:蓝色线
            type: 'pictorialBar',
            symbolRepeat: true,
            symbolMargin: 3,
            symbol: 'rect',
            symbolClip: true,
            symbolSize: [30, 3],
            symbolPosition: 'start',
            symbolOffset: [0, 0],
            symbolBoundingData: 100,
            data: yData,
            itemStyle: {
              // color: 'red'
            },
            z: 2,
          },
          {
            // 分隔 背景
            type: 'pictorialBar',
            symbolRepeat: true,
            symbolMargin: 3,
            symbol: 'rect',
            symbolClip: true,
            symbolSize: [30, 3],
            symbolPosition: 'start',
            symbolOffset: [0, 0],
            symbolBoundingData: 100,
            data: [100, 100, 100, 100, 100],
            itemStyle: {
              color: 'rgb(0,28,73)',
            },
            z: 1,
          },
        ],
      }

      option && myChart.setOption(option)
    },
    /*websocket集成*/
    initWebSocket: function () {
      // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
      var userId = store.getters.userInfo.id
      const domain = window._CONFIG['socketDomainURL'].replace('https://', 'wss://').replace('http://', 'ws://')
      const url = `${domain}/bigscreenWebsocket/${userId}/${this.pageId}`
      this.websock = new WebSocket(url)
      this.websock.onopen = this.websocketOnopen
      this.websock.onerror = this.websocketOnerror
      this.websock.onmessage = this.websocketOnmessage
      this.websock.onclose = this.websocketOnclose
    },
    /*websocket集成*/
    websocketOnopen: function () {
      // console.log("BigScreenWebSocket连接成功");
      //心跳检测重置
      this.heartCheck.reset().start()
    },
    /*websocket集成*/
    websocketOnerror: function (e) {
      // console.log("BigScreenWebSocket连接发生错误");
      this.reconnect()
    },
    /*websocket集成*/
    websocketOnmessage: function (e) {
      console.log(new Date().toLocaleTimeString() + '-----接收消息-------', e.data)
      var data = eval('(' + e.data + ')') //解析对象
      if (data.type == 'bigscreen') {
        if (data.data.func == 'main_to_portray') {
          var enterpriseId = data.data.enterpriseId
          if (this.enterpriseId != enterpriseId) {
            this.enterpriseId = enterpriseId
            this.enterpriseId = '91310000792783700P'
            console.log('enterpriseId----change-')
            //  console.log(enterpriseId)
            // this.getData();
          }
        }
      }
      //心跳检测重置
      this.heartCheck.reset().start()
    },
    /*websocket集成*/
    websocketOnclose: function (e) {
      console.log('BigScreen-connection closed (' + e + ')')
      if (e) {
        console.log('BigScreen-connection closed (' + e.code + ')')
      }
      this.reconnect()
    },
    /*websocket集成*/
    websocketSend(text) {
      // 数据发送
      try {
        this.websock.send(text)
      } catch (err) {
        console.log('BigScreen-send failed (' + err.code + ')')
      }
    },
    /*websocket集成*/
    reconnect() {
      var that = this
      if (that.lockReconnect) return
      that.lockReconnect = true
      //没连接上会一直重连，设置延迟避免请求过多
      setTimeout(function () {
        console.info('BigScreen-尝试重连...')
        that.initWebSocket()
        that.lockReconnect = false
      }, 5000)
    },
    /*websocket集成*/
    heartCheckFun() {
      var that = this
      //心跳检测,每20s心跳一次
      that.heartCheck = {
        timeout: 20000,
        timeoutObj: null,
        serverTimeoutObj: null,
        reset: function () {
          clearTimeout(this.timeoutObj)
          clearTimeout(this.serverTimeoutObj)
          return this
        },
        start: function () {
          var self = this
          this.timeoutObj = setTimeout(function () {
            //这里发送一个心跳，后端收到后，返回一个心跳消息，
            //onmessage拿到返回的心跳就说明连接正常
            that.websocketSend(JSON.stringify({ type: 'heartcheck', data: false }))
            console.info('客户端发送心跳')
            self.serverTimeoutObj = setTimeout(function () {
              //如果超过一定时间还没重置，说明后端主动断开了
              that.websock.close() //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
            }, self.timeout)
          }, this.timeout)
        },
      }
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
    flex: 1;
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
      flex-direction: column;
      .l-info {
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        .l-inner {
          flex:1;
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
            font-size: 24px;
            line-height: 1.2;
            color: #fff;
            font-weight: bold;
            padding: 20px 0;
            text-align: center;
          }
          ul {
            padding-bottom: 20px;
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
        .l-list{
          flex:1;
          // background: blue;
          .title{
            font-size: 24px;
            line-height: 40px;
            font-weight: bold;
            color:#fff;
            padding:10px 0;
          }
          ul{
            margin:0;
            padding:0;
          }
          padding-top:40px;
          li{
            list-style: none;
            // background: red;
            line-height: 50px;
            color:#fff;
          }
        }
      }
      .r-charts {
        flex: 1;
        display: flex;
        flex-direction: row;
        .chart {
          flex: 1;
        }
      }
    }
  }
  .rside {
    height: 100%;
    flex: 1;
    .my-echarts {
      width: 100%;
      height: 100%;
      z-index: 3;
    }
  }
}
</style>