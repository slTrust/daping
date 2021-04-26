<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper" v-show="false">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="企业信息id">
              <a-input placeholder="企业信息id" v-model="queryParam.enterpriseId"></a-input>
            </a-form-item>
          </a-col>
          </a-row>
      </a-form>
    </div>
    <div>
      <a-table
        ref="table"
        size="middle"
        :scroll="{ x: true }"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        class="j-table-force-nowrap"
        @change="handleTableChange"
      >
        <span slot="action" slot-scope="text, record">
          <a @click="auditLogFrom(record)">查看详情</a>
        </span>
      </a-table>
    </div>
    <enterprise-work-order-check-modal ref="auditLog" @ok="modalFormOk"></enterprise-work-order-check-modal>

    <enterprise-work-order-modal ref="modalForm" @ok="modalFormOk"></enterprise-work-order-modal>
  </a-card>
</template>

<script>
import '@/assets/less/TableExpand.less'
import { mixinDevice } from '@/utils/mixin'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import EnterpriseWorkOrderModal from './EnterpriseWorkOrderModal'
import EnterpriseWorkOrderCheckModal from './EnterpriseWorkOrderCheckModal'
import { getAction } from '@/api/manage'

export default {
  name: 'EnterpriseWorkOrderList',
  mixins: [JeecgListMixin, mixinDevice],
  components: {
    EnterpriseWorkOrderModal,
    EnterpriseWorkOrderCheckModal,
  },
  data() {
    return {
      queryParam:{enterpriseId:''},
      description: '企业迁出注销工单表管理页面',
      // 表头
      columns: [
        {
          title: '#',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function (t, r, index) {
            return parseInt(index) + 1
          },
        },
        /*
          {
            title:'企业信息ID',
            align:"center",
            dataIndex: 'enterpriseId'
          },*/
        {
          title: '工单名称',
          align: 'center',
          dataIndex: 'orderName',
        },
        {
          title: '工单发起人',
          align: 'center',
          dataIndex: 'createBy',
        },
        {
          title: '审核状态',
          align: 'center',
          dataIndex: 'checkStatus',
           customRender: function (text) {
            if (text == '1') {
              return '已审'
            } else {
              return '待审'
            }
          },
        },
        /*
          {
            title:'审核意见',
            align:"center",
            dataIndex: 'checkDesc'
          },
          {
            title:'是否迁出注销',
            align:"center",
            dataIndex: 'leaveStatus'
          },
          {
            title:'删除标识（1正常0删除）',
            align:"center",
            dataIndex: 'delFlag'
          },
          {
            title:'备注',
            align:"center",
            dataIndex: 'bak'
          },
          */
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          fixed: 'right',
          width: 147,
          scopedSlots: { customRender: 'action' },
        },
      ],
      url: {
        list: '/enterprise/enterpriseWorkOrder/list',
        delete: '/enterprise/enterpriseWorkOrder/delete',
        deleteBatch: '/enterprise/enterpriseWorkOrder/deleteBatch',
        exportXlsUrl: '/enterprise/enterpriseWorkOrder/exportXls',
        importExcelUrl: 'enterprise/enterpriseWorkOrder/importExcel',
      },
      dictOptions: {},
      superFieldList: [],
    }
  },
  created() {
    //this.getSuperFieldList()
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    },
  },
  methods: {
    showAuditDate(record) {
      this.model = Object.assign({}, record)
      this.queryParam.enterpriseId = this.model.id
      this.loadData();
    },
    loadData(arg) {
      var params = this.queryParam;//查询条件
      this.loading = true;
      getAction(this.url.list, params).then((res) => {
        if (res.success) {
          //update-begin---author:zhangyafei    Date:20201118  for：适配不分页的数据列表------------
          this.dataSource = res.result.records||res.result;
          if(res.result.total)
          {
            this.ipagination.total = res.result.total;
          }else{
            this.ipagination.total = 0;
          }
          //update-end---author:zhangyafei    Date:20201118  for：适配不分页的数据列表------------
        }
        if(res.code===510){
          this.$message.warning(res.message)
        }
        this.loading = false;
      })
    },
    submitForm(){
      this.$$refs.auditLog.show()
    },
    auditLogFrom: function (record) {
      this.$refs.auditLog.showAuditLog(record)
      this.$refs.auditLog.title = '审核详情'
      this.$refs.auditLog.disableSubmit = false
      
    },
    //initDictConfig() {},
    getSuperFieldList() {
      let fieldList = []
      fieldList.push({ type: 'string', value: 'enterpriseId', text: '企业信息ID', dictCode: '' })
      fieldList.push({ type: 'string', value: 'orderName', text: '工单名称', dictCode: '' })
      fieldList.push({ type: 'string', value: 'orderChecker', text: '工单发起人', dictCode: '' })
      fieldList.push({ type: 'string', value: 'checkStatus', text: '审核状态', dictCode: '' })
      fieldList.push({ type: 'string', value: 'checkDesc', text: '审核意见', dictCode: '' })
      fieldList.push({ type: 'string', value: 'leaveStatus', text: '是否迁出注销', dictCode: '' })
      fieldList.push({ type: 'string', value: 'delFlag', text: '删除标识（1正常0删除）', dictCode: '' })
      fieldList.push({ type: 'string', value: 'bak', text: '备注', dictCode: '' })
      this.superFieldList = fieldList
    },
  },
}
</script>
<style scoped>
@import '~@assets/less/common.less';
</style>