package org.dromara.workinfo.domain;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.dromara.common.mybatis.core.domain.BaseEntity;

import java.io.Serial;
import java.util.Date;

/**
 * 【请填写功能名称】对象 report
 *
 * @author Lion Li
 * @date 2025-03-24
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("report")
public class Report extends BaseEntity {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     *
     */
    @TableId(value = "id")
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
