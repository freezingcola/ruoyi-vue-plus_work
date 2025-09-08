package org.dromara.workinfo.domain.vo;

import org.dromara.workinfo.domain.WorkInfoLog;
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
 * 工单处理信息视图对象 work_info_log
 *
 * @author 旅法师
 * @date 2024-06-20
 */
@Data
@ExcelIgnoreUnannotated
@AutoMapper(target = WorkInfoLog.class)
public class WorkInfoLogVo implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @ExcelProperty(value = "id", converter = ExcelDictConvert.class)
    @ExcelDictFormat(readConverterExp = "$column.readConverterExp()")
    private Long id;

    @ExcelProperty(value = "内容", converter = ExcelDictConvert.class)
    @ExcelDictFormat(readConverterExp = "$column.readConverterExp()")
    private String workContent;

    @ExcelProperty(value = "附件", converter = ExcelDictConvert.class)
    @ExcelDictFormat(readConverterExp = "$column.readConverterExp()")
    private String attachs;

    private Date createTime;

    private Long workInfoId;

    private String state;

    private String createBy;

    private String allocationBy;

    private String urlList;

    private String workLevel;

    private String  contactPerson;

    private String projectName;

    private  String workTitle;

    private String workType;

    private String photoList;

}
