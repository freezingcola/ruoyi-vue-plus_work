package org.dromara.workinfo.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.dromara.workinfo.domain.WorkInfo;
import org.dromara.workinfo.domain.vo.WorkInfoCountVo;
import org.dromara.workinfo.domain.vo.WorkInfoProjectCountVo;
import org.dromara.workinfo.domain.vo.WorkInfoVo;
import org.dromara.workinfo.domain.bo.WorkInfoBo;
import org.dromara.common.mybatis.core.page.TableDataInfo;
import org.dromara.common.mybatis.core.page.PageQuery;

import java.util.Collection;
import java.util.List;

/**
 * 工单管理Service接口
 *
 * @author Lion Li
 * @date 2024-06-01
 */
public interface IWorkInfoService  {

    /**
     * 查询工单管理
     *
     * @param id 主键
     * @return 工单管理
     */
    WorkInfoVo queryById(Long id);

    /**
     * 分页查询工单管理列表
     *
     * @param bo        查询条件
     * @param pageQuery 分页参数
     * @return 工单管理分页列表
     */
    TableDataInfo<WorkInfoVo> queryPageList(WorkInfoBo bo, PageQuery pageQuery);
    TableDataInfo<WorkInfoVo> queryAuditPageList(WorkInfoBo bo, PageQuery pageQuery);

    List<WorkInfoCountVo> workInfoCount();

    List<WorkInfoCountVo> selectCount();

    List<WorkInfoCountVo> selectWorkInfoTimeCount();

    List<WorkInfoCountVo> workInfoTimeWeekCount(String startTime, String endTime);

    List<WorkInfoProjectCountVo> workInfoProjectCount();
    /**
     * 查询符合条件的工单管理列表
     *
     * @param bo 查询条件
     * @return 工单管理列表
     */
    List<WorkInfoVo> queryList(WorkInfoBo bo);

    /**
     * 新增工单管理
     *
     * @param bo 工单管理
     * @return 是否新增成功
     */
    Boolean insertByBo(WorkInfoBo bo);

    /**
     * 修改工单管理
     *
     * @param bo 工单管理
     * @return 是否修改成功
     */
    Boolean updateByBo(WorkInfoBo bo);

    /**
     * 接收工单
     * @param bo
     * @return
     */
    Boolean accept(Long[] ids);

    /**
     * 校验并批量删除工单管理信息
     *
     * @param ids     待删除的主键集合
     * @param isValid 是否进行有效性校验
     * @return 是否删除成功
     */
    Boolean deleteWithValidByIds(Collection<Long> ids, Boolean isValid);

    public List<WorkInfo> selectList(QueryWrapper<WorkInfo> wrapper);
}
