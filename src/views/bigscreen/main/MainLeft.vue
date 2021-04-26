<template>
  <!-- 大屏-主屏 -->
  <div class="">
    <!-- 左屏 -->
    <a-row :gutter="20" class="left-row-1">
      <a-col :span="8" class="left-row-1-col">
        <a-col :span="9" class="icon icon-1"></a-col>
        <a-col :span="13" class="content">
          <a-row class="title">企业数量</a-row>
          <a-row class="num">
            <a-row class="num">
              <countTo :startVal='0' :endVal='enterpriseAmount.num' :duration='count.duration'
                       @mountedCallback="showPlus(0,true)"></countTo>
              <span v-if="isPulsSignShow[0] && enterpriseAmount.isAbbr">+</span>
            </a-row>
          </a-row>
        </a-col>
      </a-col>
      <a-col :span="8" class="left-row-1-col">
        <a-col :span="9" class="icon icon-2"></a-col>
        <a-col :span="13" class="content">
          <a-row class="title">经济贡献值</a-row>
          <a-row class="num">
            <countTo :startVal='0' :endVal='economicContribution.num' :duration='3000'
                     @mountedCallback="showPlus(1,true)"></countTo>
            <span class="unit">万</span>
            <span v-if="isPulsSignShow[1] && economicContribution.isAbbr">+</span>
          </a-row>
        </a-col>
      </a-col>
      <a-col :span="8" class="left-row-1-col">
        <a-col :span="9" class="icon icon-3"></a-col>
        <a-col :span="13" class="content">
          <a-row class="title">总营业额</a-row>
          <a-row class="num">
            <countTo :startVal='0' :endVal='operatingRevenue.num' :duration='3000'
                     @mountedCallback="showPlus(2,true)"></countTo>
            <span class="unit">万</span>
            <span v-if="isPulsSignShow[2] && operatingRevenue.isAbbr">+</span>
          </a-row>
        </a-col>
      </a-col>
    </a-row>
    <a-row class="left-row-2">
      <a-row class="panel-title-row">
        <a-col class="panel-title1">
          <span class="panel-title1-text">主导产业</span>
        </a-col>
        <a-col class="left-row-2-banner"></a-col>
      </a-row>
      <a-row class="chart-row">
        <div id="mainIndustryChart" class="chart"></div><!-- 主导产业图表 -->
      </a-row>
    </a-row>
    <a-row class="left-row-3">
      <a-row>
        <a-col class="panel-title1">
          <span class="panel-title1-text">京津冀协同发展</span>
        </a-col>
        <a-col class="left-row-3-swiper">
          <div class="page1_panel3 screen-anim screen-anim-leftbit">
            <ul class="page1_panel3_list">
              <li>
                <div class="title">企业占比</div>
                <div class="number">
                  <countTo :startVal='0' :endVal='getInt(bthProduction.enterpriseAmount)'
                           :duration='3000' class="number-text"></countTo>家
                </div>
                <div class="per number-text">
                  <countTo :startVal='0' :endVal='getInt(bthProduction.enterpriseAmountRatio)'
                           :duration='count.duration'></countTo>%
                </div>
              </li>
              <li>
                <div class="title">注册资金</div>
                <div class="number">
                  <countTo :startVal='0' :endVal='getInt(bthProduction.registeredFund)'
                           :duration='count.duration' class="number-text" style="color:#fff700"></countTo>亿
                </div>
                <div class="per number-text">
                    <countTo :startVal='0' :endVal='getInt(bthProduction.registeredFundRatio)'
                             :duration='count.duration'></countTo>%
                </div>
              </li>
              <li>
                <div class="title">上季度新增企业</div>
                <div class="number">
                  <countTo :startVal='0' :endVal='getInt(bthProduction.lastAddEnterprises)'
                           :duration='count.duration' class="number-text" style="color:#4ad28b"></countTo>亿
                </div>
                <div class="per number-text">
                    <countTo :startVal='0' :endVal='getInt(bthProduction.lastAddEnterprisestRatio)'
                             :duration='count.duration'></countTo>%
                </div>
              </li>
            </ul>
          </div>
        </a-col>
      </a-row>
    </a-row>
  </div>
</template>

