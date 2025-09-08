package org.dromara.workinfo.domain.bo;

import org.dromara.workinfo.domain.WorkInfo;
import org.dromara.common.mybatis.core.domain.BaseEntity;
import org.dromara.common.core.validate.AddGroup;
import org.dromara.common.core.validate.EditGroup;
import io.github.linpeilie.annotations.AutoMapper;
import lombok.Data;
import lombok.EqualsAndHashCode;
import jakarta.validation.constraints.*;
import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

/**
 * 工单管理业务对象 work_info
 *
 * @author Lion Li
 * @date 2024-09-24
 */
@Data
@EqualsAndHashCode(callSuper = true)
@AutoMapper(target = WorkInfo.class, reverseConvertGenerate = false)
public class WorkInfoBo extends BaseEntity {

    /**
     * $column.columnComment
     */
    @NotNull(message = "$column.columnComment不能为空", groups = { EditGroup.class })
    private Long id;

    /**
     * 工单标题
     */
    @NotBlank(message = "工单标题不能为空", groups = { AddGroup.class, EditGroup.class })
    private String workTitle;

    /**
     * 工单描述
     */
    @NotBlank(message = "工单描述不能为空", groups = { AddGroup.class, EditGroup.class })
    private String workContent;

    /**
     * 状态
     */
    private String state;

    /**
     * 工单类型
     */
    @NotBlank(message = "工单类型不能为空", groups = { AddGroup.class, EditGroup.class })
    private String workType;

    /**
     * 接收人id
     */
    @NotNull(message = "接收人id不能为空", groups = { AddGroup.class, EditGroup.class })
    private Long acceptAccount;

    /**
     * 附件
     */
    private String attachs;

    private String attachIds;
    /**
     * 项目名称
     */
    @NotBlank(message = "项目名称不能为空", groups = { AddGroup.class, EditGroup.class })
    private String projectName;

    /**
     * 项目Id
     */
//    @NotNull(message = "项目Id不能为空", groups = { AddGroup.class, EditGroup.class })
    private Long projectId;

    /**
     * 分类名称
     */
//    @NotBlank(message = "分类名称不能为空", groups = { AddGroup.class, EditGroup.class })
    private String classificationType;

    /**
     * 等级
     */
    @NotBlank(message = "等级不能为空", groups = { AddGroup.class, EditGroup.class })
    private String workLevel;

    /**
     * 开始时间
     */
//    @NotNull(message = "开始时间不能为空", groups = { AddGroup.class, EditGroup.class })
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") // 指定日期时间格式
    private Date startTime;

    /**
     * 结束时间
     */
//    @NotNull(message = "结束时间不能为空", groups = { AddGroup.class, EditGroup.class })
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") // 指定日期时间格式
    private Date endTime;

    /**
     * 流水号
     */
//    @NotBlank(message = "流水号不能为空", groups = { AddGroup.class, EditGroup.class })
    private String number;

    /**
     * 对接人
     */
    private String  contactPerson;
}
