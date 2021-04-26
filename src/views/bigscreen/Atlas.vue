<template>
  <div class="hai-content pad">
    <div class="service-tit">
      <span class="span1">企业图谱数据湖</span>
    </div>
    <div class="ptp">
      <div class="ps-top mbt60">
        <div class="pub-item">
          <div class="out-line">
            <div class="himg bkimg1 rotate-img">
              <img class="img" src="@/assets/big/in1.png" />
            </div>
          </div>
          <div class="bt">网络数据：1TB</div>
        </div>
        <div class="pub-item out-right">
          <div class="out-line">
            <div class="himg bkimg2">
              <img class="img2" src="@/assets/big/icon1.png" />
              <div class="num">80,000</div>
            </div>
          </div>
          <div class="bt">具有招商潜力企业</div>
        </div>
        <div class="m-line"></div>
      </div>
      <div class="ct-cback">
        <img src="@/assets/big/cback.png" />
      </div>
      <div class="ps-top">
        <div class="pub-item">
          <div class="out-line">
            <div class="himg bkimg1 rotate-img">
              <img class="img" src="@/assets/big/in2.png" />
            </div>
          </div>
          <div class="bt">智慧城市公共数据：1TB</div>
        </div>
        <div class="pub-item out-right">
          <div class="out-line">
            <div class="himg bkimg2">
              <img class="img2" src="@/assets/big/icon2.png" />
              <div class="num col1">10,000</div>
            </div>
          </div>
          <div class="bt">本地企业</div>
        </div>
        <div class="m-line"></div>
      </div>
    </div>
    <div ref="echartId" class="my-echarts"></div>
  </div>
</template>

<script>
  import { getEnterprise } from '@/api/manage'
  const echarts = require('echarts');
  export default {
    name: "Service",
    data() {
      return {
        dataArr:[],
        dots:[
          // {name: '企业',symbolSize: 60,category: 0},{name: '政策',symbolSize: 60,category: 1},
          // {name: '产业',symbolSize: 60,category: 2},{name: '商标种类',symbolSize: 40,category: 0},
          // {name: '发布单位',symbolSize: 40,category: 1},{name: '上游产业',symbolSize: 40,category: 2},
          // {name: '测试1',symbolSize: 40,category: 2},{name: '测试2',symbolSize: 40,category: 2},
          // {name: '测试3',symbolSize: 40,category: 2},{name: '测试4',symbolSize: 40,category: 2},
          // {name: '测试5',symbolSize: 40,category: 2},{name: '测试6',symbolSize: 40,category: 2},
          // {name: '测试7',symbolSize: 40,category: 2},{name: '测试8',symbolSize: 40,category: 2}
        ],
        lines:[
          // {source: '企业',target: '政策',name: ''}, {source: '政策',target: '产业',name: ''},
          // {source: '企业',target: '商标种类',name: ''},{source: '政策',target: '发布单位',name: ''},
          // {source: '产业',target: '上游产业',name: ''},{source: '上游产业',target: '测试1',name: ''},
          // {source: '测试1',target: '测试2',name: ''},{source: '产业',target: '测试3',name: ''},
          // {source: '产业',target: '测试4',name: ''},{source: '产业',target: '测试5',name: ''},
          // {source: '产业',target: '测试6',name: ''},{source: '产业',target: '测试7',name: ''},
          // {source: '产业',target: '测试8',name: ''}
        ]
      }
    },
    created() {
      this.getDatas();
    },
    mounted(){
      // this.$nextTick(()=>{
      //   this.setGraph();
      // })
    },
    methods: {
      getList(arr,type,pCode){
        for(let i=0;i<arr.length;i++){
          let lineObj = {};
          let obj = {
            id:arr[i].code,
            name:arr[i].name
          }
          obj.symbolSize = 40;
          obj.category = type;
          this.dots.push(obj);
          lineObj.source = pCode;
          lineObj.target = arr[i].code;
          lineObj.name = '';
          this.lines.push(lineObj);
          if(arr[i].children){
            this.getList(arr[i].children,type,arr[i].code)
          }
        }
      },
      getDatas(){
        getEnterprise().then((res) => {
          if (res.success) {
            let list = res.result.enterpriseLabelTree || [];
            this.dataArr = list;
            for(let i=0;i<list.length;i++){
              if(i>0){
                let lineObj = {};
                lineObj.source = list[i-1].code;
                lineObj.target = list[i].code;
                lineObj.name = '';
                this.lines.push(lineObj);
              }
              let obj = {
                id:list[i].code,
                name:list[i].name,
                symbolSize:60,
                category:i
              }
              this.dots.push(obj);
              this.getList(list[i].children,i,list[i].code)
            }
            
            this.$nextTick(()=>{
              this.setGraph();
            })
          }
        })
      },
      setGraph(){
        let categories = [];
        for (let i = 0; i < this.dataArr.length; i++) {
          categories[i] = {
              name: '类目' + i
          };
        }
        let option = {
          color:['#e28400','#23e9f4','#00a1fc'],
          title: {
            text: ''
          },
          tooltip: {
            show: false,
          },
          toolbox: {
            show: false,
          },
          series: [{
            type: 'graph', // 类型:关系图
            layout: 'force', //图的布局，类型为力导图
            symbolSize: 40, // 调整节点的大小
            roam: true,
            // edgeSymbol: ['circle', 'arrow'],
            // edgeSymbolSize: [2, 10],
            label: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 12,
                  color:'#fff'
                }
              }
            },
            force: {
              repulsion: 200,
              edgeLength: [10, 30]
            },
            draggable: true,
            lineStyle: {
              normal: {
                  width: 2,
                  color: '#f9f9f9',
              }
            },
            edgeLabel: {
              normal: {
                show: false,
              }
            },
            data: this.dots,
            links: this.lines,
            categories: categories,
          }]
        };
        let myChart = echarts.init(this.$refs.echartId);
        myChart.setOption(option);
      }
    }
  }
