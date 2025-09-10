package org.dromara.feestandard.service.impl;

import org.dromara.common.core.utils.MapstructUtils;
import org.dromara.common.core.utils.StringUtils;
import org.dromara.common.mybatis.core.page.TableDataInfo;
import org.dromara.common.mybatis.core.page.PageQuery;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.dromara.feestandard.domain.bo.CanteenFeestandardBo;
import org.dromara.feestandard.domain.vo.CanteenFeestandardVo;
import org.dromara.feestandard.domain.CanteenFeestandard;
import org.dromara.feestandard.mapper.CanteenFeestandardMapper;
import org.dromara.feestandard.service.ICanteenFeestandardService;

import java.util.List;
import java.util.Map;
import java.util.Collection;

/**
 * 餐费标准设置Service业务层处理
 *
 * @author Lion Li
 * @date 2025-09-09
 */
@RequiredArgsConstructor
@Service
public class CanteenFeestandardServiceImpl implements ICanteenFeestandardService {

    private final CanteenFeestandardMapper baseMapper;

    /**
     * 查询餐费标准设置
     *
     * @param id 主键
     * @return 餐费标准设置
     */
    @Override
    public CanteenFeestandardVo queryById(Long id){
        return baseMapper.selectVoById(id);
    }

    /**
     * 分页查询餐费标准设置列表
     *
     * @param bo        查询条件
     * @param pageQuery 分页参数
     * @return 餐费标准设置分页列表
     */
    @Override
    public TableDataInfo<CanteenFeestandardVo> queryPageList(CanteenFeestandardBo bo, PageQuery pageQuery) {
        LambdaQueryWrapper<CanteenFeestandard> lqw = buildQueryWrapper(bo);
        Page<CanteenFeestandardVo> result = baseMapper.selectVoPage(pageQuery.build(), lqw);
        return TableDataInfo.build(result);
    }

    /**
     * 查询符合条件的餐费标准设置列表
     *
     * @param bo 查询条件
     * @return 餐费标准设置列表
     */
    @Override
    public List<CanteenFeestandardVo> queryList(CanteenFeestandardBo bo) {
        LambdaQueryWrapper<CanteenFeestandard> lqw = buildQueryWrapper(bo);
        return baseMapper.selectVoList(lqw);
    }

    private LambdaQueryWrapper<CanteenFeestandard> buildQueryWrapper(CanteenFeestandardBo bo) {
        Map<String, Object> params = bo.getParams();
        LambdaQueryWrapper<CanteenFeestandard> lqw = Wrappers.lambdaQuery();
        lqw.eq(bo.getCanteenId() != null, CanteenFeestandard::getCanteenId, bo.getCanteenId());
        lqw.eq(bo.getMealType() != null, CanteenFeestandard::getMealType, bo.getMealType());
        lqw.eq(bo.getFee() != null, CanteenFeestandard::getFee, bo.getFee());
        return lqw;
    }

    /**
     * 新增餐费标准设置
     *
     * @param bo 餐费标准设置
     * @return 是否新增成功
     */
    @Override
    public Boolean insertByBo(CanteenFeestandardBo bo) {
        CanteenFeestandard add = MapstructUtils.convert(bo, CanteenFeestandard.class);

        // ⭐ 关键修改：确保新增时ID为null，让数据库自增
        add.setId(null);

        validEntityBeforeSave(add);
        boolean flag = baseMapper.insert(add) > 0;
        if (flag) {
            // 插入成功后，MyBatis-Plus会自动回填生成的ID到add对象
            bo.setId(add.getId());
        }
        return flag;
    }

    /**
     * 修改餐费标准设置
     *
     * @param bo 餐费标准设置
     * @return 是否修改成功
     */
    @Override
    public Boolean updateByBo(CanteenFeestandardBo bo) {
        CanteenFeestandard update = MapstructUtils.convert(bo, CanteenFeestandard.class);
        validEntityBeforeSave(update);
        return baseMapper.updateById(update) > 0;
    }

    /**
     * 保存前的数据校验
     */
    private void validEntityBeforeSave(CanteenFeestandard entity){
        //TODO 做一些数据校验,如唯一约束
    }

    /**
     * 校验并批量删除餐费标准设置信息
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

    /**
     * 新增检验餐标service接口实现类
     */
    @Override
    public boolean checkExists(Long canteenId, Long mealType) {
        LambdaQueryWrapper<CanteenFeestandard> lqw = Wrappers.lambdaQuery();
        lqw.eq(CanteenFeestandard::getCanteenId, canteenId)
                .eq(CanteenFeestandard::getMealType, mealType);

        // 使用 count 方法检查是否存在
        long count = baseMapper.selectCount(lqw);
        return count > 0;
    }
}
