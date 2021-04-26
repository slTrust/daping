<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form :form="form" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-item label="企业名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['enterpriseName']" placeholder="请输入企业名称" disabled="false"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="统一社会信用代码" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['enterpriseSocialCode']" placeholder="请输入统一社会信用代码" disabled="false"></a-input>
            </a-form-item>
          </a-col>
          <a-divider orientation="left"> 流转意见 </a-divider>
          <a-col :span="24">
            <a-form-item label="回复结果" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-radio-group name="radioGroup" v-decorator="['checkStatus',
                {
                  rules: [
                    {
                      required: true,
                      message: '请选择回复结果!',
                    },
                  ],
                },]">
                <a-radio :value="1"> 挽留成功 </a-radio>
                <a-radio :value="2"> 挽留不成功 </a-radio>
                <a-radio :value="3"> 同意 </a-radio>
                <a-radio :value="4"> 挽留中 </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="回复意见" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea v-decorator="['checkDesc',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入回复意见!',
                    },
                  ],
                },]" placeholder="请输入回复意见"></a-textarea>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="文件上传" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-upload v-model="attachmentPath" :number="1"></j-upload>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </j-form-container>
  </a-spin>
</template>

<script>
import { httpAction, getAction } from '@/api/manage'
import pick from 'lodash.pick'

export default {
  name: 'toAuditForm',
  components: {},

  props: {
    //流程表单data
    formData: {
      type: Object,
      default: () => {},
      required: false,
    },
    //表单模式：true流程表单 false普通表单
    formBpm: {
      type: Boolean,
      default: false,
      required: false,
    },
    //表单禁用
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      attachmentPath: '',
      form: this.$form.createForm(this),
      model: {},
      dictIndustry: [],
      dictEnterprise: [],
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      confirmLoading: false,
      validatorRules: {},
      url: {
        audit: '/enterprise/enterpriseWorkOrderCheck/audit',
      },
    }
  },
  computed: {
    formDisabled() {
      if (this.formBpm === true) {
        if (this.formData.disabled === false) {
          return false
        }
        return true
      }
      return this.disabled
    },
    showFlowSubmitButton() {
      if (this.formBpm === true) {
        if (this.formData.disabled === false) {
          return true
        }
      }
      return false
    },
  },
  created() {
    
    //如果是流程中表单，则需要加载流程表单data
    //this.showFlowData()
  },
  methods: {
    showAuditDate(record) {
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.form.setFieldsValue(pick(this.model, 'enterpriseName', 'enterpriseSocialCode'))
      this.attachmentPath=""
    },
    submitForm() {
      const that = this
      // 触发表单验证

      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let httpurl = this.url.audit
          let method = 'post'
          let formData = Object.assign(this.model, values)
          formData.attachmentPath = this.attachmentPath
          console.log('表单提交数据', formData)
          httpAction(httpurl, formData, method)
            .then((res) => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('ok')
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.confirmLoading = false
            })
        }
      })
    },
  },
}
</script>