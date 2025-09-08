package org.dromara.workinfo.domain;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serial;
import java.util.Date;

/**
 * 需要发送短信消息的告警明细对象 alert_sms_task_result
 *
 * @author Lion Li
 * @date 2025-08-05
 */
@Data
@TableName("alert_sms_task_result")
public class AlertSmsTaskResult {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     *
     */
    @TableId(value = "id")
    private Long id;

    /**
     *
     */
    private String msg;

    /**
     *
     */
    private String mobile;

    /**
     *
     */
    private Long status;

    /**
     *
     */
    private Date sentTime;

    /**
     *
     */
    private String errMsg;

    /**
     *
     */
    private Long eventId;

    /**
     *
     */
    private Long msgType;


}
