export interface ProjectSlaVO {
  /**
   * $column.columnComment
   */
  id: string | number;

  /**
   * 服务名称
   */
  slaName: string;

  /**
   * 服务说明
   */
  slaContent: string;

  /**
   * 状态
   */
  slaState: string;

  /**
   * 服务类型，字典值
   */
  slaType: string;

  /**
   * 处理时限，字典值
   */
  slaTime: string;

}

export interface ProjectSlaForm extends BaseEntity {
  /**
   * $column.columnComment
   */
  id?: string | number;

  /**
   * 服务名称
   */
  slaName?: string;

  /**
   * 服务说明
   */
  slaContent?: string;

  /**
   * 状态
   */
  slaState?: string;

  /**
   * 服务类型，字典值
   */
  slaType?: string;

  /**
   * 处理时限，字典值
   */
  slaTime?: string;

}

export interface ProjectSlaQuery extends PageQuery {

  /**
   * 服务名称
   */
  slaName?: string;

  /**
   * 服务说明
   */
  slaContent?: string;

  /**
   * 状态
   */
  slaState?: string;

  /**
   * 服务类型
   */
  slaType?: string;

  /**
   * 处理时限
   */
  slaTime?: string;

  projectId?: number;

    /**
     * 日期范围参数
     */
    params?: any;
}



