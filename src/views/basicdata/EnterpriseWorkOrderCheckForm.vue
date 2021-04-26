<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form :form="form" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-item label="工单id" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['orderId']" placeholder="请输入工单id"  ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="审核人" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['checkeBy']" placeholder="请输入审核人"  ></a-input>
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
            <a-form-item label="审核时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-date placeholder="请选择审核时间" v-decorator="['checkTime']" :trigger-change="true" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="删除标识（1正常0删除）" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['delFlag']" placeholder="请输入删除标识（1正常0删除）"  ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="附件" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['attachmentPath']" placeholder="请输入附件"  ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="审核人姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['checkByName']" placeholder="请输入审核人姓名"  ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="审核部门" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['checkDept']" placeholder="请输入审核部门"  ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="审核部门名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['checkDeptName']" placeholder="请输入审核部门名称"  ></a-input>
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

  export default {
    name: 'EnterpriseWorkOrderCheckForm',
    components: {
    },
    props: {
      //流程表单data
      formData: {
        type: Object,
        default: ()=>{},
        required: false
      },
      //表单模式：true流程表单 false普通表单
      formBpm: {
        type: Boolean,
        default: false,
        required: false
      },
      //表单禁用
      disabled: {
        type: Boolean,
        default: false,
        required: false
      }
    },
    data () {
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
        validatorRules: {
        },
        url: {
          add: "/enterprise/enterpriseWorkOrderCheck/add",
          edit: "/enterprise/enterpriseWorkOrderCheck/edit",
          queryById: "/enterprise/enterpriseWorkOrderCheck/queryById"
        }
      }
    },
    computed: {
      formDisabled(){
        if(this.formBpm===true){
          if(this.formData.disabled===false){
            return false
          }
          return true
        }
        return this.disabled
      },
      showFlowSubmitButton(){
        if(this.formBpm===true){
          if(this.formData.disabled===false){
            return true
          }
        }
        return false
      }
    },
    created () {
      //如果是流程中表单，则需要加载流程表单data
      this.showFlowData();
    },
    methods: {
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'orderId','checkeBy','checkStatus','checkDesc','checkTime','delFlag','attachmentPath','checkByName','checkDept','checkDeptName'))
        })
      },
      //渲染流程表单数据
      showFlowData(){
        if(this.formBpm === true){
          let params = {id:this.formData.dataId};
          getAction(this.url.queryById,params).then((res)=>{
            if(res.success){
              this.edit (res.result);
            }
          });
        }
      },
      submitForm () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            console.log("表单提交数据",formData)
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
            })
          }
         
        })
      },
      popupCallback(row){
        this.form.setFieldsValue(pick(row,'orderId','checkeBy','checkStatus','checkDesc','checkTime','delFlag','attachmentPath','checkByName','checkDept','checkDeptName'))
      },
    }
  }
</script>