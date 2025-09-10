export interface WorkInfoVO {
  /**
   * $column.columnComment
   */
  id: string | number;

  /**
   * $column.columnComment
   */
  workTitle: string;

  /**
   * $column.columnComment
   */
  // workContent: string;

  /**
   * $column.columnComment
   */
  // state: string;

  /**
   * $column.columnComment
   */
  // workType: string;

  /**
   * $column.columnComment
   */
  acceptAccount: string;

  /**
   * $column.columnComment
   */
  acceptAccountName: string;

  attachs: string;

  attachIds: string;

  startTime: string;

  endTime: string;
}

export interface WorkInfoForm extends BaseEntity {
  /**
   * $column.columnComment
   */
  id?: string | number;

  lsh?: string | number;

  /**
   * $column.columnComment
   */
  workTitle?: string;

  /**
   * $column.columnComment
   */
  // workContent?: string;

  /**
   * $column.columnComment
   */
  state?: string;

  /**
   * $column.columnComment
   */
  // workType?: string;

  // projectName?: string;

  workLevel?: string;

  classificationType?: string;

  /**
   * $column.columnComment
   */
  acceptAccount?: string;

  /**
   * $column.columnComment
   */
  acceptAccountName?: string;

  attachs?: string;

  attachIds?: string;

  startTime?: string;

  endTime?: string;
}

export interface WorkInfoQuery extends PageQuery {
  /**
   * $column.columnComment
   */
  workTitle?: string;

  /**
   * $column.columnComment
   */
  // workContent?: string;




  /**
   * $column.columnComment
   */
  // state?: string;

  /**
   * $column.columnComment
   */
  // workType?: string;

  /**
   * $column.columnComment
   */
  acceptAccount?: string;

  /**
   * $column.columnComment
   */
  acceptAccountName?: string;

  attachs?: string;

  attachIds?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
