package org.dromara.workinfo.domain.bo;

import org.dromara.workinfo.domain.WorkProject;
import org.dromara.common.mybatis.core.domain.BaseEntity;
import org.dromara.common.core.validate.AddGroup;
import org.dromara.common.core.validate.EditGroup;
import io.github.linpeilie.annotations.AutoMapper;
import lombok.Data;
import lombok.EqualsAndHashCode;
import jakarta.validation.constraints.*;
import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * 项目业务对象 work_project
 *
 * @author Lion Li
 * @date 2024-10-23
 */
@Data
@EqualsAndHashCode(callSuper = true)
@AutoMapper(target = WorkProject.class, reverseConvertGenerate = false)
public class WorkProjectBo extends BaseEntity {

    /**
     * $column.columnComment
     */
    @NotNull(message = "$column.columnComment不能为空", groups = { EditGroup.class })
    private Long id;

    /**
     * 项目名称
     */
    @NotBlank(message = "项目名称不能为空", groups = { AddGroup.class, EditGroup.class })
    private String proName;

    /**
     * 单位名称
     */
    @NotBlank(message = "单位名称不能为空", groups = { AddGroup.class, EditGroup.class })
    private String depName;

    /**
     * 项目说明
     */
    @NotBlank(message = "项目说明不能为空", groups = { AddGroup.class, EditGroup.class })
    private String proContent;

    /**
     * 项目编号
     */
    @NotBlank(message = "项目编号不能为空", groups = { AddGroup.class, EditGroup.class })
    private String proNum;

    /**
     * 项目状态
     */
    @NotBlank(message = "项目状态不能为空", groups = { AddGroup.class, EditGroup.class })
    private String proState;

    /**
     * 项目类型
     */
    @NotBlank(message = "项目类型不能为空", groups = { AddGroup.class, EditGroup.class })
    private String proType;

    /**
     * 开始时间
     */
    @NotNull(message = "开始时间不能为空", groups = { AddGroup.class, EditGroup.class })
    private Date startTime;

    /**
     * 结束时间
     */
    @NotNull(message = "结束时间不能为空", groups = { AddGroup.class, EditGroup.class })
    private Date endTime;

    /**
     * 服务时间
     */
    @NotNull(message = "服务时间不能为空", groups = { AddGroup.class, EditGroup.class })
    private Integer proServiceTime;
}
