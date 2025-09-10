export interface InfoVO {
  /**
   * 食堂ID
   */
  id: string | number;

  /**
   * 食堂名称
   */
  canteenName: string;

  /**
   * 食堂位置
   */
  location: string;

  /**
   * 开放时间
   */
  openTime: string;

  /**
   * 负责人
   */
  manager: string;

  /**
   * 所属单位ID
   */
  unitId: string | number;

}

export interface InfoForm extends BaseEntity {
  /**
   * 食堂ID
   */
  id?: string | number;

  /**
   * 食堂名称
   */
  canteenName?: string;

  /**
   * 食堂位置
   */
  location?: string;

  /**
   * 开放时间
   */
  openTime?: string;

  /**
   * 负责人
   */
  manager?: string;

  /**
   * 所属单位ID
   */
  unitId?: string | number;

}

export interface InfoQuery extends PageQuery {

  /**
   * 食堂名称
   */
  canteenName?: string;

  /**
   * 食堂位置
   */
  location?: string;

  /**
   * 开放时间
   */
  openTime?: string;

  /**
   * 负责人
   */
  manager?: string;

  /**
   * 所属单位ID
   */
  unitId?: string | number;

    /**
     * 日期范围参数
     */
    params?: any;
}



