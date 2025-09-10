package org.dromara.feestandard.controller;

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
import org.dromara.feestandard.domain.vo.CanteenFeestandardVo;
import org.dromara.feestandard.domain.bo.CanteenFeestandardBo;
import org.dromara.feestandard.service.ICanteenFeestandardService;
import org.dromara.common.mybatis.core.page.TableDataInfo;
import java.util.Map;
import java.util.HashMap;

/**
 * 餐费标准设置
 *
 * @author Lion Li
 * @date 2025-09-09
 */
@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/feestandard/feestandard")
public class CanteenFeestandardController extends BaseController {

    private final ICanteenFeestandardService canteenFeestandardService;

    /**
     * 查询餐费标准设置列表
     */
    @SaCheckPermission("feestandard:feestandard:list")
    @GetMapping("/list")
    public TableDataInfo<CanteenFeestandardVo> list(CanteenFeestandardBo bo, PageQuery pageQuery) {
        return canteenFeestandardService.queryPageList(bo, pageQuery);
    }

    /**
     * 导出餐费标准设置列表
     */
    @SaCheckPermission("feestandard:feestandard:export")
    @Log(title = "餐费标准设置", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(CanteenFeestandardBo bo, HttpServletResponse response) {
        List<CanteenFeestandardVo> list = canteenFeestandardService.queryList(bo);
        ExcelUtil.exportExcel(list, "餐费标准设置", CanteenFeestandardVo.class, response);
    }

    /**
     * 获取餐费标准设置详细信息
     *
     * @param id 主键
     */
    @SaCheckPermission("feestandard:feestandard:query")
    @GetMapping("/{id}")
    public R<CanteenFeestandardVo> getInfo(@NotNull(message = "主键不能为空")
                                     @PathVariable Long id) {
        return R.ok(canteenFeestandardService.queryById(id));
    }

    /**
     * 新增餐费标准设置
     */
    @SaCheckPermission("feestandard:feestandard:add")
    @Log(title = "餐费标准设置", businessType = BusinessType.INSERT)
    @RepeatSubmit()
    @PostMapping()
    public R<Void> add(@Validated(AddGroup.class) @RequestBody CanteenFeestandardBo bo) {
        // 确保ID为null
        bo.setId(null);
        return toAjax(canteenFeestandardService.insertByBo(bo));
    }

    /**
     * 修改餐费标准设置
     */
    @SaCheckPermission("feestandard:feestandard:edit")
    @Log(title = "餐费标准设置", businessType = BusinessType.UPDATE)
    @RepeatSubmit()
    @PutMapping()
    public R<Void> edit(@Validated(EditGroup.class) @RequestBody CanteenFeestandardBo bo) {
        return toAjax(canteenFeestandardService.updateByBo(bo));
    }


    /**
     * 新功能
     * 检查餐费标准是否已存在
     */
    @SaCheckPermission("feestandard:feestandard:query")
    @GetMapping("/exists")
    public R<Map<String, Object>> checkExists(@RequestParam Long canteenId, @RequestParam Long mealType) {
        // 创建查询条件对象
        CanteenFeestandardBo queryBo = new CanteenFeestandardBo();
        queryBo.setCanteenId(canteenId);
        queryBo.setMealType(mealType);

        // 调用service层查询是否存在
        boolean exists = canteenFeestandardService.checkExists(canteenId, mealType);

        // 返回结果
        Map<String, Object> data = new HashMap<>();
        data.put("exists", exists);
        return R.ok(data);
    }

    /**
     * 删除餐费标准设置
     *
     * @param ids 主键串
     */
    @SaCheckPermission("feestandard:feestandard:remove")
    @Log(title = "餐费标准设置", businessType = BusinessType.DELETE)
    @DeleteMapping("/{ids}")
    public R<Void> remove(@NotEmpty(message = "主键不能为空")
                          @PathVariable Long[] ids) {
        return toAjax(canteenFeestandardService.deleteWithValidByIds(List.of(ids), true));
    }
}
