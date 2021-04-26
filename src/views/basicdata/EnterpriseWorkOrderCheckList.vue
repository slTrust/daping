<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper" v-show="false">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="工单id">
              <a-input placeholder="工单id" v-model="queryParam.orderId"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- table区域-begin -->
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
      </a-table>
    </div>
  </a-card>
</template>

<script>
import '@/assets/less/TableExpand.less'
import { mixinDevice } from '@/utils/mixin'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { getAction } from '@/api/manage'

export default {
  name: 'EnterpriseWorkOrderCheckList',
  mixins: [JeecgListMixin, mixinDevice],
  components: {},
  data() {
    return {
      deptList: [],
      queryParam: {
        orderId: '',
      },
      description: '企业迁出注销审核信息表管理页面',
      // 表头
      columns: [
        /*{
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          {
            title:'工单id',
            align:"center",
            dataIndex: 'orderId'
          },
          {
            title:'审核人',
            align:"center",
            dataIndex: 'checkeBy'
          },*/

        /*{
            title:'删除标识（1正常0删除）',
            align:"center",
            dataIndex: 'delFlag'
          },
          {
            title:'附件',
            align:"center",
            dataIndex: 'attachmentPath'
          },*/
        {
          title: '审核人姓名',
          align: 'center',
          dataIndex: 'checkByName',
        } /*
          {
            title:'审核部门',
            align:"center",
            dataIndex: 'checkDept'
          },*/,
        {
          title: '审核部门名称',
          align: 'center',
          dataIndex: 'checkDept',
          customRender: (text) => {
            let renderText = ''
            for (let i = 0; i < this.deptList.length; i++) {
              if (this.deptList[i].orgCode == text) {
                renderText = this.deptList[i].departName
              }
            }
            return renderText
          },
        },
        {
          title: '审核状态',
          align: 'center',
          dataIndex: 'checkStatus',
          customRender: function (text) {
            if (text == '3') {
              return '同意'
            } else if (text == '1') {
              return '挽留成功'
            } else if (text == '2') {
              return '挽留不成功'
            } else if (text == '4') {
              return '挽留中'
            } else if (text == '5') {
              return '已挽留成功，流程终止'
            } else {
              return ''
            }
          },
        },
        {
          title: '审核意见',
          align: 'center',
          dataIndex: 'checkDesc',
        },
        {
          title: '审核时间',
          align: 'center',
          dataIndex: 'checkTime',
          customRender: function (text) {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
          },
        },
        {
          title: '附件下载',
          align: 'center',
          dataIndex: 'attachmentPath',
          customRender: function (text) {
            return !text ? (
              ''
            ) : (
              <span>
                <a href={text}>{text.substring(text.lastIndexOf("/")+1,text.length)}</a>
              </span>
            )
          },
        } /*
          {
            title:'要求回复时间',
            align:"center",
            dataIndex: 'replyEndTime',
            customRender:function (text) {
              return !text?"":(text.length>10?text.substr(0,10):text)
            }
          },
          {
            title:'是否迁出注销',
            align:"center",
            dataIndex: 'leaveStatus'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            fixed:"right",
            width:147,
            scopedSlots: { customRender: 'action' }
          }*/,
      ],
      url: {
        list: '/enterprise/enterpriseWorkOrderCheck/list',
        delete: '/enterprise/enterpriseWorkOrderCheck/delete',
        deleteBatch: '/enterprise/enterpriseWorkOrderCheck/deleteBatch',
        exportXlsUrl: '/enterprise/enterpriseWorkOrderCheck/exportXls',
        importExcelUrl: 'enterprise/enterpriseWorkOrderCheck/importExcel',
        deptListUrl: '/sys/api/getAllSysDepart',
      },
      dictOptions: {},
      superFieldList: [],
    }
  },
  created() {
    //this.getSuperFieldList()
    this.deptload();
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    },
  },
  methods: {
    deptload() {
      getAction(this.url.deptListUrl).then((res) => {
        this.deptList = res
      })
    },
    showAuditDate(record) {
      this.model = Object.assign({}, record)
      this.queryParam.orderId = this.model.id
      //this.dataSource = []
      this.loadData()
    },
    loadData(arg) {
      var params = this.queryParam //查询条件
      this.loading = true
      getAction(this.url.list, params).then((res) => {
        if (res.success) {
          //update-begin---author:zhangyafei    Date:20201118  for：适配不分页的数据列表------------
          this.dataSource = res.result.records || res.result
          if (res.result.total) {
            this.ipagination.total = res.result.total
          } else {
            this.ipagination.total = 0
          }
          //update-end---author:zhangyafei    Date:20201118  for：适配不分页的数据列表------------
        }
        if (res.code === 510) {
          this.$message.warning(res.message)
        }
        this.loading = false
      })
    },
    //initDictConfig() {},
    getSuperFieldList() {
      let fieldList = []
      fieldList.push({ type: 'string', value: 'orderId', text: '工单id', dictCode: '' })
      fieldList.push({ type: 'string', value: 'checkeBy', text: '审核人', dictCode: '' })
      fieldList.push({ type: 'string', value: 'checkStatus', text: '审核状态', dictCode: '' })
      fieldList.push({ type: 'string', value: 'checkDesc', text: '审核意见', dictCode: '' })
      fieldList.push({ type: 'date', value: 'checkTime', text: '审核时间' })
      fieldList.push({ type: 'string', value: 'delFlag', text: '删除标识（1正常0删除）', dictCode: '' })
      fieldList.push({ type: 'string', value: 'attachmentPath', text: '附件', dictCode: '' })
      fieldList.push({ type: 'string', value: 'checkByName', text: '审核人姓名', dictCode: '' })
      fieldList.push({ type: 'string', value: 'checkDept', text: '审核部门', dictCode: '' })
      fieldList.push({ type: 'string', value: 'checkDeptName', text: '审核部门名称', dictCode: '' })
      fieldList.push({ type: 'date', value: 'replyEndTime', text: '要求回复时间' })
      fieldList.push({ type: 'string', value: 'leaveStatus', text: '是否迁出注销', dictCode: '' })
      this.superFieldList = fieldList
    },
  },
}
</script>
<style scoped>
@import '~@assets/less/common.less';
</style>