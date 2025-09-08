package org.dromara.workinfo.domain.bo;

import org.dromara.workinfo.domain.WorkProjectSla;
import org.dromara.common.mybatis.core.domain.BaseEntity;
import org.dromara.common.core.validate.AddGroup;
import org.dromara.common.core.validate.EditGroup;
import io.github.linpeilie.annotations.AutoMapper;
import lombok.Data;
import lombok.EqualsAndHashCode;
import jakarta.validation.constraints.*;

/**
 * 项目事件业务对象 work_project_sla
 *
 * @author caign
 * @date 2025-01-19
 */
@Data
@EqualsAndHashCode(callSuper = true)
@AutoMapper(target = WorkProjectSla.class, reverseConvertGenerate = false)
public class WorkProjectSlaBo extends BaseEntity {

    /**
     * $column.columnComment
     */
    @NotNull(message = "不能为空", groups = { EditGroup.class })
    private Long id;

    /**
     * 服务名称
     */
    @NotBlank(message = "服务名称不能为空", groups = { AddGroup.class, EditGroup.class })
    private String slaName;

    /**
     * 服务说明
     */
    @NotBlank(message = "服务说明不能为空", groups = { AddGroup.class, EditGroup.class })
    private String slaContent;

    /**
     * 状态
     */
    @NotBlank(message = "状态不能为空", groups = { AddGroup.class, EditGroup.class })
    private String slaState;

    /**
     * 服务类型，字典值
     */
    @NotBlank(message = "服务类型，字典值不能为空", groups = { AddGroup.class, EditGroup.class })
    private String slaType;

    /**
     * 处理时限，字典值
     */
    @NotBlank(message = "处理时限，字典值不能为空", groups = { AddGroup.class, EditGroup.class })
    private String slaTime;

    private Long projectId;
}
