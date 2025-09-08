package org.dromara.workinfo.domain;

import org.dromara.common.tenant.core.TenantEntity;
import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serial;

/**
 * 工单管理对象 work_info
 *
 * @author Lion Li
 * @date 2024-09-24
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("work_info")
public class WorkInfo extends TenantEntity {

    /**
     * 未分配
     */
    public static final String WAIT_FOR_FINDUSER = "1";

    /**
     * 待接收
     */
    public static final String WAIT_FOR_ACCEPT = "2";

    /**
     * 待处理
     */
    public static final String WAIT_FOR_DO = "3";

    /**
     * 待审核
     */
    public static final String WAIT_FOR_AUDIT = "4";

    /**
     * 已完成
     */
    public static final String IS_FINISH = "5";
    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * $column.columnComment
     */
    @TableId(value = "id")
    private Long id;

    /**
     * 工单标题
     */
    private String workTitle;

    /**
     * 工单描述
     */
    private String workContent;

    /**
     * 状态
     */
    private String state;

    /**
     * 工单类型
     */
    private String workType;

    /**
     * 接收人id
     */
    private Long acceptAccount;

    /**
     * 附件
     */
    private String attachs;

    /**
     * 项目名称
     */
    private String projectName;

    /**
     * 项目Id
     */
    private Long projectId;

    /**
     * 分类名称
     */
    private String classificationType;

    /**
     * 等级
     */
    private String workLevel;

    /**
     * 开始时间
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") // 指定日期时间格式
    private Date startTime;

    /**
     * 结束时间
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") // 指定日期时间格式
    private Date endTime;

    /**
     * 流水号
     */
    private String number;
    /**
     * 对接人
     */
    private String  contactPerson;

    @TableField(exist = false)
    private String createName;

    @TableField(exist = false)
    private String workTime;
}
