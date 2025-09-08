package org.dromara.workinfo.controller;

import java.util.List;

import lombok.RequiredArgsConstructor;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.*;
import cn.dev33.satoken.annotation.SaCheckPermission;
import org.dromara.workinfo.domain.WorkInfo;
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
import org.dromara.workinfo.domain.vo.WorkProjectVo;
import org.dromara.workinfo.domain.bo.WorkProjectBo;
import org.dromara.workinfo.service.IWorkProjectService;
import org.dromara.common.mybatis.core.page.TableDataInfo;

/**
 * 项目
 *
 * @author Lion Li
 * @date 2024-10-23
 */
@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/workProject/project")
public class WorkProjectController extends BaseController {

    private final IWorkProjectService workProjectService;

    /**
     * 查询项目列表
     */
    @SaCheckPermission("workProject:project:list")
    @GetMapping("/list")
    public TableDataInfo<WorkProjectVo> list(WorkProjectBo bo, PageQuery pageQuery) {
        return workProjectService.queryPageList(bo, pageQuery);
    }



    /**
     * 新增方法，无需授权，查询所有项目
     * @param bo
     * @param pageQuery
     * @return
     */
    @GetMapping("/NoAuthorizelist")
    public TableDataInfo<WorkProjectVo> NoAuthorizelist(WorkProjectBo bo, PageQuery pageQuery) {
        return workProjectService.queryPageList(bo, pageQuery);
    }

    /**
     * 导出项目列表
     */
    @SaCheckPermission("workProject:project:export")
    @Log(title = "项目", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(WorkProjectBo bo, HttpServletResponse response) {
        List<WorkProjectVo> list = workProjectService.queryList(bo);
        ExcelUtil.exportExcel(list, "项目", WorkProjectVo.class, response);
    }

    /**
     * 获取项目详细信息
     *
     * @param id 主键
     */
    @SaCheckPermission("workProject:project:query")
    @GetMapping("/{id}")
    public R<WorkProjectVo> getInfo(@NotNull(message = "主键不能为空")
                                     @PathVariable Long id) {
        return R.ok(workProjectService.queryById(id));
    }

    /**
     * 新增项目
     */
    @SaCheckPermission("workProject:project:add")
    @Log(title = "项目", businessType = BusinessType.INSERT)
    @RepeatSubmit()
    @PostMapping()
    public R<Void> add(@Validated(AddGroup.class) @RequestBody WorkProjectBo bo) {
        return toAjax(workProjectService.insertByBo(bo));
    }

    /**
     * 修改项目
     */
    @SaCheckPermission("workProject:project:edit")
    @Log(title = "项目", businessType = BusinessType.UPDATE)
    @RepeatSubmit()
    @PutMapping()
    public R<Void> edit(@Validated(EditGroup.class) @RequestBody WorkProjectBo bo) {
        return toAjax(workProjectService.updateByBo(bo));
    }

    /**
     * 删除项目
     *
     * @param ids 主键串
     */
    @SaCheckPermission("workProject:project:delete")
    @Log(title = "项目", businessType = BusinessType.DELETE)
    @DeleteMapping("/{ids}")
    public R<Void> remove(@NotEmpty(message = "主键不能为空")
                          @PathVariable Long[] ids) {
        return toAjax(workProjectService.deleteWithValidByIds(List.of(ids), true));
    }
}
