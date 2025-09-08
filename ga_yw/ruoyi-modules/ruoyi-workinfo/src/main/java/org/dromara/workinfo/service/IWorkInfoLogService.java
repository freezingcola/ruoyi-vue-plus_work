package org.dromara.workinfo.service;

import org.dromara.workinfo.domain.vo.WorkInfoLogVo;
import org.dromara.workinfo.domain.bo.WorkInfoLogBo;
import org.dromara.common.mybatis.core.page.TableDataInfo;
import org.dromara.common.mybatis.core.page.PageQuery;
import org.dromara.workinfo.domain.vo.WorkInfoVo;

import java.util.Collection;
import java.util.List;

/**
 * 工单处理信息Service接口
 *
 * @author 旅法师
 * @date 2024-06-20
 */
public interface IWorkInfoLogService {

    /**
     * 查询工单处理信息
     *
     * @param id 主键
     * @return 工单处理信息
     */
    WorkInfoLogVo queryById(Long id);

    /**
     * 分页查询工单处理信息列表
     *
     * @param bo        查询条件
     * @param pageQuery 分页参数
     * @return 工单处理信息分页列表
     */
    TableDataInfo<WorkInfoLogVo> queryPageList(WorkInfoLogBo bo, PageQuery pageQuery);

    /**
     * 查询符合条件的工单处理信息列表
     *
     * @param bo 查询条件
     * @return 工单处理信息列表
     */
    List<WorkInfoLogVo> queryList(WorkInfoLogBo bo);

    /**
     * 新增工单处理信息
     *
     * @param bo 工单处理信息
     * @return 是否新增成功
     */
    Boolean insertByBo(WorkInfoLogBo bo);

    Boolean finishWorkInfo(WorkInfoLogBo bo, WorkInfoVo workInfoVo);
    Boolean receiveWorkInfo(WorkInfoLogBo bo, WorkInfoVo workInfoVo);

    Boolean finishAudit(WorkInfoLogBo bo, WorkInfoVo workInfoVo);

    /**
     * 修改工单处理信息
     *
     * @param bo 工单处理信息
     * @return 是否修改成功
     */
    Boolean updateByBo(WorkInfoLogBo bo);

    /**
     * 校验并批量删除工单处理信息信息
     *
     * @param ids     待删除的主键集合
     * @param isValid 是否进行有效性校验
     * @return 是否删除成功
     */
    Boolean deleteWithValidByIds(Collection<Long> ids, Boolean isValid);
}
