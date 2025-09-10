package org.dromara.info.domain;

import org.dromara.common.mybatis.core.domain.BaseEntity;
import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;

/**
 * 食堂信息对象 canteen_info
 *
 * @author Lion Li
 * @date 2025-09-08
 */
@Data
//@EqualsAndHashCode(callSuper = true)
@TableName("canteen_info")
public class CanteenInfo  {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 食堂ID
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 食堂名称
     */
    private String canteenName;

    /**
     * 食堂位置
     */
    private String location;

    /**
     * 开放时间
     */
    private String openTime;

    /**
     * 负责人
     */
    private String manager;

    /**
     * 所属单位ID
     */
    private Long unitId;

    private Long tenant_id;
}
