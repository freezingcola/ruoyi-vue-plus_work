package org.dromara.info.domain.vo;

import org.dromara.info.domain.CanteenInfo;
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
 * 食堂信息视图对象 canteen_info
 *
 * @author Lion Li
 * @date 2025-09-08
 */
@Data
@ExcelIgnoreUnannotated
@AutoMapper(target = CanteenInfo.class)
public class CanteenInfoVo implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 食堂ID
     */
    @ExcelProperty(value = "食堂ID")
    private Long id;

    /**
     * 食堂名称
     */
    @ExcelProperty(value = "食堂名称")
    private String canteenName;

    /**
     * 食堂位置
     */
    @ExcelProperty(value = "食堂位置")
    private String location;

    /**
     * 开放时间
     */
    @ExcelProperty(value = "开放时间")
    private String openTime;

    /**
     * 负责人
     */
    @ExcelProperty(value = "负责人")
    private String manager;

    /**
     * 所属单位ID
     */
    @ExcelProperty(value = "所属单位ID")
    private Long unitId;


}
