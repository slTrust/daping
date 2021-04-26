<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form :form="form" slot="detail">
        <a-row>
          <!--
          <a-col :span="24">
            <a-form-item label="企业信息ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['enterpriseId']" placeholder="请输入企业信息ID"  ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="工单名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['orderName']" placeholder="请输入工单名称"  ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="工单发起人" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['orderChecker']" placeholder="请输入工单发起人"  ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="审核状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['checkStatus']" placeholder="请输入审核状态"  ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="审核意见" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['checkDesc']" placeholder="请输入审核意见"  ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="是否迁出注销" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['leaveStatus']" placeholder="请输入是否迁出注销"  ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="删除标识（1正常0删除）" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['delFlag']" placeholder="请输入删除标识（1正常0删除）"  ></a-input>
            </a-form-item>
          </a-col>
          -->
          <a-col :span="24">
            <a-form-item label="情况说明" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea v-decorator="['bak']" placeholder="请输入情况说明"></a-textarea>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="审核人员" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-select-multi-user-enterprise v-decorator="['user']" placeholder="请选择审核人员" :query-config="selectUserQueryConfig"/>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="要求回复时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-date
                placeholder="要求回复时间"
                v-decorator="['replyEndTime']"
                :trigger-change="true"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col v-if="showFlowSubmitButton" :span="24" style="text-align: center">
            <a-button @click="submitForm">提 交</a-button>
          </a-col>
        </a-row>
      </a-form>
    </j-form-container>
  </a-spin>
</template>

<script>
import { httpAction, getAction } from '@/api/manage'
import pick from 'lodash.pick'
import { validateDuplicateValue } from '@/utils/util'
import { postAction } from '../../api/manage'
import JSelectMultiUserEnterprise from "../../components/jeecgbiz/JSelectMultiUserEnterprise";
// import JSelectMultiUser from "../../components/jeecgbiz/JSelectMultiUser";

export default {
  name: 'EnterpriseWorkOrderForm',
  components: {
    JSelectMultiUserEnterprise,
    // JSelectMultiUser
  },
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
      form: this.$form.createForm(this),
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      confirmLoading: false,
      selectUserQueryConfig: [],
      validatorRules: {},
      url: {
        add: '/enterprise/enterpriseWorkOrder/addWorkOrder',
        edit: '/enterprise/enterpriseWorkOrder/edit',
        queryById: '/enterprise/enterpriseWorkOrder/queryById',
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
    this.showFlowData()
  },
  methods: {
    add() {
      this.edit({})
    },
    edit(record) {
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'enterpriseId',
            'orderName',
            'orderChecker',
            'checkStatus',
            'checkDesc',
            'leaveStatus',
            'delFlag',
            'bak'
          )
        )
      })
    },
    //渲染流程表单数据
    showFlowData() {
      if (this.formBpm === true) {
        let params = { id: this.formData.dataId }
        getAction(this.url.queryById, params).then((res) => {
          if (res.success) {
            this.edit(res.result)
          }
        })
      }
    },
    submitForm() {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let httpurl = this.url.add
          let method = 'post'
          let formData = Object.assign(this.model, values)

          let params = {
            enterpriseId: formData.id,
            bak: formData.bak,
            orderName: formData.enterpriseName,
            user: formData.user,
            replyEndTime: formData.replyEndTime
          }

          console.log('表单提交数据', formData)

          postAction(httpurl,params)
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
    popupCallback(row) {
      this.form.setFieldsValue(
        pick(
          row,
          'enterpriseId',
          'orderName',
          'orderChecker',
          'checkStatus',
          'checkDesc',
          'leaveStatus',
          'delFlag',
          'bak'
        )
      )
    },
  },
}
</script>