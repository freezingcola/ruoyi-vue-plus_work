package org.dromara.workinfo.domain;

import org.dromara.common.tenant.core.TenantEntity;
import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.io.Serial;

/**
 * 项目对象 work_project
 *
 * @author Lion Li
 * @date 2024-10-23
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("work_project")
public class WorkProject extends TenantEntity {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * $column.columnComment
     */
    @TableId(value = "id")
    private Long id;

    /**
     * 项目名称
     */
    private String proName;

    /**
     * 单位名称
     */
    private String depName;

    /**
     * 项目说明
     */
    private String proContent;

    /**
     * 项目编号
     */
    private String proNum;

    /**
     * 项目状态
     */
    private String proState;

    /**
     * 项目类型
     */
    private String proType;

    /**
     * 开始时间
     */
    private Date startTime;

    /**
     * 结束时间
     */
    private Date endTime;

    /**
     * 服务时间
     */
    private Integer proServiceTime;
}
