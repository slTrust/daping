<template>
  <div class="hai-content">
    <div class="service-tit">
      <span class="span1">精准招商<span>-招商模型</span></span>
    </div>
    <div class="top-img">
      <img style="width:100%;" src="@/assets/big/top-back.png" />
      <div class="mid-c">
        <!-- <span>标签</span> -->
        <img src="@/assets/big/label.png" />
      </div>
      <div class="arrow-pub arrow-l">
        <span>产业链</span>
        <img src="@/assets/big/dt-icon.gif" />
      </div>
      <div class="arrow-pub arrow-r">
        <img src="@/assets/big/dt-icon.gif" />
        <span>企业产品</span>
      </div>
      <div class="pub-c pc1">智能科<br>技服务</div>
      <div class="pub-c pc2">文化<br>旅游</div>
      <div class="pub-c pc3">大<br>健康</div>
      <div class="pub-c pc4">教育<br>培训</div>
      <div class="pub-c pc5">绿色<br>金融</div>
      <div class="pub-c pc6">大数据<br>采集</div>
      <div class="pub-c pc7">人工<br>智能</div>
      <div class="pub-c pc8">数据<br>中台</div>
      <div class="pub-c pc9">企业<br>图谱</div>
      <div class="pub-c pc10">AI智能<br>分析</div>
    </div>
    <div class="out-div">
      <a-row :gutter="[16,16]">
        <a-col :span="12">
          <div class="pub-tb">
            <div class="tab-tit">产业链推荐企业</div>
            <div class="head-tit">
              <a-row>
                <a-col :span="8">
                  <div class="span">推荐企业</div>
                </a-col>
                <a-col :span="8">
                  <div class="span">关键词</div>
                </a-col>
                <a-col :span="8">
                  <div class="span">匹配指数</div>
                </a-col>
              </a-row>
            </div>
            <vue-seamless-scroll :data="tableObj.industryRecommends" class="seamless-warp" :class-option="classOption">
              <ul>
                <li v-for="(item,index) in tableObj.industryRecommends" :key="index">
                  <a-row>
                    <a-col :span="8">
                      <div class="span">{{item.enterpriseName}}</div>
                    </a-col>
                    <a-col :span="8">
                      <div class="span">{{item.recommendKey}}</div>
                    </a-col>
                    <a-col :span="8">
                      <div class="span">{{item.matchIndex}}</div>
                    </a-col>
                  </a-row>
                </li>
              </ul>
            </vue-seamless-scroll>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="pub-tb">
            <div class="tab-tit">京津翼一体化承载平台推荐企业</div>
            <div class="head-tit">
              <a-row>
                <a-col :span="8">
                  <div class="span">推荐企业</div>
                </a-col>
                <a-col :span="8">
                  <div class="span">关键词</div>
                </a-col>
                <a-col :span="8">
                  <div class="span">匹配指数</div>
                </a-col>
              </a-row>
            </div>
            <vue-seamless-scroll :data="tableObj.bthIntegrationRecommends" class="seamless-warp" :class-option="classOption">
              <ul>
                <li v-for="(item,index) in tableObj.bthIntegrationRecommends" :key="index">
                  <a-row>
                    <a-col :span="8">
                      <div class="span">{{item.enterpriseName}}</div>
                    </a-col>
                    <a-col :span="8">
                      <div class="span">{{item.recommendKey}}</div>
                    </a-col>
                    <a-col :span="8">
                      <div class="span">{{item.matchIndex}}</div>
                    </a-col>
                  </a-row>
                </li>
              </ul>
            </vue-seamless-scroll>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="pub-tb">
            <div class="tab-tit">以商招商推荐企业</div>
            <div class="head-tit">
              <a-row>
                <a-col :span="8">
                  <div class="span">推荐企业</div>
                </a-col>
                <a-col :span="8">
                  <div class="span">关键词</div>
                </a-col>
                <a-col :span="8">
                  <div class="span">匹配指数</div>
                </a-col>
              </a-row>
            </div>
            <vue-seamless-scroll :data="tableObj.attractInvestmentRecommends" class="seamless-warp" :class-option="classOption">
              <ul>
                <li v-for="(item,index) in tableObj.attractInvestmentRecommends" :key="index">
                  <a-row>
                    <a-col :span="8">
                      <div class="span">{{item.enterpriseName}}</div>
                    </a-col>
                    <a-col :span="8">
                      <div class="span">{{item.recommendKey}}</div>
                    </a-col>
                    <a-col :span="8">
                      <div class="span">{{item.matchIndex}}</div>
                    </a-col>
                  </a-row>
                </li>
              </ul>
            </vue-seamless-scroll>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="pub-tb">
            <div class="tab-tit">应用场景招商推荐企业</div>
            <div class="head-tit">
              <a-row>
                <a-col :span="8">
                  <div class="span">推荐企业</div>
                </a-col>
                <a-col :span="8">
                  <div class="span">关键词</div>
                </a-col>
                <a-col :span="8">
                  <div class="span">匹配指数</div>
                </a-col>
              </a-row>
            </div>
            <vue-seamless-scroll :data="tableObj.applicationRecommends" class="seamless-warp" :class-option="classOption">
              <ul>
                <li v-for="(item,index) in tableObj.applicationRecommends" :key="index">
                  <a-row>
                    <a-col :span="8">
                      <div class="span">{{item.enterpriseName}}</div>
                    </a-col>
                    <a-col :span="8">
                      <div class="span">{{item.recommendKey}}</div>
                    </a-col>
                    <a-col :span="8">
                      <div class="span">{{item.matchIndex}}</div>
                    </a-col>
                  </a-row>
                </li>
              </ul>
            </vue-seamless-scroll>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
  import { getIndustry } from '@/api/manage'
  import vueSeamlessScroll from 'vue-seamless-scroll'
  import store from '@/store/'
  import { randomUUID } from '@/utils/util'
  export default {
    name: "Model",
    components: {
      vueSeamlessScroll
    },
    data() {
      return {
        pageId: randomUUID(),
        tableObj:{
          industryRecommends:[],
          applicationRecommends:[],
          bthIntegrationRecommends:[],
          attractInvestmentRecommends:[]
        },
        loading1:false,
        columns1:[
          {title: '推荐企业',align: "center",width: 100,dataIndex: 'name1'},
          {title: '关键词',align: "center",width: 100,dataIndex: 'name2'},
          {title: '匹配指数',align: "center",width: 100,dataIndex: 'name3'}
        ],
        classOption:{
          step: 0.1, // 数值越大速度滚动越快
          limitMoveNum: 6, // 开始无缝滚动的数据量 this.dataList.length
          hoverStop: true, // 是否开启鼠标悬停stop
          direction: 1, // 0向下 1向上 2向左 3向右
          openWatch: true, // 开启数据实时监控刷新dom
          singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
          singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
          waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
        },
        industryCode: '',
        websock: null,
        lockReconnect:false,
        heartCheck:null,
      }
    },
    mounted(){
      this.initWebSocket();
      this.heartCheckFun();
    },
    created() {
      this.getDatas(this.industryCode);
    },
    destroyed: function () { // 离开页面生命周期函数
      this.websocketOnclose();
    },
    methods: {
      getDatas(industryCode){
        getIndustry(industryCode).then((res) => {
          if (res.success) {
            this.tableObj = res.result;
          }
        })
      },
      handleChange1(){

      },
      initWebSocket: function () {
        // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
        var userId = store.getters.userInfo.id;
        const domain = window._CONFIG['socketDomainURL'].replace('https://', 'wss://').replace('http://', 'ws://')
        const url = `${domain}/bigscreenWebsocket/${userId}/${this.pageId}`
        this.websock = new WebSocket(url);
        this.websock.onopen = this.websocketOnopen;
        this.websock.onerror = this.websocketOnerror;
        this.websock.onmessage = this.websocketOnmessage;
        this.websock.onclose = this.websocketOnclose;
      },
      websocketOnopen: function () {
        console.log("BigScreenWebSocket连接成功");
        //心跳检测重置
        this.heartCheck.reset().start();
      },
      websocketOnerror: function (e) {
        console.log("BigScreenWebSocket连接发生错误");
        this.reconnect();
      },
      websocketOnmessage: function (e) {
        console.log(new Date().toLocaleTimeString() + "-----接收消息-------",e.data);
        var data = eval("(" + e.data + ")"); //解析对象
        if(data.type == "bigscreen"){
          if(data.data.func == 'main_to_3'){
            var industryCode = data.data.industryCode;
            if(this.industryCode != industryCode){
              this.industryCode = industryCode;
              this.getDatas(industryCode);
            }
          }
        }
        //心跳检测重置
        this.heartCheck.reset().start();
      },
      websocketOnclose: function (e) {
        console.log("BigScreen-connection closed (" + e + ")");
        if(e){
          console.log("BigScreen-connection closed (" + e.code + ")");
        }
        this.reconnect();
      },
      websocketSend(text) { // 数据发送
        try {
          this.websock.send(text);
        } catch (err) {
          console.log("BigScreen-send failed (" + err.code + ")");
        }
      },

      reconnect() {
        var that = this;
        if(that.lockReconnect) return;
        that.lockReconnect = true;
        //没连接上会一直重连，设置延迟避免请求过多
        setTimeout(function () {
          console.info("BigScreen-尝试重连...");
          that.initWebSocket();
          that.lockReconnect = false;
        }, 5000);
      },
      heartCheckFun(){
        var that = this;
        //心跳检测,每20s心跳一次
        that.heartCheck = {
          timeout: 20000,
          timeoutObj: null,
          serverTimeoutObj: null,
          reset: function(){
            clearTimeout(this.timeoutObj);
            clearTimeout(this.serverTimeoutObj);
            return this;
          },
          start: function(){
            var self = this;
            this.timeoutObj = setTimeout(function(){
              //这里发送一个心跳，后端收到后，返回一个心跳消息，
              //onmessage拿到返回的心跳就说明连接正常
              that.websocketSend(JSON.stringify({type: 'heartcheck', data: false}));
              console.info("客户端发送心跳");
              self.serverTimeoutObj = setTimeout(function(){//如果超过一定时间还没重置，说明后端主动断开了
                that.websock.close();//如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
              }, self.timeout)
            }, this.timeout)
          }
        }
      },
    }
  }
