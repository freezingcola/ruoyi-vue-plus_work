package org.dromara.workinfo.service.impl;

import org.dromara.common.core.utils.MapstructUtils;
import org.dromara.common.core.utils.StringUtils;
import org.dromara.common.mybatis.core.page.TableDataInfo;
import org.dromara.common.mybatis.core.page.PageQuery;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.dromara.workinfo.domain.bo.WorkProjectSlaBo;
import org.dromara.workinfo.domain.vo.WorkProjectSlaVo;
import org.dromara.workinfo.domain.WorkProjectSla;
import org.dromara.workinfo.mapper.WorkProjectSlaMapper;
import org.dromara.workinfo.service.IWorkProjectSlaService;

import java.util.List;
import java.util.Map;
import java.util.Collection;

/**
 * 项目事件Service业务层处理
 *
 * @author caign
 * @date 2025-01-19
 */
@RequiredArgsConstructor
@Service
public class WorkProjectSlaServiceImpl implements IWorkProjectSlaService {

    private final WorkProjectSlaMapper baseMapper;

    /**
     * 查询项目事件
     *
     * @param id 主键
     * @return 项目事件
     */
    @Override
    public WorkProjectSlaVo queryById(Long id){
        return baseMapper.selectVoById(id);
    }

    /**
     * 分页查询项目事件列表
     *
     * @param bo        查询条件
     * @param pageQuery 分页参数
     * @return 项目事件分页列表
     */
    @Override
    public TableDataInfo<WorkProjectSlaVo> queryPageList(WorkProjectSlaBo bo, PageQuery pageQuery) {
        LambdaQueryWrapper<WorkProjectSla> lqw = buildQueryWrapper(bo);
        Page<WorkProjectSlaVo> result = baseMapper.selectVoPage(pageQuery.build(), lqw);
        return TableDataInfo.build(result);
    }

    /**
     * 查询符合条件的项目事件列表
     *
     * @param bo 查询条件
     * @return 项目事件列表
     */
    @Override
    public List<WorkProjectSlaVo> queryList(WorkProjectSlaBo bo) {
        LambdaQueryWrapper<WorkProjectSla> lqw = buildQueryWrapper(bo);
        return baseMapper.selectVoList(lqw);
    }

    private LambdaQueryWrapper<WorkProjectSla> buildQueryWrapper(WorkProjectSlaBo bo) {
        Map<String, Object> params = bo.getParams();
        LambdaQueryWrapper<WorkProjectSla> lqw = Wrappers.lambdaQuery();
        lqw.like(StringUtils.isNotBlank(bo.getSlaName()), WorkProjectSla::getSlaName, bo.getSlaName());
        lqw.eq(StringUtils.isNotBlank(bo.getSlaContent()), WorkProjectSla::getSlaContent, bo.getSlaContent());
        lqw.eq(StringUtils.isNotBlank(bo.getSlaState()), WorkProjectSla::getSlaState, bo.getSlaState());
        lqw.eq(StringUtils.isNotBlank(bo.getSlaType()), WorkProjectSla::getSlaType, bo.getSlaType());
        lqw.eq(StringUtils.isNotBlank(bo.getSlaTime()), WorkProjectSla::getSlaTime, bo.getSlaTime());
        lqw.eq(bo.getProjectId() != null, WorkProjectSla::getProjectId, bo.getProjectId());
        return lqw;
    }

    /**
     * 新增项目事件
     *
     * @param bo 项目事件
     * @return 是否新增成功
     */
    @Override
    public Boolean insertByBo(WorkProjectSlaBo bo) {
        WorkProjectSla add = MapstructUtils.convert(bo, WorkProjectSla.class);
        validEntityBeforeSave(add);
        boolean flag = baseMapper.insert(add) > 0;
        if (flag) {
            bo.setId(add.getId());
        }
        return flag;
    }

    /**
     * 修改项目事件
     *
     * @param bo 项目事件
     * @return 是否修改成功
     */
    @Override
    public Boolean updateByBo(WorkProjectSlaBo bo) {
        WorkProjectSla update = MapstructUtils.convert(bo, WorkProjectSla.class);
        validEntityBeforeSave(update);
        return baseMapper.updateById(update) > 0;
    }

    /**
     * 保存前的数据校验
     */
    private void validEntityBeforeSave(WorkProjectSla entity){
        //TODO 做一些数据校验,如唯一约束
    }

    /**
     * 校验并批量删除项目事件信息
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
