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
              <div class="title">产品列表</div>
              <div class="scroll_table_container">
                <div class="scroll_table_wrapper"
                     style=""
                     v-if="products!=null">
                  <div class="tempTableWrapper">
                    <table class="tempTable data_table">
                      <thead>
                        <tr>
                          <th>产品名称</th>
                          <th>竞品名称</th>
                          <th>竞品企业</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in scroll_data"
                            :key='index'>
                          <td>
                            {{item.c0}}
                          </td>
                          <td>
                            {{item.c1}}
                          </td>
                          <td>
                            <div class="company">
                              {{item.c2}}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                  </div>
                  <vue-seamless-scroll :data="scroll_data"
                                       :class-option="defaultOption">
                    <table class="ul-scoll data_table">
                      <tr v-for="(item, index) in scroll_data"
                          :key='index'>
                        <td>
                          {{item.c0}}
                        </td>
                        <td>
                          {{item.c1}}
                        </td>
                        <td>
                          <div class="company"
                               :title="item.c2">
                            {{item.c2}}
                          </div>
                        </td>
                      </tr>
                    </table>
                  </vue-seamless-scroll>
                </div>
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
import vueSeamlessScroll from 'vue-seamless-scroll'
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
      products: null,
      dataArr: [],
      dots: [],
      lines: [],
      /*websocket集成*/
      pageId: randomUUID(),
      websock: null,
      lockReconnect: false,
      heartCheck: null,
      // 图谱 legend
      categories: [
        { name: '竞争图谱', cover_name: ['竞争企业'], itemStyle: { color: 'rgb(255,147,42)' } },
        {
          name: '投资图谱',
          cover_name: ['投资公司', '分支机构', '独资子公司'],
          itemStyle: { color: 'rgb(0,105,255)' },
        },
        {
          name: '参股图谱',
          cover_name: ['控股企业', '参股投资企业', '控股子公司'],
          itemStyle: { color: 'rgb(0,139,209)' },
        },
        { name: '股权结构', cover_name: ['主要股东'], itemStyle: { color: 'rgb(255,51,87)' } },
        { name: '上下游', cover_name: ['上下游企业'], itemStyle: { color: 'rgb(0,209,64)' } },
      ],
      scroll_data: [
        { id: '1', c0: 'anyData', c1: '日志易', c2: '上海爱数信息技术有限公司' },
        { id: '1', c0: 'anyData', c1: '日志易', c2: '上海爱数信息技术有限公司' },
        { id: '2', c0: 'anyData', c1: '日志易', c2: '上海爱数信息技术有限公司' },
        { id: '3', c0: 'anyData', c1: '日志易', c2: '上海爱数信息技术有限公司' },
        { id: '4', c0: 'anyData', c1: '日志易', c2: '上海爱数信息技术有限公司' },
        { id: '5', c0: 'anyData', c1: '日志易', c2: '上海爱数信息技术有限公司' },
        { id: '6', c0: 'anyData', c1: '日志易', c2: '上海爱数信息技术有限公司' },
        { id: '7', c0: 'anyData', c1: '日志易', c2: '上海爱数信息技术有限公司' },
        { id: '8', c0: 'anyData', c1: '日志易', c2: '上海爱数信息技术有限公司' },
      ],
    }
  },
  components: {
    vueSeamlessScroll,
  },
  // 监听属性 类似于data概念
  computed: {
    defaultOption() {
      return {
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: 5, // 开始无缝滚动的数据量 this.dataList.length
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
        let { baseInfo, atlas, riskDetails, strengthDetails, products } = res.result
        this.baseInfo = baseInfo != null ? baseInfo : {}
        this.atlas = atlas != null ? atlas : {}
        this.riskDetails = riskDetails != null ? riskDetails : []
        this.strengthDetails = strengthDetails != null ? strengthDetails : []
        this.products = products != null ? products : []
        this.$nextTick(() => {
          this.initChart()
        })
      }
      getPortray(this.enterpriseId).then((res) => {
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
      this.setGraph(dots, lines, this.categories)
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

      function forEachDeepNode(node, category) {
        node.forEach((item) => {
          let temp = {
            name: item.code,
            pname: item.pcode,
            _name: item.name,
            direction: item.direction,
            descr: item.descr,
            symbolSize: 70,
          }
          dots.push(temp)
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
      this.setNodeCategory(dots)
      return {
        dots,
        lines,
      }
    },
    setNodeCategory(allNode) {
      let _this = this
      allNode.forEach((e) => {
        console.log(5, e)

        let name = e.name
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
        findUp(name, allNode)
        // 逐级向上查找
        let levelRelationNames = levelRelation.map((code) => {
          let item = allNode.find((e) => e.name === code)
          return item._name
        })
        function findInCategoryMap(node_name) {
          let category = null
          for (let i = 0; i < _this.categories.length; i++) {
            let currentCategory = _this.categories[i]
            if (currentCategory.cover_name.includes(node_name)) {
              category = i
              break
            }
          }
          return category
        }
        console.log('----------levelRelationNames forEach------------')
        for (let i = 0; i < levelRelationNames.length; i++) {
          let node_name = levelRelationNames[i]
          let findResult = findInCategoryMap(node_name)
          if (findResult !== null) {
            console.log('我找到了', node_name, findResult)
            e.category = findResult
            break
          }
        }
      })
    },
    setGraph(dot, lines, categories) {
      let _this = this
      let option = {
        legend: [
          {
            // selectedMode: 'single',
            data: categories.map((item) => item.name),
            textStyle: {
              color: '#fff',
            },
          },
        ],
        series: [
          {
            type: 'graph', // 类型:关系图
            layout: 'force', //图的布局，类型为力导图
            symbolSize: 100, // 调整节点的大小
            roam: true,
            edgeSymbol: ['arrow', ''],
            label: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 12,
                  color: '#fff',
                },
                formatter: (data) => {
                  let params = data.data._name
                  let newParamsName = '' // 最终拼接成的字符串
                  let paramsNameNumber = params.length // 实际标签的个数
                  let provideNumber = 10 // 每行能显示的字的个数
                  let reg = new RegExp('^[a-zA-Z]+$')
                  if (reg.test(params)) {
                  } else {
                    provideNumber = 5
                  }
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
                show: true,
              },
            },
            data: dot,
            links: lines,
            categories: categories,
            itemStyle: {
              normal: {
                color: function (params) {
                  let idx = params.data.category
                  console.log('formatter color,idx=', idx)
                  let color = 'rgba(145,191,252,1)' // 根节点 or 其他未在 categories 内的节点颜色
                  // idx = 0 也会 精准匹配 undefined
                  if (idx !== undefined && _this.categories[idx]) {
                    color = categories[idx].itemStyle.color
                  }
                  return color
                },
              },
            },
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
      let myChart = echarts.init(this.$refs.chartRadar, null, { renderer: 'svg' })
      let _this = this
      var option = {
        backgroundColor: 'transparent',
        title: {
          text: '企业实力指数：' + this.baseInfo.strength,
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
      let _this = this
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
          flex: 1;
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
        .l-list {
          flex: 1;
          // background: blue;
          .title {
            font-size: 24px;
            line-height: 40px;
            font-weight: bold;
            color: #fff;
            padding: 10px 0;
          }
          padding-right: 20px;
          .scroll_table_wrapper {
            width: 100%;
            height: 300px;
            overflow: hidden;
            border: 1px solid #283dff;
            position: relative;
            .data_table {
              border-collapse: collapse;
              border: 1px solid #011b70;
              tr {
                th {
                  color: #fff;
                  font-weight: bold;
                  font-size: 18px;
                }
                th,
                td {
                  border: 1px solid #011b70;
                  padding-left: 20px;
                }
                th:nth-child(1),
                td:nth-child(1) {
                  width: 30%;
                }
                th:nth-child(2),
                th:nth-child(3),
                td:nth-child(2),
                td:nth-child(3) {
                  width: 35%;
                }
                .company {
                  width: 150px;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                }
              }
            }
            .tempTableWrapper {
              position: absolute;
              left: 0;
              top: 0;
              right: 0;
              height: 44px;
              z-index: 10;
              overflow: hidden;
              background: pink;
            }
            .tempTable {
              width: 100%;
              background-color: #000c34;
              color: #91e5ce !important;
              border-collapse: collapse;
              border: 1px solid #011b70;
              font-size: 16px;
              line-height: 40px;
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