import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { FeestandardVO, FeestandardForm, FeestandardQuery } from '@/api/feestandard/feestandard/types';

/**
 * 查询餐费标准设置列表
 * @param query
 * @returns {*}
 */
export const listFeestandard = (query?: FeestandardQuery): AxiosPromise<FeestandardVO[]> => {
  return request({
    url: '/feestandard/feestandard/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询餐费标准设置详细
 * @param id
 */
export const getFeestandard = (id: string | number): AxiosPromise<FeestandardVO> => {
  return request({
    url: '/feestandard/feestandard/' + id,
    method: 'get'
  });
};

/**
 * 新增餐费标准设置
 * @param data
 */
export const addFeestandard = (data: FeestandardForm) => {
  return request({
    url: '/feestandard/feestandard',
    method: 'post',
    data: data
  });
};

/**
 * 修改餐费标准设置
 * @param data
 */
export const updateFeestandard = (data: FeestandardForm) => {
  return request({
    url: '/feestandard/feestandard',
    method: 'put',
    data: data
  });
};

/**
 * 删除餐费标准设置
 * @param id
 */
export const delFeestandard = (id: string | number | Array<string | number>) => {
  return request({
    url: '/feestandard/feestandard/' + id,
    method: 'delete'
  });
};

/**
 * 检查收费标准是否已存在
 * @param canteenId 食堂ID
 * @param mealType 餐别
 */
// 确保用 params 带参数
export function checkFeeStandardExists(canteenId: number, mealType: number) {
  return request({
    url: '/feestandard/feestandard/exists',
    method: 'get',
    params: { canteenId, mealType } // 注意这里
  });
}
