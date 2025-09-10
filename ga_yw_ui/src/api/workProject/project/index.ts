import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { ProjectVO, ProjectForm, ProjectQuery } from '@/api/workProject/project/types';

/**
 * 查询项目列表
 * @param query
 * @returns {*}
 */

export const listProject = (query?: ProjectQuery): AxiosPromise<ProjectVO[]> => {
  return request({
    url: '/workProject/project/list',
    method: 'get',
    params: query
  });
};


export const listAllProject = (query?: ProjectQuery): AxiosPromise<ProjectVO[]> => {
  return request({
    url: '/workProject/project/NoAuthorizelist',
    method: 'get',
    params: query
  });
};

/**
 * 查询项目详细
 * @param id
 */
export const getProject = (id: string | number): AxiosPromise<ProjectVO> => {
  return request({
    url: '/workProject/project/' + id,
    method: 'get'
  });
};

/**
 * 新增项目
 * @param data
 */
export const addProject = (data: ProjectForm) => {
  return request({
    url: '/workProject/project',
    method: 'post',
    data: data
  });
};

/**
 * 修改项目
 * @param data
 */
export const updateProject = (data: ProjectForm) => {
  return request({
    url: '/workProject/project',
    method: 'put',
    data: data
  });
};

/**
 * 删除项目
 * @param id
 */
export const delProject = (id: string | number | Array<string | number>) => {
  return request({
    url: '/workProject/project/' + id,
    method: 'delete'
  });
};
