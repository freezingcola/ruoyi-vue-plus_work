package org.dromara.workinfo.controller;

import java.util.List;

import cn.dev33.satoken.annotation.SaCheckRole;
import lombok.RequiredArgsConstructor;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.*;
import cn.dev33.satoken.annotation.SaCheckPermission;
import org.dromara.common.core.constant.TenantConstants;
import org.dromara.common.core.utils.StringUtils;
import org.dromara.common.satoken.utils.LoginHelper;
import org.dromara.workinfo.domain.vo.WorkInfoVo;
import org.dromara.workinfo.mapper.WorkInfoMapper;
import org.dromara.workinfo.service.IWorkInfoService;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.annotation.Validated;
import org.dromara.common.idempotent.annotation.RepeatSubmit;
import org.dromara.common.log.annotation.Log;
import org.dromara.common.web.core.BaseController;
import org.dromara.common.mybatis.core.page.PageQuery;
import org.dromara.common.core.domain.R;
import org.dromara.common.core.validate.AddGroup;
import org.dromara.common.core.validate.EditGroup;
import org.dromara.common.log.enums.BusinessType;
import org.dromara.common.excel.utils.ExcelUtil;
import org.dromara.workinfo.domain.vo.WorkInfoLogVo;
import org.dromara.workinfo.domain.bo.WorkInfoLogBo;
import org.dromara.workinfo.service.IWorkInfoLogService;
import org.dromara.common.mybatis.core.page.TableDataInfo;

/**
 * 工单处理信息
 *
 * @author 旅法师
 * @date 2024-06-20
 */
@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/infolog/infoLog")
public class WorkInfoLogController extends BaseController {

    private final IWorkInfoLogService workInfoLogService;

    private final IWorkInfoService workInfoService;
    /**
     * 查询工单处理信息列表
     */
//    @SaCheckPermission("infolog:infoLog:list")
    @GetMapping("/list")
    public TableDataInfo<WorkInfoLogVo> list(WorkInfoLogBo bo, PageQuery pageQuery) {
        if(bo.getWorkInfoId() == null){
            throw new RuntimeException("工单ID不能为空!");
        }
        return workInfoLogService.queryPageList(bo, pageQuery);
    }

    /**
     * 导出工单处理信息列表
     */
//    @SaCheckPermission("infolog:infoLog:export")
    @Log(title = "工单处理信息", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(WorkInfoLogBo bo, HttpServletResponse response) {
        List<WorkInfoLogVo> list = workInfoLogService.queryList(bo);
        ExcelUtil.exportExcel(list, "工单处理信息", WorkInfoLogVo.class, response);
    }

    /**
     * 获取工单处理信息详细信息
     *
     * @param id 主键
     */
//    @SaCheckPermission("infolog:infoLog:query")
    @GetMapping("/{id}")
    public R<WorkInfoLogVo> getInfo(@NotNull(message = "主键不能为空")
                                     @PathVariable Long id) {
        return R.ok(workInfoLogService.queryById(id));
    }

    /**
     * 修改工单处理信息
     */
//    @SaCheckPermission("infolog:infoLog:edit")
    @Log(title = "工单处理信息", businessType = BusinessType.UPDATE)
    @RepeatSubmit()
    @PutMapping()
    public R<Void> edit(@Validated(EditGroup.class) @RequestBody WorkInfoLogBo bo) {
        return toAjax(workInfoLogService.updateByBo(bo));
    }

    /**
     * 删除工单处理信息
     *
     * @param ids 主键串
     */
//    @SaCheckPermission("infolog:infoLog:remove")
    @Log(title = "工单处理信息", businessType = BusinessType.DELETE)
    @DeleteMapping("/{ids}")
    public R<Void> remove(@NotEmpty(message = "主键不能为空")
                          @PathVariable Long[] ids) {
        return toAjax(workInfoLogService.deleteWithValidByIds(List.of(ids), true));
    }
}
