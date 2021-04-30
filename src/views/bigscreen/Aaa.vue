<template>
  <div class="hai-content">
    <div class="service-tit">
      <span class="span1">企业画像</span>
    </div>
    <main>
      <div class="ht"></div>
      <div class="lside"
           v-if="baseInfo != null">
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
    },
    initChart() {
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
      // let mapCategory = {}
      // let dots = []
      // let lines = []

      // let rootNode = JSON.parse(JSON.stringify(this.atlas))
      // mapCategory[rootNode.name] = 1
      // delete rootNode.children
      // let currentNode = this.atlas
      // currentNode.children.forEach((e) => {
      //   mapCategory[e.name] = 1
      // })
      // dots.push({
      //   category:0,
      //   name: rootNode.code,
      //   pname: rootNode.pcode,
      //   direction: rootNode.direction,
      //   _name: rootNode.name,
      //   descr: rootNode.descr,
      //   symbolSize: 120,
      // })
      // function forEachDeepNode(node) {
      //   node.forEach((item) => {
      //     dots.push({
      //       category:1,
      //       name: item.code,
      //       pname: item.pcode,
      //       _name: item.name,
      //       direction: item.direction,
      //       descr: item.descr,
      //       symbolSize: 70,
      //     })
      //     lines.push({
      //       source: item.code,
      //       target: item.pcode,
      //       label: {
      //         show: true,
      //         formatter: function () {
      //           return item.descr || ''
      //         },
      //       },
      //     })
      //     if (item.children != null) {
      //       forEachDeepNode(item.children)
      //     }
      //   })
      // }
      // forEachDeepNode(currentNode.children)

      let dots = [
        {
          category:0,
          name: 'root',
          pname: 'root',
          direction: '',
          _name:'a',
          descr:'',
        },
         {
          category:1,
          name: 'root-c1',
          pname: 'root',
          direction: '',
          _name:'root-c1',
          descr:'',
        }
      ];
      let lines = [
        {
          source:'root-c1',target:'root'
        }
      ]
      return {
        dots,
        lines,
      }
    },
    setGraph(dot, lines) {
      let graph = { "nodes": [
      {
        "name": "root",
        "pname":"root",
        "category": 0
      },
      {
        "name": "aaa-1",
        "pname":"root",
        "category": 0
      },
      {
        "name": "aaa-2",
        "pname":"root",
        "category": 1
      },
      {
        "name": "bbb",
         "pname":"root",
        "category": 1
      },
    ],
    "links": [
      {
        "source": "aaa-1",
        "target": "root"
      },
      {
        "source": "aaa-2",
        "target": "root"
      },
      {
        "source": "bbb",
        "target": "root"
      }
    ],
        "categories": [
      {
        "name": "类目0"
      },
      {
        "name": "类目1"
      },
      {
        "name": "类目2"
      },
      {
        "name": "类目3"
      },
      {
        "name": "类目4"
      },
      {
        "name": "类目5"
      },
      {
        "name": "类目6"
      },
      {
        "name": "类目7"
      },
      {
        "name": "类目8"
      }
    ]
  };
      let option = {
        
        legend: [{
            // selectedMode: 'single',
            data: graph.categories.map(function (a) {
                console.log(a.name)
                return a.name;
            })
        }],
        series: [
            {
                name: 'Les Miserables',
                type: 'graph',
                layout: 'force',
                data: graph.nodes,
                links: graph.links,
                categories: graph.categories,
                roam: true,
                label: {
                    position: 'right'
                },
                force: {
                    repulsion: 100
                }
            }
        ]
    };
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