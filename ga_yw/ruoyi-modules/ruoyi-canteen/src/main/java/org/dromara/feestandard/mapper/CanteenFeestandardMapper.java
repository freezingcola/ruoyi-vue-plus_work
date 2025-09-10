package org.dromara.feestandard.mapper;

import org.dromara.feestandard.domain.CanteenFeestandard;
import org.dromara.feestandard.domain.vo.CanteenFeestandardVo;
import org.dromara.common.mybatis.core.mapper.BaseMapperPlus;
import org.apache.ibatis.annotations.Mapper;

/**
 * 餐费标准设置Mapper接口
 *
 * @author Lion Li
 * @date 2025-09-09
 */
@Mapper
public interface CanteenFeestandardMapper extends BaseMapperPlus<CanteenFeestandard, CanteenFeestandardVo> {

}
