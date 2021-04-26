import { getAction, deleteAction, putAction, postAction, httpAction } from '@/api/manage'
import Vue from 'vue'

// 大屏
// 主屏左屏数据
const queryEnterpriseProduction = (params)=>getAction("/bigscreen/report/queryEnterpriseProduction",params);
// 主屏右屏数据
const queryIndustryStatus = (params)=>getAction("/bigscreen/report/queryIndustryStatus",params);
export {
    queryEnterpriseProduction,
    queryIndustryStatus,
}