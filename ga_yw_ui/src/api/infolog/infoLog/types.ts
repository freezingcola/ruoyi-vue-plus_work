export interface InfoLogVO {
  /**
   * $column.columnComment
   */
  id: string | number;

  /**
   * $column.columnComment
   */
  workContent: string;

  /**
   * $column.columnComment
   */
  attachs: string;

  state?: string | number;
}

export interface InfoLogForm extends BaseEntity {
  id?: string | number;

  workContent?: string;

  state?: string | number;

  attachs?: string;
}

export interface InfoLogQuery extends PageQuery {
  workContent?: string;

  attachs?: string;

  workInfoId?: string | number;

  state?: string | number;

  params?: any;
}
