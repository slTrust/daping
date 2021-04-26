<template>
  <div class="hai-content">
    <!-- <div class="service-tit">
      <span class="span1">1+3架构</span>
    </div> -->
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
              <div class="ab_arrow"></div>
              <div class="ab_box">
                <div class="ab_column"></div>
                <div class="ab_name">产业精准招商</div>
              </div>
            </div>
            <div class="ability_box">
              <div class="ab_arrow"></div>
              <div class="ab_box">
                <div class="ab_column"></div>
                <div class="ab_name">产业精准招商</div>
              </div>
            </div>
            <div class="ability_box">
              <div class="ab_arrow"></div>
              <div class="ab_box">
                <div class="ab_column"></div>
                <div class="ab_name">产业精准招商</div>
              </div>
            </div>
          </div>
          <div class="box3">222</div>
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
          <div class="name">政府</div>
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
      .box2{
        width: 320px;
        height:100%;
        background:pink;
        .ability_box{
            .ab_arrow{
            }
            .ab_box{
              .ab_column{}
              .ab_name{}
            }
        }
             
      }
      .box3{
        width: 530px;
        height: 100%;
        background: red;
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
        background: red;
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
  color: #3eacff;
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