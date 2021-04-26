<template>
<!-- 大屏-主屏 -->
    <div class="">
      <!-- 右屏 -->
      <a-row class="right-row-1">
        <a-row>
          <a-col class="panel-title1">
            <span class="panel-title1-text">重大项目</span>
          </a-col>
        </a-row>
        <!-- 横向滚动 -->
        <a-row class="right-row-1-warp">
          <vue-seamless-scroll :data="focusEnterprises.list"
             :class-option="focusEnterprises.classOption"
             class="logo-warp">
            <ul class="ul-item">
              <li class="li-item" :key="index"
                  v-for="(item, index) in focusEnterprises.list">
                <img :src="getImageFullPath(item.logoUrl)" />
              </li>
            </ul>
          </vue-seamless-scroll>
        </a-row>
      </a-row>
      <a-row class="right-row-2">
        <a-row>
          <a-col class="panel-title1">
            <span class="panel-title1-text">产业链健康评估</span>
          </a-col>
        </a-row>
        <a-row class="chart-row">
          <a-col :span="6">
            <div id="healthEstimateChart1" class="chart"></div><!-- 产业链健康评估图表 -->
          </a-col>
          <a-col :span="6">
            <div id="healthEstimateChart2" class="chart"></div><!-- 产业链健康评估图表 -->
          </a-col>
          <a-col :span="12">
            <div id="healthEstimateChart3" class="chart"></div><!-- 产业链健康评估图表 -->
          </a-col>
        </a-row>
      </a-row>
      <a-row class="right-row-3">
        <a-row class="right-row-3-flex">
          <a-col :span="10" class="right-row-3-flex-item">
            <a-row>
              <a-col class="panel-title1">
                <span class="panel-title1-text">产业配套</span>
              </a-col>
            </a-row>
            <a-row class="assorts-scroll-box">
              <vue-seamless-scroll :data="industryAssorts.list"
                :class-option="industryAssorts.classOption"
                class="assorts-warp">
                <ul>
                  <li v-for="(item,index) in industryAssorts.list" :key="index">
                    <a-row class="assorts-row">
                      <a-col :span="7" class="assorts-title">
                        <a-row class="area"><span>{{item.area}}</span>万㎡</a-row>
                        <a-row class="name">{{item.assortZoneName}}</a-row>
                      </a-col>
                      <a-col :span="17" class="assorts-content">{{item.assortDescription}}</a-col>
                    </a-row>
                  </li>
                </ul>
              </vue-seamless-scroll>
            </a-row>
          </a-col>
          <a-col :span="2"></a-col>
          <a-col :span="11" class="right-row-3-flex-item">
            <a-row>
              <a-col class="panel-title1">
                <span class="panel-title1-text">产业新闻舆情</span>
              </a-col>
            </a-row>
            <a-row class="chart-row">
              <div id="publicOpinionsChart" class="chart"></div><!-- 产业新闻舆情图表 -->
            </a-row>
          </a-col>
        </a-row>
      </a-row>
      <a-row class="right-row-4">
        <a-row>
          <a-col class="panel-title1">
            <span class="panel-title1-text">最新资讯</span>
          </a-col>
        </a-row>
        <a-row>
          <vue-seamless-scroll :data="industryNews.list" class="news-warp"
                               :class-option="industryNews.classOption">
            <ul>
              <li v-for="(item,index) in industryNews.list" :key="index">
                <span :class="'color'+item.type">【{{item.typeName}}】</span>
                {{item.content.trim()}}
              </li>
            </ul>
          </vue-seamless-scroll>
        </a-row>
      </a-row>
    </div>
</template>

