<template>
  <div class="hai-content pad">
    <div class="service-tit">
      <span class="span1">企业画像</span>
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
        console.log(categories)
        console.log(this.dots)
        console.log(this.lines)
        this.lines.forEach(e=>{
          e.name = ''
        })

        let option = {
          legend: {
            data: categories.map(item=>item.name)
          },
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
            edgeSymbol: ['arrow', ''],
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
.my-echarts{
  position: absolute;
  top: 0;
  left: 0;
  width:100%;
  height:100vh;
  z-index: 3;
}
</style>