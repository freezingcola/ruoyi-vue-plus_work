import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { InfoVO, InfoForm, InfoQuery } from '@/api/info/info/types';

/**
 * 查询食堂信息列表
 * @param query
 * @returns {*}
 */

export const listInfo = (query?: InfoQuery): AxiosPromise<InfoVO[]> => {
  return request({
    url: '/info/info/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询食堂信息详细
 * @param id
 */
export const getInfo = (id: string | number): AxiosPromise<InfoVO> => {
  return request({
    url: '/info/info/' + id,
    method: 'get'
  });
};

/**
 * 新增食堂信息
 * @param data
 */
export const addInfo = (data: InfoForm) => {
  return request({
    url: '/info/info',
    method: 'post',
    data: data
  });
};

/**
 * 修改食堂信息
 * @param data
 */
export const updateInfo = (data: InfoForm) => {
  return request({
    url: '/info/info',
    method: 'put',
    data: data
  });
};

/**
 * 删除食堂信息
 * @param id
 */
export const delInfo = (id: string | number | Array<string | number>) => {
  return request({
    url: '/info/info/' + id,
    method: 'delete'
  });
};
