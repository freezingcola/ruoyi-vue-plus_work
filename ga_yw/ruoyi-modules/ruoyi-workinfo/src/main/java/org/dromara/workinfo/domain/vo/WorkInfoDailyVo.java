package org.dromara.workinfo.domain.vo;

import com.alibaba.excel.annotation.ExcelIgnoreUnannotated;
import com.alibaba.excel.annotation.ExcelProperty;
import io.github.linpeilie.annotations.AutoMapper;
import lombok.Data;
import org.dromara.common.excel.annotation.ExcelDictFormat;
import org.dromara.common.excel.convert.ExcelDictConvert;
import org.dromara.common.translation.annotation.Translation;
import org.dromara.common.translation.constant.TransConstant;
import org.dromara.workinfo.domain.WorkInfo;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;


/**
 * 工单管理视图对象 work_info
 *
 * @author Lion Li
 * @date 2024-09-24
 */
@Data
@ExcelIgnoreUnannotated
@AutoMapper(target = WorkInfo.class)
public class WorkInfoDailyVo implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * $column.columnComment
     */
    @ExcelProperty(value = "${comment}", converter = ExcelDictConvert.class)
    @ExcelDictFormat(readConverterExp = "$column.readConverterExp()")
    private Long id;

    /**
     * 工单标题
     */
    @ExcelProperty(value = "工单标题")
    private String workTitle;

    /**
     * 工单描述
     */
    @ExcelProperty(value = "${comment}", converter = ExcelDictConvert.class)
    @ExcelDictFormat(readConverterExp = "$column.readConverterExp()")
    private String workContent;

    /**
     * 状态
     */
    @ExcelProperty(value = "${comment}", converter = ExcelDictConvert.class)
    @ExcelDictFormat(dictType = "work_info_state")
    private String state;

    /**
     * 类型
     */
    @ExcelProperty(value = "${comment}", converter = ExcelDictConvert.class)
    @ExcelDictFormat(dictType = "work_info_type")
    private String workType;

    /**
     * 内容描述
     */
    @ExcelProperty(value = "${comment}", converter = ExcelDictConvert.class)
    @ExcelDictFormat(readConverterExp = "$column.readConverterExp()")
    private String addAccount;

    /**
     *
     */
    @ExcelProperty(value = "${comment}", converter = ExcelDictConvert.class)
    @ExcelDictFormat(readConverterExp = "$column.readConverterExp()")
    private String addAccountName;

    private Long createBy;

    /**
     * 创建人名称
     */
    @Translation(type = TransConstant.USER_ID_TO_NAME, mapper = "createBy")
    private String createByName;

    /**
     * $column.columnComment
     */
    @ExcelProperty(value = "${comment}", converter = ExcelDictConvert.class)
    @ExcelDictFormat(readConverterExp = "$column.readConverterExp()")
    private Long acceptAccount;

    /**
     * $column.columnComment
     */
    @ExcelProperty(value = "${comment}", converter = ExcelDictConvert.class)
    @ExcelDictFormat(readConverterExp = "$column.readConverterExp()")
    @Translation(type = TransConstant.USER_ID_TO_NICKNAME, mapper = "acceptAccount")
    private String acceptAccountName;

    private String attachs;

    private Date createTime;
    /**
     * 项目名称
     */
    @ExcelProperty(value = "项目名称")
    private String projectName;

    /**
     * 项目Id
     */
    @ExcelProperty(value = "项目Id")
    private Long projectId;

    /**
     * 分类名称
     */
    @ExcelProperty(value = "分类名称")
    private String classificationType;

    /**
     * 等级
     */
    @ExcelProperty(value = "等级")
    private String workLevel;

    /**
     * 开始时间
     */
    @ExcelProperty(value = "开始时间")
    private Date startTime;

    /**
     * 结束时间
     */
    @ExcelProperty(value = "结束时间")
    private Date endTime;

    /**
     * 流水号
     */
    @ExcelProperty(value = "流水号")
    private String number;

    /**
     * 对接人
     */
    private String  contactPerson;
}
