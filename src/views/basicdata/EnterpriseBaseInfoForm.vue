<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form :form="form" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-item label="统一社会信用代码" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                v-decorator="[
                  'enterpriseSocialCode',
                  {
                    rules: [{ required: false }, { validator: this.checkEnterpriseSocialCode }],
                  },
                ]"
                placeholder="请输入统一社会信用代码"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="企业名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                v-decorator="[
                  'enterpriseName',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入企业名称!',
                      },
                    ],
                  },
                ]"
                placeholder="请输入企业名称"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="企业类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select
                placeholder="请输入企业类型"
                v-decorator="[
                  'enterpriseType',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入企业类型!',
                      },
                    ],
                  },
                ]"
              >
                <a-icon slot="suffixIcon" type="gold" />
                <a-select-option v-for="d in dictEnterprise" :key="d.value" :value="d.value">
                  {{ d.text }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="行业类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select
                placeholder="请输入行业类型"
                v-decorator="[
                  'industryType',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入行业类型!',
                      },
                    ],
                  },
                ]"
              >
                <a-icon slot="suffixIcon" type="gold" />
                <a-select-option v-for="d in dictIndustry" :key="d.value" :value="d.value">
                  {{ d.text }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="注册资金(万元)" :labelCol="{
        xs: { span: 24 },
        sm: { span: 7 },
      }" :wrapperCol="{
        xs: { span: 24 },
        sm: { span: 14 },
      }">
              <a-input
                v-decorator="[
                  'registeredFund',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入注册资金!',
                      },
                    ],
                  },
                ]"
                placeholder="请输入注册资金"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="注册地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                v-decorator="[
                  'registeredAddress',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入注册地址!',
                      },
                    ],
                  },
                ]"
                placeholder="请输入注册地址"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="成立时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-date
                placeholder="请选择成立时间"
                v-decorator="[
                  'establishTime',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入成立时间!',
                      },
                    ],
                  },
                ]"
                :trigger-change="true"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>

          <!--  部门选择控件 -->
          <a-col :span="12">
            <a-form-item label="招商部门" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-select-depart
                v-decorator="['investmentDept']"
                :trigger-change="true"
                customReturnField="orgCode"
                :multi="false"
              ></j-select-depart>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="项目负责人" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['projectPrincipal']" placeholder="请输入项目负责人"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="联系电话" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['phone']" placeholder="请输入联系电话"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="项目来源地" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['projectSource']" placeholder="请输入项目来源地"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="合同起始日期"
              :labelCol="{
                xs: { span: 24 },
                sm: { span: 6 },
              }"
              :wrapperCol="wrapperCol"
            >
              <j-date
                placeholder="请选择合同起始日期"
                v-decorator="['contractStartDate']"
                :trigger-change="true"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="合同终止日期"
              :labelCol="{
                xs: { span: 24 },
                sm: { span: 6 },
              }"
              :wrapperCol="wrapperCol"
            >
              <j-date
                placeholder="请选择合同终止日期"
                v-decorator="['contractEndDate']"
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
    <div v-show="historyVisible">
      <a-table size="middle" bordered :columns="columns" :dataSource="dataList" :scroll="{ y: 240 }"> </a-table>
    </div>
  </a-spin>
</template>

<script>
import { httpAction, getAction } from '@/api/manage'
import pick from 'lodash.pick'
import { validateDuplicateValue } from '@/utils/util'

export default {
  name: 'EnterpriseBaseInfoForm',
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
      ipagination: {
        current: 1,
        pageSize: 5,
        pageSizeOptions: ['5', '10', '20', '30'],
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 共' + total + '条'
        },
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0,
      },
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
      dataList: [],
      confirmLoading: false,
      validatorRules: {},
      historyVisible: false,
      updateBool: false,
      columns: [
        {
          title: '变更字段',
          align: 'center',
          dataIndex: 'changeField',
        },
        {
          title: '变更前内容',
          align: 'center',
          dataIndex: 'changeBefore',
        },
        {
          title: '变更后内容',
          align: 'center',
          dataIndex: 'changeAfter',
        },
        {
          title: '变更时间',
          align: 'center',
          dataIndex: 'createTime',
        },
        {
          title: '变更人员',
          align: 'center',
          dataIndex: 'createBy',
        },
      ],
      url: {
        add: '/enterprise/enterpriseBaseInfo/add',
        edit: '/enterprise/enterpriseBaseInfo/edit',
        queryById: '/enterprise/enterpriseBaseInfo/queryById',
        readqueryDictItemsUrl: 'sys/api/queryDictItemsByCode',
        historyList: '/enterprise/enterpriseChangeHistory/list',
        getOne: '/enterprise/enterpriseBaseInfo/getOne',
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
    this.readDictIndustry()
  },
  methods: {
    checkEnterpriseSocialCode(rule, value, callback) {
      if (this.updateBool) {
        if (!value) {
          callback(new Error('请输入统一社会信用代码'))
        } else {
          var params = {
            enterpriseSocialCode: value,
          }
          getAction(this.url.getOne, params).then((res) => {
            if (res.success) {
              callback()
            } else {
              callback('统一社会信用代码已存在!')
            }
          })
        }
      } else {
        callback()
      }
    },
    readDictIndustry() {
      getAction(this.url.readqueryDictItemsUrl, { code: 'industry_type' }).then((res) => {
        this.dictIndustry = res
      })
      getAction(this.url.readqueryDictItemsUrl, { code: 'enterprise_type' }).then((res) => {
        this.dictEnterprise = res
      })
    },
    loadHistory(record) {
      let params = {}
      params['enterpriseId'] = record.id
      params['pageSize'] = 5
      getAction(this.url.historyList, params).then((res) => {
        this.dataList = res.result.records
      })
    },
    add() {
      this.updateBool = true
      this.edit({})
    },
    edit(record, historyVisible) {
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.loadHistory(record)
      this.visible = true
      this.historyVisible = historyVisible
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'enterpriseName',
            'enterpriseSocialCode',
            'enterpriseType',
            'industryType',
            'registeredFund',
            'registeredAddress',
            'establishTime',
            'investmentDept',
            'projectPrincipal',
            'phone',
            'projectSource',
            'contractStartDate',
            'contractEndDate',
            'policyEnjoyStatus',
            'taxStatus',
            'leaveStatus',
            'checkStatus',
            'checkDesc',
            'delFlag'
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
          let httpurl = ''
          let method = ''
          if (!this.model.id) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
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
    popupCallback(row) {
      this.form.setFieldsValue(
        pick(
          row,
          'enterpriseName',
          'enterpriseSocialCode',
          'enterpriseType',
          'industryType',
          'registeredFund',
          'registeredAddress',
          'establishTime',
          'investmentDept',
          'projectPrincipal',
          'phone',
          'projectSource',
          'contractStartDate',
          'contractEndDate',
          'policyEnjoyStatus',
          'taxStatus',
          'leaveStatus',
          'checkStatus',
          'checkDesc',
          'delFlag'
        )
      )
    },
  },
}
</script>