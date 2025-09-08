import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { ProjectSlaVO, ProjectSlaForm, ProjectSlaQuery } from '@/api/workProject/projectSla/types';

/**
 * 查询项目事件列表
 * @param query
 * @returns {*}
 */

export const listProjectSla = (query?: ProjectSlaQuery): AxiosPromise<ProjectSlaVO[]> => {
  return request({
    url: '/workProject/projectSla/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询项目事件详细
 * @param id
 */
export const getProjectSla = (id: string | number): AxiosPromise<ProjectSlaVO> => {
  return request({
    url: '/workProject/projectSla/' + id,
    method: 'get'
  });
};

/**
 * 新增项目事件
 * @param data
 */
export const addProjectSla = (data: ProjectSlaForm) => {
  return request({
    url: '/workProject/projectSla',
    method: 'post',
    data: data
  });
};

/**
 * 修改项目事件
 * @param data
 */
export const updateProjectSla = (data: ProjectSlaForm) => {
  return request({
    url: '/workProject/projectSla',
    method: 'put',
    data: data
  });
};

/**
 * 删除项目事件
 * @param id
 */
export const delProjectSla = (id: string | number | Array<string | number>) => {
  return request({
    url: '/workProject/projectSla/' + id,
    method: 'delete'
  });
};
