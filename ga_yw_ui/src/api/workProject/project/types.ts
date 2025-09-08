export interface ProjectVO {
  /**
   * $column.columnComment
   */
  id: string | number;

  /**
   * 项目名称
   */
  proName: string;

  /**
   * 单位名称
   */
  depName: string;

  /**
   * 项目说明
   */
  proContent: string;

  /**
   * 项目编号
   */
  proNum: string;

  /**
   * 项目状态
   */
  proState: string;

  /**
   * 项目类型
   */
  proType: string;

  /**
   * 开始时间
   */
  startTime: string;

  /**
   * 结束时间
   */
  endTime: string;

  /**
   * 服务时间
   */
  proServiceTime: number;
}

export interface ProjectForm extends BaseEntity {
  /**
   * $column.columnComment
   */
  id?: string | number;

  /**
   * 项目名称
   */
  proName?: string;

  /**
   * 单位名称
   */
  depName?: string;

  /**
   * 项目说明
   */
  proContent?: string;

  /**
   * 项目编号
   */
  proNum?: string;

  /**
   * 项目状态
   */
  proState?: string;

  /**
   * 项目类型
   */
  proType?: string;

  /**
   * 开始时间
   */
  startTime?: string;

  /**
   * 结束时间
   */
  endTime?: string;

  /**
   * 服务时间
   */
  proServiceTime?: number;
}

export interface ProjectQuery extends PageQuery {
  /**
   * 项目名称
   */
  proName?: string;

  /**
   * 单位名称
   */
  depName?: string;

  /**
   * 项目说明
   */
  proContent?: string;

  /**
   * 项目编号
   */
  proNum?: string;

  /**
   * 项目状态
   */
  proState?: string;

  /**
   * 项目类型
   */
  proType?: string;

  /**
   * 开始时间
   */
  startTime?: string;

  /**
   * 结束时间
   */
  endTime?: string;

  /**
   * 服务时间
   */
  proServiceTime?: number;

  /**
   * 日期范围参数
   */
  params?: any;
}
