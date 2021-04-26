<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="企业名称">
              <a-input placeholder="请输入企业名称" v-model="queryParam.enterpriseName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统一社会信用代码">
              <a-input placeholder="请输入统一社会信用代码" v-model="queryParam.enterpriseSocialCode"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="企业类型">
                <a-select placeholder="请输入企业类型" v-model="queryParam.enterpriseType">
                  <a-icon slot="suffixIcon" type="gold" />
                  <a-select-option v-for="d in dictEnterprise" :key="d.value" :value="d.value">
                    {{ d.text }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="行业类型">
                <a-select placeholder="请输入行业类型" v-model="queryParam.industryType">
                  <a-icon slot="suffixIcon" type="gold" />
                  <a-select-option v-for="d in dictIndustry" :key="d.value" :value="d.value">
                    {{ d.text }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="注册地址">
                <a-input placeholder="请输入注册地址" v-model="queryParam.registeredAddress"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="成立时间">
                <j-date placeholder="请选择成立时间" v-model="queryParam.establishTime"></j-date>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="项目负责人">
                <a-input placeholder="请输入项目负责人" v-model="queryParam.projectPrincipal"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="联系电话">
                <a-input placeholder="请输入联系电话" v-model="queryParam.phone"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="项目来源地">
                <a-input placeholder="请输入项目来源地" v-model="queryParam.projectSource"></a-input>
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" v-has="'enterprise:add'" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('基础数据')">导出</a-button>
      <a-upload
        name="file"
        :showUploadList="false"
        :multiple="false"
        :headers="tokenHeader"
        :action="importExcelUrl"
        @change="handleImportExcel"
      >
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <!-- 高级查询区域 -->
      <j-super-query
        :fieldList="superFieldList"
        ref="superQueryModal"
        @handleSuperQuery="handleSuperQuery"
      ></j-super-query>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete" />删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a
        >项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        style="height: 500px"
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
        <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>
        <template slot="imgSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px; font-style: italic">无图片</span>
          <img
            v-else
            :src="getImgView(text)"
            height="25px"
            alt=""
            style="max-width: 80px; font-size: 12px; font-style: italic"
          />
        </template>
        <template slot="fileSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px; font-style: italic">无文件</span>
          <a-button v-else :ghost="true" type="primary" icon="download" size="small" @click="downloadFile(text)">
            下载
          </a-button>
        </template>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">信息变更</a>

          <a-divider type="vertical" />

          <a @click="handleDetail(record)">详情</a>
          <!--<a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="handleDetail(record)">详情</a>
              </a-menu-item>
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a> </a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>-->
        </span>
      </a-table>
    </div>

    <enterprise-base-info-modal ref="modalForm" @ok="modalFormOk"></enterprise-base-info-modal>
  </a-card>
</template>

<script>
import '@/assets/less/TableExpand.less'
import { mixinDevice } from '@/utils/mixin'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import EnterpriseBaseInfoModal from './EnterpriseBaseInfoModal'
import { getAction } from '@/api/manage'

export default {
  name: 'EnterpriseBaseInfoList',
  mixins: [JeecgListMixin, mixinDevice],
  components: {
    EnterpriseBaseInfoModal,
  },
  data() {
    return {
      dictIndustry: [],
      dictEnterprise: [],
      deptList: [],
      description: '基础数据管理页面',
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
        {
          title: '企业名称',
          align: 'center',
          dataIndex: 'enterpriseName',
        },
        {
          title: '统一社会信用代码',
          align: 'center',
          dataIndex: 'enterpriseSocialCode',
        },
        {
          title: '企业类型',
          align: 'center',
          dataIndex: 'enterpriseType',
          customRender: (text) => {
            let renderText = ''
            for (let i = 0; i < this.dictEnterprise.length; i++) {
              if (this.dictEnterprise[i].value == text) {
                renderText = this.dictEnterprise[i].text
              }
            }
            return renderText
          },
        },
        {
          title: '行业类型',
          align: 'center',
          dataIndex: 'industryType',
          customRender: (text) => {
            let renderText = ''
            for (let i = 0; i < this.dictIndustry.length; i++) {
              if (this.dictIndustry[i].value == text) {
                renderText = this.dictIndustry[i].text
              }
            }
            return renderText
          },
        },
        {
          title: '注册资金(万元)',
          align: 'center',
          dataIndex: 'registeredFund',
        },
        {
          title: '注册地址',
          align: 'center',
          dataIndex: 'registeredAddress',
        },
        {
          title: '成立时间',
          align: 'center',
          dataIndex: 'establishTime',
          customRender: function (text) {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
          },
        },
        {
          title: '招商部门',
          align: 'center',
          dataIndex: 'investmentDept',
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
          title: '项目负责人',
          align: 'center',
          dataIndex: 'projectPrincipal',
        },
        {
          title: '联系电话',
          align: 'center',
          dataIndex: 'phone',
        },
        {
          title: '项目来源地',
          align: 'center',
          dataIndex: 'projectSource',
        },
        {
          title: '合同起始日期',
          align: 'center',
          dataIndex: 'contractStartDate',
          customRender: function (text) {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
          },
        },
        {
          title: '合同终止日期',
          align: 'center',
          dataIndex: 'contractEndDate',
          customRender: function (text) {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
          },
        },
        /*{
          title: '是否享受政策',
          align: 'center',
          dataIndex: 'policyEnjoyStatus',
          customRender: function (text) {
            if (text == '1') {
              return '是'
            } else {
              return '否'
            }
          },
        },
        {
          title: '是否税务迁出',
          align: 'center',
          dataIndex: 'taxStatus',
          customRender: function (text) {
            if (text == '1') {
              return '是'
            } else {
              return '否'
            }
          },
        },
        {
          title: '是否迁出注销',
          align: 'center',
          dataIndex: 'leaveStatus',
          customRender: function (text) {
            if (text == '1') {
              return '是'
            } else {
              return '否'
            }
          },
        },
        {
          title: '审核状态',
          align: 'center',
          dataIndex: 'checkStatus',
          customRender: function (text) {
            if (text == '1') {
              return '待审核'
            } else {
              return '已完成'
            }
          },
        },
        {
          title: '审核意见',
          align: 'center',
          dataIndex: 'checkDesc',
          customRender: function (text) {
            if (text == '1') {
              return '同意'
            } else if (text == '2') {
              return '挽留成功'
            } else if (text == '3') {
              return '挽留不成功'
            } else {
              return '挽留中'
            }
          },
        },*/
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
        list: '/enterprise/enterpriseBaseInfo/list',
        delete: '/enterprise/enterpriseBaseInfo/delete',
        deleteBatch: '/enterprise/enterpriseBaseInfo/deleteBatch',
        exportXlsUrl: '/enterprise/enterpriseBaseInfo/exportXls',
        importExcelUrl: 'enterprise/enterpriseBaseInfo/importExcel',
        readqueryDictItemsUrl: 'sys/api/queryDictItemsByCode',
        deptListUrl: '/sys/api/getAllSysDepart',
      },
      dictOptions: {},
      superFieldList: [],
    }
  },
  created() {
    this.getSuperFieldList()
    this.readDictIndustry()
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    },
  },
  methods: {
    initDictConfig() {},
    readDictIndustry() {
      getAction(this.url.readqueryDictItemsUrl, { code: 'industry_type' }).then((res) => {
        this.dictIndustry = res
      })
      getAction(this.url.readqueryDictItemsUrl, { code: 'enterprise_type' }).then((res) => {
        this.dictEnterprise = res
      })
      getAction(this.url.deptListUrl).then((res) => {
        this.deptList = res
      })
    },
    getSuperFieldList() {
      let fieldList = []
      fieldList.push({ type: 'string', value: 'enterpriseName', text: '企业名称', dictCode: '' })
      fieldList.push({ type: 'string', value: 'enterpriseSocialCode', text: '统一社会信用代码', dictCode: '' })
      fieldList.push({ type: 'string', value: 'enterpriseType', text: '企业类型', dictCode: '' })
      fieldList.push({ type: 'string', value: 'industryType', text: '行业类型', dictCode: '' })
      fieldList.push({ type: 'string', value: 'registeredFund', text: '注册资金(万元)', dictCode: '' })
      fieldList.push({ type: 'string', value: 'registeredAddress', text: '注册地址', dictCode: '' })
      fieldList.push({ type: 'date', value: 'establishTime', text: '成立时间' })
      fieldList.push({ type: 'string', value: 'investmentDept', text: '招商部门', dictCode: '' })
      fieldList.push({ type: 'string', value: 'projectPrincipal', text: '项目负责人', dictCode: '' })
      fieldList.push({ type: 'string', value: 'phone', text: '联系电话', dictCode: '' })
      fieldList.push({ type: 'string', value: 'projectSource', text: '项目来源地', dictCode: '' })
      fieldList.push({ type: 'date', value: 'contractStartDate', text: '合同起始日期' })
      fieldList.push({ type: 'date', value: 'contractEndDate', text: '合同终止日期' })
      fieldList.push({ type: 'string', value: 'policyEnjoyStatus', text: '是否享受政策', dictCode: '' })
      fieldList.push({ type: 'string', value: 'taxStatus', text: '是否税务迁出', dictCode: '' })
      fieldList.push({ type: 'string', value: 'leaveStatus', text: '是否迁出注销', dictCode: '' })
      fieldList.push({ type: 'string', value: 'checkStatus', text: '审核状态', dictCode: '' })
      fieldList.push({ type: 'string', value: 'checkDesc', text: '审核意见', dictCode: '' })
      fieldList.push({ type: 'string', value: 'delFlag', text: '删除标识（1正常0删除）', dictCode: '' })
      this.superFieldList = fieldList
    },
  },
}
</script>
<style scoped>
@import '~@assets/less/common.less';
</style>