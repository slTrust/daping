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
            <div class="wave-container">
              <div class="wave"></div>
            </div>
            <div class="texts">
              <span class="txt txt1">企业标签</span>
              <span class="txt txt2">产品标签</span>
              <span class="txt txt3">政策标签</span>
              <span class="txt txt4">产业链标签</span>
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
<!--
政策兑现、精准匹配、资本市场培育、
企业服务门户、政策搜索、产业晴雨表、
产业标签统计分析、区域产业要素分析与研判、
区域产业政策及要素比对、区域经济驾驶舱、
经济标签统计分析、自定义产业财税分析、

区域产业要素与招商标的对比分析、产业链招商、
以商招商、企业关系图谱、企业业务图谱、
企业实力指数、企业风险分析、信用活力报告、
生命周期服务
-->
            <div class="r3">
              <div class="item orange">政策兑现</div>
              <div class="item">精准匹配</div>
              <div class="item">资本市场培育</div>
            </div>
            <div class="r3">
              <div class="item orange">企业服务门户</div>
              <div class="item orange">生命周期服务</div>
              <div class="item">政策搜索</div>
              <div class="item">产业晴雨表</div>
            </div>
            <div class="r3">
              <div class="item green">产业标签统计分析</div>
              <div class="item green">区域产业要素分析与研判</div>
            </div>
            <div class="r3">
              <div class="item">区域产业政策及要素比对</div>
              <div class="item green">区域经济驾驶舱</div>
            </div>
            <div class="r3">
              <div class="item">经济标签统计分析</div>
              <div class="item green">自定义产业财税分析</div>
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
            <div class="r3">
              <div class="item item_new">信用活力报告</div>
              <div class="item">生命周期服务</div>
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
export default {
  name: 'Archiecture',
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {},
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
        border: 20px solid #00439f;
        border-bottom-left-radius: 40%;
        border-bottom-right-radius: 40%;
        background: linear-gradient(180deg, rgba(0, 122, 214, 1) 0%, rgba(0, 29, 84, 1) 100%);
        overflow: hidden;
        position: relative;
        .texts {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 200px;
        }
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
            line-height: 20px;
            padding:10px;
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

.wave-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.wave {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(0, 109, 196, 0) 0%, rgba(0, 109, 196, 1) 100%);
}
.wave::before,
.wave::after {
  content: '';
  position: absolute;
  width: 1000px;
  height: 1000px;
  top: 0;
  left: 50%;
  background: rgb(0, 109, 196);
  opacity: 0.4;
  border-radius: 45%;
  transform: translate(-50%, -70%) rotate(0);
  animation: rotate 6s linear infinite;
  z-index: 10;
}
.wave::after {
  border-radius: 47%;
  background: rgb(0, 109, 196);
  opacity: 0.8;
  transform: translate(-50%, -70%) rotate(0);
  animation: rotate 10s linear -5s infinite;
  z-index: 20;
}

@keyframes rotate {
  50% {
    transform: translate(-50%, -73%) rotate(180deg);
  }
  100% {
    transform: translate(-50%, -70%) rotate(360deg);
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
@keyframes tag_move {
  0% {
    transform: translate(50px, 50px);
  }
  25% {
    transform: translate(150px, 30px);
  }
  50% {
    transform: translate(100px, 120px);
  }
  75% {
    transform: translate(70px, 70px);
  }
  100% {
    transfrom: translate(50px, 16px);
  }
}
.texts {
  width: 500px;
  height: 200px;
  margin: 20px auto;
}
.texts .txt {
  display: inline-block;
  height: 20px;
  border-radius: 100%;
  font-size: 24px;
  font-weight: bold;
}
.txt1 {
  animation: tag_move 4s linear 0s infinite;
  color: #3eacff;
}
.txt2 {
  animation: tag_move 4s ease 2s infinite;
  color: #FFA300;
}
.txt3 {
  animation: tag_move 4s linear 0.5s infinite;
  color: #23e9f4;
}
.txt4 {
  animation: tag_move 4s linear 1.5s infinite;
  color: #00be19;
}
</style>
