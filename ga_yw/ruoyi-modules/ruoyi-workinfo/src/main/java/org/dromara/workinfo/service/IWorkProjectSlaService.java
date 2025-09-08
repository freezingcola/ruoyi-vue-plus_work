package org.dromara.workinfo.service;

import org.dromara.workinfo.domain.vo.WorkProjectSlaVo;
import org.dromara.workinfo.domain.bo.WorkProjectSlaBo;
import org.dromara.common.mybatis.core.page.TableDataInfo;
import org.dromara.common.mybatis.core.page.PageQuery;

import java.util.Collection;
import java.util.List;

/**
 * 项目事件Service接口
 *
 * @author caign
 * @date 2025-01-19
 */
public interface IWorkProjectSlaService {

    /**
     * 查询项目事件
     *
     * @param id 主键
     * @return 项目事件
     */
    WorkProjectSlaVo queryById(Long id);

    /**
     * 分页查询项目事件列表
     *
     * @param bo        查询条件
     * @param pageQuery 分页参数
     * @return 项目事件分页列表
     */
    TableDataInfo<WorkProjectSlaVo> queryPageList(WorkProjectSlaBo bo, PageQuery pageQuery);

    /**
     * 查询符合条件的项目事件列表
     *
     * @param bo 查询条件
     * @return 项目事件列表
     */
    List<WorkProjectSlaVo> queryList(WorkProjectSlaBo bo);

    /**
     * 新增项目事件
     *
     * @param bo 项目事件
     * @return 是否新增成功
     */
    Boolean insertByBo(WorkProjectSlaBo bo);

    /**
     * 修改项目事件
     *
     * @param bo 项目事件
     * @return 是否修改成功
     */
    Boolean updateByBo(WorkProjectSlaBo bo);

    /**
     * 校验并批量删除项目事件信息
     *
     * @param ids     待删除的主键集合
     * @param isValid 是否进行有效性校验
     * @return 是否删除成功
     */
    Boolean deleteWithValidByIds(Collection<Long> ids, Boolean isValid);
}