</script>
<style scoped>
.himg{
  position: relative;
  width: 11vw;
  height: 11vw;
  text-align: center;
}
.bkimg1{
  background: url('../../assets/big/rotate.png') no-repeat center;
  background-size: cover;
  line-height: 11vw;
}
.bkimg2{
  padding-top: 3.5vw;
  background: url('../../assets/big/out.png') no-repeat center;
  background-size: cover;
}
.himg .num{
  margin-top: 2px;
  font-size: 26px;
  color: #23E9F4;
}
.himg .num.col1{
  color: #E18400;
}
.rotate-img{
  animation:rotate-img 2s linear infinite; 
  -webkit-animation:rotate-img 2s linear infinite;
}
@keyframes rotate-img{
  0%{-webkit-transform:rotate(0deg);}
  25%{-webkit-transform:rotate(90deg);}
  50%{-webkit-transform:rotate(180deg);}
  75%{-webkit-transform:rotate(270deg);}
  100%{-webkit-transform:rotate(360deg);}
}
.out-line{
  display: inline-block;
  position: relative;
  border: 4px solid #36B3E7;
  border-radius: 50%;
  padding: 10px;
  z-index: 2;
  background-color: #000B36;
}
.himg .img{
  width: 2.5vw;
  height: auto;
}
.himg .img2{
  width: 2.5vw;
}
.pub-item {
  display: inline-block;
  position: relative;
}
.pub-item .bt{
  position: absolute;
  bottom: -40px;
  left: 0;
  width: 100%;
  color: #fff;
  text-align: center;
  margin-top: 10px;
  font-size: 20px;
}
.hai-content.pad{
  padding: 0 10%;
}
.hai-content .ptp{
  position: relative;
  top: 5vw;
}
.hai-content .ps-top{
  position: relative;
}
.mbt60{
  margin-bottom: 180px;
}
.ps-top .m-line{
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: #36B3E7;
}
.out-right{
  position: absolute;
  top: 0;
  right: 0;
}
.my-echarts{
  position: absolute;
  top: 0;
  left: 0;
  width:100%;
  height:100vh;
  z-index: 3;
}
.ct-cback{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  z-index: 2;
}
.ct-cback img{
  height: 100%;
  width: auto;
}
</style>