import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { InfoLogVO, InfoLogForm, InfoLogQuery } from '@/api/infolog/infoLog/types';

/**
 * 查询工单处理信息列表
 * @param query
 * @returns {*}
 */

export const listInfoLog = (query?: InfoLogQuery): AxiosPromise<InfoLogVO[]> => {
  return request({
    url: '/infolog/infoLog/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询工单处理信息详细
 * @param id
 */
export const getInfoLog = (id: string | number): AxiosPromise<InfoLogVO> => {
  return request({
    url: '/infolog/infoLog/' + id,
    method: 'get'
  });
};

/**
 * 新增工单处理信息
 * @param data
 */
export const addInfoLog = (data: InfoLogForm) => {
  return request({
    url: '/infolog/infoLog',
    method: 'post',
    data: data
  });
};

/**
 * 修改工单处理信息
 * @param data
 */
export const updateInfoLog = (data: InfoLogForm) => {
  return request({
    url: '/infolog/infoLog',
    method: 'put',
    data: data
  });
};

/**
 * 删除工单处理信息
 * @param id
 */
export const delInfoLog = (id: string | number | Array<string | number>) => {
  return request({
    url: '/infolog/infoLog/' + id,
    method: 'delete'
  });
};
