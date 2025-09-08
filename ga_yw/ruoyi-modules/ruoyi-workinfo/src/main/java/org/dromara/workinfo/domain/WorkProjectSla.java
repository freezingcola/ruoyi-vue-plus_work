package org.dromara.workinfo.domain;

import org.dromara.common.tenant.core.TenantEntity;
import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;

/**
 * 项目事件对象 work_project_sla
 *
 * @author caign
 * @date 2025-01-19
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("work_project_sla")
public class WorkProjectSla extends TenantEntity {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * $column.columnComment
     */
    @TableId(value = "id")
    private Long id;

    /**
     * 服务名称
     */
    private String slaName;

    /**
     * 服务说明
     */
    private String slaContent;

    /**
     * 状态
     */
    private String slaState;

    /**
     * 服务类型
     */
    private String slaType;

    /**
     * 处理时限
     */
    private String slaTime;

    /**
     * 关联项目
     */
    private Long projectId;


}