<script>
  import { ChartFont } from '@/utils/util'
  import countTo from 'vue-count-to'
  import {queryEnterpriseProduction} from '@/api/bigScreenAPI'
  export default {
    components: { countTo },
    data() {
      return {
        count: {
          duration: 4000,
        },
        mainIndustryChart: null,
        // 统计数据（左上）
        totalEnterpriseProduction: {
          economicContribution: 0,
          enterpriseAmount: 0,
          id: '',
          industryCode: '',
          industryName: '',
          operatingRevenue: 0,
          year: 0,
        },
        // 是否显示+号，数字滚动完后显示, 右上角从左至右的顺序
        isPulsSignShow: [false, false, false],
        // 主导产业数据（左中）
        mainIndustry: {
          // 时间轴的年份（一维数组）
          years: [],
          // Y轴名称（二维数组，顺序与年份数组对应）
          jdData: [],
          // 数据（二维数组，顺序与年份数组对应）
          data: []
        },
        // 京津冀协同发展数据（左下）
        bthProduction: {
          enterpriseAmount: 0,
          enterpriseAmountRatio: '0',
          id: '',
          lastAddEnterprises: 0,
          lastAddEnterprisestRatio: '0',
          registeredFund: '0',
          registeredFundRatio: '0',
        },
      }
    },
    watch: {
    },
    computed: {
      enterpriseAmount() {
        let num = this.totalEnterpriseProduction.enterpriseAmount;
        let max = 99;
        let needAbbr = num>max;
        return {
          num: needAbbr?max:this.totalEnterpriseProduction.enterpriseAmount,
          isAbbr: needAbbr
        }
      },
      economicContribution() {
        let num = this.totalEnterpriseProduction.economicContribution;
        let max = 70;
        let needAbbr = num>max;
        return {
          num: needAbbr?max:this.totalEnterpriseProduction.economicContribution,
          isAbbr: needAbbr
        }
      },
      operatingRevenue() {
        let num = this.totalEnterpriseProduction.operatingRevenue;
        let max = 1500;
        let needAbbr = num>max;
        return {
          num: needAbbr?max:this.totalEnterpriseProduction.operatingRevenue,
          isAbbr: needAbbr
        }
      }
    },
    mounted () {
      this.mainIndustryChart = this.$echarts.init(document.getElementById('mainIndustryChart'));
    },
    created () {
      this.loadLeftBoardData();
    },
    methods: {
      getInt(value) {
        if(!value || value=='') {
          return 0;
        }
        return parseInt(value);
      },
      showPlus(index, bool) {
        let that = this;
        setTimeout(() => {
          that.$set(that.isPulsSignShow, index, bool);
        }, 2800)
      },
      resize() {
        this.mainIndustryChart.resize();
      },
      /** 获取左屏数据 */
      async loadLeftBoardData(){
        let that = this;
        queryEnterpriseProduction().then((res) => {
          if (res.success) {
            console.log(res.result);
            that.totalEnterpriseProduction = res.result.totalEnterpriseProduction;
            that.mainIndustry = res.result.mainIndustry;
            that.bthProduction = res.result.bthProduction;
            that.drawMainIndustryChart();
          } else {
            that.$message.warning(res.message);
          }
        });
      },
      /** 主导产业图表（左侧） */
      drawMainIndustryChart(){
        let that = this;
        // 其他 #ff758d  # ff002c   智能科技#00b4f4 #0071c8   大健康#4ecb77 #18b54c
        // 文化旅游： #ffd961 #ffba00  教育培训：# c082ff #9230df  绿色金融 #c4ff66 #ffae00
        let colorList = [
          new that.$echarts.graphic.LinearGradient(0, 0, 1, 0,
            [{ offset: 0, color: '#01fe50' }, { offset: 1, color: '#0bf506' }]),
          new that.$echarts.graphic.LinearGradient(0, 0, 1, 0,
            [{ offset: 0, color: '#c082ff' }, { offset: 1, color: '#9230df' }]),
          new that.$echarts.graphic.LinearGradient(0, 0, 1, 0,
            [{ offset: 0, color: '#ffd961' }, { offset: 1, color: '#ffba00' }]),
          new that.$echarts.graphic.LinearGradient(0, 0, 1, 0,
            [{ offset: 0, color: '#4ecb77' }, { offset: 1, color: '#18b54c' }]),
          new that.$echarts.graphic.LinearGradient(0, 0, 1, 0,
            [{ offset: 0, color: '#00b4f4' }, { offset: 1, color: '#0071c8' }]),
          new that.$echarts.graphic.LinearGradient(0, 0, 1, 0,
            [{ offset: 0, color: '#ff758d' }, { offset: 1, color: '#ff002c' }]),
        ];
        let option = {
          baseOption: {
            backgroundColor: 'transparent', //背景颜色
            timeline: {
              data: that.mainIndustry.years,
              axisType: 'category',
              autoPlay: true,
              playInterval: 3000, //播放速度
              left: '8%',
              right: '5%',
              bottom: '0',
              width: '90%',
              height: ChartFont(0.7),
              label: {
                normal: {
                  textStyle: {
                    color: '#a6a6a6',
                    fontSize: ChartFont(0.2),
                    lineHeight: ChartFont(0.4),
                  }
                },
                emphasis: {
                  textStyle: {
                    color: '#00fffc',
                    fontSize: ChartFont(0.16),
                    lineHeight: ChartFont(0.24),
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: '#a6a6a6',
                },
                emphasis: {
                  color: '#00fffc',
                  borderColor: '#00fffc',
                  borderWidth: ChartFont(0.5)
                }
              },
              symbolSize: ChartFont(0.16),
              lineStyle: {
                color: '#7d7d7d'
              },
              checkpointStyle: { // 时间轴当前点
                color: '#00fffc',
                borderColor: '#00fffc',
                borderWidth: ChartFont(0.15)
              },
              controlStyle: {
                showNextBtn: true,
                showPrevBtn: true,
                itemSize: ChartFont(0.3),
                itemGap: ChartFont(0.3),
                normal: {
                  color: '#1296db',
                  borderColor: '#1296db',
                },
                emphasis: {
                  color: '#00fffc',
                  borderColor: '#00fffc'
                }
              },
            },
            title: {
              show: false,
            },
            calculable: true,
            grid: {
              left: '20%',
              right: '5%',
              bottom: '14%',
              top: '0%',
              containLabel: true
            },
            label: {
              normal: {
                textStyle: {
                  color: '#00fffc'
                }
              }
            },
            yAxis: [{
              nameGap: 50,
              offset: '50%',
              type: 'category',
              interval: 50,
              //inverse: ture,//图表倒叙或者正序排版
              data: '',
              nameTextStyle: {
                color: '#00fffc'
              },
              axisLabel: { show: false, },
              splitLine: { show: false },
              axisTick: { show: false },
              axisLine: { show: false },
            }],
            xAxis: {
              show: false,
              type: 'value'
            },
            series: [{
              name: '',
              type: 'bar',
              markLine: {
                label: {
                  normal: {
                    show: false
                  }
                },
                lineStyle: {
                  normal: {
                    color: '#00fffc',
                    width: 3
                  }
                },
              },
              barWidth: '38%',
              barGap: '-100%',
              label: {
                normal: {
                  show: true,
                  fontSize: ChartFont(0.26), // bar右侧数值
                  // color: 'white',
                  position: 'right', // 数值显示在右侧
                  formatter: '{c}'
                }
              },
              itemStyle: {
                normal: {
                  barBorderRadius: 2,
                  color: '#ffffff',
                }
              },
            },
              {
                name: '',
                type: 'bar',
                markLine: {
                  label: {
                    normal: {
                      show: false
                    }
                  },
                  lineStyle: {
                    normal: {
                      color: '#00fffc',
                      width: 3
                    }
                  },
                },
                barWidth: '38%',
                barGap: '-100%',
                label: {
                  normal: {
                    show: true,
                    color: 'white',
                    fontSize: ChartFont(0.22),  //标签国家字体大小
                    position: 'left', //数值显示在右侧
                    distance: 50,
                    formatter: function(p) {
                      return p.name+'';
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    barBorderRadius: 2,
                    color: function(params) {
                      return colorList[that.mainIndustry.jdData[0].indexOf(params.name)];
                    },
                  }
                },
              }
            ],
            animationEasingUpdate: 'quinticInOut',
            animationDurationUpdate: 1500, //动画效果
          },
          options: []
        }
        for (let n = 0; n < that.mainIndustry.years.length; n++) {
          let res = [];
          //alert(this.mainIndustry.jdData.length);
          for (let j = 0; j < that.mainIndustry.data[n].length; j++) {
            res.push({
              name: that.mainIndustry.jdData[n][j],
              value: that.mainIndustry.data[n][j]
            });
          }
          res.sort(function(a, b) {
            return b.value - a.value;
          }).slice(0, 6);

          res.sort(function(a, b) {
            return a.value - b.value;
          });

          let res1 = [];
          let res2 = [];
          let res3 = [];
          //console.log(res);
          for (let t = 0; t < res.length; t++) {
            res1[t] = res[t].name;
            res2[t] = res[t].value;
            res3[t] = res[t].value;
          }
          option.options.push({
            title: {
              text: that.mainIndustry.years[n] + '年'
            },
            yAxis: {
              data: res1,
            },
            series: [{
              data: res3
            }, {
              data: res2
            }]
          });
        }
        that.mainIndustryChart.setOption(option);
      },
    }
  }
</script>

<style lang="css" scoped>
</style>
<style lang="less" scoped>
  @import '~@assets/fonts/fonts.less';
  @import '~@assets/less/bigscreen_main.less';
  @import '~@assets/less/bigscreen_main_left.less';
</style>