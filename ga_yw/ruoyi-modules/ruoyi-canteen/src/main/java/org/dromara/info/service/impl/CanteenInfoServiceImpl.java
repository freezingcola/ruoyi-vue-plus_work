package org.dromara.info.service.impl;

import org.dromara.common.core.utils.MapstructUtils;
import org.dromara.common.core.utils.StringUtils;
import org.dromara.common.mybatis.core.page.TableDataInfo;
import org.dromara.common.mybatis.core.page.PageQuery;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.dromara.info.domain.bo.CanteenInfoBo;
import org.dromara.info.domain.vo.CanteenInfoVo;
import org.dromara.info.domain.CanteenInfo;
import org.dromara.info.mapper.CanteenInfoMapper;
import org.dromara.info.service.ICanteenInfoService;

import java.util.List;
import java.util.Map;
import java.util.Collection;


/**
 * 食堂信息Service业务层处理
 *
 * @author Lion Li
 * @date 2025-09-08
 */
@RequiredArgsConstructor
@Service
public class CanteenInfoServiceImpl implements ICanteenInfoService {

    private final CanteenInfoMapper baseMapper;

    /**
     * 查询食堂信息
     *
     * @param id 主键
     * @return 食堂信息
     */
    @Override
    public CanteenInfoVo queryById(Long id){
        return baseMapper.selectVoById(id);
    }

    /**
     * 分页查询食堂信息列表
     *
     * @param bo        查询条件
     * @param pageQuery 分页参数
     * @return 食堂信息分页列表
     */
    @Override
    public TableDataInfo<CanteenInfoVo> queryPageList(CanteenInfoBo bo, PageQuery pageQuery) {
        LambdaQueryWrapper<CanteenInfo> lqw = buildQueryWrapper(bo);
        Page<CanteenInfoVo> result = baseMapper.selectVoPage(pageQuery.build(), lqw);
        return TableDataInfo.build(result);
    }

    /**
     * 查询符合条件的食堂信息列表
     *
     * @param bo 查询条件
     * @return 食堂信息列表
     */
    @Override
    public List<CanteenInfoVo> queryList(CanteenInfoBo bo) {
        LambdaQueryWrapper<CanteenInfo> lqw = buildQueryWrapper(bo);
        return baseMapper.selectVoList(lqw);
    }

    private LambdaQueryWrapper<CanteenInfo> buildQueryWrapper(CanteenInfoBo bo) {
        Map<String, Object> params = bo.getParams();
        LambdaQueryWrapper<CanteenInfo> lqw = Wrappers.lambdaQuery();
        lqw.like(StringUtils.isNotBlank(bo.getCanteenName()), CanteenInfo::getCanteenName, bo.getCanteenName());
        lqw.eq(StringUtils.isNotBlank(bo.getLocation()), CanteenInfo::getLocation, bo.getLocation());
        lqw.eq(StringUtils.isNotBlank(bo.getOpenTime()), CanteenInfo::getOpenTime, bo.getOpenTime());
        lqw.like(StringUtils.isNotBlank(bo.getManager()), CanteenInfo::getManager, bo.getManager());
        lqw.eq(bo.getUnitId() != null, CanteenInfo::getUnitId, bo.getUnitId());
        return lqw;
    }

    /**
     * 新增食堂信息
     *
     * @param bo 食堂信息
     * @return 是否新增成功
     */
    @Override
    public Boolean insertByBo(CanteenInfoBo bo) {
        CanteenInfo add = MapstructUtils.convert(bo, CanteenInfo.class);
        validEntityBeforeSave(add);
        boolean flag = baseMapper.insert(add) > 0;
        if (flag) {
            bo.setId(add.getId());
        }
        return flag;
    }

    /**
     * 修改食堂信息
     *
     * @param bo 食堂信息
     * @return 是否修改成功
     */
    @Override
    public Boolean updateByBo(CanteenInfoBo bo) {
        CanteenInfo update = MapstructUtils.convert(bo, CanteenInfo.class);
        validEntityBeforeSave(update);
        return baseMapper.updateById(update) > 0;
    }

    /**
     * 保存前的数据校验
     */
    private void validEntityBeforeSave(CanteenInfo entity){
        //TODO 做一些数据校验,如唯一约束
    }

    /**
     * 校验并批量删除食堂信息信息
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
