<template>
  <j-modal
    :title="title"
    :width="width"
    :visible="visible"
    switchFullscreen
    @ok="handleOk"
    :okButtonProps="{ class: { 'jee-hidden': disableSubmit } }"
    @cancel="handleCancel"
    cancelText="关闭"
  >
    <enterprise-work-order-form
      ref="realForm"
      @ok="submitCallback"
      :disabled="disableSubmit"
    ></enterprise-work-order-form>
  </j-modal>
</template>

<script>
import { getAction } from '../../api/manage'

import EnterpriseWorkOrderForm from './EnterpriseWorkOrderForm'
export default {
  name: 'EnterpriseWorkOrderModal',
  components: {
    EnterpriseWorkOrderForm,
  },
  data() {
    return {
      url: {
        initiationProcessUrl: '/enterprise/enterpriseWorkOrder/initiationProcess',
      },
      title: '',
      width: 800,
      visible: false,
      disableSubmit: false,
    }
  },
  methods: {
    add() {
      this.visible = true
      this.$nextTick(() => {
        this.$refs.realForm.add()
      })
    },
    edit(record) {
      this.initiationProcess(record)
    },
    initiationProcess(record) {
      getAction(this.url.initiationProcessUrl, { id: record.id }).then((res) => {
        if (res) {
        this.visible = true
        this.$nextTick(() => {
          this.$refs.realForm.edit(record)
        })
      } else {
        this.$message.error('旧流程未结束，无法发起新流程')
      }
      })
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      this.$refs.realForm.submitForm()
    },
    submitCallback() {
      this.$emit('ok')
      this.visible = false
    },
    handleCancel() {
      this.close()
    },
  },
}
</script>