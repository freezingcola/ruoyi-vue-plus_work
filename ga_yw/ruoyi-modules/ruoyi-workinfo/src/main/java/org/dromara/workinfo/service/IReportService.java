package org.dromara.workinfo.service;

import org.dromara.common.mybatis.core.page.PageQuery;
import org.dromara.common.mybatis.core.page.TableDataInfo;
import org.dromara.workinfo.domain.bo.ReportBo;
import org.dromara.workinfo.domain.vo.ReportVo;

import java.util.Collection;
import java.util.List;

/**
 * 【请填写功能名称】Service接口
 *
 * @author Lion Li
 * @date 2025-03-24
 */
public interface IReportService {

    /**
     * 查询【请填写功能名称】
     *
     * @param id 主键
     * @return 【请填写功能名称】
     */
    ReportVo queryById(Long id);


    /**
     * 查询符合条件的【请填写功能名称】列表
     *
     * @param bo 查询条件
     * @return 【请填写功能名称】列表
     */
    List<ReportVo> queryList(ReportBo bo);


    TableDataInfo<ReportVo> queryPageList(ReportBo bo, PageQuery pageQuery);
    /**
     * 新增【请填写功能名称】
     *
     * @param bo 【请填写功能名称】
     * @return 是否新增成功
     */
    Boolean insertByBo(ReportBo bo);

    /**
     * 修改【请填写功能名称】
     *
     * @param bo 【请填写功能名称】
     * @return 是否修改成功
     */
    Boolean updateByBo(ReportBo bo);

    /**
     * 校验并批量删除【请填写功能名称】信息
     *
     * @param ids     待删除的主键集合
     * @param isValid 是否进行有效性校验
     * @return 是否删除成功
     */
    Boolean deleteWithValidByIds(Collection<Long> ids, Boolean isValid);
}