</script>
<style scoped>
.seamless-warp{
  width: 100%;
  height: 190px;
  overflow: hidden;
  color: #fff;
}
.seamless-warp ul{
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #00347d;
}
.seamless-warp ul li{
  font-size: 0;
  border-top: 1px solid #0183d9;
}
.seamless-warp ul li .span{
  text-align: center;
  padding: 5px 0;
  font-size: 18px;
}
.hai-content {
  padding: 0 100px;
}
.hai-content .out-div{
  border: 1px solid #00a1fc;
  padding: 10px 20px;
}

.hai-content .out-div .tab-tit{
  color:#fff;
  text-align: center;
  margin-bottom: 5px;
  font-size: 24px;
}
.hai-content .out-div .head-tit{
  color:#aa7b21;
}
.hai-content .out-div .head-tit .span{
  text-align: center;
  background-color: #012b67;
  padding: 5px 0;
  font-size: 22px;
}
.top-img{
  position: relative;
}
.top-img .mid-c{
  position: absolute;
  top: 20%;
  left: 44%;
  width: 10vw;
  height: 10vw;
  background-color: #000c36;
  border-radius: 50%;
  text-align: center;
}
.top-img .mid-c img{
  width: 100%;
  height: auto;
}
.top-img .mid-c span{
  position: relative;
  top: 14%;
  display: inline-block;
  width: 7vw;
  height: 7vw;
  border: 1px solid #fff;
  border-radius: 7vw;
  line-height: 7vw;
  color: #fff;
  font-size: 32px;
}
.top-img .pub-c{
  position: absolute;
  width: 4vw;
  height: 4vw;
  border-radius: 4vw;
  background-color: #06164d;
  color: #3ae8ff;
  box-shadow: 0 0 10px 4px #079dff inset;
  text-align: center;
  padding-top: 0.7vw;
  font-size: 14px;
}
.top-img .pc1{
  top: 36%;
  left: 0;
}
.top-img .pc2{
  top: 21%;
  left: 6vw;
}
.top-img .pc3{
  bottom: 21%;
  left: 6vw;
}
.top-img .pc4{
  top: 12%;
  left: 12vw;
}
.top-img .pc5{
  bottom: 12%;
  left: 12vw;
}

.top-img .pc6{
  top: 36%;
  right: 0;
}
.top-img .pc7{
  top: 21%;
  right: 6vw;
}
.top-img .pc8{
  bottom: 21%;
  right: 6vw;
}
.top-img .pc9{
  top: 12%;
  right: 12vw;
}
.top-img .pc10{
  bottom: 12%;
  right: 12vw;
}
.arrow-pub{
  position: absolute;
  top: 44%;
  color: #fff;
  font-size: 20px;
}
.arrow-pub img{
  height: 26px;
  width: auto;
}
.arrow-l{
  left: 26%;
}
.arrow-r{
  right: 26%;
}
.arrow-r img{
  transform:rotate(180deg);
}
</style>