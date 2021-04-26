<template>
  <!-- 定义在这里的参数都是不可在外部覆盖的，防止出现问题 -->
  <j-select-biz-dept-component
    :value="value"
    :ellipsisLength="25"
    :listUrl="url.list"
    :columns="columns"
    v-on="$listeners"
    v-bind="attrs"
  />
</template>

<script>
  import JDate from '@comp/jeecg/JDate'
  import JSelectBizDeptComponent from './JSelectBizDeptComponent'
  import JSelectDepart from './JSelectDepart'

  export default {
    name: 'JSelectMultiUser',
    components: {JDate, JSelectBizDeptComponent, JSelectDepart},
    props: {
      value: null, // any type
      queryConfig: {
        type: Array,
        default: () => []
      },
    },
    data() {
      return {
        url: { list: '/sys/user/list' },
        columns: [
          { title: '姓名', align: 'center', width: '25%', widthRight: '70%', dataIndex: 'realname' },
          { title: '部门', align: 'center', width: '20%', dataIndex: 'orgCodeTxt' },
          // { title: '电话', align: 'center', width: '20%', dataIndex: 'phone' },
        ],
        // 定义在这里的参数都是可以在外部传递覆盖的，可以更灵活的定制化使用的组件
        default: {
          name: '用户',
          width: 1200,
          returnId: true,
          displayKey: 'realname',
          returnKeys: ['id'],
          queryParamCode: 'realname',
          queryParamText: '姓名',
        },
        // 多条件查询配置
        queryConfigDefault: [
        ],
      }
    },
    computed: {
      attrs() {
        return Object.assign(this.default, this.$attrs, {
          queryConfig: this.queryConfigDefault.concat(this.queryConfig)
        })
      }
    }
  }
</script>

<style lang="less" scoped></style>