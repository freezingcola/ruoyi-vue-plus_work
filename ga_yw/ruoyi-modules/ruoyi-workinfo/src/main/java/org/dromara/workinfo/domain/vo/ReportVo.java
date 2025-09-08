package org.dromara.workinfo.domain.vo;

import com.alibaba.excel.annotation.ExcelIgnoreUnannotated;
import com.alibaba.excel.annotation.ExcelProperty;
import io.github.linpeilie.annotations.AutoMapper;
import lombok.Data;
import org.dromara.workinfo.domain.Report;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;


/**
 * 【请填写功能名称】视图对象 report
 *
 * @author Lion Li
 * @date 2025-03-24
 */
@Data
@ExcelIgnoreUnannotated
@AutoMapper(target = Report.class)
public class ReportVo implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     *
     */
    @ExcelProperty(value = "")
    private Long id;

    private Date reportDate;
    private String reportType;
    private String address;
    private String contactPerson;
    private String contactPhone;
    private String faultDescription;
    private Long createDept;
    private Long createBy;
    private Long updateBy;
    private Date updateTime;
    private Date createTime;
    private String tenantId;
}
