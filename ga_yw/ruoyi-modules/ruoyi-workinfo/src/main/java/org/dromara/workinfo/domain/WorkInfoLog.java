package org.dromara.workinfo.domain;

import org.dromara.common.tenant.core.TenantEntity;
import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;

/**
 * 工单处理信息对象 work_info_log
 *
 * @author 旅法师
 * @date 2024-06-20
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("work_info_log")
public class WorkInfoLog extends TenantEntity {

    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(value = "id")
    private Long id;

    private Long workInfoId;

    private String workContent;

    private String attachs;

    private String state;
}
