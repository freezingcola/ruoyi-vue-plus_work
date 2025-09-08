package org.dromara.workinfo.mapper;

import org.dromara.common.mybatis.core.mapper.BaseMapperPlus;
import org.dromara.workinfo.domain.Report;
import org.dromara.workinfo.domain.bo.ReportBo;
import org.dromara.workinfo.domain.vo.ReportVo;

import java.util.List;

/**
 * 报修Mapper接口
 *
 * @author Lion Li
 * @date 2025-03-24
 */
public interface ReportMapper extends BaseMapperPlus<Report, ReportVo> {

    /**
     * 查询报修列表
     *
     * @param bo 报修信息
     * @return 报修集合
     */
    List<Report> selectReportList(ReportBo bo);

    /**
     * 查询报修信息
     *
     * @param id 报修主键
     * @return 报修信息
     */
    Report selectReportById(Long id);

    /**
     * 新增报修
     *
     * @param report 报修信息
     * @return 结果
     */
    int insertReport(Report report);

    /**
     * 修改报修
     *
     * @param report 报修信息
     * @return 结果
     */
    int updateReport(Report report);

    /**
     * 删除报修
     *
     * @param id 报修主键
     * @return 结果
     */
    int deleteReportById(Long id);

    /**
     * 批量删除报修
     *
     * @param ids 需要删除的数据主键集合
     * @return 结果
     */
    int deleteReportByIds(Long[] ids);
}
