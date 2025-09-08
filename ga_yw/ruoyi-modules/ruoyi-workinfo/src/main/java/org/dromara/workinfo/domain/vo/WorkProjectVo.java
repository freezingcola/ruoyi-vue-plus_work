package org.dromara.workinfo.domain.vo;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.dromara.workinfo.domain.WorkProject;
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
 * 项目视图对象 work_project
 *
 * @author Lion Li
 * @date 2024-10-23
 */
@Data
@ExcelIgnoreUnannotated
@AutoMapper(target = WorkProject.class)
public class WorkProjectVo implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * $column.columnComment
     */
    @ExcelProperty(value = "${comment}", converter = ExcelDictConvert.class)
    @ExcelDictFormat(readConverterExp = "$column.readConverterExp()")
    private Long id;

    /**
     * 项目名称
     */
    @ExcelProperty(value = "项目名称")
    private String proName;

    /**
     * 单位名称
     */
    @ExcelProperty(value = "单位名称")
    private String depName;

    /**
     * 项目说明
     */
    @ExcelProperty(value = "项目说明")
    private String proContent;

    /**
     * 项目编号
     */
    @ExcelProperty(value = "项目编号")
    private String proNum;

    /**
     * 项目状态
     */
    @ExcelProperty(value = "项目状态", converter = ExcelDictConvert.class)
    @ExcelDictFormat(dictType = "work_project_state")
    private String proState;

    /**
     * 项目类型
     */
    @ExcelProperty(value = "项目类型", converter = ExcelDictConvert.class)
    @ExcelDictFormat(dictType = "work_project_type")
    private String proType;

    /**
     * 开始时间
     */
    @ExcelProperty(value = "开始时间")
    private Date startTime;

    /**
     * 结束时间
     */
    @ExcelProperty(value = "结束时间")
    private Date endTime;

    /**
     * 服务时间
     */
    @ExcelProperty(value = "服务时间")
    private Integer proServiceTime;
}
