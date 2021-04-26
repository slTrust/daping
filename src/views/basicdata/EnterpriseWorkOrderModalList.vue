<template>
  <j-modal
    :title="title"
    :width="1000"
    :visible="visible"
    switchFullscreen
    @ok="handleCancel"
    :okButtonProps="{ class:{'jee-hidden': disableSubmit} }"
    @cancel="handleCancel"
    cancelText="关闭">
    <enterprise-work-order-list ref="realForm" @ok="submitCallback" :disabled="disableSubmit"></enterprise-work-order-list>
  </j-modal>
</template>

<script>

  import EnterpriseWorkOrderList from './EnterpriseWorkOrderList'
  export default {
    name: 'EnterpriseWorkOrderModalList',
    components: {
      EnterpriseWorkOrderList
    },
    data () {
      return {
        title:'',
        width:800,
        visible: false,
        disableSubmit: false
      }
    },
    methods: {
      add () {
        this.visible=true
        this.$nextTick(()=>{
          this.$refs.realForm.add();
        })
      },
      showAuditLog (record){
        this.visible=true
        this.$nextTick(()=>{
          this.$refs.realForm.showAuditDate(record);
        })
      },
      edit (record) {
        
        this.visible=true
        this.$nextTick(()=>{
          this.$refs.realForm.edit(record);
        })
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        this.$refs.realForm.submitForm();
      },
      submitCallback(){
        this.$emit('ok');
        this.visible = false;
      },
      handleCancel () {
        this.close()
      }
    }
  }
</script>