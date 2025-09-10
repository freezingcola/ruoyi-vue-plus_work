package org.dromara.feestandard.domain.vo;

import java.math.BigDecimal;
import org.dromara.feestandard.domain.CanteenFeestandard;
import com.alibaba.excel.annotation.ExcelIgnoreUnannotated;
import com.alibaba.excel.annotation.ExcelProperty;
import org.dromara.common.excel.annotation.ExcelDictFormat;
import org.dromara.common.excel.convert.ExcelDictConvert;
import io.github.linpeilie.annotations.AutoMapper;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;



/**
 * 餐费标准设置视图对象 canteen_feestandard
 *
 * @author Lion Li
 * @date 2025-09-09
 */
@Data
@ExcelIgnoreUnannotated
@AutoMapper(target = CanteenFeestandard.class)
public class CanteenFeestandardVo implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 
     */
    @ExcelProperty(value = "")
    private Long id;

    /**
     * 关联食堂ID
     */
    @ExcelProperty(value = "关联食堂ID")
    private Long canteenId;

    /**
     * 餐别(1:早餐 2:午餐 3:晚餐)
     */
    @ExcelProperty(value = "餐别(1:早餐 2:午餐 3:晚餐)")
    private Long mealType;

    /**
     * 收费标准
     */
    @ExcelProperty(value = "收费标准")
    private BigDecimal fee;


}
