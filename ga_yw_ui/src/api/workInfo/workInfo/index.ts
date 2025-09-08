import request from '@/utils/request';
import axios, { AxiosPromise } from 'axios';
import { WorkInfoVO, WorkInfoForm, WorkInfoQuery } from '@/api/workInfo/workInfo/types';
import { InfoLogForm } from '@/api/infolog/infoLog/types';

/**
 * 查询工单管理列表
 * @param query
 * @returns {*}
 */

export const listWorkInfo = (query?: WorkInfoQuery): AxiosPromise<WorkInfoVO[]> => {
  return request({
    url: '/workInfo/workInfo/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询审批列表
 */
export const AuditlistWorkInfo = (query?: WorkInfoQuery): AxiosPromise<WorkInfoVO[]> => {
  return request({
    url: '/workInfo/workInfo/Auditlist',
    method: 'get',
    params: query
  });
};

/**
 * 根据申报流水号查询工单
 */

export const listByLsh = (lsh: string | number): AxiosPromise<WorkInfoVO[]> => {
  const lshStr = String(lsh);
  return request({
    url: '/workInfo/workInfo/listByLsh?lsh=' + lshStr,
    method: 'get'
  });
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const getIndexData = (): axios.AxiosPromise<WorkInfoVO[]> => {
  return request({
    url: '/workInfo/workInfo/workInfoCount',
    method: 'get'
  });
};

export const getWorkInfoTimeData = (): axios.AxiosPromise<WorkInfoVO[]> => {
  return request({
    url: '/workInfo/workInfo/workInfoTimeCount',
    method: 'get'
  });
};

export const getWorkInfoWeekData = (week: number): axios.AxiosPromise<WorkInfoVO[]> => {
  return request({
    url: '/workInfo/workInfo/workInfoWeekCount?week=' + week,
    method: 'get'
  });
};

export const selectCount = (): axios.AxiosPromise<WorkInfoVO[]> => {
  return request({
    url: '/workInfo/workInfo/selectCount',
    method: 'get',
  });
};

// @ts-ignore
export const getWorkInfoProjectData = (): axios.AxiosPromise<WorkInfoVO[]> => {
  return request({
    url: '/workInfo/workInfo/workInfoProjectCount',
    method: 'get',
  });
};

export const Download = (url: string) => {
  return request({
    url: '/resource/oss/download/1871442263478870017',
    method: 'get',
    data: url// 假设后端期望一个包含workId字段的对象作为请求体
  });
};

/**
 * 查询工单管理详细
 * @param id
 */
export const getWorkInfo = (id: string | number): AxiosPromise<WorkInfoVO> => {
  return request({
    url: '/workInfo/workInfo/' + id,
    method: 'get'
  });
};

/**
 * 新增工单管理
 * @param data
 */
export const addWorkInfo = (data: WorkInfoForm) => {
  return request({
    url: '/workInfo/workInfo',
    method: 'post',
    data: data
  });
};

/**
 * 修改工单管理
 * @param data
 */
export const updateWorkInfo = (data: WorkInfoForm) => {
  return request({
    url: '/workInfo/workInfo',
    method: 'put',
    data: data
  });
};

/**
 * 删除工单管理
 * @param id
 */
export const delWorkInfo = (id: string | number | Array<string | number>) => {
  return request({
    url: '/workInfo/workInfo/' + id,
    method: 'delete'
  });
};

export const acceptWorkInfo = (id: string | number | Array<string | number>) => {
  return request({
    url: '/workInfo/workInfo/accept/' + id,
    method: 'get'
  });
};

export const finishAudit = (data: InfoLogForm) => {
  return request({
    url: '/workInfo/workInfo/audit',
    method: 'post',
    data: data
  });
};

export const finishWork = (data: InfoLogForm) => {
  return request({
    url: '/workInfo/workInfo/finish',
    method: 'post',
    data: data
  });
};

export const receiveWork = (data: InfoLogForm) => {
  return request({
    url: '/workInfo/workInfo/receive',
    method: 'post',
    data: data
  });
};

export const selectWorkInfoByName = (id: string | number | Array<string | number>) => {
  return request({
    url: '/workInfo/workInfo/selectWorkInfoByName?' + id,
    method: 'get'
  });
};

