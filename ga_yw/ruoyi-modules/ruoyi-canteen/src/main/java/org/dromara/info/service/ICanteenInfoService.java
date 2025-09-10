package org.dromara.info.service;

import org.dromara.info.domain.vo.CanteenInfoVo;
import org.dromara.info.domain.bo.CanteenInfoBo;
import org.dromara.common.mybatis.core.page.TableDataInfo;
import org.dromara.common.mybatis.core.page.PageQuery;

import java.util.Collection;
import java.util.List;

/**
 * 食堂信息Service接口
 *
 * @author Lion Li
 * @date 2025-09-08
 */
public interface ICanteenInfoService {

    /**
     * 查询食堂信息
     *
     * @param id 主键
     * @return 食堂信息
     */
    CanteenInfoVo queryById(Long id);

    /**
     * 分页查询食堂信息列表
     *
     * @param bo        查询条件
     * @param pageQuery 分页参数
     * @return 食堂信息分页列表
     */
    TableDataInfo<CanteenInfoVo> queryPageList(CanteenInfoBo bo, PageQuery pageQuery);

    /**
     * 查询符合条件的食堂信息列表
     *
     * @param bo 查询条件
     * @return 食堂信息列表
     */
    List<CanteenInfoVo> queryList(CanteenInfoBo bo);

    /**
     * 新增食堂信息
     *
     * @param bo 食堂信息
     * @return 是否新增成功
     */
    Boolean insertByBo(CanteenInfoBo bo);

    /**
     * 修改食堂信息
     *
     * @param bo 食堂信息
     * @return 是否修改成功
     */
    Boolean updateByBo(CanteenInfoBo bo);

    /**
     * 校验并批量删除食堂信息信息
     *
     * @param ids     待删除的主键集合
     * @param isValid 是否进行有效性校验
     * @return 是否删除成功
     */
    Boolean deleteWithValidByIds(Collection<Long> ids, Boolean isValid);
}
