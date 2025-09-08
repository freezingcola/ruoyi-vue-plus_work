package org.dromara.workinfo.domain.bo;

import io.github.linpeilie.annotations.AutoMapper;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.dromara.common.core.validate.EditGroup;
import org.dromara.common.mybatis.core.domain.BaseEntity;
import org.dromara.workinfo.domain.Report;

import java.util.Date;

/**
 * 【请填写功能名称】业务对象 report
 *
 * @author Lion Li
 * @date 2025-03-24
 */
@Data
@EqualsAndHashCode(callSuper = true)
@AutoMapper(target = Report.class, reverseConvertGenerate = false)
public class ReportBo extends BaseEntity {

    /**
     *
     */
    @NotNull(message = "不能为空", groups = { EditGroup.class })
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
