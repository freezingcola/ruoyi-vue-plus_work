package org.dromara.feestandard.domain;

import org.dromara.common.tenant.core.TenantEntity;
import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.math.BigDecimal;

import java.io.Serial;
import java.util.Date;

/**
 * 餐费标准设置对象 canteen_feestandard
 *
 * @author Lion Li
 * @date 2025-09-09
 */
@Data
//@EqualsAndHashCode(callSuper = true) 不继承 也不要这个玩意
@TableName("canteen_feestandard")
public class CanteenFeestandard  {//不要继承这个extends TenantEntity

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     *覆盖掉继承的字段，标记不映射。insert 时不会再拼 create_dept
     *//*
    @TableField(exist = false)
    private Long createDept;

    *//**
     * 覆盖掉继承的字段，标记不映射。insert 时不会再拼 create_by
     *//*
    @TableField(exist = false)
    private Long createBy;

    *//**
     * 覆盖掉继承的字段，标记不映射。insert 时不会再拼 createTime
     *//*
    @TableField(exist = false)
    private Date createTime;

    *//**
     * 覆盖掉继承的字段，标记不映射。insert 时不会再拼 updateBy
     *//*
    @TableField(exist = false)
    private Long updateBy;

    *//**
     * 覆盖掉继承的字段，标记不映射。insert 时不会再拼 updateTime
     *//*
    @TableField(exist = false)
    private Date updateTime;
*/
    /**
     *餐标ID
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 关联食堂ID
     */
    private Long canteenId;

    /**
     * 餐别(1:早餐 2:午餐 3:晚餐)
     */
    private Long mealType;

    /**
     * 收费标准
     */
    private BigDecimal fee;


}
