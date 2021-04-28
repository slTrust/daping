<template>
  <div class="hai-content">
    <div class="service-tit">
      <span class="span1">1+3架构</span>
    </div>
    <div class="arch_content">
      <div class="lside">
        <div class="top">
          <div>企业图谱数据湖</div>
          <div>3个能力</div>
          <div>N个模块</div>
        </div>
        <div class="content">
          <div class="box1">
            <div ref="chartWave"
                 style="height: 100%;width:100%;">
            </div>
            <div class="texts">
              <span v-for="(item,idx) in currentTxtsArr"
                    :class="`txt txt${idx%count+1}`"
                    :key=item>
                {{item}}
              </span>
              <!-- <span class="txt txt1">企业标签</span>
              <span class="txt txt2">产品标签</span>
              <span class="txt txt3">政策标签</span>
              <span class="txt txt4">产业链标签</span> -->
            </div>
          </div>
          <div class="box2">
            <div class="ability_box">
              <div class="ab_box">
                <div class="ab_arrow"></div>
                <div class="ab_column"></div>
              </div>
              <div class="ab_name">产业精准招商</div>
            </div>
            <div class="ability_box">
              <div class="ab_box">
                <div class="ab_arrow"></div>
                <div class="ab_column"></div>
              </div>
              <div class="ab_name">经济运行分析</div>
            </div>
            <div class="ability_box">
              <div class="ab_box">
                <div class="ab_arrow"></div>
                <div class="ab_column"></div>
              </div>
              <div class="ab_name">企业主动服务</div>
            </div>
          </div>
          <div class="dotted_line">
            <div class="inner"></div>
          </div>
          <div class="box3">
            <div class="r3">
              <div class="item orange">政策兑现</div>
              <div class="item">精准匹配</div>
              <div class="item">资本市场培育</div>
            </div>
            <div class="r3">
              <div class="item orange">企业服务门户</div>
              <div class="item orange">生命周期服务</div>
              <div class="item">产业晴雨表</div>
            </div>
            <div class="r3">
              <div class="item green">产业标签统计分析</div>
              <div class="item green">区域产业要素分析与研判</div>
            </div>
            <div class="r3">
              <div class="item">区域产业政策及要素比对</div>
              <div class="item green">自定义产业财税分析</div>
            </div>
            <div class="r3">
              <div class="item">经济标签统计分析</div>
              <div class="item">政策搜索</div>
              <div class="item green">区域经济驾驶舱</div>
            </div>
            <div class="r3">
              <div class="item orange item_new">区域产业要素与招商标的对比分析</div>
              <div class="item orange item_new">产业链招商</div>
            </div>
            <div class="r3">
              <div class="item orange item_new">以商招商</div>
              <div class="item orange item_new">企业关系图谱</div>
              <div class="item orange item_new">企业业务图谱</div>
            </div>
            <div class="r3">
              <div class="item orange item_new">企业实力指数</div>
              <div class="item orange item_new">企业风险分析</div>
              <div class="item orange item_new">信用活力报告</div>
            </div>
          </div>
        </div>
      </div>
      <div class="rside">
        <div class="img_box">
          <div class="name">服务对象</div>
        </div>
        <div class="img_box">
          <span class="img"></span>
          <div class="name">政府</div>
        </div>
        <div class="img_box">
          <span class="img"></span>
          <div class="name">企业</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const echarts = require('echarts')
