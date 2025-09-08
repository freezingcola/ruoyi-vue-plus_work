package org.dromara.workinfo.service.impl;

import org.dromara.common.core.utils.MapstructUtils;
import org.dromara.common.core.utils.StringUtils;
import org.dromara.common.mybatis.core.page.TableDataInfo;
import org.dromara.common.mybatis.core.page.PageQuery;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;
import org.dromara.workinfo.domain.bo.WorkProjectBo;
import org.dromara.workinfo.domain.vo.WorkProjectVo;
import org.dromara.workinfo.domain.WorkProject;
import org.dromara.workinfo.mapper.WorkProjectMapper;
import org.dromara.workinfo.service.IWorkProjectService;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Collection;

/**
 * 项目Service业务层处理
 *
 * @author Lion Li
 * @date 2024-10-23
 */
@RequiredArgsConstructor
@Service
public class WorkProjectServiceImpl implements IWorkProjectService {

    private final WorkProjectMapper baseMapper;

    /**
     * 查询项目
     *
     * @param id 主键
     * @return 项目
     */
    @Override
    public WorkProjectVo queryById(Long id){
        return baseMapper.selectVoById(id);
    }

    /**
     * 分页查询项目列表
     *
     * @param bo        查询条件
     * @param pageQuery 分页参数
     * @return 项目分页列表
     */
    @Override
    public TableDataInfo<WorkProjectVo> queryPageList(WorkProjectBo bo, @NotNull PageQuery pageQuery) {
        LambdaQueryWrapper<WorkProject> lqw = buildQueryWrapper(bo);
        lqw.orderByDesc(WorkProject::getUpdateTime);
        Page<WorkProjectVo> result = baseMapper.selectVoPage(pageQuery.build(), lqw);
        for (WorkProjectVo workProjectVo:result.getRecords()){
            //计算服务时长
           Date start= workProjectVo.getStartTime();
           Date end=workProjectVo.getEndTime();
            // 空值检查
            if (start == null || end == null) {
                throw new IllegalArgumentException("开始时间或结束时间不能为空");
            }
            // 转换为 LocalDate
            LocalDate startDate = start.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            LocalDate endDate = end.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            // 计算天数差
            long diffInDays = ChronoUnit.DAYS.between(startDate, endDate);
            workProjectVo.setProServiceTime(Integer.parseInt(String.valueOf(diffInDays)));
        }
        return TableDataInfo.build(result);
    }

    /**
     * 查询符合条件的项目列表
     *
     * @param bo 查询条件
     * @return 项目列表
     */
    @Override
    public List<WorkProjectVo> queryList(WorkProjectBo bo) {
        LambdaQueryWrapper<WorkProject> lqw = buildQueryWrapper(bo);
        return baseMapper.selectVoList(lqw);
    }

    private LambdaQueryWrapper<WorkProject> buildQueryWrapper(WorkProjectBo bo) {
        Map<String, Object> params = bo.getParams();
        LambdaQueryWrapper<WorkProject> lqw = Wrappers.lambdaQuery();
        lqw.like(StringUtils.isNotBlank(bo.getProName()), WorkProject::getProName, bo.getProName());
        lqw.eq(StringUtils.isNotBlank(bo.getProContent()), WorkProject::getProContent, bo.getProContent());
        lqw.eq(StringUtils.isNotBlank(bo.getProNum()), WorkProject::getProNum, bo.getProNum());
        lqw.eq(StringUtils.isNotBlank(bo.getProState()), WorkProject::getProState, bo.getProState());
        lqw.eq(StringUtils.isNotBlank(bo.getProType()), WorkProject::getProType, bo.getProType());
        lqw.eq(bo.getStartTime() != null, WorkProject::getStartTime, bo.getStartTime());
        lqw.eq(bo.getEndTime() != null, WorkProject::getEndTime, bo.getEndTime());
        lqw.eq(bo.getProServiceTime() != null, WorkProject::getProServiceTime, bo.getProServiceTime());
        lqw.like(StringUtils.isNotBlank(bo.getDepName()), WorkProject::getDepName, bo.getDepName());
        return lqw;
    }

    /**
     * 新增项目
     *
     * @param bo 项目
     * @return 是否新增成功
     */
    @Override
    public Boolean insertByBo(WorkProjectBo bo) {
        WorkProject add = MapstructUtils.convert(bo, WorkProject.class);
        validEntityBeforeSave(add);
        boolean flag = baseMapper.insert(add) > 0;
        if (flag) {
            bo.setId(add.getId());
        }
        return flag;
    }

    /**
     * 修改项目
     *
     * @param bo 项目
     * @return 是否修改成功
     */
    @Override
    public Boolean updateByBo(WorkProjectBo bo) {
        WorkProject update = MapstructUtils.convert(bo, WorkProject.class);
        validEntityBeforeSave(update);
        return baseMapper.updateById(update) > 0;
    }

    /**
     * 保存前的数据校验
     */
    private void validEntityBeforeSave(WorkProject entity){
        //TODO 做一些数据校验,如唯一约束
    }

    /**
     * 校验并批量删除项目信息
     *
     * @param ids     待删除的主键集合
     * @param isValid 是否进行有效性校验
     * @return 是否删除成功
     */
    @Override
    public Boolean deleteWithValidByIds(Collection<Long> ids, Boolean isValid) {
        if(isValid){
            //TODO 做一些业务上的校验,判断是否需要校验
        }
        return baseMapper.deleteBatchIds(ids) > 0;
    }
}
