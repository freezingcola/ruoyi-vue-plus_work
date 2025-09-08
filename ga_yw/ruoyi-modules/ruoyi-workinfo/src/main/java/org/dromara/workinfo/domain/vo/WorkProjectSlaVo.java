package org.dromara.workinfo.domain.vo;

import org.dromara.workinfo.domain.WorkProjectSla;
import com.alibaba.excel.annotation.ExcelIgnoreUnannotated;
import com.alibaba.excel.annotation.ExcelProperty;
import org.dromara.common.excel.annotation.ExcelDictFormat;
import org.dromara.common.excel.convert.ExcelDictConvert;
import io.github.linpeilie.annotations.AutoMapper;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;



/**
 * 项目事件视图对象 work_project_sla
 *
 * @author caign
 * @date 2025-01-19
 */
@Data
@ExcelIgnoreUnannotated
@AutoMapper(target = WorkProjectSla.class)
public class WorkProjectSlaVo implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * $column.columnComment
     */
    @ExcelProperty(value = "${comment}", converter = ExcelDictConvert.class)
    @ExcelDictFormat(readConverterExp = "$column.readConverterExp()")
    private Long id;

    /**
     * 服务名称
     */
    @ExcelProperty(value = "服务名称")
    private String slaName;

    /**
     * 服务说明
     */
    @ExcelProperty(value = "服务说明")
    private String slaContent;

    /**
     * 状态
     */
    @ExcelProperty(value = "状态", converter = ExcelDictConvert.class)
    @ExcelDictFormat(dictType = "project_sla_state")
    private String slaState;

    /**
     * 服务类型，字典值
     */
    @ExcelProperty(value = "服务类型，字典值", converter = ExcelDictConvert.class)
    @ExcelDictFormat(dictType = "project_sla_type")
    private String slaType;

    /**
     * 处理时限，字典值
     */
    @ExcelProperty(value = "处理时限，字典值", converter = ExcelDictConvert.class)
    @ExcelDictFormat(dictType = "project_sla_time")
    private String slaTime;


}