// import 'echarts-liquidfill'
import '../../assets/echarts.liquidiff.min.js'
export default {
  name: 'Archiecture',
  data() {
    return {
      timer: null,
      currentIndex: 0,
      currentTxtsArr: [],
      count: 4,
      txts: [
        '高新技术企业',
        '瞪羚企业',
        '小微企业',
        '国有企业',
        '有限责任公司',
        '股份有限公司',
        '私营企业',
        '联营企业',
        '独资企业',
        '科技型中小企业',
        '雏鹰企业',
        '独角兽企业',
        '外商投资企业',
        '人才政策',
        '财税政策',
        '科技政策',
        '人工智能',
        '大数据',
        '集成电路',
        '物理网',
        '网络安全',
        '互联网+',
        '云计算',
        '电子商务',
        '智能终端',
        '智能机器人',
        '新能源汽车',
        '互动娱乐',
        '影视动漫',
        '出版传媒',
        '文化演艺',
        '民办教育',
        '课外培训',
      ],
    }
  },
  created() {},
  mounted() {
    this.initChart()
    if (this.timer) {
      clearInterval(this.timer)
    } else {
      this.timer = setInterval(this.loop, 4000)
    }
  },
  methods: {
    loop() {
      let count = 4
      if (this.currentIndex >= this.txts.length) {
        this.currentIndex = 0
      }
      let len = this.txts.length
      let start = this.currentIndex
      let currentArr = []
      for (let i = start; i < start + 5; i++) {
        let idx = i
        if (idx >= len) {
          idx = idx % (len - 1)
        }
        currentArr.push(this.txts[idx])
      }
      this.currentTxtsArr = currentArr
      this.currentIndex += count
    },
    initChart() {
      let myChart = echarts.init(this.$refs.chartWave)
      var value = 0.75
      var data = [value, value, value]
      let option = {
        // backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [
        //   {
        //     offset: 0,
        //     color: '#431ab8',
        //   },
        //   {
        //     offset: 1,
        //     color: '#471bba',
        //   },
        // ]),
        title: {
          show: false,
          text: (value * 100).toFixed(0) + '{a|%}',
          textStyle: {
            fontSize: 50,
            fontFamily: 'Microsoft Yahei',
            fontWeight: 'normal',
            color: '#bcb8fb',
            rich: {
              a: {
                fontSize: 28,
              },
            },
          },
          x: 'center',
          y: '35%',
        },

        series: [
          {
            type: 'liquidFill',
            radius: '95%',
            center: ['50%', '50%'],
            //  shape: 'roundRect',
            data: data,
            backgroundStyle: {
              color: {
                type: 'linear',
                x: 1,
                y: 0,
                x2: 0.5,
                y2: 1,
                colorStops: [
                  {
                    offset: 1,
                    color: 'rgba(68, 145, 253, 0)',
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(68, 145, 253, .25)',
                  },
                  {
                    offset: 0,
                    color: 'rgba(68, 145, 253, 1)',
                  },
                ],
                globalCoord: false,
              },
            },
            outline: {
              borderDistance: 0,
              itemStyle: {
                borderWidth: 20,
                borderColor: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: 'rgba(69, 73, 240, 0)',
                    },
                    {
                      offset: 0.5,
                      color: 'rgba(69, 73, 240, .25)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(69, 73, 240, 1)',
                    },
                  ],
                  globalCoord: false,
                },
                shadowBlur: 10,
                shadowColor: '#000',
              },
            },
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 1,
                  color: 'rgba(58, 71, 212, 0)',
                },
                {
                  offset: 0.5,
                  color: 'rgba(31, 222, 225, .2)',
                },
                {
                  offset: 0,
                  color: 'rgba(31, 222, 225, 1)',
                },
              ],
              globalCoord: false,
            },
            label: {
              normal: {
                formatter: '',
              },
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
.hai-content {
  padding: 0 30px;
  padding-top: 4vh;
}
.arch_content {
  margin: 50px auto 50px;
  border: 2px solid #0186f1;
  min-height: 840px;
  min-width: 1684px;
  padding: 20px 32px;

  display: flex;
  justify-content: space-between;
  align-content: space-between;
  .lside {
    display: flex;
    flex: 1;
    flex-direction: column;
    .top {
      display: flex;
      justify-content: space-around;
      align-items: center;
      min-height: 138px;
      font-size: 42px;
      background: linear-gradient(270deg, #007bd8 0%, #002d6e 32%, #000b36 100%);
      color: #fff;
      margin-bottom: 20px;
    }
    .content {
      padding: 20px;
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      background: linear-gradient(270deg, #007bd8 0%, #002d6e 32%, #000b36 100%);
      .box1 {
        width: 580px;
        height: 540px;
        border: 20px solid transparent;
        overflow: hidden;
        position: relative;
      }
      .box2 {
        z-index: 2;
        width: 380px;
        height: 100%;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        .ability_box {
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          .ab_box {
            display: flex;
            align-items: center;
            flex-direction: row;
            justify-content: space-between;
            .ab_arrow {
              height: 36px;
              width: 72px;
              background-image: url('../../assets/bigscreen/p1_arrow.gif');
              background-size: cover;
            }
            .ab_column::after {
              top: 50%;
              left: 100%;
              position: absolute;
              content: '';
              display: block;
              width: 110px;
              border-top: 2px dotted #23e9f4;
              height: 0px;
            }
            .ab_column {
              position: relative;
              background-image: url('../../assets/bigscreen/p1_column.png');
              background-size: cover;
              height: 111px;
              width: 166px;
            }
          }
          .ab_name {
            padding-left: 70px;
            font-size: 30px;
            font-weight: bold;
            color: #fff;
            padding-top: 15px;
          }
        }
      }
      .dotted_line {
        flex: 1;
        z-index: 3;
        height: calc(100% - 60px);
        border: 2px dotted #23e9f4;
        border-right: none;
        width: 48px;
        margin: 30px 0;
      }
      .box3 {
        z-index: 4;
        width: 480px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .r3 {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .item {
            text-align: center;
            background: #008df8;
            border-radius: 4px;
            color: #fff;
            font-size: 18px;
            line-height: 28px;
            padding: 12px 20px;
          }
          .item_new {
            position: relative;
          }
          .item_new::after {
            animation: animation_opacity 1s linear 0s infinite;
            position: absolute;
            content: '';
            display: block;
            top: 0;
            left: 10px;
            width: 38px;
            height: 21px;
            background-image: url('../../assets/bigscreen/p1_new.png');
            background-size: cover;
          }
          .orange {
            background: #ffa300;
          }
          .green {
            background: #00be19;
          }
        }
        .r3:nth-child(3) {
        }
        .r3:nth-child(4),
        .r3:nth-child(4) {
        }
      }
    }
  }
  .rside {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 177px;
    margin-left: 20px;
    font-size: 36px;
    font-weight: 500;
    color: #fff;

    div.img_box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 3px solid #0085d9;
      margin-bottom: 20px;
      .name {
        display: flex;
        align-content: center;
        justify-content: center;
      }
      .img {
        height: 60px;
        width: 60px;
        background-image: url('../../assets/bigscreen/p1_zf.png');
        background-size: cover;
        margin-bottom: 20px;
      }
    }

    div.img_box:first-child {
      height: 138px;
    }
    div.img_box:nth-child(2),
    div.img_box:nth-child(3) {
      flex: 1;
    }
    div.img_box:last-child {
      margin-bottom: 0;
      .img {
        background-image: url('../../assets/bigscreen/p1_company.png');
        background-size: cover;
      }
    }
  }
}

@keyframes animation_opacity {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

// 标签
@keyframes tag_move1 {
  0% {
    transform: translate(0px, 250px);
  }
  100% {
    transfrom: translate(0px, 20px);
    opacity: 0.1;
  }
}
@keyframes tag_move2 {
  0% {
    transform: translate(30px, 200px);
  }
  100% {
    transfrom: translate(30px, 60px);
    opacity: 0.1;
  }
}

@keyframes tag_move3 {
  0% {
    transform: translate(120px, 320px);
  }
  100% {
    transfrom: translate(120px, 60px);
    opacity: 0.1;
  }
}
@keyframes tag_move4 {
  0% {
    opacity: 1;
    transform: translate(260px, 250px);
  }
  100% {
    transfrom: translate(260px, 60px);
    opacity: 0.1;
  }
}
.texts {
  display: block;
  position: absolute;
  right: 100px;
  left: 100px;
  top: 100px;
  bottom: 100px;
  // background: pink;
}
.texts .txt {
  z-index: 10;
  position: absolute;
  display: inline-block;
  height: 20px;
  border-radius: 100%;
  font-size: 24px;
  font-weight: bold;
  opacity: 0.8;
}
.txt1 {
  transform: translate(0, 20px);
  animation: tag_move1 4s linear 250ms infinite;
  color: #3eacff;
}
.txt2 {
  transform: translate(30px, 60px);
  animation: tag_move2 4s linear 0ms infinite;
  color: #ffa300;
}
.txt3 {
  transform: translate(120px, 90px);
  animation: tag_move3 4s linear 0ms infinite;
  color: #00be19;
}
.txt4 {
  transform: translate(260px, 60px);
  animation: tag_move4 4s linear 0ms infinite;
  color: #23e9f4;
}
</style>
