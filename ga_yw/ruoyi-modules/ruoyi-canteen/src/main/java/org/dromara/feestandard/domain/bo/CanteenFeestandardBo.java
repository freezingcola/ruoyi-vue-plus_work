package org.dromara.feestandard.domain.bo;

import org.dromara.feestandard.domain.CanteenFeestandard;
import org.dromara.common.mybatis.core.domain.BaseEntity;
import org.dromara.common.core.validate.AddGroup;
import org.dromara.common.core.validate.EditGroup;
import io.github.linpeilie.annotations.AutoMapper;
import lombok.Data;
import lombok.EqualsAndHashCode;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;

/**
 * 餐费标准设置业务对象 canteen_feestandard
 *
 * @author Lion Li
 * @date 2025-09-09
 */
@Data
@EqualsAndHashCode(callSuper = true)
@AutoMapper(target = CanteenFeestandard.class, reverseConvertGenerate = false)
public class CanteenFeestandardBo extends BaseEntity {

    /**
     * 餐标ID
     * 注意：新增时应该为null，更新时必须有值
     */
    @NotNull(message = "餐标ID不能为空", groups = { EditGroup.class })
    private Long id;

    /**
     * 关联食堂ID
     */
    @NotNull(message = "关联食堂ID不能为空", groups = { AddGroup.class, EditGroup.class })
    private Long canteenId;

    /**
     * 餐别(1:早餐 2:午餐 3:晚餐)
     */
    @NotNull(message = "餐别(1:早餐 2:午餐 3:晚餐)不能为空", groups = { AddGroup.class, EditGroup.class })
    private Long mealType;

    /**
     * 收费标准 - decimal(10,2)
     * 总共10位数字，其中2位小数，最大值为99999999.99
     */
    @NotNull(message = "收费标准不能为空", groups = { AddGroup.class, EditGroup.class })
    @DecimalMin(value = "0.01", message = "收费标准必须大于0")
    @DecimalMax(value = "99999999.99", message = "收费标准不能超过99999999.99元")
    @Digits(integer = 8, fraction = 2, message = "收费标准格式不正确，最多8位整数和2位小数")
    private BigDecimal fee;


}
