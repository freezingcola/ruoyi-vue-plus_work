package org.dromara.workinfo.domain.bo;

import org.dromara.workinfo.domain.WorkInfoLog;
import org.dromara.common.mybatis.core.domain.BaseEntity;
import org.dromara.common.core.validate.AddGroup;
import org.dromara.common.core.validate.EditGroup;
import io.github.linpeilie.annotations.AutoMapper;
import lombok.Data;
import lombok.EqualsAndHashCode;
import jakarta.validation.constraints.*;

/**
 * 工单处理信息业务对象 work_info_log
 *
 * @author 旅法师
 * @date 2024-06-20
 */
@Data
@EqualsAndHashCode(callSuper = true)
@AutoMapper(target = WorkInfoLog.class, reverseConvertGenerate = false)
public class WorkInfoLogBo extends BaseEntity {

    private Long id;

    @NotBlank(message = "内容不能为空", groups = { AddGroup.class, EditGroup.class })
    private String workContent;

    @NotNull(message = "工单id不能为空", groups = { AddGroup.class, EditGroup.class })
    private Long workInfoId;

    /**
     * 审核状态
     */
    private String state;

    /**
     * 处理类型
     */
    private String logType;

    private String attachs;


}
