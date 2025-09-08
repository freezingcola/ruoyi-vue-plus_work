package org.dromara.workinfo.controller;

import java.util.List;

import lombok.RequiredArgsConstructor;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.*;
import cn.dev33.satoken.annotation.SaCheckPermission;
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
import org.dromara.workinfo.domain.vo.WorkProjectSlaVo;
import org.dromara.workinfo.domain.bo.WorkProjectSlaBo;
import org.dromara.workinfo.service.IWorkProjectSlaService;
import org.dromara.common.mybatis.core.page.TableDataInfo;

/**
 * 项目事件
 *
 * @author caign
 * @date 2025-01-19
 */
@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/workProject/projectSla")
public class WorkProjectSlaController extends BaseController {

    private final IWorkProjectSlaService workProjectSlaService;

    /**
     * 查询项目事件列表
     */
    @SaCheckPermission("workProject:project:list")
    @GetMapping("/list")
    public TableDataInfo<WorkProjectSlaVo> list(WorkProjectSlaBo bo, PageQuery pageQuery) {
        return workProjectSlaService.queryPageList(bo, pageQuery);
    }

    /**
     * 导出项目事件列表
     */
    @SaCheckPermission("workProject:project:export")
    @Log(title = "项目事件", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(WorkProjectSlaBo bo, HttpServletResponse response) {
        List<WorkProjectSlaVo> list = workProjectSlaService.queryList(bo);
        ExcelUtil.exportExcel(list, "项目事件", WorkProjectSlaVo.class, response);
    }

    /**
     * 获取项目事件详细信息
     *
     * @param id 主键
     */
    @SaCheckPermission("workProject:project:query")
    @GetMapping("/{id}")
    public R<WorkProjectSlaVo> getInfo(@NotNull(message = "主键不能为空")
                                     @PathVariable Long id) {
        return R.ok(workProjectSlaService.queryById(id));
    }

    /**
     * 新增项目事件
     */
    @SaCheckPermission("workProject:project:add")
    @Log(title = "项目事件", businessType = BusinessType.INSERT)
    @RepeatSubmit()
    @PostMapping()
    public R<Void> add(@Validated(AddGroup.class) @RequestBody WorkProjectSlaBo bo) {
        return toAjax(workProjectSlaService.insertByBo(bo));
    }

    /**
     * 修改项目事件
     */
    @SaCheckPermission("workProject:project:edit")
    @Log(title = "项目事件", businessType = BusinessType.UPDATE)
    @RepeatSubmit()
    @PutMapping()
    public R<Void> edit(@Validated(EditGroup.class) @RequestBody WorkProjectSlaBo bo) {
        return toAjax(workProjectSlaService.updateByBo(bo));
    }

    /**
     * 删除项目事件
     *
     * @param ids 主键串
     */
    @SaCheckPermission("workProject:project:remove")
    @Log(title = "项目事件", businessType = BusinessType.DELETE)
    @DeleteMapping("/{ids}")
    public R<Void> remove(@NotEmpty(message = "主键不能为空")
                          @PathVariable Long[] ids) {
        return toAjax(workProjectSlaService.deleteWithValidByIds(List.of(ids), true));
    }
}
