<template>
  <div class="hai-content">
    <div class="service-tit">
      <span class="span1">企业画像</span>
    </div>
    <a-row :gutter="50">
      <a-col :span="12">

      </a-col>
      <a-col :span="12">

      </a-col>
    </a-row>
  </div>
</template>

<script>
  const echarts = require('echarts');
  export default {
    name: "Service",
    data() {
      return {

      }
    },
    created() {

    },
    mounted(){

    },
    methods: {

    }
  }
</script>
<style scoped>
.hai-content{
  padding: 0 30px;
}
.service-tit{
  position: relative;
  width: 100%;
  height: 10vh;
  text-align: center;
}
.service-tit .span1{
  position: absolute;
  bottom: 0;
  left: 50%;
  background: url('../../assets/big/xp-tit.png') no-repeat center;
  background-size: 100% 100%;
  color: #03f6d8;
  font-size: 26px;
  height: 58px;
  line-height: 58px;
  width: 300px;
  margin-left: -150px;
}
.service-tit .span1 span{
  font-size: 22px;
}
</style>