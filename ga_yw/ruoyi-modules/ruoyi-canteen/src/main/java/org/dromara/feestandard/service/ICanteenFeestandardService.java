package org.dromara.feestandard.service;

import org.dromara.feestandard.domain.vo.CanteenFeestandardVo;
import org.dromara.feestandard.domain.bo.CanteenFeestandardBo;
import org.dromara.common.mybatis.core.page.TableDataInfo;
import org.dromara.common.mybatis.core.page.PageQuery;

import java.util.Collection;
import java.util.List;

/**
 * 餐费标准设置Service接口
 *
 * @author Lion Li
 * @date 2025-09-09
 */
public interface ICanteenFeestandardService {

    /**
     * 查询餐费标准设置
     *
     * @param id 主键
     * @return 餐费标准设置
     */
    CanteenFeestandardVo queryById(Long id);

    /**
     * 分页查询餐费标准设置列表
     *
     * @param bo        查询条件
     * @param pageQuery 分页参数
     * @return 餐费标准设置分页列表
     */
    TableDataInfo<CanteenFeestandardVo> queryPageList(CanteenFeestandardBo bo, PageQuery pageQuery);

    /**
     * 查询符合条件的餐费标准设置列表
     *
     * @param bo 查询条件
     * @return 餐费标准设置列表
     */
    List<CanteenFeestandardVo> queryList(CanteenFeestandardBo bo);

    /**
     * 新增餐费标准设置
     *
     * @param bo 餐费标准设置
     * @return 是否新增成功
     */
    Boolean insertByBo(CanteenFeestandardBo bo);

    /**
     * 修改餐费标准设置
     *
     * @param bo 餐费标准设置
     * @return 是否修改成功
     */
    Boolean updateByBo(CanteenFeestandardBo bo);

    /**
     * 校验并批量删除餐费标准设置信息
     *
     * @param ids     待删除的主键集合
     * @param isValid 是否进行有效性校验
     * @return 是否删除成功
     */
    Boolean deleteWithValidByIds(Collection<Long> ids, Boolean isValid);

    /**新增检验餐标service接口**/
    /**
     * 检查餐费标准是否已存在
     * @param canteenId 食堂ID
     * @param mealType 餐别
     * @return 是否存在
     */
    boolean checkExists(Long canteenId, Long mealType);

}
