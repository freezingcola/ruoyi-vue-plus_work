export interface FeestandardVO {
  /**
   * 
   */
  id: string | number;

  /**
   * 关联食堂ID
   */
  canteenId: string | number;

  /**
   * 餐别(1:早餐 2:午餐 3:晚餐)
   */
  mealType: number;

  /**
   * 收费标准
   */
  fee: number;

}

export interface FeestandardForm extends BaseEntity {
  /**
   * 
   */
  id?: string | number;

  /**
   * 关联食堂ID
   */
  canteenId?: string | number;

  /**
   * 餐别(1:早餐 2:午餐 3:晚餐)
   */
  mealType?: number;

  /**
   * 收费标准
   */
  fee?: number;

}

export interface FeestandardQuery extends PageQuery {

  /**
   * 关联食堂ID
   */
  canteenId?: string | number;

  /**
   * 餐别(1:早餐 2:午餐 3:晚餐)
   */
  mealType?: number;

  /**
   * 收费标准
   */
  fee?: number;

    /**
     * 日期范围参数
     */
    params?: any;
}



