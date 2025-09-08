export interface ProjectVO {
  /**
   * 项目名称
   */
  projectName: string;

  /**
   * 项目编码
   */
  projectId: string | number;

  /**
   * 部门id
   */
  deptId: string | number;

  /**
   * 部门名称
   */
  deptName: string;

  /**
   * 项目开始时间
   */
  startTime: string;

  /**
   * 项目结束时间
   */
  endTime: string;

}

export interface ProjectForm extends BaseEntity {
  /**
   * 项目名称
   */
  projectName?: string;

  /**
   * 项目编码
   */
  projectId?: string | number;

  /**
   * 部门id
   */
  deptId?: string | number;

  /**
   * 部门名称
   */
  deptName?: string;

  /**
   * 项目开始时间
   */
  startTime?: string;

  /**
   * 项目结束时间
   */
  endTime?: string;

}

export interface ProjectQuery extends PageQuery {

  /**
   * 项目名称
   */
  projectName?: string;

  /**
   * 项目编码
   */
  projectId?: string | number;

  /**
   * 部门id
   */
  deptId?: string | number;

  /**
   * 部门名称
   */
  deptName?: string;

  /**
   * 项目开始时间
   */
  startTime?: string;

  /**
   * 项目结束时间
   */
  endTime?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



