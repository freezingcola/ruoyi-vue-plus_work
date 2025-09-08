package org.dromara.workinfo.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.RequiredArgsConstructor;
import org.dromara.common.core.utils.MapstructUtils;
import org.dromara.common.mybatis.core.page.PageQuery;
import org.dromara.common.mybatis.core.page.TableDataInfo;
import org.dromara.workinfo.domain.Report;
import org.dromara.workinfo.domain.bo.ReportBo;
import org.dromara.workinfo.domain.vo.ReportVo;
import org.dromara.workinfo.mapper.ReportMapper;
import org.dromara.workinfo.service.IReportService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 报修Service业务层处理
 *
 * @author Lion Li
 * @date 2025-03-24
 */
@RequiredArgsConstructor
@Service
public class ReportServiceImpl implements IReportService {

    private final ReportMapper baseMapper;

    /**
     * 查询报修
     */
    @Override
    public ReportVo queryById(Long id) {
        Report report = baseMapper.selectById(id);
        ReportVo vo = new ReportVo();
        BeanUtils.copyProperties(report, vo);

        // 处理特殊字段（示例）
        // vo.setStatusLabel(convertStatus(report.getStatus()));
        // vo.setCreateTimeStr(DateUtils.parseDateToStr(report.getCreateTime()));
        return vo;
    }

    /**
     * 查询报修列表
     */
    @Override
    public TableDataInfo<ReportVo> queryPageList(ReportBo bo, PageQuery pageQuery) {
        LambdaQueryWrapper<Report> lqw = buildQueryWrapper(bo);
        Page<Report> page = baseMapper.selectPage(pageQuery.build(), lqw);
        List<ReportVo> voList = page.getRecords().stream().map(report -> {
            ReportVo vo = new ReportVo();
            BeanUtils.copyProperties(report, vo);
            return vo;
        }).collect(Collectors.toList());
        return TableDataInfo.build(voList);
    }

    /**
     * 查询报修列表
     */
    @Override
    public List<ReportVo> queryList(ReportBo bo) {
        LambdaQueryWrapper<Report> lqw = new LambdaQueryWrapper<>();
        // 构建查询条件...
        return baseMapper.selectList(lqw).stream().map(report -> {
            ReportVo vo = new ReportVo();
            BeanUtils.copyProperties(report, vo);
            return vo;
        }).collect(Collectors.toList());
    }

    private LambdaQueryWrapper<Report> buildQueryWrapper(ReportBo bo) {
        LambdaQueryWrapper<Report> lqw = Wrappers.lambdaQuery();
        // 使用BeanUtils将bo转换为查询条件
        Report queryEntity = new Report();
        BeanUtils.copyProperties(bo, queryEntity);
        lqw.setEntity(queryEntity);
        // 添加其他查询条件...
        return lqw;
    }

    /**
     * 新增报修
     */
    @Override
    public Boolean insertByBo(ReportBo bo) {
        Report add = MapstructUtils.convert(bo, Report.class);
        validEntityBeforeSave(add);
        boolean flag = baseMapper.insert(add) > 0;
        if (flag) {
            bo.setId(add.getId());
        }
        return flag;
    }

    /**
     * 修改报修
     */
    @Override
    public Boolean updateByBo(ReportBo bo) {
        Report update = MapstructUtils.convert(bo, Report.class);
        validEntityBeforeSave(update);
        return baseMapper.updateById(update) > 0;
    }

    /**
     * 保存前的数据校验
     */
    private void validEntityBeforeSave(Report entity) {
        // 做一些数据校验,如唯一约束
    }

    /**
     * 批量删除报修
     */
    @Override
    public Boolean deleteWithValidByIds(Collection<Long> ids, Boolean isValid) {
        if(isValid) {
            // 做一些业务上的校验,判断是否允许删除
        }
        return baseMapper.deleteBatchIds(ids) > 0;
    }
}
