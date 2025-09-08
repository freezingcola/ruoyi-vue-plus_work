package org.dromara.workinfo.service;

import org.dromara.workinfo.domain.vo.WorkProjectVo;
import org.dromara.workinfo.domain.bo.WorkProjectBo;
import org.dromara.common.mybatis.core.page.TableDataInfo;
import org.dromara.common.mybatis.core.page.PageQuery;

import java.util.Collection;
import java.util.List;

/**
 * 项目Service接口
 *
 * @author Lion Li
 * @date 2024-10-23
 */
public interface IWorkProjectService {

    /**
     * 查询项目
     *
     * @param id 主键
     * @return 项目
     */
    WorkProjectVo queryById(Long id);

    /**
     * 分页查询项目列表
     *
     * @param bo        查询条件
     * @param pageQuery 分页参数
     * @return 项目分页列表
     */
    TableDataInfo<WorkProjectVo> queryPageList(WorkProjectBo bo, PageQuery pageQuery);

    /**
     * 查询符合条件的项目列表
     *
     * @param bo 查询条件
     * @return 项目列表
     */
    List<WorkProjectVo> queryList(WorkProjectBo bo);

    /**
     * 新增项目
     *
     * @param bo 项目
     * @return 是否新增成功
     */
    Boolean insertByBo(WorkProjectBo bo);

    /**
     * 修改项目
     *
     * @param bo 项目
     * @return 是否修改成功
     */
    Boolean updateByBo(WorkProjectBo bo);

    /**
     * 校验并批量删除项目信息
     *
     * @param ids     待删除的主键集合
     * @param isValid 是否进行有效性校验
     * @return 是否删除成功
     */
    Boolean deleteWithValidByIds(Collection<Long> ids, Boolean isValid);
}
