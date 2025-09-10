package org.dromara.info.controller;

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
import org.dromara.info.domain.vo.CanteenInfoVo;
import org.dromara.info.domain.bo.CanteenInfoBo;
import org.dromara.info.service.ICanteenInfoService;
import org.dromara.common.mybatis.core.page.TableDataInfo;

/**
 * 食堂信息
 *
 * @author Lion Li
 * @date 2025-09-08
 */
@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/info/info")
public class CanteenInfoController extends BaseController {

    private final ICanteenInfoService canteenInfoService;

    /**
     * 查询食堂信息列表
     */
    @SaCheckPermission("info:info:list")
    @GetMapping("/list")
    public TableDataInfo<CanteenInfoVo> list(CanteenInfoBo bo, PageQuery pageQuery) {
        return canteenInfoService.queryPageList(bo, pageQuery);
    }

    /**
     * 导出食堂信息列表
     */
    @SaCheckPermission("info:info:export")
    @Log(title = "食堂信息", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(CanteenInfoBo bo, HttpServletResponse response) {
        List<CanteenInfoVo> list = canteenInfoService.queryList(bo);
        ExcelUtil.exportExcel(list, "食堂信息", CanteenInfoVo.class, response);
    }

    /**
     * 获取食堂信息详细信息
     *
     * @param id 主键
     */
    @SaCheckPermission("info:info:query")
    @GetMapping("/{id}")
    public R<CanteenInfoVo> getInfo(@NotNull(message = "主键不能为空")
                                     @PathVariable Long id) {
        return R.ok(canteenInfoService.queryById(id));
    }

    /**
     * 新增食堂信息
     */
    @SaCheckPermission("info:info:add")
    @Log(title = "食堂信息", businessType = BusinessType.INSERT)
    @RepeatSubmit()
    @PostMapping()
    public R<Void> add(@Validated(AddGroup.class) @RequestBody CanteenInfoBo bo) {
        return toAjax(canteenInfoService.insertByBo(bo));
    }

    /**
     * 修改食堂信息
     */
    @SaCheckPermission("info:info:edit")
    @Log(title = "食堂信息", businessType = BusinessType.UPDATE)
    @RepeatSubmit()
    @PutMapping()
    public R<Void> edit(@Validated(EditGroup.class) @RequestBody CanteenInfoBo bo) {
        return toAjax(canteenInfoService.updateByBo(bo));
    }

    /**
     * 删除食堂信息
     *
     * @param ids 主键串
     */
    @SaCheckPermission("info:info:remove")
    @Log(title = "食堂信息", businessType = BusinessType.DELETE)
    @DeleteMapping("/{ids}")
    public R<Void> remove(@NotEmpty(message = "主键不能为空")
                          @PathVariable Long[] ids) {
        return toAjax(canteenInfoService.deleteWithValidByIds(List.of(ids), true));
    }
}
