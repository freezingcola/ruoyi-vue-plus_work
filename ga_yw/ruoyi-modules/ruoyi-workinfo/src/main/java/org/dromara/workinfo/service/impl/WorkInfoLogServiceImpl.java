package org.dromara.workinfo.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.dromara.common.core.utils.MapstructUtils;
import org.dromara.common.core.utils.StringUtils;
import org.dromara.common.mybatis.core.page.TableDataInfo;
import org.dromara.common.mybatis.core.page.PageQuery;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import lombok.RequiredArgsConstructor;
import org.dromara.workinfo.domain.WorkInfo;
import org.dromara.workinfo.domain.vo.WorkInfoVo;
import org.dromara.workinfo.mapper.WorkInfoMapper;
import org.springframework.stereotype.Service;
import org.dromara.workinfo.domain.bo.WorkInfoLogBo;
import org.dromara.workinfo.domain.vo.WorkInfoLogVo;
import org.dromara.workinfo.domain.WorkInfoLog;
import org.dromara.workinfo.mapper.WorkInfoLogMapper;
import org.dromara.workinfo.service.IWorkInfoLogService;

import java.util.List;
import java.util.Map;
import java.util.Collection;

/**
 * 工单处理信息Service业务层处理
 *
 * @author 旅法师
 * @date 2024-06-20
 */
@RequiredArgsConstructor
@Service
public class WorkInfoLogServiceImpl implements IWorkInfoLogService {

    private final WorkInfoLogMapper baseMapper;

    private final WorkInfoMapper workInfoMapper;

    private final WorkInfoLogMapper workInfoLogMapper;
    /**
     * 查询工单处理信息
     *
     * @param id 主键
     * @return 工单处理信息
     */
    @Override
    public WorkInfoLogVo queryById(Long id){
        return baseMapper.selectVoById(id);
    }

    /**
     * 分页查询工单处理信息列表
     *
     * @param bo        查询条件
     * @param pageQuery 分页参数
     * @return 工单处理信息分页列表
     */
    @Override
    public TableDataInfo<WorkInfoLogVo> queryPageList(WorkInfoLogBo bo, PageQuery pageQuery) {
        LambdaQueryWrapper<WorkInfoLog> lqw = buildQueryWrapper(bo);
        Page<WorkInfoLogVo> result = baseMapper.selectVoPage(pageQuery.build(), lqw);
        return TableDataInfo.build(result);
    }

    /**
     * 查询符合条件的工单处理信息列表
     *
     * @param bo 查询条件
     * @return 工单处理信息列表
     */
    @Override
    public List<WorkInfoLogVo> queryList(WorkInfoLogBo bo) {
        LambdaQueryWrapper<WorkInfoLog> lqw = buildQueryWrapper(bo);
        return baseMapper.selectVoList(lqw);
    }

    private LambdaQueryWrapper<WorkInfoLog> buildQueryWrapper(WorkInfoLogBo bo) {
        Map<String, Object> params = bo.getParams();
        LambdaQueryWrapper<WorkInfoLog> lqw = Wrappers.lambdaQuery();
        lqw.eq(StringUtils.isNotBlank(bo.getWorkContent()), WorkInfoLog::getWorkContent, bo.getWorkContent());
        lqw.eq(bo.getWorkInfoId() != null, WorkInfoLog::getWorkInfoId, bo.getWorkInfoId());
        return lqw;
    }

    /**
     * 新增工单处理信息
     *
     * @param bo 工单处理信息
     * @return 是否新增成功
     */
    @Override
    public Boolean insertByBo(WorkInfoLogBo bo) {
        WorkInfoLog add = MapstructUtils.convert(bo, WorkInfoLog.class);
        validEntityBeforeSave(add);
        boolean flag = baseMapper.insert(add) > 0;
        if (flag) {
            bo.setId(add.getId());
        }
        return flag;
    }

    @Override
    public Boolean finishWorkInfo(WorkInfoLogBo bo, WorkInfoVo workInfoVo) {
        workInfoVo.setState(WorkInfo.WAIT_FOR_AUDIT);
        bo.setState(WorkInfo.WAIT_FOR_AUDIT);
        return updateAndInsert(bo, workInfoVo);
    }

    public Boolean receiveWorkInfo(WorkInfoLogBo bo, WorkInfoVo workInfoVo) {
        workInfoVo.setState(WorkInfo.WAIT_FOR_DO);
        bo.setState(WorkInfo.WAIT_FOR_DO);
        return updateAndInsert(bo, workInfoVo);
    }


    @Override
    public Boolean finishAudit(WorkInfoLogBo bo, WorkInfoVo workInfoVo) {
        workInfoVo.setState(WorkInfo.IS_FINISH);
        return updateAndInsert(bo, workInfoVo);
    }

    private Boolean updateAndInsert(WorkInfoLogBo bo, WorkInfoVo workInfoVo){
        WorkInfo update = new WorkInfo();
        update.setId(workInfoVo.getId());
        update.setState(workInfoVo.getState());
        //如果审核失败则 退回处理中
        if (bo.getState().equals("0")){
            /**
             * 增加判断，如果已经二次不通过则流程结束
             */
            QueryWrapper<WorkInfoLog> queryWrapper=new QueryWrapper<>();
            queryWrapper.eq("work_info_id",workInfoVo.getId());
            queryWrapper.eq("state","0");
            List<WorkInfoLog> list=workInfoLogMapper.selectList(queryWrapper);
            if (list.size()==0){
                update.setState(WorkInfo.WAIT_FOR_ACCEPT);
            }else {
                update.setState("6");
                update.setWorkContent("已接收，处理中");
            }
        }
        workInfoMapper.updateById(update);
        return insertByBo(bo);
    }

    /**
     * 修改工单处理信息
     *
     * @param bo 工单处理信息
     * @return 是否修改成功
     */
    @Override
    public Boolean updateByBo(WorkInfoLogBo bo) {
        WorkInfoLog update = MapstructUtils.convert(bo, WorkInfoLog.class);
        validEntityBeforeSave(update);
        return baseMapper.updateById(update) > 0;
    }

    /**
     * 保存前的数据校验
     */
    private void validEntityBeforeSave(WorkInfoLog entity){
        //TODO 做一些数据校验,如唯一约束
    }

    /**
     * 校验并批量删除工单处理信息信息
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