<script>
  import { ChartFont } from '@/utils/util'
  import countTo from 'vue-count-to'
  import vueSeamlessScroll from 'vue-seamless-scroll'
  import {queryIndustryStatus} from '@/api/bigScreenAPI'
  export default {
    components: { countTo, vueSeamlessScroll },
    data() {
      return {
          healthEstimateChart1: null,
          healthEstimateChart2: null,
          healthEstimateChart3: null,
          publicOpinionsChart: null,
          // 重大项目
          focusEnterprises: {
            list: [],
            classOption:{
              step: 1, // 数值越大速度滚动越快
              limitMoveNum: 6, // 开始无缝滚动的数据量 this.dataList.length
              hoverStop: true, // 是否开启鼠标悬停stop
              direction: 2, // 0向下 1向上 2向左 3向右
              openWatch: true, // 开启数据实时监控刷新dom
              singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
              singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
              waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
            }
          },
          // 产业链健康评估
          healthEstimate: {
            developAssessment: '', // 产业发展评估指数
            establishDepth: '', // 产业建立深度
            establishScope: '', // 产业建立广度
            id: '',
            industryCode: '',
            industryName: '',
            riskAssessment: '' // 产业风险评估
          },
          // 产业配套
          industryAssorts: {
            list: [],
            classOption:{
              step: 0.6, // 数值越大速度滚动越快
              limitMoveNum: 6, // 开始无缝滚动的数据量 this.dataList.length
              hoverStop: true, // 是否开启鼠标悬停stop
              direction: 1, // 0向下 1向上 2向左 3向右
              openWatch: true, // 开启数据实时监控刷新dom
              singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
              singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
              waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
            }
          },
          // 最新资讯
          industryNews: {
            list: [],
            classOption:{
              step: 0.6, // 数值越大速度滚动越快
              limitMoveNum: 6, // 开始无缝滚动的数据量 this.dataList.length
              hoverStop: true, // 是否开启鼠标悬停stop
              direction: 1, // 0向下 1向上 2向左 3向右
              openWatch: true, // 开启数据实时监控刷新dom
              singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
              singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
              waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
            }
          },
          // 产业新闻舆情
          industryPublicOpinions: []
      }
    },
    computed: {
    },
    mounted () {
        this.healthEstimateChart1 = this.$echarts.init(document.getElementById('healthEstimateChart1'));
        this.healthEstimateChart2 = this.$echarts.init(document.getElementById('healthEstimateChart2'));
        this.healthEstimateChart3 = this.$echarts.init(document.getElementById('healthEstimateChart3'));
        this.publicOpinionsChart = this.$echarts.init(document.getElementById('publicOpinionsChart'));
    },
    created () {
        this.loadRightBoardData();
    },
    methods: {
        resize() {
          this.healthEstimateChart1.resize();
          this.healthEstimateChart2.resize();
          this.healthEstimateChart3.resize();
          this.publicOpinionsChart.resize();
        },
        /** 获取右屏数据 */
        async loadRightBoardData(){
            let that = this;
            queryIndustryStatus({industryCode:'I01'}).then((res) => {
                if (res.success) {
                    that.focusEnterprises.list = res.result.focusEnterprises;
                    this.focusEnterprises.classOption.limitMoveNum = that.focusEnterprises.list.length;
                    that.healthEstimate = res.result.healthEstimate;
                    that.industryAssorts.list = res.result.industryAssorts;
                    this.industryAssorts.classOption.limitMoveNum = that.industryAssorts.list.length;
                    that.industryNews.list = res.result.industryNews;
                    this.industryNews.classOption.limitMoveNum = that.industryNews.list.length;
                    that.industryPublicOpinions = res.result.industryPublicOpinions;

                    that.$nextTick(()=>{
                      that.drawhealthEstimateChart1();
                      that.drawhealthEstimateChart2();
                      that.drawhealthEstimateChart3();
                      that.drawPublicOpinionsChart();
                    })
                } else {
                    that.$message.warning(res.message);
                }
            });
        },
        /** 根据url获取图片（url暂时写死，使用index） */
        getImageFullPath(url){
            return window._CONFIG['bigscreenStaticDomainURL'] + "/" + url;
        },
        /** 产业链健康评估（右侧） */
        drawhealthEstimateChart1(){
            let that = this;
            let dataArr = [{
                value: parseInt(that.healthEstimate.developAssessment),
            }];
            let position = ['50%', '45%'];
            let color = new that.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: '#5CF9FE' // 0% 处的颜色
                },
                {
                    offset: 0.17,
                    color: '#468EFD' // 100% 处的颜色
                },
                {
                    offset: 0.9,
                    color: '#468EFD' // 100% 处的颜色
                },
                {
                    offset: 1,
                    color: '#5CF9FE' // 100% 处的颜色
                }
            ]);
            let colorSet = [
                [0.91, color],
                [1, '#15337C']
            ];
            let rich = {
                unit: {
                    fontSize: ChartFont(0.14),
                    color: '#fff',
                    fontWeight: '500',
                    padding: [-80, 0, 0, 5]
                },
                num: {
                    fontSize: ChartFont(0.3),
                    fontFamily: 'DINBold',
                    color: '#fff',
                    fontWeight: '550',
                    padding: [-70, 0, 0, 20],
                },
                title: {
                    width: ChartFont(1.5),
                    height: ChartFont(0.4),
                    // lineHeight:80,
                    borderWidth: 1,
                    borderColor: '#0092F2',
                    fontSize: ChartFont(0.16),
                    letterSpacing: 2,
                    color: '#fff',
                    backgroundColor: '#1B215B',
                    borderRadius: 5,
                    textAlign: 'center',
                },
                size: {
                    height: ChartFont(1),
                    padding: [110, 0, 0, 0]
                }
            }
            let option = {
                backgroundColor: 'transparent',
                tooltip: {
                    formatter: "{a} <br/>{b} : {c}%"
                },
                grid: {
                  width: '80%',
                  height: 'auto',
                  top: '3%',
                  left: '10%',
                  right: '10%',
                },
                series: [
                    {
                        name: '最大的底色圆圈',
                        type: 'pie',
                        radius: '90%',
                        center: position,
                        z: 0,
                        itemStyle: {
                            normal: {
                                color: new that.$echarts.graphic.RadialGradient(.5, .5, 1, [{
                                        offset: 0,
                                        color: 'rgba(17,24,43,0)'
                                    },
                                    {
                                        offset: .5,
                                        // color: '#1E2B57'
                                        color:'rgba(28,42,91,.6)'
                                    },
                                    {
                                        offset: 1,
                                        color: '#141C33',
                                        // color:'rgba(17,24,43,0)'
                                    }
                                ], false),
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                }
                            },
                        },
                        hoverAnimation: false,
                        label: {
                            show: false,
                        },
                        tooltip: {
                            show: false
                        },
                        data: [100],
                    },
                    {
                        name: '填充的外层边线',
                        type: 'gauge',
                        radius: '78%',
                        center: position,
                        startAngle: '225',
                        endAngle: '-45',
                        splitNumber: '100',
                        pointer: {
                            show: false
                        },
                        detail: {
                            show: false,
                        },
                        data: [{
                            value: 1
                        }],
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: [
                                    [1, '#00FFFF']
                                ],
                                width: 2,
                                opacity: 1
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: true,
                            length: 20,
                            lineStyle: {
                                color: '#051932',
                                width: 0,
                                type: 'solid',
                            },
                        },
                        axisLabel: {
                            show: false
                        }
                    },
                    {
                        name: '填充圈',
                        type: 'gauge',
                        radius: '75%',
                        center: position,
                        startAngle: '225',
                        endAngle: '-45',
                        pointer: {
                            show: false
                        },
                        detail: {
                            formatter: function(value) {
                                let num = Math.round(value);
                                return '{num|' + num + '}{unit|分}' + '{size|' + '}\n{title|产业发展评估}';
                            },
                            rich: rich,
                            "offsetCenter": ['0%', "0%"],
                        },
                        data: dataArr,
                        title: {
                            show: false,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: colorSet,
                                width: 10,//蓝色圈的宽度
                                // shadowBlur: 15,
                                // shadowColor: '#B0C4DE',
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                opacity: 1
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false,
                            length: 25,
                            lineStyle: {
                                color: '#00377a',
                                width: 2,
                                type: 'solid',
                            },
                        },
                        axisLabel: {
                            show: false
                        },
                    },
                    {
                        name: '刻度线的长轴',
                        type: 'gauge',
                        z: 2,
                        radius: '67%',
                        center: position,
                        startAngle: '225',
                        endAngle: '-45',
                        //center: ["50%", "75%"], //整体的位置设置
                        axisLine: { // 坐标轴线
                            lineStyle: { // 属性lineStyle控制线条样式
                                color: [
                                    [1, '#018DFF']
                                ],
                                width: 2,
                                opacity: 1, //刻度背景宽度
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        // data: [{
                        //     show: false,
                        //     value: '80'
                        // }], //作用不清楚
                        axisLabel: {
                            show: false
                        },
                        pointer: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        detail: {
                            show: 0
                        }
                    },
                    {
                        name: "刻度线",
                        type: "gauge",
                        radius: "65%",
                        center: position,
                        startAngle: 225, //刻度起始
                        endAngle: -45, //刻度结束
                        z: 4,
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            length: 8, //刻度节点线长度
                            lineStyle: {
                                width: 1,
                                color: 'rgba(1,244,255, 0.9)'
                            } //刻度节点线
                        },
                        axisLabel: {
                            color: 'rgba(255,255,255,0)',
                            fontSize: ChartFont(0.12),
                        }, //刻度节点文字颜色
                        pointer: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                opacity: 0
                            }
                        },
                        detail: {
                            show: false
                        },
                        data: [{
                            value: 0,
                            name: ""
                        }]
                    },
                    {
                        name: '中间的背景色内圈',
                        type: 'pie',
                        radius: '65%',
                        center: position,
                        z: 1,
                        itemStyle: {
                            normal: {
                                color: new that.$echarts.graphic.RadialGradient(.5, .5, .8, [{
                                        offset: 0,
                                        color: '#4978EC'
                                    },
                                    {
                                        offset: .5,
                                        color: '#1E2B57'
                                    },
                                    {
                                        offset: 1,
                                        color: '#141F3D'
                                    }
                                ], false),
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                }
                            },
                        },
                        hoverAnimation: false,
                        label: {
                            show: false,
                        },
                        tooltip: {
                            show: false
                        },
                        data: [100],
                    },
                ]
            };
            that.healthEstimateChart1.setOption(option);
        },
        drawhealthEstimateChart2(){
          let that = this;
          let dataArr = [{
            value: parseInt(that.healthEstimate.riskAssessment),
          }];
          let position = ['50%', '45%'];
          let color = new that.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
              offset: 0,
              color: '#ff942b' // 0% 处的颜色
            },
            {
              offset: 0.17,
              color: '#ff0052' // 100% 处的颜色
            },
            {
              offset: 0.9,
              color: '#ff397c' // 100% 处的颜色
            },
            {
              offset: 1,
              color: '#ffae00' // 100% 处的颜色
            }
          ]);
          let colorSet = [
            [0.91, color],
            [1, '#a1022b']
          ];
          let rich = {
            unit: {
              fontSize: ChartFont(0.14),
              color: '#fff',
              fontWeight: '500',
              padding: [-80, 0, 0, 5]
            },
            num: {
              fontSize: ChartFont(0.3),
              fontFamily: 'DINBold',
              color: '#fff',
              fontWeight: '550',
              padding: [-70, 0, 0, 20],
            },
            title: {
              width: ChartFont(1.5),
              height: ChartFont(0.4),
              // lineHeight:80,
              borderWidth: 1,
              borderColor: '#A21D24',
              fontSize: ChartFont(0.16),
              color: '#fff',
              backgroundColor: '#3B242F',
              borderRadius: 5,
              textAlign: 'center',
            },
            size: {
              height: ChartFont(1),
              padding: [110, 0, 0, 0]
            }
          }
          let option = {
            backgroundColor: 'transparent',
            tooltip: {
              formatter: "{a} <br/>{b} : {c}%"
            },
            grid: {
              width: '80%',
              height: 'auto',
              top: '3%',
              left: '10%',
              right: '10%',
            },
            series: [
              {
                name: '最大的底色圆圈',
                type: 'pie',
                radius: '90%',
                center: position,
                z: 0,
                itemStyle: {
                  normal: {
                    color: new that.$echarts.graphic.RadialGradient(.5, .5, 1, [{
                      offset: 0,
                      color: 'rgba(17,24,43,0)'
                    },
                      {
                        offset: .5,
                        // color: '#1E2B57'
                        color:'rgba(28,42,91,.6)'
                      },
                      {
                        offset: 1,
                        color: '#141C33',
                        // color:'rgba(17,24,43,0)'
                      }
                    ], false),
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  },
                },
                hoverAnimation: false,
                label: {
                  show: false,
                },
                tooltip: {
                  show: false
                },
                data: [100],
              },
              {
                name: '填充的外层边线',
                type: 'gauge',
                radius: '78%',
                center: position,
                startAngle: '225',
                endAngle: '-45',
                splitNumber: '100',
                pointer: {
                  show: false
                },
                detail: {
                  show: false,
                },
                data: [{
                  value: 1
                }],
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: [
                      [1, '#ff3874']
                    ],
                    width: 2,
                    opacity: 1
                  }
                },
                axisTick: {
                  show: false
                },
                splitLine: {
                  show: true,
                  length: 20,
                  lineStyle: {
                    color: '#051932',
                    width: 0,
                    type: 'solid',
                  },
                },
                axisLabel: {
                  show: false
                }
              },
              {
                name: '填充圈',
                type: 'gauge',
                radius: '75%',
                center: position,
                startAngle: '225',
                endAngle: '-45',
                pointer: {
                  show: false
                },
                detail: {
                  formatter: function(value) {
                    let num = Math.round(value);
                    return '{num|' + num + '}{unit|分}' + '{size|' + '}\n{title|产业发展评估}';
                  },
                  rich: rich,
                  "offsetCenter": ['0%', "0%"],
                },
                data: dataArr,
                title: {
                  show: false,
                },
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: colorSet,
                    width: 10,//蓝色圈的宽度
                    // shadowBlur: 15,
                    // shadowColor: '#B0C4DE',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    opacity: 1
                  }
                },
                axisTick: {
                  show: false
                },
                splitLine: {
                  show: false,
                  length: 25,
                  lineStyle: {
                    color: '#ff3549',
                    width: 2,
                    type: 'solid',
                  },
                },
                axisLabel: {
                  show: false
                },
              },
              {
                name: '刻度线的长轴',
                type: 'gauge',
                z: 2,
                radius: '67%',
                center: position,
                startAngle: '225',
                endAngle: '-45',
                //center: ["50%", "75%"], //整体的位置设置
                axisLine: { // 坐标轴线
                  lineStyle: { // 属性lineStyle控制线条样式
                    color: [
                      [1, '#ff3874']
                    ],
                    width: 2,
                    opacity: 1, //刻度背景宽度
                  }
                },
                splitLine: {
                  show: false
                },
                // data: [{
                //     show: false,
                //     value: '80'
                // }], //作用不清楚
                axisLabel: {
                  show: false
                },
                pointer: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                detail: {
                  show: 0
                }
              },
              {
                name: "刻度线",
                type: "gauge",
                radius: "65%",
                center: position,
                startAngle: 225, //刻度起始
                endAngle: -45, //刻度结束
                z: 4,
                axisTick: {
                  show: false
                },
                splitLine: {
                  length: 8, //刻度节点线长度
                  lineStyle: {
                    width: 1,
                    color: 'rgba(255,56,116,1)'
                  } //刻度节点线
                },
                axisLabel: {
                  color: 'rgba(255,255,255,0)',
                  fontSize: ChartFont(0.12),
                }, //刻度节点文字颜色
                pointer: {
                  show: false
                },
                axisLine: {
                  lineStyle: {
                    opacity: 0
                  }
                },
                detail: {
                  show: false
                },
                data: [{
                  value: 0,
                  name: ""
                }]
              },
              {
                name: '中间的背景色内圈',
                type: 'pie',
                radius: '65%',
                center: position,
                z: 1,
                itemStyle: {
                  normal: {
                    color: new that.$echarts.graphic.RadialGradient(.5, .5, .8, [{
                      offset: 0,
                      color: '#ffc000'
                    },
                      {
                        offset: .5,
                        color: '#3b262b'
                      },
                      {
                        offset: 1,
                        color: '#341d1f'
                      }
                    ], false),
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  },
                },
                hoverAnimation: false,
                label: {
                  show: false,
                },
                tooltip: {
                  show: false
                },
                data: [100],
              },
            ]
          };
          that.healthEstimateChart2.setOption(option);
        },
        drawhealthEstimateChart3(){
          let that = this;
          let option = {
            grid: [
              {
                //左侧的柱状图grid
                width: "100%",
                left: '1%',
                top: '0',
                right: '0',
                bottom: '0'
              }
            ],
            xAxis: [
              {
                //左侧柱状图的X轴
                gridIndex: 0,//x 轴所在的 grid 的索引
                show: false
              }],
            yAxis: [
              {
                //左侧柱状图的Y轴
                gridIndex: 0,//y轴所在的 grid 的索引
                splitLine: 'none',
                axisTick: 'none',
                axisLine: 'none',
                axisLabel: {
                  verticalAlign: 'bottom',
                  align: 'left',
                  padding: [0, 0, 20, 15],
                  textStyle: {
                    color: '#FFFFFF',
                    fontSize: ChartFont(0.18),
                  }
                },
                data: ['产业建立广度', '产业建立深度'],
                inverse: true,
              },
              {
                //左侧柱状图的Y轴
                gridIndex: 0,//y轴所在的 grid 的索引
                splitLine: 'none',
                axisTick: 'none',
                axisLine: 'none',
                data: [that.healthEstimate.establishScope,that.healthEstimate.establishDepth],
                inverse: true,
                axisLabel: {
                  show: true,
                  verticalAlign: 'bottom',
                  align: 'right',
                  padding: [0, 20, 20, 0],
                  textStyle: {
                    color: '#fff',
                    fontSize: ChartFont(0.18),//右边的百分比字体
                  },
                  formatter: function (value) {
                    return value + '%'
                  },
                  rich: {
                    y: {
                      color: '#befbff',
                      fontSize: ChartFont(0.22)
                    },
                    x: {
                      color: '#f6cf42',
                      fontSize: ChartFont(0.22)
                    }
                  }
                }
              },
              {
                //左侧柱状图的Y轴
                gridIndex: 0,//y轴所在的 grid 的索引
                splitLine: 'none',
                axisTick: 'none',
                axisLine: 'none',
                data: []
              }
            ],
            series: [{
              name: '产业建立广度',
              type: 'bar',
              xAxisIndex: 0,//使用的 x 轴的 index，在单个图表实例中存在多个 x 轴的时候有用。
              yAxisIndex: 0,//使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
              data: [that.healthEstimate.establishScope,],
              barWidth: 10,
              itemStyle: {
                normal: {
                  color: new that.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    'rgba(84, 255, 241, 1)', 'rgba(71, 50, 248, 1)'
                  ].map((color, offset) => ({
                    color,
                    offset
                  })))
                },
              },
              z: 2
            },{
              name: '产业建立深度',
              type: 'bar',
              xAxisIndex: 0,//使用的 x 轴的 index，在单个图表实例中存在多个 x 轴的时候有用。
              yAxisIndex: 0,//使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
              data: [,that.healthEstimate.establishDepth],
              barWidth: 10,
              itemStyle: {
                normal: {
                  color: new that.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    'rgba(84, 255, 241, 1)', 'rgba(171, 50, 248, 1)'
                  ].map((color, offset) => ({
                    color,
                    offset
                  })))
                },
              },
              z: 2
            },
            {
              name: '外框',
              type: 'bar',
              xAxisIndex: 0,//使用的 x 轴的 index，在单个图表实例中存在多个 x 轴的时候有用。
              yAxisIndex: 0,//使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
              barGap: '-100%',
              data: [100,100],
              barWidth: 10,
              itemStyle: {
                normal: {
                  color: 'rgba(27, 57, 89, 0.6)',
                  barBorderRadius: 6,
                }
              },
              z: 0
            },{
              name: '产业建立广度',
              type: 'pictorialBar',
              symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAZlBMVEUAAABe3uVe3+Vf3uVf3+Zf3uVg3+Zg3+Zf3+Vi4OZh4OZg3+Z86/Bh3+Zi4Odj4Odi4OZ86/B76/B86/Bj4ed56+9x5+xn4umB7/N87PB36e+A7/N+7fF/7vJ/7vJ+7fGA7/OB7/PReX+lAAAAIXRSTlMABQkVDREmIhk3MR10LEFFPHh7cUprXE35h2XnqMLAp+mHAG9cAAAB5ElEQVRIx83WjU7CMBQFYIoiKMqU/XUboHv/l/Tce7t2XamDNSacETEmX86tlK2rx4py150o+MstMBLwWRfHKo6JCVxLnvmFGBjFQ58oF1//sUZhGy/ClSTWObgnL4O+bkeN4nY2okfNMbkRt9/vtxz8InoTsWplJSCzFxPmO8+GpSIByX3YQAuGDWtRKhKjCnxDXhF6Z4yxnZ20Wgko7BMRDmxtSGVaI4kdTIgb+zTYoJQlIMlDlmUFgrcDWWC201qSayqlTkiCddWWeV62VU0YlnpRi9VOKaSUsiyq/N0krwq2Ugt7lVpZl5BfHNiytjagMi+XYp0kCR45hMlivVQrE/uU5pXSrCB5bM6d1t2lOZItMqmliT3q5uVxqxzyW/ccfYLNKx7ZTeykMvNyac2yt2Fbc61MHLSC0rwoxbiNdlQ3GBm1NLHQsHUrtEXppR/ljNpW6DbSCoqlFiVoN6YdaFlgsSFVPs1BdT8OaB5QyQzVcaqWDows/zepxR8ObLglTrdtCRVuRNj4Rrxh+//0ke2f8KVL+Kon3GCSbmsJN9OUW3j6g0Ns+LgCij2u0h+Sghc8mlMPBMgdx5DFh59VmOVHrvmDnoNxCz3J7MFWsMuaLyR089xz/xhlfijvwutR8gv3zk6BLUUeCgAAAABJRU5ErkJggg==',
              symbolSize: [50, 50],
              symbolOffset: [20, 0],
              z: 12,
              data: [{
                value: that.healthEstimate.establishScope,
                symbolPosition: 'end'
              },{
                value: 0,
                symbolPosition: 'end'
              },{
                value: 0,
                symbolPosition: 'end'
              },{
                value: 0,
                symbolPosition: 'end'
              }]
            },{
              name: '产业建立深度',
              type: 'pictorialBar',
              symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAZlBMVEUAAABe3uVe3+Vf3uVf3+Zf3uVg3+Zg3+Zf3+Vi4OZh4OZg3+Z86/Bh3+Zi4Odj4Odi4OZ86/B76/B86/Bj4ed56+9x5+xn4umB7/N87PB36e+A7/N+7fF/7vJ/7vJ+7fGA7/OB7/PReX+lAAAAIXRSTlMABQkVDREmIhk3MR10LEFFPHh7cUprXE35h2XnqMLAp+mHAG9cAAAB5ElEQVRIx83WjU7CMBQFYIoiKMqU/XUboHv/l/Tce7t2XamDNSacETEmX86tlK2rx4py150o+MstMBLwWRfHKo6JCVxLnvmFGBjFQ58oF1//sUZhGy/ClSTWObgnL4O+bkeN4nY2okfNMbkRt9/vtxz8InoTsWplJSCzFxPmO8+GpSIByX3YQAuGDWtRKhKjCnxDXhF6Z4yxnZ20Wgko7BMRDmxtSGVaI4kdTIgb+zTYoJQlIMlDlmUFgrcDWWC201qSayqlTkiCddWWeV62VU0YlnpRi9VOKaSUsiyq/N0krwq2Ugt7lVpZl5BfHNiytjagMi+XYp0kCR45hMlivVQrE/uU5pXSrCB5bM6d1t2lOZItMqmliT3q5uVxqxzyW/ccfYLNKx7ZTeykMvNyac2yt2Fbc61MHLSC0rwoxbiNdlQ3GBm1NLHQsHUrtEXppR/ljNpW6DbSCoqlFiVoN6YdaFlgsSFVPs1BdT8OaB5QyQzVcaqWDows/zepxR8ObLglTrdtCRVuRNj4Rrxh+//0ke2f8KVL+Kon3GCSbmsJN9OUW3j6g0Ns+LgCij2u0h+Sghc8mlMPBMgdx5DFh59VmOVHrvmDnoNxCz3J7MFWsMuaLyR089xz/xhlfijvwutR8gv3zk6BLUUeCgAAAABJRU5ErkJggg==',
              symbolSize: [50, 50],
              symbolOffset: [20, 0],
              z: 12,
              data: [{
                value: 0,
                symbolPosition: 'end'
              },{
                value: that.healthEstimate.establishDepth,
                symbolPosition: 'end'
              },{
                value: 0,
                symbolPosition: 'end'
              },{
                value: 0,
                symbolPosition: 'end'
              }]
            }
            ]
          };
          that.healthEstimateChart3.setOption(option);
        },
        /** 产业新闻舆情（右侧） */
        drawPublicOpinionsChart(){
            let that = this, index = 0;
            let colorList = ['#3385ff', '#3cdc98', '#ffa751', '#FDB36A', '#FD866A', '#9E87FF', '#58D5FF']
            function fun() {
                let timer = setInterval(function() {
                    that.publicOpinionsChart.dispatchAction({
                        type: 'hideTip',
                        seriesIndex: 0,
                        dataIndex: index
                    });
                    // 显示提示框
                    that.publicOpinionsChart.dispatchAction({
                        type: 'showTip',
                        seriesIndex: 0,
                        dataIndex: index
                    });
                    // 取消高亮指定的数据图形
                    that.publicOpinionsChart.dispatchAction({
                        type: 'downplay',
                        seriesIndex: 0,
                        dataIndex: index == 0? 5 : index -1
                    });
                    that.publicOpinionsChart.dispatchAction({
                        type: 'highlight',
                        seriesIndex: 0,
                        dataIndex: index
                    });
                    index++;
                    if (index > 5) {
                        index = 0;
                    }
                },3000)
            }
            fun()
            setTimeout(function() {fun()}, 5000);
            let option = {
                title: {
                    show: false
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    type: 'plain',
                    icon: 'circle',
                    bottom: 0,
                    itemGap: 15,
                    textStyle: {
                        color: 'white',
                        fontSize: ChartFont(0.18)
                    }
                },
                series: [{
                    type: 'pie',
                    center: ['50%', '40%'],
                    radius: ['46%', '65%'],
                    clockwise: true,
                    avoidLabelOverlap: true,
                    hoverOffset: 10,
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                return colorList[params.dataIndex]
                            }
                        }
                    },
                    label: {
                        show: true,
                        position: 'outside',
                        formatter: '{d}%',
                        fontSize: ChartFont(0.24),
                        rich: {
                            hr: {
                                backgroundColor: 't',
                                borderRadius: 3,
                                width: 3,
                                height: 3,
                                padding: [3, 3, 0, -12]
                            },
                            a: {
                                padding: [-30, 15, -20, 15]
                            }
                        }
                    },
                    labelLine: {
                        show: false,
                        // normal: {
                        //     length: 20,
                        //     length2: 30,
                        //     lineStyle: {
                        //         width: 1
                        //     }
                        // }
                    },
                    data: that.industryPublicOpinions,
                }]
            };
            that.publicOpinionsChart.setOption(option);
        },
    }
  }
</script>

<style lang="css" scoped>
</style>
<style lang="less" scoped>
  /*@import '~@assets/less/adapter.less';*/
  @import '~@assets/less/bigscreen_main.less';
  @import '~@assets/less/bigscreen_main_right.less';
</style>